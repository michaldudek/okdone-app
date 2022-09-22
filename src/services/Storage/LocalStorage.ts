import { MemoryStorage } from './MemoryStorage';
import { Resource, ResourceId, ResourceName } from './Resource';
import { StorageInterface } from './StorageInterface';

export class LocalStorage implements StorageInterface {
  private readonly memory: StorageInterface;

  private readonly KNOWN_RESOURCES: string;

  constructor(private readonly prefix = '') {
    this.KNOWN_RESOURCES = this.makeKey('__RESOURCES__');

    const knownResources = Object.keys(this.getKnownResources());
    const cache = knownResources.map(
      (resource): [ResourceName, Map<ResourceId, unknown>] => [
        resource,
        this.readResources(resource),
      ],
    );

    this.memory = new MemoryStorage(new Map(cache));
  }

  public async list<T extends Resource>(resource: ResourceName): Promise<T[]> {
    return this.memory.list(resource);
  }

  public async create<T extends Resource>(
    resource: ResourceName,
    data: Partial<T>,
  ): Promise<T> {
    const result = this.memory.create(resource, data);
    await this.storeResources(resource);
    return result;
  }

  public async read<T extends Resource>(
    resource: ResourceName,
    id: string,
  ): Promise<T> {
    return this.memory.read(resource, id);
  }

  public async update<T extends Resource>(
    resource: ResourceName,
    id: string,
    data: Partial<T>,
  ): Promise<T> {
    const result = await this.memory.update(resource, id, data);
    await this.storeResources(resource);
    return result;
  }

  public async delete(resource: ResourceName, id: string): Promise<void> {
    await this.memory.delete(resource, id);
    await this.storeResources(resource);
  }

  private readResources<T extends Resource>(
    resource: ResourceName,
  ): Map<ResourceId, T> {
    const rawData = localStorage.getItem(this.makeKey(resource));

    try {
      const arrayData: T[] = JSON.parse(rawData || '[]');
      const entries = arrayData.map((item): [ResourceId, T] => [
        item.id || (Math.random() * 10000000).toPrecision(0),
        item,
      ]);
      return new Map(entries);
    } catch {
      return new Map();
    }
  }

  private async storeResources(resource: ResourceName): Promise<void> {
    const resources = await this.memory.list(resource);
    localStorage.setItem(this.makeKey(resource), JSON.stringify(resources));

    const knownResources = this.getKnownResources();
    knownResources[resource] = true;
    localStorage.setItem(this.KNOWN_RESOURCES, JSON.stringify(knownResources));
  }

  private getKnownResources(): Record<ResourceName, boolean> {
    return JSON.parse(localStorage.getItem(this.KNOWN_RESOURCES) || '{}');
  }

  private makeKey(resource: ResourceName): string {
    return [this.prefix, resource].filter(Boolean).join('_');
  }
}
