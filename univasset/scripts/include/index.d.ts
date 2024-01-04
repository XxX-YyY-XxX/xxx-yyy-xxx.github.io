/** Not HTMLIncludeElement until `include` module runs.
 * 
 * Methods and properties only accessible in event listeners. */
declare class HTMLIncludeElement extends HTMLElement {
    /** Returns true if element is successfully replaced by its contents, else false if default. */
    get success(): boolean;

    // onreplace() {}

    // is() {}
}

// interface HTMLElementTagNameMap {
//     "include": HTMLIncludeElement;
// }