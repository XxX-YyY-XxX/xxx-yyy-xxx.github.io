export default class TextStyle {
    static STRIKE = 'del';
    static ITALIC = 'em';
    static BOLD = 'strong';
    static CODE = 'code';
    static QUOTE = 'blockquote';
    static SUPER = 'sup';
    
    /** @param {string} text @param {TextStyle} style*/
    static style(text, style) {
        return `<${style}>${text}</${style}>`;
    }
}