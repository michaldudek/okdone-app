export type ResourceName = string;
export type ResourceKey = string;

export type WithId<T> = T & { id: ResourceKey };
export type ResourceWithId = { id?: ResourceKey };

export interface StorageInterface {
  /**
   * List all resources of the given type.
   *
   * @param resource Resource name.
   */
  list<T extends ResourceWithId>(resource: ResourceName): Promise<T[]>;

  /**
   * Create a new resource.
   *
   * @param resource Resource name.
   * @param data Resource data.
   */
  create<T = unknown>(resource: ResourceName, data: T): Promise<WithId<T>>;

  /**
   * Read a resource with the given key or id.
   *
   * @param resource Resource name.
   * @param key Key or ID.
   */
  read<T extends ResourceWithId>(
    resource: ResourceName,
    key: ResourceKey,
  ): Promise<T>;

  /**
   * Update a resource.
   *
   * @param resource Resource name.
   * @param key Key or ID.
   * @param data Data to update with.
   */
  update<T extends ResourceWithId>(
    resource: ResourceName,
    key: ResourceKey,
    data: Partial<T>,
  ): Promise<T>;

  /**
   * Delete a resource with the given key or id.
   *
   * @param resource Resource name.
   * @param key Key or ID.
   */
  delete(resource: ResourceName, key: ResourceKey): Promise<void>;
}
