import {Check} from '../externaljavascript.js';

function img(link) {
    return `<img src="${link}" alt="Image loading failed." loading="lazy">`;
}

/** @param {string} link @param {string} caption Image description or 'inline' for inline img. */
export function image(link, caption = "") {
    if (caption) {
        if (caption === 'inline')
            return `<img class="inline-img" src="${link}" alt="Image loading failed." loading="lazy">`;
        else
            return `<figure>${img(link)}<figcaption>${caption}</figcaption></figure>`;

    } else {
        return img(link);
    }
}

/** @param {string} linkText Text or image URL. @param {string} link */
export function link(linkText, link) {
    return `<a href="${link}">
        ${Check.isImage(linkText) ? img(linkText) : linkText}
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
            ${arrayOfArrays.map(arrays => `<tr>${arrays.map(items => `<td>${items}</td>`).join('')}</tr>`).join('')}
        </tbody>    
    </table>`;
}

export function spoilerSummary(summaryName, details) {
    return `<details><summary>${summaryName}</summary>${details}</details>`;
}

/** @param {{string : string[]}} dictOfArray \{title : descriptions[]} */
export function descriptionList(dictOfArray) {
    return `<dl>
        ${Object.entries(dictOfArray).map(([title, array]) => `<dt>${title}</dt>${array.map(val => `<dd>${val}</dd>`).join('')}`).join('')}
    </dl>`;
}