//#region Aliases
/** @deprecated */
export const googleDocsCompilation = Embed.google;
//#endregion

// /** Array of standard html tags. Mostly useful for checking. */
// export const STDHTMLELEMS: (keyof HTMLElementTagNameMap)[];

type TextStyleKey = "over" | "strike" | "super" | "bold" | "italic";
/** Creates stylized text. */
export function textStyle(text: string, ...styles: TextStyleKey[]): HTMLSpanElement;

type AppendableElement = string | Node;

export const Embed = {
    /** Creates a field for Google Sheets. */
    google(/** link ends in alphanumeric */...namelinkpair: [title: string, link: string][]): HTMLDivElement;,
    twitter(/** \@{handle} */handle: string, ID: string): HTMLQuoteElement;,
    youtube(/** 11/34 long alphanumeric Youtube video ID string. */ID: string): HTMLIFrameElement;,
    streamable(ID: string): HTMLIFrameElement;,
    reddit(/** End-to-end alphanumeric for comments. */ ID: string): HTMLIFrameElement;
}

export const List = {
    ordered(...items: AppendableElement[]): HTMLOListElement;,
    unordered(...items: AppendableElement[]): HTMLUListElement;,
    description(arraydict: {[DescriptionTitle: string]: AppendableElement[]}): HTMLDListElement;
}

/** Placehoder while no official implementation exists.  */
type HTMLFigureElement = HTMLElement;

type ImageType = "inline";
export function image(src: string, alt: string, keys?: {type?: ImageType}): HTMLImageElement;

export function figure(content: HTMLElement, caption: string | DocumentFragment): HTMLFigureElement;

export function details(summary: string, content: AppendableElement): HTMLDetailsElement;

export function fragment(...nodes: AppendableElement[]): DocumentFragment;

type AnchorType = "history";
export function anchor(content: AppendableElement, href: string, extra?: {
    type: AnchorType,
    data: any
}): HTMLAnchorElement;

export function table(headers: AppendableElement[], ...arrays: AppendableElement[][]): HTMLTableElement;