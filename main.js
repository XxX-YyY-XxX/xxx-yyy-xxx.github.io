const WEBSITESTORAGEKEY = "oKugGgc4ITbQAJsWPZSD";

/** @param {string} key @returns {object | undefined} */
export function retrieve(key) {
    return JSON.parse(localStorage.getItem(WEBSITESTORAGEKEY) ?? "{}")[key];
}

/** @param {string} key @param {any} data */
export function store(key, data) {
    const OBJECTS = JSON.parse(localStorage.getItem(WEBSITESTORAGEKEY) ?? "{}");
    OBJECTS[key] = data;
    localStorage.setItem(WEBSITESTORAGEKEY, JSON.stringify(OBJECTS));
}
