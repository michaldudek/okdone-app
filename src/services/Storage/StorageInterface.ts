import { Resource, ResourceId, ResourceName } from './Resource';

export interface StorageInterface {
  /**
   * List all resources of the given type.
   *
   * @param resource Resource name.
   */
  list<T extends Resource>(resource: ResourceName): Promise<T[]>;

  /**
   * Create a new resource.
   *
   * @param resource Resource name.
   * @param data Resource data.
   */
  create<T extends Resource>(
    resource: ResourceName,
    data: Partial<T>,
  ): Promise<T>;

  /**
   * Read a resource with the given key or id.
   *
   * @param resource Resource name.
   * @param id ID.
   */
  read<T extends Resource>(resource: ResourceName, id: ResourceId): Promise<T>;

  /**
   * Update a resource.
   *
   * @param resource Resource name.
   * @param id ID.
   * @param data Data to update with.
   */
  update<T extends Resource>(
    resource: ResourceName,
    id: ResourceId,
    data: Partial<T>,
  ): Promise<T>;

  /**
   * Delete a resource with the given key or id.
   *
   * @param resource Resource name.
   * @param id ID.
   */
  delete(resource: ResourceName, id: ResourceId): Promise<void>;
}
