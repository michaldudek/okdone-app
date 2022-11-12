import { FunctionComponent, useEffect } from 'react';
import { usePreference } from '../hooks/usePreference';
import { Preferences } from '../types';

export enum AppearanceMode {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

type Props = {
  defaultValue?: AppearanceMode;
};

export const AppearanceModeProvider: FunctionComponent<Props> = ({
  defaultValue = AppearanceMode.System,
}) => {
  const [appearance] = usePreference(Preferences.Appearance, defaultValue);
  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-system');
    document.body.classList.add(`theme-${appearance}`);
  }, [appearance]);
  return <></>;
};
