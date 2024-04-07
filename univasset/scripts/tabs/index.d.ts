/** Uses "change" event. */
export class RadioSwitch {
    constructor(current_checked: HTMLInputElement);
    apply(input: HTMLInputElement, func?: (this: HTMLInputElement, event: Event) => void, options?: AddEventListenerOptions): void;
}
