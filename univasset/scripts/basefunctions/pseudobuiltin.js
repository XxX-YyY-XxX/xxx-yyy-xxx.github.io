export function iter(iterable) {
    return iterable[Symbol.iterator]();
}

export function* zip(...iterables) {
    var extension;
    switch (iterables[iterables.length - 1]) {
        case true:
            iterables.pop();
            extension = "some";
            break;
        case false:
            iterables.pop();
        default:
            extension = "every";
            break;
    }

    const OUTPUT = Array();
    const ITER_ARRAY = iterables.map(iter);
    while (ITER_ARRAY.map(x => x.next()).map(({value, done}) => {OUTPUT.push(value); return !done;})[extension](x => x))
        yield OUTPUT.splice(0);
}

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
    } catch (exception) {
        console.error(exception);
    }
    return "object";
}

export function* range({start = 0, stop = null, step = 1} = {}) {
    var loop;
    if (stop === null)
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

const METHOD = {
    /** @param {number} x @param {number} y */
    number: (x, y) => x - y,
    /** @param {string} x @param {string} y */
    string: (x, y) => x.localeCompare(y),
    /** @param {boolean} x @param {boolean} y */
    boolean: (x, y) => x - y,
    /** @param {Array} x @param {Array} y @returns {number} */
    array: (x, y) => {
        for (const [first, second] of zip(x, y)) {
            const val = METHOD[type(first)](first, second);
            if (val) return val;    //-1 = true, 0 = false, 1 = true
        }
        return 0;
    },
    /** @param {{}} x @param {{}} y @returns {number} */
    object: (x, y) => {
        //Longest clipped so [first, second] never undefined
        for (const [first, second] of zip(Object.keys(x), Object.keys(y))) {
            const val = first.localeCompare(second);
            if (val) return val;
        }
        //sort by values
        return 0;
    }
};

export function cmp({key = x => x, reverse = false, array = null} = {}) {
    //shall never fuse array and key parameters
    const _onReverse = reverse ? ((x, y) => [y, x]) : ((x, y) => [x, y]);

    function _getIndex(a) {
        if (array) {
            const COPY = array.slice();
            _getIndex = x => {
                const OUT = COPY.indexOf(x);
                COPY.splice(OUT, Number(OUT !== -1));
                return OUT;
            }
        } else {
            _getIndex = x => x;
        }
        return _getIndex(a);
    }

    function _currentFunc(a, b) {
        _currentFunc = METHOD[type(a)];
        return _currentFunc(a, b);
    }

    return function(a, b) {
        [a, b] = [key(a), key(b)];
        [a, b] = [_getIndex(a), _getIndex(b)];
        [a, b] = _onReverse(a, b);
        return _currentFunc(a, b);
    }
}

export function setattr(base, attributes) {
    for (const [attrib, value] of Object.entries(attributes)) {
        switch (type(value)) {
            case "string":
            case "number":
            case "boolean":
                base[attrib] = value;
                break;
            case "array":
                base[attrib](...value);
                break;
            case "object":
                setattr(base[attrib], value);
                break;
            default:
                console.warn(`Unknown data type of ${attrib}: ${type(value)}`);
                break;
        }
    }
    return base;
}

export function* chain(...iterables) {
    for (const iterable of iterables)
        for (const item of iterable)
            yield item;
}

export function reduce(callback, iterable) {
    const ITEMS = Array.from(iterable);
    var output = ITEMS.shift() ?? null;
    for (const ITEM of ITEMS) output = callback(output, ITEM);
    return output;
}
