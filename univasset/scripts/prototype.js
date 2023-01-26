//#region Arrays
/** Checks if current array's elements are present in the given array.
 * @param {Array} array An array to base from. */
Array.prototype.subsetOf = function(array) {
    //What if duplicate on subset?
    return this.every(val => array.includes(val));
}

/** @returns Number of instances of the object in the array. */
Array.prototype.count = function(any) {
    return this.filter(x => x === any).length;
}

/** Removes item from the array. Mutates array. */
Array.prototype.remove = function(any) {
    const item_index = this.indexOf(any);
    this.splice(item_index, Number(item_index !== -1));
}
//#endregion