import { FindCriteria, Resource, ResourceId } from './Resource';
import { StorageInterface } from './StorageInterface';

export class Repository<T extends Resource = Resource> {
  /**
   * Repository class that manages a specific resource.
   *
   * @param resourceName Name of the resource.
   * @param storage Storage in which the resources are persisted.
   */
  constructor(
    private readonly resourceName: string,
    private readonly storage: StorageInterface,
  ) {}

  /**
   * Find resources in the repository.
   *
   * @param criteria Find criteria.
   */
  public async find(criteria?: FindCriteria<T>): Promise<T[]> {
    return this.storage.list<T>(this.resourceName, criteria);
  }

  /**
   * Find a single resource in the repository by its id.
   *
   * @param id
   */
  public async findOne(id: ResourceId): Promise<T | undefined>;

  /**
   * Find a single resource in the repository by the find criteria.
   *
   * @param criteria Find crtieria.
   */
  public async findOne(
    criteria: FindCriteria<T> | ResourceId,
  ): Promise<T | undefined> {
    if (typeof criteria === 'string' || typeof criteria === 'number') {
      return this.storage.read<T>(this.resourceName, criteria);
    }

    const items = await this.storage.list<T>(this.resourceName, {
      ...criteria,
      limit: 1,
    });
    return items[0];
  }

  /**
   * Create and store a resource in the repository.
   *
   * @param data
   */
  public async create(data: Partial<T>): Promise<T> {
    return this.storage.create<T>(this.resourceName, data);
  }

  /**
   * Update a resource in the repository.
   *
   * @param id
   * @param data
   */
  public async update(id: ResourceId, data: Partial<T>): Promise<T> {
    return this.storage.update<T>(this.resourceName, id, data);
  }

  /**
   * Delete resource from the repository.
   *
   * @param id
   */
  public async delete(id: ResourceId): Promise<void> {
    return this.storage.delete(this.resourceName, id);
  }
}
