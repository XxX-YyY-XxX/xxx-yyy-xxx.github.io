//#region Arrays
Object.defineProperty(Array.prototype, "count", {
    value: function(value) {
        return this.filter(x => x === value).length;
    }, writable: true, configurable: true, enumerable: true
})

Object.defineProperty(Array.prototype, "remove", {
    value: function(value) {
        const INDEX = this.indexOf(value);
        const PRESENT = INDEX !== -1;
        if (PRESENT) this.splice(INDEX, 1);
        return PRESENT;
    }, writable: true, configurable: true, enumerable: true
})

Object.defineProperty(Array.prototype, "subsetof", {
    /** @param {Array} main_array */
    value: function(main_array) {
        const COPY = main_array.slice();
        for (const ITEM of this)
            if (!COPY.remove(ITEM))
                return false;
        return true;
    }, writable: true, configurable: true, enumerable: true
})

Object.defineProperty(Array.prototype, "collate", {
    value: function() {
        /** @template T */
        /** @type {Map<T, number>} */ const COUNTER = new Map()
        for (const ITEM of this) COUNTER.set(ITEM, (COUNTER.get(ITEM) ?? 0) + 1)

        /** @type {{[count: number]: T[]}} */ const OUTPUT = {}
        for (const [ITEM, COUNT] of COUNTER) (OUTPUT[COUNT] ??= []).push(ITEM)  // equivalent to Python's dict.setdefault

        return OUTPUT
    }, writable: true, configurable: true, enumerable: true
})
//#endregion

//#region Math
const mathTrunc = Math.trunc;
const mathRound = Math.round;

/** @param {number} value 
 * @param {number} lower Inclusive.
 * @param {number} upper Inclusive. */
Math.clip = function(value, lower, upper) {
    return this.min(this.max(value, lower), upper);
}

/** Returns quotient and remainder.
 * @param {number} dividend
 * @param {number} divisor
 * @returns {[number,number]} quotient, remainder */
Math.intdiv = function(dividend, divisor) {
    return [mathTrunc(dividend / divisor), dividend % divisor];
}

Math.trunc = function(number, fixed = 0) {
    const MULTIPLIER = 10 ** fixed;
    return mathTrunc(number * MULTIPLIER) / MULTIPLIER;
}

Math.round = function(number, fixed = 0) {
    const MULTIPLIER = 10 ** fixed;
    return mathRound(number * MULTIPLIER) / MULTIPLIER;
}
//#endregion