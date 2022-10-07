import { FindCriteria } from './Filters';
import { Resource, ResourceId } from './Resource';

export interface StorageInterface {
  /**
   * List all resources of the given type.
   *
   * @param resource Resource name.
   */
  list<T extends Resource>(
    resource: string,
    criteria?: FindCriteria<T>,
  ): Promise<T[]>;

  /**
   * Create a new resource.
   *
   * @param resource Resource name.
   * @param data Resource data.
   */
  create<T extends Resource>(resource: string, data: T): Promise<T>;

  /**
   * Read a resource with the given key or id.
   *
   * @param resource Resource name.
   * @param id ID.
   */
  read<T extends Resource>(
    resource: string,
    id: ResourceId,
  ): Promise<T | undefined>;

  /**
   * Update a resource.
   *
   * @param resource Resource name.
   * @param id ID.
   * @param data Data to update with.
   */
  update<T extends Resource>(
    resource: string,
    id: ResourceId,
    data: Partial<T>,
  ): Promise<T>;

  /**
   * Delete a resource with the given key or id.
   *
   * @param resource Resource name.
   * @param id ID.
   */
  delete(resource: string, id: ResourceId): Promise<void>;
}
