import { v4 as uuidv4 } from 'uuid';
import { Resource, ResourceId, ResourceName } from './Resource';
import { StorageInterface } from './StorageInterface';

export class MemoryStorage implements StorageInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly data: Map<ResourceName, Map<ResourceId, any>>;

  constructor(data = new Map()) {
    this.data = data;
  }

  public async list<T extends Resource>(resource: ResourceName): Promise<T[]> {
    const collection = this.getCollection<T>(resource);
    return Array.from(collection.values());
  }

  public async create<T extends Resource>(
    resource: ResourceName,
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
    resource: ResourceName,
    id: ResourceId,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public async update<T extends Resource>(
    resource: ResourceName,
    id: ResourceId,
    data: Partial<T>,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public async delete(resource: ResourceName, id: ResourceId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private getCollection<T extends Resource>(
    resource: ResourceName,
  ): Map<ResourceId, T> {
    let collection = this.data.get(resource);

    if (!collection) {
      collection = new Map<ResourceId, T>();
      this.data.set(resource, collection);
    }

    return collection;
  }
}
