//#region Arrays
Object.defineProperty(Array.prototype, "count", {
    value: function(value) {
        return this.filter(x => x === value).length;
    },
    writable: true, configurable: true
})

Object.defineProperty(Array.prototype, "remove", {
    value: function(value) {
        const INDEX = this.indexOf(value);
        this.splice(INDEX, Number(INDEX !== -1));
    },
    writable: true, configurable: true
})

Object.defineProperty(Array.prototype, "subsetof", {
    /** @param {Array} main_array */
    value: function(main_array) {
        const COPY = main_array.slice();
        for (const ITEM of this) {
            if (COPY.includes(ITEM))    COPY.remove(ITEM);
            else                        return false;
        }
        return true;
    },
    writable: true, configurable: true
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