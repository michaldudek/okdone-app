import {
  IDBPDatabase as IDBPDatabaseInterface,
  IDBPObjectStore,
  openDB,
} from 'idb';
import { FindCriteria, FindFilter, isFindFilterOperator } from '../Filters';
import { Resource, ResourceId } from '../Resource';
import { StorageInterface } from '../StorageInterface';
import { NULL_VALUE, transformOnRead, transformOnWrite } from './nullHandling';
import { combineResults, cursorToArray, mergeResults } from './resultHelpers';

const DEFAULT_PARAMETERS: IDBObjectStoreParameters = { keyPath: 'id' };

type ResourceConfig = {
  name: string;
  version: number;
  storeParameters?: IDBObjectStoreParameters;
  indexes: string[];
};

// TODO move it to a worker?
export class IndexedDBStorage implements StorageInterface {
  private db: IDBPDatabaseInterface | null = null;

  private schema: Record<string, ResourceConfig> = {};

  constructor(
    private readonly dbName: string,
    private readonly version: number,
  ) {}

  /**
   * Register a resource before using it with this storage, so that IndexedDB
   * is properly prepared (upgraded) for it.
   *
   * You MUST call this method for all resources you want to store in the db
   * before making first connection to it.
   *
   * @param resourceName Name of the resource.
   * @param version Resource schema version. You should increment it every time
   *                you make a change to the parameters or indexes.
   * @param parameters IndexedDB store parameters.
   * @param indexes List of indexes for this resource.
   */
  public registerResource(
    resourceName: string,
    version: number,
    parameters: IDBObjectStoreParameters = DEFAULT_PARAMETERS,
    indexes: string[] = [],
  ): this {
    this.schema[resourceName] = {
      name: resourceName,
      version,
      storeParameters: parameters,
      indexes,
    };
    return this;
  }

  public async list<T extends Resource>(
    resource: string,
    criteria: FindCriteria<T> = {},
  ): Promise<T[]> {
    const { where, orderBy, orderDir = 'asc', limit, start = 0 } = criteria;
    const db = await this.connect();
    let results: T[] = [];

    const tx = db.transaction(resource, 'readonly');

    if (where) {
      // TODO implement and test criteria properly
      const resultSets = await Promise.all<T[]>(
        Object.entries(where).map(([key, value]) =>
          this.filter(tx.store, key, value),
        ),
      );

      results = combineResults<T>(resultSets);
    } else {
      results = await tx.store.getAll();
    }

    tx.commit();

    if (orderBy) {
      results.sort((a, b) => {
        const aProp = a[orderBy] ?? 0;
        const bProp = b[orderBy] ?? 0;
        if (orderDir === 'desc') {
          return aProp < bProp ? 1 : -1;
        }

        return aProp > bProp ? 1 : -1;
      });
    }

    return results.slice(start, limit).map((item) => transformOnRead(item));
  }

  public async create<T extends Resource>(
    resource: string,
    data: T,
  ): Promise<T> {
    const db = await this.connect();
    await db.add(resource, transformOnWrite(data));

    return data;
  }

  public async read<T extends Resource>(
    resource: string,
    id: ResourceId,
  ): Promise<T | undefined> {
    const db = await this.connect();
    const item = await db.get(resource, id);
    return transformOnRead(item);
  }

  public async update<T extends Resource>(
    resource: string,
    id: ResourceId,
    data: Partial<T>,
  ): Promise<T> {
    const db = await this.connect();

    const item = await this.read(resource, id);
    if (!item) {
      throw new Error(
        `Cannot update ${resource} ${id}, because it does not exist.`,
      );
    }

    const newData = {
      ...item,
      ...data,
    } as T;

    await db.put(resource, transformOnWrite(newData));

    return newData;
  }

  public async delete(resource: string, id: ResourceId): Promise<void> {
    const db = await this.connect();
    await db.delete(resource, id);
  }

  private async connect(): Promise<IDBPDatabaseInterface> {
    if (!this.db) {
      const resources = Object.values(this.schema);
      const version = resources.reduce((result, resource) => {
        return result + resource.version;
      }, this.version);

      this.db = await openDB(this.dbName, version, {
        upgrade(db, oldVersion, newVersion, transaction) {
          // apply schemas
          resources.forEach((resource) => {
            if (db.objectStoreNames.contains(resource.name)) {
              return;
            }

            db.createObjectStore(resource.name, resource.storeParameters);
          });

          // apply indexes
          resources.forEach((resource) => {
            const store = transaction.objectStore(resource.name);

            // remove indexes no longer wanted
            Array.from(store.indexNames).forEach((indexName) => {
              if (!resource.indexes.includes(indexName)) {
                store.deleteIndex(indexName);
              }
            });

            // add new indexes
            resource.indexes.forEach((indexName) => {
              if (!store.indexNames.contains(indexName)) {
                store.createIndex(indexName, indexName);
              }
            });
          });
        },
      });
    }

    return this.db;
  }

  private async filter<T extends Resource>(
    store: IDBPObjectStore,
    key: string,
    value: FindFilter<T>,
  ): Promise<T[]> {
    if (value === null) {
      return this.filterEq<T>(store, key, NULL_VALUE);
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return this.filterEq<T>(store, key, value);
    }

    if (isFindFilterOperator(value)) {
      switch (value.operator) {
        case 'in':
          return this.filterIn(store, key, value.value);
        default:
          throw new Error(
            `FindFilterOperator "${value.operator}" is not implemented in IndexedDBStorage yet.`,
          );
      }
    }

    return [];
  }

  private async filterEq<T extends Resource>(
    store: IDBPObjectStore,
    key: string,
    value: string | number,
  ): Promise<T[]> {
    const range = IDBKeyRange.only(value);
    const cursor = await store.index(key).openCursor(range);
    return !cursor ? [] : cursorToArray<T>(cursor);
  }

  private async filterIn<T extends Resource>(
    store: IDBPObjectStore,
    key: string,
    values: (string | number | null)[],
  ): Promise<T[]> {
    const resultSets = await Promise.all(
      values.map((val) => this.filterEq<T>(store, key, val ?? NULL_VALUE)),
    );
    return mergeResults(resultSets);
  }
}
