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

/** @returns Number of instances of the object in the array. */
Object.defineProperty(Array.prototype, "count", {
    value: function(any) {
        return this.filter(x => x === any).length;
    },
    writable: true, configurable: true
})

/** Removes item from the array. Mutates array. */
Object.defineProperty(Array.prototype, "remove", {
    value: function(any) {
        const item_index = this.indexOf(any);
        this.splice(item_index, Number(item_index !== -1));
    },
    writable: true, configurable: true
})
//#endregion

//#region Math
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
    return [this.trunc(dividend / divisor), dividend % divisor]
}
//#endregion