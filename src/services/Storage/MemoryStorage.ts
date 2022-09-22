import { v4 as uuidv4 } from 'uuid';
import {
  ResourceKey,
  ResourceName,
  ResourceWithId,
  StorageInterface,
  WithId,
} from './StorageInterface';

export class MemoryStorage implements StorageInterface {
  private readonly data = new Map();

  public async list<T extends ResourceWithId>(
    resource: ResourceName,
  ): Promise<T[]> {
    const collection = this.getCollection<T>(resource);
    return Array.from(collection.values());
  }

  public async create<T = unknown>(
    resource: ResourceName,
    data: T,
  ): Promise<WithId<T>> {
    const newData: WithId<T> = {
      id: uuidv4(),
      ...data,
    };

    const collection = this.getCollection<T>(resource);
    collection.set(newData.id, newData);

    return newData;
  }

  public async read<T extends ResourceWithId>(
    resource: ResourceName,
    key: ResourceKey,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public async update<T extends ResourceWithId>(
    resource: ResourceName,
    key: ResourceKey,
    data: Partial<T>,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public async delete(resource: ResourceName, key: ResourceKey): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private getCollection<T = unknown>(
    resource: ResourceName,
  ): Map<ResourceKey, T> {
    if (!this.data.has(resource)) {
      this.data.set(resource, new Map());
    }

    return this.data.get(resource);
  }
}
