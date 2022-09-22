import { useMemo } from 'react';
import { StorageInterface } from 'services/Storage/StorageInterface';
import { LocalStorage } from './LocalStorage';
import { MemoryStorage } from './MemoryStorage';

// TODO be smarter about these exports when multiple storages implemented
// TODO IndexedDB via jsstore lib ?
// TODO repository pattern so that each resource can have a different store?

const memory = new MemoryStorage();
const local = new LocalStorage('okdone');

const getStorage = (): StorageInterface => local;

const useStorage = (): StorageInterface => {
  return useMemo(getStorage, []);
};

export default getStorage;
export * from './Resource';
export * from './StorageInterface';
export { useStorage, memory, local };
