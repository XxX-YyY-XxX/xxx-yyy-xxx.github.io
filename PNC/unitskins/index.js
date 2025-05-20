import {cmp, enumerate, iter, setattr, zip} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";

//#region Promises
/** @type {Promise<string[]>} */ const BANNERS_PROMISE = Async.getJSON("./banners.json");
/** @type {Promise<SkinData[]>} */ const SKINS_PROMISE = Async.getJSON("./skins.json");
/** @type {Promise<UnitObject[]>} */ const UNITS_PROMISE = Async.getJSON("../units.json");
//#endregion

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
    constructor(name, index) {
        this.name = name;

        this.html = document.createElement("th");
        this.html.textContent = name;
        //this.html.dataset.index = index;
        // this.html.addEventListener("click", this);
    }

    // /** @param {Event} event */
    // handleEvent(event) {

    // }
}

class Leader {
    /** @param {string} name */
    constructor(name, index) {
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














const BANNERS = await BANNERS_PROMISE;


const HEADERS = BANNERS.map((x, i) => new Header(x, i));
const LEADERS = (await UNITS_PROMISE).sort(cmp({key: x => x.id})).map(x => new Leader(x.name));

const SKINS_TABLE = new (class {
    table = document.querySelector(`#table table`);

    constructor() {
        
    }

    #cell_table = [];
    get(unit, set) {

    }
})();

document.querySelector("thead > tr").append(...HEADERS.map(x => x.html));

{
    const H = HEADERS.map(x => x.name), L = LEADERS.map(x => x.name);
    for (const SKIN of (await SKINS_PROMISE).map(x => new Skin(x)))
        MATRIX.set(H.indexOf(SKIN.banner), L.indexOf(SKIN.unit), SKIN)
}

const TBODY = document.querySelector("tbody");
for (const [LEAD, ARR = []] of zip(LEADERS, MATRIX, true)) {
    const TR = document.createElement("tr");
    TR.appendChild(LEAD.html);
    for (const [, SKIN] of zip(HEADERS, ARR, true))
        TR.appendChild(SKIN?.html ?? document.createElement("td"))
    TBODY.appendChild(TR);
}







/**
 * @template T
 */
class Table {
    /** @type {T[][]} */ #TABLE = [];

    constructor() {

    }

    /** @returns {[number, number]} [x, y] */
    get size() {
        if (!this.#TABLE.length)
            return [0, 0];
        return [this.#TABLE[0].length, this.#TABLE.length];
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @returns {T | undefined} */
    get(x, y) {
        const ROW = this.#TABLE[y];
        if (ROW === undefined)
            return undefined;
        return ROW[x];
    }

    /** @param {number} x @param {number} y @param {T} value */
    set(x, y, value) {
        (this.#TABLE[y] ??= [])[x] = value;
    }

    /**
     * @param {T} value 
     * @returns {[number, number] | null} [x, y], null if not present. */
    index(value) {
        for (const [Y_AXIS, ARRAY] of enumerate(this.#TABLE)) {
            const X_AXIS = ARRAY.indexOf(value);
            if (X_AXIS !== -1)
                return [X_AXIS, Y_AXIS];
        }
        return null;
    }

    /**
     * @param {T} value 
     * @returns {boolean} true if value was present, false otherwise.*/
    delete(value) {
        const POSITION = this.index(value);
        if (POSITION === [-1, -1])
            return false;
        this.set(...POSITION, undefined);
        return true;
    }

    clear() {
        this.#TABLE = [];
    }

    *[Symbol.iterator]() {
        for (const ARRAY of this.#TABLE)
            yield iter(ARRAY);
    }
}