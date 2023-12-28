/** Not HTMLIncludeElement until `include` module runs.
 * 
 * Methods and properties only accessible in event listeners. */
class HTMLIncludeElement extends HTMLElement {
    get src(): string | null;

    get key(): string | null;

    /** Replace self with child node. */
    default(): void;

    /** Returns boolean value if element is successfully replaced by its contents. */
    get success(): boolean;

    // onreplace() {}

    // is() {}

}

interface HTMLElementTagNameMap {
    "include": HTMLIncludeElement;
}