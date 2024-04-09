/** Returns a pseudorandom number within [0...1). */
export function unit(): number;

/** Return an integer between min and max. */
export function integer(/** Inclusive */ min: number, /** Exclusive */ max: number): number;

/** Return a random item in the iterable. Repeating. */
export function* iterable<T>(iterable: Iterable<T>, /** Number of repetitions. Default 1. */ count?: number): Generator<T, void, unknown>;

/** Pick and return a random item in the iterable up to maxcount or until the iterable is exhausted. Non-repeating. */
export function* iterpop<T>(iterable: Iterable<T>, /** Default 1.*/ maxcount?: number): Generator<T, void, unknown>;