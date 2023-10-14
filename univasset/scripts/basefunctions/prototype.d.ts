interface Array<T> {
    /** Removes the first occurence of the element from the array in-place. */
    remove(value: T): void;

    /** Returns the number of occurences of the object. */
    count(value: T): number;
}