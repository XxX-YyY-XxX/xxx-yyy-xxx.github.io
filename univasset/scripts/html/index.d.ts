//#region Aliases
/** @deprecated */
export const googleDocsCompilation = Embed.google;
//#endregion

/** Array of standard html tags. Mostly useful for checking. */
// export const STDHTMLELEMS: (keyof HTMLElementTagNameMap)[];

/** Creates stylized text. */
export function textStyle(text: string, ...styles: "over"): HTMLSpanElement;









type AppendableElement = string | Node;

export const Embed = {
    /** Creates a field for Google Sheets. */
    google(/** link ends in alphanumeric */...namelinkpair: [title: string, link: string][]): HTMLDivElement;,
    twitter(handle: string, ID: string): HTMLQuoteElement;
}

export const List = {
    unordered(...items: AppendableElement[]): HTMLUListElement;
}

/** Placehoder while no official implementation exists.  */
type HTMLFigureElement = HTMLElement;
type ImageType = "inline";
export function image(src: string, alt: string, keys?: {type?: ImageType}): HTMLImageElement;
export function figure(content: HTMLElement, caption: string | DocumentFragment): HTMLFigureElement;
export function details(summary: string, content: AppendableElement): HTMLDetailsElement;
export function fragment(...nodes: AppendableElement[]): DocumentFragment;