/** Not HTMLIncludeElement until `include` module runs.
 * 
 * Methods and properties only accessible in event listeners. */
class HTMLIncludeElement extends HTMLElement {
    /** Returns true if element is successfully replaced by its contents. */
    get success(): boolean;

    // onreplace() {}

    // is() {}
}

// interface HTMLElementTagNameMap {
//     "include": HTMLIncludeElement;
// }