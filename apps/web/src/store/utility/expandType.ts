export type expandedTypeRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: expandedTypeRecursively<O[K]> }
    : never
  : T;

type Immutable<S> = { readonly [K in keyof S]: Immutable<S[K]> };

export type ExtractType<S> = expandedTypeRecursively<Immutable<S>>;
