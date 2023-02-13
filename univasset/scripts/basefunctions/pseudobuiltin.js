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