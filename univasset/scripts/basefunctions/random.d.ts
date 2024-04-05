/** Returns a pseudorandom number within [0...1). */
export function unit(): number;

/** @param min Inclusive @param max Exclusive */
export function integer(min: number, max: number): number;

export function iterable<T>(iterable: Iterable<T>): T;