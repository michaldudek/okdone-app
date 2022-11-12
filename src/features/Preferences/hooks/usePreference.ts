import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRepository } from 'services/Storage';
import { PreferencesRepository } from '../PreferencesRepository';
import {
  Preference,
  Preferences,
  PreferenceValue,
  PREFERENCE_RESOURCE_NAME,
} from '../types';

export const usePreference = <T extends PreferenceValue>(
  key: Preferences,
  defaultValue: T,
): [T, (value: T) => void] => {
  const repository = getRepository<Preference, PreferencesRepository>(
    PREFERENCE_RESOURCE_NAME,
  );

  const queryClient = useQueryClient();

  const { data } = useQuery<Preference<T>>(
    [PREFERENCE_RESOURCE_NAME, key],
    async () => {
      const res = (await repository.findOneByKey(key)) as
        | Preference<T>
        | undefined;
      if (res) {
        return res;
      }

      return repository.create({ key, value: defaultValue }) as Promise<
        Preference<T>
      >;
    },
  );

  const { mutateAsync: setPreference } = useMutation(
    async (value: T) => {
      if (!data) {
        return;
      }
      return repository.update(data.id, { value });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([PREFERENCE_RESOURCE_NAME, key]);
      },
    },
  );

  return [data?.value ?? defaultValue, setPreference];
};
