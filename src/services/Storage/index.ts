import { LocalStorage } from './LocalStorage';
import { MemoryStorage } from './MemoryStorage';
import { Repository } from './Repository';
import { Resource } from './Resource';

export * from './Repository';
export * from './Resource';
export * from './StorageInterface';

// TODO be smarter about these exports when multiple storages implemented
// TODO IndexedDB via jsstore lib ?

export const memory = new MemoryStorage();
export const local = new LocalStorage('okdone');

const REPOSITORY_MAP: Record<string, Repository> = {};

/**
 * Register a custom repository for given resource.
 *
 * @param resourceName Name of the resource.
 * @param repository Custom repository.
 */
export const registerRepository = <T extends Resource>(
  resourceName: string,
  repository: Repository<T>,
): void => {
  if (REPOSITORY_MAP[resourceName]) {
    throw new Error(`Cannot register repository for ${resourceName} twice`);
  }

  REPOSITORY_MAP[resourceName] = repository;
};

export const getRepository = <T extends Resource>(
  resourceName: string,
): Repository<T> => {
  let repository = REPOSITORY_MAP[resourceName];

  if (!repository) {
    repository = new Repository<T>(resourceName, local);
    REPOSITORY_MAP[resourceName] = repository;
  }

  return repository as Repository<T>;
};
