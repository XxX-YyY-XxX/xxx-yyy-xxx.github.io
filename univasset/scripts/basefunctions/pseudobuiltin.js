/** Create an iterator from an iterable object.
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {Iterator<T, any, undefined>} */
export function iter(iterable) {
    return iterable[Symbol.iterator]();
}

function* zip(...iterables) {
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
 * @param {Object} params
 * @param {number} params.start Start of the count. Default 0.
 * @param {number} params.stop End of count. Exclusive. If not given, increments infinitely.
 * @param {number} params.step Increment amount. Default 1. */
export function* range({start = 0, stop = null, step = 1} = {}) {
    /** @type {function(number): boolean} */ var loop;
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

/** Creates a sorter key from the given parameters.
 * @template T0 Sequence type.
 * @template T1
 * @param {Object} params
 * @param {function(T0): T1} params.key
 * @param {boolean} params.reverse
 * @param {T1[]} params.array Follows this array for specific order. Only useful for unique values for now.
 * @returns {function(T0, T0): number} */
export function cmp({key = x => x, reverse = false, array = null} = {}) {
    //shall never fuse array and key parameters
    const _onReverse = reverse ? ((x, y) => [y, x]) : ((x, y) => [x, y]);
    const _getIndex = array ? (x => array.indexOf(x)) : (x => x);

    const method = {
        /** @param {number} x @param {number} y */
        number: (x, y) => x - y,
        /** @param {string} x @param {string} y */
        string: (x, y) => x.localeCompare(y),
        /** @param {boolean} x @param {boolean} y */
        boolean: (x, y) => x - y,
        /** @param {Array} x @param {Array} y @returns {number} */
        array: (x, y) => {
            for (const [first, second] of zip(x, y)) {
                const val = method[type(first)](first, second);
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

    function _currentFunc(a, b) {
        _currentFunc = method[type(a)];
        return _currentFunc(a, b);
    }

    return function(a, b) {
        [a, b] = [key(a), key(b)];
        [a, b] = [_getIndex(a), _getIndex(b)];
        [a, b] = _onReverse(a, b);
        return _currentFunc(a, b);
    }
}