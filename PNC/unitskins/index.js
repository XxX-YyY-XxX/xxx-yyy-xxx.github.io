import {cmp, enumerate} from "../../univasset/scripts/basefunctions/index.js";
import {Async, getTemplateCloner} from "../../univasset/scripts/externaljavascript.js";

/** @type {Promise<string[]>} */ const BANNERS_PROMISE = Async.getJSON("./banners.json");
/** @type {Promise<SkinData[]>} */ const SKINS_PROMISE = Async.getJSON("./skins.json");
/** @type {Promise<UnitObject[]>} */ const UNITS_PROMISE = Async.getJSON("../units.json");
/** @type {DocumentFragment} */ const EMPTY_CELL = document.querySelector("#empty-cell").content;





























class Unit {
    #SKINS;

    /** @param {string} name */
    constructor(name) {
        this.name = name;
        this.#SKINS = [];

        this.row = document.createElement("tr");
    }

    /** @param {SkinData} skin */
    addSkin(skin) {
        const INDEX = BANNERS.indexOf(skin.banner);
        this.#SKINS[INDEX] = null;
    }
}

// class Skin {
//     /** @param {SkinData} skin_object */
//     constructor(skin_object) {
//         this.name = skin_object.name;
//         this.unit = skin_object.unit;
//         this.banner = skin_object.banner;
//         this.cost = skin_object.cost;
//         this.tags = skin_object.tags;

//         this.html = null;
//     }
// }







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
};









const HEADER_TR = document.querySelector("thead > tr")
for (const COLUMN_NAME of ["Agent", "Status", ...BANNERS]) {
    const TH = document.createElement("th");
    // clickable
    TH.textContent = COLUMN_NAME;
    HEADER_TR.appendChild(TH)
}

const SKIN_TEMPLATE = getTemplateCloner("#skin-cell");
const MATRIX = new Matrix(BANNERS, (await UNITS_PROMISE).filter(x => !x.tags.includes("Unreleased")).sort(cmp({key: x => x.id})).map(x => x.name));
for (const SKIN of await SKINS_PROMISE) {
    const [X, Y] = MATRIX.cell(SKIN.name, SKIN.banner);
}










const TBODY = document.querySelector("tbody");
TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));

const HEADER_VALUES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Physical Def", "Operand Def", "Attack Speed", "Crit Rate", "Crit Damage", "Physical Pen", "Operand Pen", "Dodge Rate", "Post-battle Regen", "Skill Haste", "Debuff Resist", "Backlash", "Damage Boost", "Injury Mitigation", "Healing Effect"];
for (const [NAME, KEY, TYPE] of zip(HEADER_VALUES, ["name", ...Object.values(STAT_KEYS)], (function*() {yield "string"; while (true) yield "number"})())) {
    const TH = setattr(document.createElement("th"), {textContent: NAME, addEventListener: ["click", sortMethod, true]});
    setattr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

