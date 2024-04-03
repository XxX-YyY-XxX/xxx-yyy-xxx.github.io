import {cmp, enumerate, setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async, getTemplateCloner} from "../../univasset/scripts/externaljavascript.js";

/** @type {Promise<string[]>} */ const BANNERS_PROMISE = Async.getJSON("./banners.json");
/** @type {Promise<SkinData[]>} */ const SKINS_PROMISE = Async.getJSON("./skins.json");
/** @type {Promise<UnitObject[]>} */ const UNITS_PROMISE = Async.getJSON("../units.json");

const MARKER_SAVE = new (class {})()



























class Unit {
    /** @type {Skin[]} */ #SKINS;

    /** @param {string} name */
    constructor(name) {
        this.name = name;
        this.#SKINS = [];

        this.row = document.createElement("tr");
    }

    /** @param {Skin} skin */
    addSkin(skin) {
        const INDEX = BANNERS.indexOf(skin.banner);
        this.#SKINS[INDEX] = skin.html;
    }
}

const SKIN_WINDOW = document.querySelector("dialog");
const SKIN_IMAGE = SKIN_WINDOW.querySelector("img");
/** @type {HTMLDivElement} */ const SKIN_NAME = SKIN_WINDOW.querySelector("#name")
/** @type {HTMLDivElement} */ const SKIN_COST = SKIN_WINDOW.querySelector("#name")
const SKIN_TAGS = SKIN_WINDOW.querySelector("ul")
const SKIN_NOTE = SKIN_WINDOW.querySelector("ol")

SKIN_WINDOW.addEventListener("close", function(event) {
    SKIN_IMAGE.src = "";
    SKIN_IMAGE.alt = "";
    SKIN_NAME.textContent = "";
    SKIN_COST.textContent = "";
    SKIN_TAGS.replaceChildren();
    SKIN_NOTE.replaceChildren();
})

class Skin {
    static {

    }

    /** @param {SkinData} skin_object */
    constructor(skin_object) {
        this.name = skin_object.name;
        this.unit = skin_object.unit;
        this.banner = skin_object.banner;
        this.cost = skin_object.cost;
        this.tags = skin_object.tags;

        // background change depending on acquisition status
        this.html = document.createElement("td");
        this.html.textContent = skin_object.name;
        this.html.addEventListener("click", function(event) {
            SKIN_IMAGE.src = skin_object.name.replace(" ", "") + ".png";
            SKIN_IMAGE.alt = skin_object.name;
            SKIN_NAME.textContent = skin_object.name;
            SKIN_COST.textContent = skin_object.cost;
            for (const TAG of skin_object.tags) {
                const LI = document.createElement("li")
                LI.textContent = TAG
                SKIN_TAGS.appendChild(LI)
            }
            for (const NOTE of skin_object.notes) {
                const LI = document.createElement("li")
                LI.textContent = NOTE
                SKIN_NOTE.appendChild(LI)                
            }
            SKIN_WINDOW.showModal()
        })
    }
}







const BANNERS = await BANNERS_PROMISE;

/** @template T */
class Matrix {
    /** @type {T[][]} */ #MATRIX;
    #HEADER;
    #LEADER;

    /** @param {string[]} headers @param {string[]} leaders */
    constructor(headers, leaders) {
        this.#MATRIX = [];
        this.#HEADER = headers;
        this.#LEADER = leaders;
    }

    /** @param {number} x @param {number} y @returns {T | undefined} */
    get(x, y) {
        const ROW = this.#MATRIX[y];
        if (ROW === undefined) return undefined;
        return ROW[x];
    }

    /** @param {number} x @param {number} y @param {T} value */
    set(x, y, value) {
        (this.#MATRIX[y] ??= [])[x] = value;
    }

    /** @param {string} row_value @param {string} column_value @returns {[x: number, y: number] | [null, null]} */
    cell(row_value, column_value) {
        
        return [this.#HEADER.indexOf(column_value), this.#LEADER.indexOf(row_value)];
    }

    index(value) {
        for (const [Y, ROW] of enumerate(this.#MATRIX)) {
            const X = ROW.indexOf(value);
            if (X !== -1) return [X, Y];
        }
        return [-1, -1];
    }


    [Symbol.iterator]() {
        
    }
};









const HEADER_TR = document.querySelector("thead > tr");
for (const [INDEX, COLUMN_NAME] of [[-1, "Agent"], [-1, "Status"], ...enumerate(BANNERS)]) {
    const TH = document.createElement("th");
    TH.textContent = COLUMN_NAME;
    if (INDEX !== -1) {
        TH.dataset.index = INDEX;
        TH.addEventListener("click", function(event) {
        
        })
    }
    HEADER_TR.appendChild(TH)
}

const _emptyCell = {get html() {return document.createElement("td")}};
const SKIN_TEMPLATE = getTemplateCloner("#skin-cell");
const MATRIX = new Matrix(BANNERS, (await UNITS_PROMISE).filter(x => !x.tags.includes("Unreleased")).sort(cmp({key: x => x.id})).map(x => x.name));
for (const SKIN of await SKINS_PROMISE) {
    const [X, Y] = MATRIX.cell(SKIN.name, SKIN.banner);
    new Skin(SKIN)
}










const TBODY = document.querySelector("tbody");
TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));

const HEADER_VALUES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Physical Def", "Operand Def", "Attack Speed", "Crit Rate", "Crit Damage", "Physical Pen", "Operand Pen", "Dodge Rate", "Post-battle Regen", "Skill Haste", "Debuff Resist", "Backlash", "Damage Boost", "Injury Mitigation", "Healing Effect"];
for (const [NAME, KEY, TYPE] of zip(HEADER_VALUES, ["name", ...Object.values(STAT_KEYS)], (function*() {yield "string"; while (true) yield "number"})())) {
    const TH = setattr(document.createElement("th"), {textContent: NAME, addEventListener: ["click", sortMethod, true]});
    setattr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

