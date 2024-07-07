type AppendableElement = string | Node;

//#region Single Element
export function fragment(...nodes: AppendableElement[]): DocumentFragment;

type ImageType = "inline";
export function image(src: string, alt: string, {mode}?: {mode: ImageType}): HTMLImageElement;

export function anchor(content: AppendableElement, href: string): HTMLAnchorElement;
export function anchor(content: AppendableElement, href: string, extra: {
    /** Uses History API for SPA. */
    mode: "history",
    data?: any
}): HTMLAnchorElement;
//#endregion

//#region Group Element
/** Placehoder while no official implementation exists.  */
type HTMLFigureElement = HTMLElement;
export function figure(content: HTMLElement, caption: string | DocumentFragment): HTMLFigureElement;

export function details(summary: string, content: AppendableElement): HTMLDetailsElement;

export function table(headers: AppendableElement[], ...arrays: AppendableElement[][]): HTMLTableElement;

export const List = {
    ordered(...items: AppendableElement[]): HTMLOListElement;,
    unordered(...items: AppendableElement[]): HTMLUListElement;,
    description(arraydict: {[DescriptionTitle: string]: AppendableElement[]}): HTMLDListElement;
}
//#endregion

//#region Custom Setups
type TextStyleKey = "over" | "strike" | "super" | "bold" | "italic";
/** Creates stylized text. */
export function textStyle(text: string, ...styles: TextStyleKey[]): HTMLSpanElement;

export function slider(initial_value: number, min: number, max: number): HTMLDivElement;

export const Embed = {
    /** Creates a field for Google Sheets. */
    google(/** link ends in alphanumeric */...namelinkpair: [title: string, link: string][]): HTMLDivElement;,
    twitter(/** \@{handle} */handle: string, ID: string): HTMLQuoteElement;,
    youtube(/** 11/34 long alphanumeric Youtube video ID string. */ID: string): HTMLIFrameElement;,
    streamable(ID: string): HTMLIFrameElement;,
    reddit(/** End-to-end alphanumeric for comments. */ID: string): HTMLIFrameElement;
}
//#endregion

//#region Depracated
/** @deprecated */
export const googleDocsCompilation = Embed.google;
//#endregion
