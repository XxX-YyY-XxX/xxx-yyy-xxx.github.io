/** Create an iterator from an iterable object. */
export function iter<T>(iterable: Iterable<T>): Iterator<T, any, undefined>;

/** Iterates items per index in groups. */
export function* zip<T0, T1>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, extend: boolean = false): Generator<[T0, T1], void, unknown>;
/** Iterates items per index in groups. */
export function* zip<T0, T1, T2>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, iterable2: Iterable<T2>, extend: boolean = false): Generator<[T0, T1, T2], void, unknown>;
/** Iterates items per index in groups. */
export function* zip<T0, T1, T2, T3>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, extend: boolean = false): Generator<[T0, T1, T2, T3], void, unknown>;
/** Iterates items per index in groups. */
export function* zip<T0, T1, T2, T3, T4>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, extend: boolean = false): Generator<[T0, T1, T2, T3, T4], void, unknown>;

/** typeof, but with extra steps. */
export function type(any: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "function" | "object" | "null" | "array" | "set" | "dom" | "iterator";

export function* range(params: {
    /** Start of the count. Default 0. */
    start: number;
    /** End of count. Exclusive. Default infinite. */
    stop: number;
    /** Increment amount. Default 1. */
    step: number;
} = {}): Generator<number, void, unknown>;

/** Creates a sorter key from the given parameters. */
export function cmp<T0, T1>(params: {
    key: (arg0: T0) => T1;
    reverse: boolean;
    /** Follows this array for specific order. */
    array: T1[];
} = {}): (arg0: T0, arg1: T0) => number;

/** parameters[] for function calls.
 * 
 * {attribute: ???} for deeper calls.
 * 
 * Everything else for attribute assigment. */
export function setattr<T0>(base: T0, attributes: {[ObjectAttribute: string]: any;}): T0;