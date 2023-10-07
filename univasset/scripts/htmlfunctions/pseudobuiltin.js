export function elementJoin(joiner, elements) {
    const fragment = new DocumentFragment();
    fragment.append(...elements.flatMap(item => [item, joiner]).slice(0, -1));    
    return fragment;
}
