const linkStart = ['https://', './assets/images/'];
const imgAlt = 'Image loading failed.';

export class TextStyle {
    static STRIKE = 'del';
    static ITALIC = 'em';
    static BOLD = 'strong';
    static CODE = 'code';
    static QOUTE = 'blockquote';
    static SUPER = 'sup';
}

/** @param {string} link */
export function image(link, caption = "") {
    if (caption) {
        return `<figure>
            <img src="${link}" alt="${imgAlt}" loading="lazy">
            <figcaption>${caption}</figcaption>
        </figure>`;
    } else {
        return `<img src="${link}" alt="${imgAlt}" loading="lazy">`
    }
}

/** @param {string} linkText Text or image URL. @param {string} link */
export function link(linkText, link) {
    return `<a href="${link}">
        ${linkStart.some(val => linkText.startsWith(val)) ? `<img src="${linkText}" alt="${imgAlt}" loading="lazy">` : linkText}
    </a>`;
}

/** @param {boolean} ordered */
export function list(ordered, ...any) {
    const htmlElem = ordered ? 'ol' : 'ul';
    return `<${htmlElem}>${any.map(val => `<li>${val}</li>`).join('')}</${htmlElem}>`;
}

/** @param {Array} headerArray Nullable value @param {Array[]} arrayOfArrays */
export function table(headerArray, ...arrayOfArrays) {
    return `<table>
        ${headerArray ? `<thead><tr>${headerArray.map(val => `<th>${val}</th>`).join('')}</tr></thead>` : ''}
        <tbody>
            ${arrayOfArrays.map(val1 => `<tr>${val1.map(val2 => `<td>${val2}</td>`).join('')}</tr>`).join('')}
        </tbody>    
    </table>`;
}

/** @param {string} string @param {TextStyle[]} styles First inside, last outside */
export function altStyle(string, ...styles) {
    for (const htmlElem of styles) {
        string = `<${htmlElem}>${string}</${htmlElem}>`;
    }
    return string;
}

export function spoilerSummary(summaryName, details) {
    return `<details><summary>${summaryName}</summary>${details}</details>`;
}   //ontoggle

/** @param {Object} dictOfArray \{title : descriptions[]} */
export function descriptionList(dictOfArray) {
    return `<dl>
        ${Object.entries(dictOfArray).map(([title, array]) => `<dt>${title}</dt>${array.map(val => `<dd>${val}</dd>`).join('')}`).join('')}
    </dl>`;
}