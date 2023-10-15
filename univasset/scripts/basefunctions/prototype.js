//#region Arrays
/** Checks if current array's elements are present in the given array.
 * @param {Array} array An array to base from. */
Object.defineProperty(Array.prototype, "subsetOf", {
    value: function(array) {
        //What if duplicate on subset?
        return this.every(val => array.includes(val));
    },
    writable: true, configurable: true
})

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
//#endregion

//#region Math
const mathTrunc = Math.trunc;

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
    if (fixed)
        return Number(number.toString().replace(RegExp(`(?<=\\.\\d{${fixed}})\\d+`), ""));
    else
        return mathTrunc(number);
}
//#endregion