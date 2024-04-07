export class RadioSwitch {
    static #EVENT = new Event("change");
    #CURRENT;

    constructor(current_checked) {
        this.#CURRENT = current_checked;
    }

    apply(input, func = () => {}, options) {
        input.addEventListener("change", event => {
            if (event.isTrusted) {  // To check if user input or programmatic
                if (this.#CURRENT === input) return;
                this.#CURRENT.dispatchEvent(RadioSwitch.#EVENT);
                this.#CURRENT = input;
            }
    
            func.call(input, event);
        }, options)
    }
}

// /** @type {AddEventListenerOptions} */