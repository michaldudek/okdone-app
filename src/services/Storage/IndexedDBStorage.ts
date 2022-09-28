import { IDBPDatabase as IDBPDatabaseInterface, openDB } from 'idb';
import { FindCriteria, Resource, ResourceId } from 'services/Storage/Resource';
import { StorageInterface } from 'services/Storage/StorageInterface';

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
    criteria?: FindCriteria<T> | undefined,
  ): Promise<T[]> {
    const db = await this.connect();
    let results = [];

    // TODO implement criteria

    if (criteria?.orderBy) {
      results = await db.getAllFromIndex(resource, criteria.orderBy.toString());
    } else {
      results = await db.getAll(resource);
    }

    if (criteria?.orderDir === 'desc') {
      results.reverse();
    }

    return results;
  }

  public async create<T extends Resource>(
    resource: string,
    data: T,
  ): Promise<T> {
    const db = await this.connect();
    await db.add(resource, data);

    return data;
  }

  public async read<T extends Resource>(
    resource: string,
    id: ResourceId,
  ): Promise<T | undefined> {
    throw new Error('Method not implemented.');
  }

  public async update<T extends Resource>(
    resource: string,
    id: ResourceId,
    data: Partial<T>,
  ): Promise<T> {
    throw new Error('Method not implemented.');
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
                console.log('delete index', indexName);
                store.deleteIndex(indexName);
              }
            });

            // add new indexes
            resource.indexes.forEach((indexName) => {
              if (!store.indexNames.contains(indexName)) {
                console.log('create index', indexName);
                store.createIndex(indexName, indexName);
              }
            });
          });
        },
      });
    }

    return this.db;
  }
}
