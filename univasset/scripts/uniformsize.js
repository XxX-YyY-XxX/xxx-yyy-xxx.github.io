for (const TYPE of ["load", "resize", "deviceorientation"]) {
    // call from container    
    window.addEventListener(TYPE, () => {});
}

/**
 * @param {Iterable<HTMLElement>} elements 
 */
function uniformSize(elements, {width = "min"} = {}) {
    for (const ELEMENT of elements) {
        // ELEMENT.w
    }
    // all element have the same height, following the tallest
}