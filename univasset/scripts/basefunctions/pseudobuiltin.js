/** @param {Iterable} iterable */
export function iter(iterable) {
    return iterable[Symbol.iterator]();
}

/** Iterates items per index in groups. Add "true" at the end to extend shortest.
 * @template T
 * @param {...Iterable<T>} iterables order of iterables = order of output
 * @returns {Generator<T[], void, unknown>} Array of values from each array */
export function* zip(...iterables) {
    var extension;
    if (iterables.slice(-1)[0] === true) {extension = 'some'; iterables.pop();}
    else extension = 'every';

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
        console.error(exception)
        return "object"
    }
}