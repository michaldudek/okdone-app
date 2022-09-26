import { v4 as uuidv4 } from 'uuid';
import { FindCriteria, Resource, ResourceId } from './Resource';
import { StorageInterface } from './StorageInterface';

export class MemoryStorage implements StorageInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly data: Map<string, Map<ResourceId, any>>;

  constructor(data = new Map()) {
    this.data = data;
  }

  public async list<T extends Resource>(
    resource: string,
    criteria?: FindCriteria<T>,
  ): Promise<T[]> {
    const collection = this.getCollection<T>(resource);
    const arr = Array.from(collection.values());
    // TODO implement criteria
    return arr;
  }

  public async create<T extends Resource>(
    resource: string,
    data: Partial<T>,
  ): Promise<T> {
    const newData = {
      id: uuidv4(),
      ...data,
    } as T;

    const collection = this.getCollection<T>(resource);
    collection.set(newData.id, newData);

    return newData;
  }

  public async read<T extends Resource>(
    resource: string,
    id: ResourceId,
  ): Promise<T | undefined> {
    const collection = this.getCollection<T>(resource);
    return collection.get(id);
  }

  public async update<T extends Resource>(
    resource: string,
    id: ResourceId,
    data: Partial<T>,
  ): Promise<T> {
    const collection = this.getCollection<T>(resource);
    const item = collection.get(id);
    if (!item) {
      throw new Error(
        `Could not update ${resource} ${id} because it does not exist`,
      );
    }

    const newItem = {
      ...item,
      ...data,
    };

    collection.set(id, newItem);

    return newItem;
  }

  public async delete(resource: string, id: ResourceId): Promise<void> {
    const collection = this.getCollection(resource);
    collection.delete(id);
  }

  private getCollection<T extends Resource>(
    resource: string,
  ): Map<ResourceId, T> {
    let collection = this.data.get(resource);

    if (!collection) {
      collection = new Map<ResourceId, T>();
      this.data.set(resource, collection);
    }

    return collection;
  }
}
