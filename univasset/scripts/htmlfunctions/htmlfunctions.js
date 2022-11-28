import {reloadIFrame} from '/univasset/scripts/externaljavascript.js';

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
        return `<img src="${link}" alt="${imgAlt}">`
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

/** @param {string} docLink Ends in alphanumeric */
export function googleEmbed(docLink) {
    return `<figure>
        <iframe src="${docLink}/preview?pli=1" loading="lazy"></iframe>
        <figcaption><a onclick="refreshDoc(this)">Reload Frame</a> \| <a href="${docLink}">Source Link</a></figcaption>
    </figure>`;
}

/** @param {HTMLElement} element */
window.refreshDoc = function(element) {
    reloadIFrame(element.parentElement.previousElementSibling);
}

/** @param permalink ...comments/${permalink}/?...*
function redditEmbed(permalink) {                                       //needs more fix, how to check support
    return `<a href="https://www.reddit.com/r/girlsfrontline/comments/${permalink}/">For load fail purposes.</a><br>
    <iframe id="reddit-embed" src="https://www.redditmedia.com/r/girlsfrontline/comments/${permalink}/?depth=1&amp;showmore=false&amp;embed=true&amp;showmedia=false&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="278" width="640" scrolling="no"></iframe>`
}*/

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