/** Iterates items per index in groups. */
export function zip<T0, T1>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, extend?: boolean): Generator<[T0, T1], void, unknown>;
/** Iterates items per index in groups. */
export function zip<T0, T1, T2>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, iterable2: Iterable<T2>, extend?: boolean): Generator<[T0, T1, T2], void, unknown>;
/** Iterates items per index in groups. */
export function zip<T0, T1, T2, T3>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, extend?: boolean): Generator<[T0, T1, T2, T3], void, unknown>;
/** Iterates items per index in groups. */
export function zip<T0, T1, T2, T3, T4>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, extend?: boolean): Generator<[T0, T1, T2, T3, T4], void, unknown>;