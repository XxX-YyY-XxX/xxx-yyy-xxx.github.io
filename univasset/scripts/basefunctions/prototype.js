//#region Arrays
//#region 0th-order methods
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

Object.defineProperty(Array.prototype, "collate", {
    value: function() {
        /** @template T */
        /** @type {Map<T, number>} */ const COUNTER = new Map();
        for (const ITEM of this) COUNTER.set(ITEM, (COUNTER.get(ITEM) ?? 0) + 1);

        /** @type {Collator<T>} */ const OUTPUT = {
            highest: 0,
            /** @param  {...number} counts */ get(...counts) {
                return counts.flatMap(x => this[x] ?? []);
            }
        };
        for (const [ITEM, COUNT] of COUNTER) {
            if (COUNT > OUTPUT.highest) OUTPUT.highest = COUNT;
            (OUTPUT[COUNT] ??= []).push(ITEM);      // equivalent to Python's dict.setdefault
        }

        return Object.freeze(OUTPUT);
    }, writable: true, configurable: true, enumerable: true
})
//#endregion

//#region 1st-order methods
Object.defineProperty(Array.prototype, "subsetof", {
    /** @param {Array} main_array */
    value: function(main_array) {
        const COPY = main_array.slice();
        return this.every(x => COPY.remove(x));
        // for (const ITEM of this)
        //     if (!COPY.remove(ITEM))
        //         return false;
        // return true;
    }, writable: true, configurable: true, enumerable: true
})
//#endregion
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