export const unit = Math.random;

export function integer(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function* iterable(iterable, count = 1) {
    const ARRAY = Array.from(iterable);
    for (let i = 0; i < count; i++)
        yield ARRAY[integer(0, ARRAY.length)];
}

export function* iterpop(iterable, maxcount = 1) {
    const ARRAY = Array.from(iterable);
    for (let i = 0; ARRAY.length && i < maxcount; i++)
        yield ARRAY.splice(integer(0, ARRAY.length), 1)[0];
}