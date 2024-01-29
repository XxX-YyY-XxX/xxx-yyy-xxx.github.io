/** Create an iterator from an iterable object. */
export function iter<T>(iterable: Iterable<T>): Iterator<T, void, unknown>;

/** typeof, but with extra steps. */
export function type(any: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "function" | "object" | "null" | "array" | "iterable" | "class";

export function subclassof<T>(subclass: typeof Object, superclass: T): subclass is T;

export function range(params: {
    /** Start of the count. Default 0. */
    start: number;
    /** End of count. Exclusive. Default infinite. */
    stop: number;
    /** Increment amount. Default 1. */
    step: number;
}): Generator<number, void, unknown>;

/** Returns elements in sequential order, starting from the first iterable. */
export function chain<T>(...iterables: Iterable<T>[]): Generator<T, void, unknown>;

export function enumerate<T>(iterable: Iterable<T>): Generator<[number, T], void, unknown>;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

/** parameters[] for function calls.
 * 
 * {attribute: ???} for deeper calls.
 * 
 * Everything else for attribute assigment. */
export function setattr<T>(base: T, attributes: {[ObjectAttribute: string]: any;}): T;
// keyof T

/** Iterates items per index in groups. */
export function zip<T0, T1>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, extend?: boolean): Generator<[T0, T1], void, unknown>;
/** Iterates items per index in groups. */
export function zip<T0, T1, T2>(iterable0: Iterable<T0>, iterable1: Iterable<T1>, iterable2: Iterable<T2>, extend?: boolean): Generator<[T0, T1, T2], void, unknown>;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

/** Creates a sorter key from the given parameters. */
export function cmp<T>(...sort_params: {
    /** Value used for comparison. */
    key: (item: T) => any;
    /** Sort order reversed. Default false. */
    reverse?: boolean;
}[]): (item0: T, item1: T) => number;
