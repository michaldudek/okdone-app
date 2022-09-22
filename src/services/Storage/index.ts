import { useMemo } from 'react';
import { StorageInterface } from 'services/Storage/StorageInterface';
import { MemoryStorage } from './MemoryStorage';

// TODO be smarter about these exports when multiple storages implemented

const memory = new MemoryStorage();

const getStorage = (): StorageInterface => memory;

const useStorage = (): StorageInterface => {
  return useMemo(getStorage, []);
};

export default getStorage;
export * from './StorageInterface';
export { useStorage, memory };
