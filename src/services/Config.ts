type TConfig = {
  version: string;
};

export const Config: TConfig = {
  version: process.env.REACT_APP_VERSION,
};

export function getConfig(): TConfig;
export function getConfig(key: keyof TConfig): string | null;
export function getConfig(key?: keyof TConfig): TConfig | string | null {
  if (!key) {
    return Config;
  }

  return Config[key] ?? null;
}
