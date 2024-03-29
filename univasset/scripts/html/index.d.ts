//#region Aliases
/** @deprecated */
export const googleDocsCompilation = Embed.google;
//#endregion

/** Array of standard html tags. Mostly useful for checking. */
// export const STDHTMLELEMS: (keyof HTMLElementTagNameMap)[];

/** Creates stylized text. */
export function textStyle(text: string, ...styles: "over"): HTMLSpanElement;











export const Embed = {
    /** Creates a field for Google Sheets.
     * @param namelinkpair link ends in alphanumeric */
    google(...namelinkpair: [title: string, link: string][]): HTMLDivElement;
}

/** Placehoder while no official implementation exists.  */
type HTMLFigureElement = HTMLElement;

type ImageType = "inline";
export function image(src: string, alt: string, keys?: {type?: ImageType}): HTMLImageElement;
export function figure(content: HTMLElement, caption: string): HTMLFigureElement;
export function details(summary: string, content: HTMLElement): HTMLDetailsElement;
