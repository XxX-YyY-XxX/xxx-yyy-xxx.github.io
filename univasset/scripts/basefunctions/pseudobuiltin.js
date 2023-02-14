/** @param {Iterable} iterable */
export function iter(iterable) {
    //if (iterable[Symbol.iterator]() === iterable)
    
    //Set = iterable[Symbol.iterator]();
    return iterable[Symbol.iterator]();
}

/** Iterates items per index in groups. Add "true" at the end to extend shortest.
 * @param {Iterable[]} iterables order of iterables = order of output
 * @returns "Tuple" of values from each array */
export function* zip(...iterables) {
    var extension;
    if (iterables[iterables.length - 1] === true) {extension = 'some'; iterables.pop();}
    else extension = 'every';

    const output = Array();
    const iterator_array = iterables.map(iter);
    while (iterator_array.map(x => x.next()).map(({value, done}) => {output.push(value); return !done;})[extension](x => x))
        yield output.splice(0);
}

/** typeof, but with extra steps. */
export function type(any) {
    const item_type = typeof any;
    switch (true) {
        case item_type !== 'object':
            return item_type;
        case any === null:
            return 'null';
        case Array.isArray(any):
            return 'array';
        case any instanceof Set:
            return 'set';
        case any instanceof HTMLElement:
        case any instanceof DocumentFragment:
            return 'dom';
        default:
            return 'object';
    }
}