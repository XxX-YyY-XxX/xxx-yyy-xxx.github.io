//#region Arrays
/** @param {Array} mainArray */
Array.prototype.subsetOf = function(mainArray) {
    //What if duplicate on subset?
    return this.every(val => mainArray.includes(val));
}
//#endregion