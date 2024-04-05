export const unit = Math.random;

export function integer(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function iterable(iter) {
    const ARRAY = Array.from(iter);
    return ARRAY[integer(0, ARRAY.length)];
}