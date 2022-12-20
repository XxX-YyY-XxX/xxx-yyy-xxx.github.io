export default class TextStyle {
    static STRIKE = 'del';
    static ITALIC = 'em';
    static BOLD = 'strong';
    static CODE = 'code';
    static QUOTE = 'blockquote';
    static SUPER = 'sup';

    #output;

    /** @param {string} string @param {TextStyle} style*/
    constructor(string, style) {
        this.#output = `<${style}>${string}</${style}>`;
    }

    toString() {
        return this.#output;
    }
}