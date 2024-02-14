import {cmp} from "../../univasset/scripts/basefunctions/index.js";
import {Async, getTemplateCloner} from "../../univasset/scripts/externaljavascript.js";

/** @type {Promise<string[]>} */ const BANNERS_PROMISE = Async.getJSON("./banners.json");
/** @type {Promise<SkinData[]>} */ const SKINS_PROMISE = Async.getJSON("./skins.json");
/** @type {Promise<UnitObject[]>} */ const UNITS_PROMISE = Async.getJSON("../units.json");
/** @type {DocumentFragment} */ const EMPTY_CELL = document.querySelector("#empty-cell").content;
const SKIN_TEMPLATE = getTemplateCloner("#skin-cell")





























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

function matrix(title, header, leader, data, key, headkey = x => x, leadkey = x => x) {
    const base_array = [[title, ...header]];

    const x_len = header.length;
    for (const item of leader) base_array.push([item, ...Array(x_len).fill('')]);

    const head_copy = header.map(headkey);
    const lead_copy = leader.map(leadkey);
    for (const item of data) {
        const [x_axis, y_axis] = key(item);
        base_array[lead_copy.indexOf(y_axis) + 1][head_copy.indexOf(x_axis) + 1] = item;
    }

    return base_array;
}








const BANNERS = await BANNERS_PROMISE;
const UNITS = (await UNITS_PROMISE).filter(x => !x.tags.includes("Unreleased")).sort(cmp({key: x => x.id})).map(x => x.name);
const MATRIX = new (class {
    #MATRIX = [].fill(
        [].fill(EMPTY_CELL, 0, BANNERS.length - 1),
        0,
        UNITS.length - 1
    );
    #HEADER = BANNERS;
    #LEADER = UNITS;

    get(x, y) {

    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {HTMLTableCellElement} value 
     */
    set(x, y, value) {
        (this.#MATRIX[y] ??= [])[x] = value;
    }

    /** @param {string} row_value @param {string} column_value @returns {[x: number, y: number]} */
    index(row_value, column_value) {
        return [this.#HEADER.indexOf(column_value), this.#LEADER.indexOf(row_value)];
    }
})();









for (const iterator of ["Agent", "Amount", "Status", ...BANNERS.map(x => x.name)]) {
    
}












const HEADER_TR = document.querySelector("thead > tr")

const TBODY = document.querySelector("tbody");
TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));

const HEADER_VALUES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Physical Def", "Operand Def", "Attack Speed", "Crit Rate", "Crit Damage", "Physical Pen", "Operand Pen", "Dodge Rate", "Post-battle Regen", "Skill Haste", "Debuff Resist", "Backlash", "Damage Boost", "Injury Mitigation", "Healing Effect"];
for (const [NAME, KEY, TYPE] of zip(HEADER_VALUES, ["name", ...Object.values(STAT_KEYS)], (function*() {yield "string"; while (true) yield "number"})())) {
    const TH = setattr(document.createElement("th"), {textContent: NAME, addEventListener: ["click", sortMethod, true]});
    setattr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

