export function brJoin(elements) {
    const fragment = new DocumentFragment();
    fragment.append(...elements.flatMap(item => [item, document.createElement("br")]).slice(0, -1));    
    return fragment;
}

export function clickedOutside(element, event) {
    const DIM = element.getBoundingClientRect();
    return event.clientX < DIM.left || event.clientX > DIM.right || event.clientY < DIM.top || event.clientY > DIM.bottom;
}
