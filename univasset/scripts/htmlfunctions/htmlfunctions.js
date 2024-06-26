/** @param {string} link @param {string} caption Image description or 'inline' for inline img. */
export function image(link, caption = null) {
    switch (caption) {
        case null:
            return `<img src="${link}" alt="Image loading failed." loading="lazy">`;
        case 'inline':
            return `<img class="inline-img" src="${link}" alt="Image loading failed." loading="lazy">`;
        default:
            return `<figure>
                <img src="${link}" alt="Image loading failed." loading="lazy">
                <figcaption>${caption}</figcaption>
            </figure>`;
    }
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

/** @param {string} hoverable @param {string | HTMLElement} tooltip */
export function tooltip(hoverable, tooltip) {
    return `<span class="tooltip">${hoverable}<span class="tooltiptext">${tooltip}</span></span>`
}