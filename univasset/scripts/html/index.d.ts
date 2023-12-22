//#region Aliases
export const googleDocsCompilation = Embed.google;
//#endregion

/** Array of standard html tags. Mostly useful for checking. */
// export const STDHTMLELEMS: (keyof HTMLElementTagNameMap)[];

/** Creates stylized text. */
export function textStyle(text: string, ...styles: "over"): HTMLSpanElement;











export class Embed {
    /** Creates a field for Google Sheets.
     * @param namelinkpair link ends in alphanumeric */
    static google(...namelinkpair: [[title: string], [link: string]][]): HTMLDivElement;
}

/** Placehoder while no official implementation exists.  */
type HTMLFigureElement = HTMLElement;

/** Returns HTMLFigureElement if caption is given, else HTMLImageElement. */
export function img(link: string, alt?: string): HTMLImageElement;
/** Returns HTMLFigureElement if caption is given, else HTMLImageElement. */
export function img(link: string, alt: string, caption: string): HTMLFigureElement;
/** Returns HTMLFigureElement if caption is given, else HTMLImageElement. */
export function img(link: string, alt: string, params: {
    inline?: boolean
}): HTMLImageElement;
