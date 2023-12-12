/** Array of standard html tags. Mostly useful for checking. */
// export const STDHTMLELEMS: (keyof HTMLElementTagNameMap)[];

/** Creates a field for Google Sheets.
 * @param namelinkpair link ends in alphanumeric */
export function googleDocsCompilation(...namelinkpair: [[title: string], [link: string]][]): HTMLDivElement;

/** Creates stylized text. */
export function textStyle(text: string, ...styles: "over"): HTMLSpanElement;

export class Embed {
    /** Creates a field for Google Sheets.
     * @param namelinkpair link ends in alphanumeric */
    static google(...namelinkpair: [[title: string], [link: string]][]): HTMLDivElement;
}