/** Create an iterator from an iterable object.
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {Iterator<T, any, undefined>} */
export function iter(iterable) {
    return iterable[Symbol.iterator]();
}

/** Iterates items per index in groups. Add "true" at the end to extend shortest.
 * @param {...(Iterable<any> | Generator<any, any, any> | true)} iterables order of iterables = order of output
 * @returns {Generator<any[], void, unknown>} Array of values from each iterable */
export function* zip(...iterables) {
    var extension;
    if (iterables[iterables.length - 1] === true) {
        extension = 'some'; iterables.pop();
    } else extension = 'every';

    const OUTPUT = Array();
    const ITER_ARRAY = iterables.map(iter);
    while (ITER_ARRAY.map(x => x.next()).map(({value, done}) => {OUTPUT.push(value); return !done;})[extension](x => x))
        yield OUTPUT.splice(0);
}

/** typeof, but with extra steps. */
export function type(any) {
    const TYPE = typeof any;
    try {
        if (TYPE !== "object")
            return TYPE;
        else if (any === null)
            return "null";
        else if (Array.isArray(any))
            return "array";
        else if (any instanceof Set)
            return "set";
        else if (any instanceof HTMLElement || any instanceof DocumentFragment)
            return "dom";
        else if (Symbol.iterator in any)
            return "iterator";
        else
            return "object";
    } catch (exception) {
        console.error(exception);
        return "object";
    }
}

/**
 * @param {number} stop End of count. Exclusive. If not given, increments infinitely.
 * @param {number} start Start of the count. Default 0.
 * @param {number} step Increment amount. Default 1. */
export function* range(stop, start = 0, step = 1) {
    var loop;
    if (stop === undefined || stop === null)
        loop = x => true;
    else if (step > 0)
        loop = x => x < stop;
    else if (step < 0)
        loop = x => x > stop;
    else {
        console.error("Error in range function:", stop, start, step);
        loop = x => false;
    }

    for (start; loop(start); start += step)
        yield start;
}

