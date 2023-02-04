export default class List {
    /** @param {string[]} items */
    static ordered(...items) {
        return `<ol>${items.map(val => `<li>${val}</li>`).join('')}</ol>`;
    }

    /** @param {string[]} items */
    static unordered(...items) {
        return `<ul>${items.map(val => `<li>${val}</li>`).join('')}</ul>`;
    }

    /** @param {{title : string[]}} dictOfArray */
    static description(dictOfArray) {
        return `<dl>${Object.entries(dictOfArray).map(([title, array]) =>
            `<dt>${title}</dt>` + array.map(val => `<dd>${val}</dd>`).join('')
        ).join('')}</dl>`;
    }
}