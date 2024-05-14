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

// const TOUCHSCREEN = "ontouchstart" in window;
// for (const GROUP of document.querySelectorAll(".tab-button")) {
//     if (TOUCHSCREEN) {
//         GROUP.classList.add("prevent-focus");
//     } else {
//         GROUP.addEventListener("mousedown", function(event) {
//             this.classList.add("prevent-focus");
//         });
    
//         GROUP.addEventListener("mouseup", function(event) {
//             this.classList.remove("prevent-focus");
//         });
//     }
// }