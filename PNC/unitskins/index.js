import {cmp, iter, setattr, zip} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";

/** @type {Promise<string[]>} */ const BANNERS_PROMISE = Async.getJSON("./banners.json");
/** @type {Promise<SkinData[]>} */ const SKINS_PROMISE = Async.getJSON("./skins.json");
/** @type {Promise<UnitObject[]>} */ const UNITS_PROMISE = Async.getJSON("../units.json");

const MARKER_SAVE = new (class {})();

const MATRIX = new (class {
    /** @type {((Skin | undefined)[] | undefined)[]} */ #ARRAYS = [];

    /** @param {number} x @param {number} y @param {Skin} value */
    set(x, y, value) {
        (this.#ARRAYS[y] ??= [])[x] = value;
    }

    *[Symbol.iterator]() {
        for (const ARRAY of this.#ARRAYS)
            yield iter(ARRAY ?? []);
    }
})();













class Header {
    /** @param {string} name */
    constructor(name) {
        this.name = name;

        this.html = document.createElement("th");
        this.html.textContent = name;
        // this.html.addEventListener("click", this);
    }

    // /** @param {Event} event */
    // handleEvent(event) {

    // }
}

class Leader {
    /** @param {string} name */
    constructor(name) {
        this.name = name;

        this.html = document.createElement("td");
        this.html.textContent = name;
        // this.html.addEventListener("click", this);
    }

    // /** @param {Event} event */
    // handleEvent(event) {

    // }
}


class Skin {
    /** @type {HTMLDialogElement} */ static #WINDOW = document.querySelector("#skin-dialog");
    static #IMAGE = this.#WINDOW.querySelector("img");
    /** @type {HTMLDivElement} */ static #NAME = this.#WINDOW.querySelector("#name")
    /** @type {HTMLDivElement} */ static #COST = this.#WINDOW.querySelector("#cost")
    /** @type {HTMLUListElement} */ static #TAGS = this.#WINDOW.querySelector("#tags")
    /** @type {HTMLUListElement} */ static #NOTE = this.#WINDOW.querySelector("#note")
    static #SELECT = this.#WINDOW.querySelector("select");

    static {
        this.#WINDOW.addEventListener("close", event => {
            setattr(this.#IMAGE, {src: "", alt: ""})
            this.#NAME.textContent = "";
            this.#COST.textContent = "";
            this.#TAGS.replaceChildren();
            this.#NOTE.replaceChildren();
            this.#SELECT.selectedIndex = 0;
        });
    }

    /** @param {SkinData} skinobj */
    constructor(skinobj) {
        this.name = skinobj.name;
        this.unit = skinobj.unit;
        this.banner = skinobj.banner;
        this.cost = skinobj.cost;
        this.tags = skinobj.tags;

        // background change depending on acquisition status
        this.html = document.createElement("td");
        this.html.textContent = skinobj.name;
        // this.html.addEventListener("click", function(event) {
        //     SKIN_IMAGE.src = skin_object.name.replace(" ", "") + ".png";
        //     SKIN_IMAGE.alt = skin_object.name;
        //     SKIN_NAME.textContent = skin_object.name;
        //     SKIN_COST.textContent = skin_object.cost;
        //     SKIN_TAGS.append(...skin_object.tags.map(x => setattr(document.createElement("li"), {textContent: x})));
        //     SKIN_NOTE.append(...skin_object.notes.map(x => setattr(document.createElement("li"), {textContent: x})));
        //     SKIN_WINDOW.showModal()
        // })
    }

    // /** @param {Event} event */
    // handleEvent(event) {
    //     switch (event.type) {
    //         case "click":
                
    //             break;
        
    //         default:
    //             break;
    //     }
    // }
}















const HEADERS = (await BANNERS_PROMISE).map(x => new Header(x));
const LEADERS = (await UNITS_PROMISE).filter(x => x.id).sort(cmp({key: x => x.id})).map(x => new Leader(x.name));

document.querySelector("thead > tr").append(...HEADERS.map(x => x.html));

for (const SKIN of (await SKINS_PROMISE).map(x => new Skin(x))) {
    MATRIX.set(
        HEADERS.map(x => x.name).indexOf(SKIN.banner),
        LEADERS.map(x => x.name).indexOf(SKIN.unit),
        SKIN
    )
}

const TBODY = document.querySelector("tbody");
for (const [LEAD, ARR = []] of zip(LEADERS, MATRIX, true)) {
    const TR = document.createElement("tr");
    TR.appendChild(LEAD.html);
    for (const [, SKIN] of zip(HEADERS, ARR, true))
        TR.appendChild(SKIN?.html ?? document.createElement("td"))
    TBODY.appendChild(TR);
}