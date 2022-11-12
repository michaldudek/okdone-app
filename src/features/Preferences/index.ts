import { indexedDb, registerRepository } from 'services/Storage';
import { PreferencesRepository } from './PreferencesRepository';
import { PREFERENCE_RESOURCE_NAME } from './types';

export * from './hooks/usePreference';
export * from './providers/AppearanceModeProvider';
export * from './types';

registerRepository(
  PREFERENCE_RESOURCE_NAME,
  new PreferencesRepository(
    PREFERENCE_RESOURCE_NAME,
    indexedDb.registerResource(PREFERENCE_RESOURCE_NAME, 1, undefined, ['key']),
  ),
);
