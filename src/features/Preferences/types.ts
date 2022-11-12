import { Resource } from 'services/Storage';

export const PREFERENCE_RESOURCE_NAME = 'preferences';

export type PreferenceValue = string | number | boolean;

export type Preference<T = PreferenceValue> = Resource & {
  key: string;
  value: T;
};

export enum Preferences {
  Appearance = 'appearance',
  ShowKeyboardHelper = 'show_keyboard_helper',
}
