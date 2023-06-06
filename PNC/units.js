import {tableSort, initializeHTML, brJoin, radioGroup, nestElements} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async, compare, setAttr} from "../univasset/scripts/externaljavascript.js";
import {zip, count} from "../univasset/scripts/basefunctions/index.js"

const STAT = document.querySelector("#stats"), DATA = document.querySelector("#data");
radioGroup(document.querySelector("#button"), "tables",
    [initializeHTML("h2", {textContent: "Stats"}), "stat", function(x) {STAT.style.display = x.checked ? "block" : "none"}],
    [initializeHTML("h2", {textContent: "Others"}), "data", function(x) {DATA.style.display = x.checked ? "block" : "none"}]
);

/** @type {{}[]} */ const UNITS = (await Async.getJSON('./units.json')).slice(0, -1);

/** @param {HTMLTableCellElement} x @param {string | number} y */
const str = (x, y) => {x.textContent = y};
/** @param {HTMLTableCellElement} x @param {number} y */
const per = (x, y) => {x.textContent = `${y}%`};

/* const STAT_ARRAY = UNITS.map(x => [x.name, x.hp, x.atk, x.hash, x.pdef, x.odef, x.aspd, x.crate, x.ppen, x.open, x.dodge, x.regen]);
STAT_ARRAY.unshift(["Doll Name", "Max HP", "Attack", "Hashrate", "Phys Def", "Op Def", "Atk Spd", "Crit Rate", "Phys Pen", "Op Pen", "Dodge", "Regen"]);
tableSort(document.querySelector("#stats > div"),
    STAT_ARRAY,
    [str, str, str, str, str, str, str, per, str, str, per, str],
    {frzcol: true, frzhdr: true}
); */

function sort() {
    class Units {
        //#region Variables
        /** @type {string} */ name;

        #hp; #armahp;
        /** @returns {number} */
        get hp() {return this.#arma ? this.#armahp : this.#hp}

        #atk; #armaatk;
        /** @returns {number} */
        get atk() {return this.#arma ? this.#armaatk : this.#atk}

        #hash; #armahash;
        /** @returns {number} */
        get hash() {return this.#arma ? this.#armahash : this.#hash}

        #pdef; #armapdef;
        /** @returns {number} */
        get pdef() {return this.#arma ? this.#armapdef : this.#pdef}

        #odef; #armaodef;
        /** @returns {number} */
        get odef() {return this.#arma ? this.#armaodef : this.#odef}

        /** @type {number} */ aspd;
        /** @type {number} */ crate;

        #ppen; #armappen;
        /** @returns {number} */
        get ppen() {return this.#arma ? this.#armappen : this.#ppen}

        #open; #armaopen;
        /** @returns {number} */
        get open() {return this.#arma ? this.#armaopen : this.#open}

        /** @type {number} */ dodge;
        /** @type {number} */ regen;
    
        /** @type {string} */ #icon;
    
        row;
        #arma;
        #hasarma;

        #input;
        #updateStat;
        //#endregion
    
        constructor(stat_object) {
            //#region Assignment
            this.name = stat_object.name;
            this.#hp = stat_object.hp;
            this.#atk = stat_object.atk;
            this.#hash = stat_object.hash;
            this.#pdef = stat_object.pdef;
            this.#odef = stat_object.odef;
            this.aspd = stat_object.aspd;
            this.crate = stat_object.crate;
            this.#ppen = stat_object.ppen;
            this.#open = stat_object.open;
            this.dodge = stat_object.dodge;
            this.regen = stat_object.regen;
    
            this.#icon = stat_object.arma.icon;
            this.#armahp = stat_object.arma.hp + this.#hp;
            this.#armaatk = stat_object.arma.atk + this.#atk;
            this.#armahash = stat_object.arma.hash + this.#hash;
            this.#armapdef = stat_object.arma.pdef + this.#pdef;
            this.#armaodef = stat_object.arma.odef + this.#odef;
            this.#armappen = stat_object.arma.ppen + this.#ppen;
            this.#armaopen = stat_object.arma.open + this.#open;
            //#endregion
    
            this.#arma = false;
            this.#hasarma = !["", "pending"].includes(this.#icon);

            //#region HTML Elements
            this.row = document.createElement("tr");

            const TD_NAME = document.createElement("td");
            if (this.#hasarma) {
                const LABEL = document.createElement("label");
                const INPUT = document.createElement("input");
                const IMAGE = document.createElement("img");
                
                const UNIT = this;
                this.#input = INPUT;
                INPUT.type = "checkbox";
                INPUT.addEventListener("click", function() {
                    UNIT.#arma = this.checked;
                    UNIT.#updateStat();
                });

                IMAGE.src = this.#icon;
                IMAGE.alt = `${this.name} arma.`;
                IMAGE.classList.add("arma");

                LABEL.append(INPUT, this.name, IMAGE);
                TD_NAME.appendChild(LABEL);
            } else {
                TD_NAME.textContent = this.name;
            }

            const TD_HP = initializeHTML("td", {textContent: this.hp});
            const TD_ATK = initializeHTML("td", {textContent: this.atk});
            const TD_HASH = initializeHTML("td", {textContent: this.hash});
            const TD_PDEF = initializeHTML("td", {textContent: this.pdef});
            const TD_ODEF = initializeHTML("td", {textContent: this.odef});
            const TD_PPEN = initializeHTML("td", {textContent: this.ppen});
            const TD_OPEN = initializeHTML("td", {textContent: this.open});

            this.#updateStat = () => {
                TD_HP.textContent = this.hp;
                TD_ATK.textContent = this.atk;
                TD_HASH.textContent = this.hash;
                TD_PDEF.textContent = this.pdef;
                TD_ODEF.textContent = this.odef;
                TD_PPEN.textContent = this.ppen;
                TD_OPEN.textContent = this.open;
            }

            this.row.append(
                TD_NAME,
                TD_HP,
                TD_ATK,
                TD_HASH,
                TD_PDEF,
                TD_ODEF,
                initializeHTML("td", {textContent: this.aspd}),
                initializeHTML("td", {textContent: `${this.crate}%`}),
                TD_PPEN,
                TD_OPEN,
                initializeHTML("td", {textContent: `${this.dodge}%`}),
                initializeHTML("td", {textContent: this.regen})
            )
            //#endregion
        }
        
        /** @param {boolean | null} force */
        switch(force = null) {
            if (!this.#hasarma) return;
            if (force === null)
                this.#arma = !this.#arma;
            else {
                this.#input.checked = force;
                this.#arma = force;
            }
            this.#updateStat();
        }
    }    

    const UNIT_LIST = UNITS.map(x => new Units(x));

    const [THEAD, HEADER_TR] = nestElements("thead", "tr");

    const TBODY = document.createElement("tbody");
    TBODY.append(...UNIT_LIST.map(unit => unit.row))
    
    const TABLE = document.createElement("table");
    TABLE.classList.add("freeze_col", "freeze_row");
    TABLE.append(THEAD, TBODY);

    /** @param {MouseEvent} event */
    function sortMethod(event) {
        /** @type {DOMStringMap} */ const DATA = this.dataset;

        switch (DATA.sort) {
            case "no":
            case "lo":
                DATA.sort = "hi";

                switch (DATA.type) {
                    case "string":
                        UNIT_LIST.sort(compare({key: x => x[DATA.key]}));
                        break;
                    case "number":
                        UNIT_LIST.sort(compare({key: x => x[DATA.key], reverse: true}));
                        break;
                }
                break;
            case "hi":
                DATA.sort = "lo";

                switch (DATA.type) {
                    case "string":
                        UNIT_LIST.sort(compare({key: x => x[DATA.key], reverse: true}));
                        break;
                    case "number":
                        UNIT_LIST.sort(compare({key: x => x[DATA.key]}));
                        break;
                }
                break;
        }

        TBODY.replaceChildren(...UNIT_LIST.map(x => x.row));
    }

    const HEADER_NAMES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Phys Def", "Op Def", "Atk Spd", "Crit Rate", "Phys Pen", "Op Pen", "Dodge", "Regen"];
    const HEADER_KEYS = ["name", "hp", "atk", "hash", "pdef", "odef", "aspd", "crate", "ppen", "open", "dodge", "regen"];
    function* returnType() {yield "string"; while (true) yield "number"};
    for (const [NAME, KEY, TYPE] of zip(HEADER_NAMES, HEADER_KEYS, returnType())) {
        const TH = document.createElement("th");
        TH.textContent = NAME;
        TH.addEventListener("click", sortMethod, true);
        setAttr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
        HEADER_TR.appendChild(TH);
    }

    STAT.classList.add("func_table");
    STAT.appendChild(TABLE);
}

sort()

const DATA_ARRAY = UNITS.map(x => [x.name, x.class, x.reference, x.fragments]);
DATA_ARRAY.unshift(["Doll Name", "Class", "Reference", "Fragments"]);
tableSort(
    document.querySelector("#data > div"),
    DATA_ARRAY,
    [
        str,
        str,
        (x, y) => {x.appendChild(brJoin(Object.entries(y).map(([name, link]) => initializeHTML("a", {textContent: name, href: link}))))},
        (x, y) => {x.appendChild(brJoin(y))}
    ],
    {frzcol: true, frzhdr: true}
);