/** Object whose numeric indices represent the number of instances present in the array. Returns an array of those instances, or undefined. */
type Collator<T> = {
    [count: number]: T[] | undefined;
}

interface Array<T> {
    /** Returns the number of occurences of the object. */
    count(value: T): number;

    /** Removes the first occurence of the element from the array in-place. Returns true if value is removed, else returns false. */
    remove(value: T): boolean;

    /** Checks if current array's elements are present in the given array. */
    subsetof(main_array: T[]): boolean;

    /** Returns an object wherein its index is the instances present in the original array, stored in subarrays.*/
    collate(): Collator<T>;
}

interface Math {
    /** Returns a truncated numeric expression, removing any decimal digits according to the fixed value.
     * @param number A numeric expression.
     * @param fixed Amount of decimal places to retain. Default 0. */
    trunc(number: number, fixed?: number): number;

    /** Returns a supplied numeric expression rounded to the nearest position.
     * @param number The value to be rounded to the nearest integer.
     * @param fixed Decimal position to round off. Default 0. */
    round(number: number, fixed?: number): number;
}

