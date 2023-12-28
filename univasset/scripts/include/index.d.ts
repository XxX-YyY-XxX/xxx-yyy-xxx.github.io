/** Not HTMLIncludeElement until `include` module runs.
 * 
 * Methods and properties only accessible in event listeners. */
class HTMLIncludeElement extends HTMLElement {
    //#region User-accessible
    /** Returns true if element is successfully replaced by its contents. */
    get success(): boolean;
    //#endregion

    //#region Implentation helper
    get src(): string | null;

    get key(): string | null;

    /** Replace self with child node. */
    default(): void;
    //#endregion

    // onreplace() {}

    // is() {}
}

// interface HTMLElementTagNameMap {
//     "include": HTMLIncludeElement;
// }