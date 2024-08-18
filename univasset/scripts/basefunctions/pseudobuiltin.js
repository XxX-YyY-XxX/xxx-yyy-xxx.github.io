//#region 0th-order functions/Uses native functions
export function iter(iterable) {
    return iterable[Symbol.iterator]();
}

export function type(any) {
    // var tempvar;
    const TYPE = typeof any;
    switch (TYPE) {
        case "object":
            if (any === null)
                return "null";      
            else if (Array.isArray(any))
                return "array";
            else if (Symbol.iterator in any)
                return "iterable";
            // else if (any instanceof Set)
            //     return "set";
            // else if (any instanceof HTMLElement || any instanceof DocumentFragment)
            //     return "dom";
            // else if (typeof (tempvar = any.constructor.name) === "string" && tempvar)  // Custom Classes
            //     return tempvar;
            // else if (typeof (tempvar = any[Symbol.toStringTag]) === "string")   // Class Display Name
            //     return tempvar;
            else
                return "object";
        case "function":
            if (any.toString().startsWith("class"))
                //if input is typeof Class
                return "class";
            else
                return "function";
        default:
            return TYPE;
    }
}

export function subclassof(subclass, superclass) {
    return subclass.prototype instanceof superclass;
}

export function* range({start = 0, stop = null, step = 1} = {}) {
    var loop;
    if (stop === null)
        loop = () => true;
    else if (step > 0)
        loop = x => x < stop;
    else if (step < 0)
        loop = x => x > stop;
    else
        return console.error("Error in range function:", stop, start, step);

    for (var i = start; loop(i); i += step) yield i;
}

export function* chain(...iterables) {
    for (const iterable of iterables)
        for (const item of iterable)
            yield item;
}

export function* enumerate(iterable) {
    var index = 0;
    for (const ITEM of iterable) yield [index++, ITEM];
}

export function groupby(iterable, key) {
    const MAP = new Map();
    for (const ITEM of iterable) {
        const KEY = key(ITEM);
        if (MAP.has(KEY))
            MAP.get(KEY).push(ITEM)
        else
            MAP.set(KEY, [ITEM])
    }
    return MAP;
}

export function classtype(instance) {
    const [,,OUTPUT] = instance.constructor.toString().match(/(class|function) (\w+)/)
    return OUTPUT;
}
//#endregion

//#region 1st-order functions/Uses 0th and above
export function setattr(base, attributes) {
    for (const [ATTR, VALUE] of Object.entries(attributes)) {
        switch (type(VALUE)) {
            case "string":
            case "number":
            case "boolean":
            case "function":
                base[ATTR] = VALUE;
                break;
            case "array":
                base[ATTR](...VALUE);
                break;
            case "object":
                setattr(base[ATTR], VALUE);
                break;
            default:
                console.warn(`Unknown data type of ${ATTR}: ${type(VALUE)}`);
                base[ATTR] = VALUE;
                break;
        }
    }
    return base;
}

export function* zip(...iterables) {
    const EXT = (() => {
        switch (iterables[iterables.length - 1]) {
            case true:
                iterables.pop();
                return "some";
            case false:
                iterables.pop();
            default:
                return "every";
        }
    })();

    const OUTPUT = Array();
    const ITER_ARRAY = iterables.map(iter);
    while (ITER_ARRAY.map(x => x.next()).map(({value, done}) => {OUTPUT.push(value); return !done;})[EXT](x => x))
        yield OUTPUT.splice(0);
}
//#endregion

//#region 2nd-order functions/Uses 1st and above
/** Used only for `cmp` function. */
const METHOD = {
    /** @param {number} x @param {number} y @returns {number} */    number: (x, y) => x - y,
    /** @param {string} x @param {string} y @returns {number} */    string: (x, y) => x.localeCompare(y),
    /** @param {boolean} x @param {boolean} y @returns {number} */  boolean: (x, y) => x - y,

    /** @param {Array} x @param {Array} y @returns {number} */
    array: (x, y) => {
        for (const [A, B] of zip(x, y)) {
            const VAL = METHOD[type(A)](A, B);
            if (VAL) return VAL;                // -1 = true, 0 = false, 1 = true
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
    },
};

// error handling for unknown type
export function cmp(...sort_params) {
    var method;

    if (sort_params.length) {
        return function(a, b) {
            method ??= sort_params.map(({key}) => key(a)).map(type).map(x => METHOD[x]);
            for (const [{key, reverse = false}, func] of zip(sort_params, method)) {
                [a, b] = [key(a), key(b)];
                if (reverse) [a, b] = [b, a];
                const OUTPUT = func(a, b);
                if (OUTPUT) return OUTPUT;
            }
            return 0;
        }
    } else {
        return function(a, b) {
            method ??= METHOD[type(a)];
            return method(a, b);
        }
    }
}
//#endregion