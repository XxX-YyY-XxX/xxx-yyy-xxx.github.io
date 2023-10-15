interface Array<T> {
    /** Removes the first occurence of the element from the array in-place. */
    remove(value: T): void;

    /** Returns the number of occurences of the object. */
    count(value: T): number;
}

interface Math {
    /** Truncates the number and returns the remaining parts.
     * @param number A numeric expression.
     * @param fixed Amount of decimal places to retain. Default 0.
     */
    trunc(number: number, fixed?: number): number;
}

