import { type ConfigurationScope, workspace } from "vscode";

interface Config {
  enabled: boolean
  wpm: number
  cpm: number
  files: string[]
}

class Configuration<TConfig> {
  get(): TConfig;
  get<TKey extends Path<TConfig>>(key: TKey, scope?: ConfigurationScope | null): PathValue<TConfig, TKey>;
  get<TKey extends Path<TConfig>>(key: TKey, scope: ConfigurationScope | null | undefined, defaultValue: NonNullable<PathValue<TConfig, TKey>>): NonNullable<PathValue<TConfig, TKey>>;
  get<TKey extends Path<TConfig>>(key?: TKey, scope?: ConfigurationScope | null, defaultValue?: NonNullable<PathValue<TConfig, TKey>>): TConfig | PathValue<TConfig, TKey> {
    if (!key) {
      return workspace.getConfiguration().get<TConfig>("reading-time")! as TConfig;
    }

    const value = !defaultValue
      ? workspace.getConfiguration("reading-time", scope)
        .get<PathValue<TConfig, TKey>>(key as string)!
      : workspace.getConfiguration("reading-time", scope)
        .get<PathValue<TConfig, TKey>>(key as string, defaultValue)!;

    return value as PathValue<TConfig, TKey>;
  }

  async set<TKey extends Path<TConfig>>(key: TKey, value: PathValue<TConfig, TKey>, scope?: ConfigurationScope | null): Promise<void> {
    await workspace.getConfiguration("reading-time", scope).update(key as string, value);
  }
}

export const config = new Configuration<Config>();

type ChildPath<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
    | `${Key}.${ChildPath<T[Key], Exclude<keyof T[Key], keyof any[]>> &
    string}`
    | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;

type Path<T> = ChildPath<T, keyof T> | keyof T;

type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;
