export default class TextStyle {
    static STRIKE = 'del';
    static ITALIC = 'em';
    static BOLD = 'strong';
    static CODE = 'code';
    static QUOTE = 'blockquote';
    static SUPER = 'sup';
    static OVER = 'overline';
    
    /** @param {string} text @param {TextStyle} style*/
    static style(text, style) {
        switch (style) {
            case this.OVER:
                return `<span style="text-decoration: ${style};">${text}</span>`;
            default:
                return `<${style}>${text}</${style}>`;
        }
    }
}