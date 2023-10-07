import {tableSort, brJoin, nestElements} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async} from "../univasset/scripts/externaljavascript.js";
import {zip, cmp, setattr} from "../univasset/scripts/basefunctions/index.js";
import {AlgoField} from "./algorithms.js";
import {STATS} from "./typing.js";

const UNITS_PROMISE: Promise<UnitObject[]> = Async.getJSON("./units.json");

//#region Type Definitions
type IntimacyStats = "Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond";

interface UnitObject {
    name: string;
    class: "Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic";
    reference: { [linkname: string]: string; };
    fragments: string[];
    base: {
        hp: number;
        atk: number;
        hash: number;
        pdef: number;
        odef: number;
        aspd: number;
        crate: number;
        ppen: number;
        open: number;
        dodge: number;
        regen: number;
    };
    arma: {
        hp: number;
        atk: number;
        hash: number;
        pdef: number;
        odef: number;
        ppen: number;
        open: number;
    };
    intimacy: [IntimacyStats, IntimacyStats, IntimacyStats];
}
//#endregion

//#region Constant Declarations
const ARMA_BUTTON: HTMLInputElement = document.querySelector(`#bonus [value="Arma"]`)!;
const BOND_BUTTON: HTMLInputElement = document.querySelector(`#bonus [value="Bond"]`)!;
const SPEC_BUTTON: HTMLInputElement = document.querySelector(`#bonus [value="Spec"]`)!;
const POTB_BUTTON: HTMLInputElement = document.querySelector(`#bonus [value="PotB"]`)!;

const ALGO_MODAL: HTMLDialogElement = document.querySelector("#algo-modal")!;
const ALGO_DIV: HTMLDivElement = ALGO_MODAL.firstElementChild as HTMLDivElement;
document.querySelector("#algo-modal button")!.addEventListener("click", function() {
    ALGO_MODAL.close()
});
//#endregion

//#region Class Declarations
class Units {
    name: string | null;
    class: string;

    #hp; #armahp;
    get [STATS.HEALTH]() {
        var output = this.#hp;
        if (POTB_BUTTON.checked) output += this.#hp * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahp;
        if (BOND_BUTTON.checked && this.#intistats.includes("Code Robustness")) output += 1320;
        if (SPEC_BUTTON.checked) output += {"Specialist": this.#hp * 0.21 + 1200}[this.class] ?? 0;
        return Math.floor(output);
    }

    #atk; #armaatk;
    get [STATS.ATTACK]() {
        var output = this.#atk;
        if (POTB_BUTTON.checked) output += this.#atk * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaatk;
        if (BOND_BUTTON.checked && this.#intistats.includes("Power Connection")) output += 55;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#atk * 0.22 + 38, "Specialist": this.#atk * 0.22 + 38}[this.class] ?? 0;
        return Math.floor(output);
    }

    #hash; #armahash;
    get [STATS.HASHRATE]() {
        var output = this.#hash;
        if (POTB_BUTTON.checked) output += this.#hash * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armahash;
        if (BOND_BUTTON.checked && this.#intistats.includes("Neural Activation")) output += 55;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#hash * 0.22 + 38, "Specialist": this.#hash * 0.22 + 38}[this.class] ?? 0;
        return Math.floor(output);
    }

    #pdef; #armapdef;
    get [STATS.PDEFENSE]() {
        var output = this.#pdef;
        if (POTB_BUTTON.checked) output += this.#pdef * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armapdef;
        if (BOND_BUTTON.checked && this.#intistats.includes("Shield of Friendship")) output += 55;
        return Math.floor(output);
    }

    #odef; #armaodef;
    get [STATS.ODEFENSE]() {
        var output = this.#odef;
        if (POTB_BUTTON.checked) output += this.#odef * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaodef;
        return Math.floor(output);
    }

    #aspd;
    get [STATS.ATKSPD]() {
        return this.#aspd;
    }

    #crate;
    get [STATS.CRITRATE]() {
        var output = this.#crate;
        if (BOND_BUTTON.checked && this.#intistats.includes("Coordinated Strike")) output += 8;
        if (SPEC_BUTTON.checked) output += {"Sniper": 9}[this.class] ?? 0;
        return output;
    }

    #cdmg = 50;
    get [STATS.CRITDMG]() {
        var output = this.#cdmg;
        if (BOND_BUTTON.checked && this.#intistats.includes("Victorious Inspiration")) output += 12;
        if (SPEC_BUTTON.checked) output += {"Sniper": 18}[this.class] ?? 0;
        return output;
    }

    #ppen; #armappen;
    get [STATS.PPENETRATE]() {
        var output = this.#ppen;
        if (POTB_BUTTON.checked) output += this.#ppen * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armappen;
        if (SPEC_BUTTON.checked) output += {"Sniper": this.#ppen * 0.07 + 65}[this.class] ?? 0;
        return Math.floor(output);
    }

    #open; #armaopen;
    get [STATS.OPENETRATE]() {
        var output = this.#open;
        if (POTB_BUTTON.checked) output += this.#open * 0.61;
        if (ARMA_BUTTON.checked && this.#hasarma) output += this.#armaopen;
        return Math.floor(output);
    }

    #dodge;
    get [STATS.DODGE]() {
        var output = this.#dodge;
        if (BOND_BUTTON.checked && this.#intistats.includes("Risk Evasion Aid")) output += 8;
        return output;
    }

    #regen;
    get [STATS.POSTHEAL]() {
        var output = this.#regen;
        if (POTB_BUTTON.checked) output += {"Guard": 3584, "Sniper": 1084, "Warrior": 3301, "Specialist": 1485, "Medic": 1075}[this.class];
        return output;
    }

    #haste = 0;
    get [STATS.HASTE]() {
        var output = this.#haste;
        if (BOND_BUTTON.checked && this.#intistats.includes("Mechanical Celerity")) output += 8;
        if (SPEC_BUTTON.checked) output += {"Specialist": 25}[this.class] ?? 0;
        return output;
    }

    #res = 0;
    get [STATS.DEBUFFRES]() {
        return this.#res;
    }

    #lash = 0;
    get [STATS.BACKLASH]() {
        return this.#lash;
    }

    #dboost = 0;
    get [STATS.DMGBOOST]() {
        var output = this.#dboost;
        if (BOND_BUTTON.checked && this.#intistats.includes("Coordinated Formation")) output += 5;
        return output;
    }

    #dreduc = 0;
    get [STATS.DMGREDUCE]() {
        var output = this.#dreduc;
        if (BOND_BUTTON.checked && this.#intistats.includes("Through Fire and Water")) output += 5;
        return output;
    }

    #hboost = 0;
    get [STATS.HEALBOOST]() {
        var output = this.#hboost;
        if (BOND_BUTTON.checked && this.#intistats.includes("Healing Bond")) output += 5;
        return output;
    }

    #hasarma: boolean;
    #intistats;
    #algofield;

    row: HTMLTableRowElement;
    updateStat: () => void;

    constructor(stat_object: UnitObject) {
        this.name = stat_object.name;
        this.class = stat_object.class;

        const BASE = stat_object.base;
        this.#hp = BASE.hp;
        this.#atk = BASE.atk;
        this.#hash = BASE.hash;
        this.#pdef = BASE.pdef;
        this.#odef = BASE.odef;
        this.#aspd = BASE.aspd;
        this.#crate = BASE.crate;
        this.#ppen = BASE.ppen;
        this.#open = BASE.open;
        this.#dodge = BASE.dodge;
        this.#regen = BASE.regen;

        const ARMA = stat_object.arma;
        this.#armahp = ARMA.hp;
        this.#armaatk = ARMA.atk;
        this.#armahash = ARMA.hash;
        this.#armapdef = ARMA.pdef;
        this.#armaodef = ARMA.odef;
        this.#armappen = ARMA.ppen;
        this.#armaopen = ARMA.open;

        const INTI = stat_object.intimacy;
        this.#intistats = INTI;
        if (INTI.length != 3) console.warn(this.name, "lacks data: Intimacy");

        //this.#algofield = new AlgoField(stat_object);

        // change name color if filled
        // show all on widescreen, tabs on narrow screen
        const TD_NAME = document.createElement("td");
        TD_NAME.addEventListener("click", () => {
            ALGO_MODAL.showModal()
            ALGO_DIV.firstElementChild!.textContent = this.name;
        })

        const IMAGE = document.createElement("img");
        IMAGE.addEventListener("load", () => {
            setattr(IMAGE, {loading: "lazy", alt: `${this.name} arma.`});
            const SPAN = setattr(document.createElement("span"), {append: [this.name, IMAGE], classList: {add: ["arma"]}});
            TD_NAME.appendChild(SPAN);
            this.#hasarma = true;
        });
        IMAGE.addEventListener("error", () => {
            TD_NAME.textContent = this.name;
            this.#hasarma = false;
        });
        IMAGE.src = `./assets/images/arma/${this.name.replace(" ", "")}.png`;

        const TD_HP = document.createElement("td");
        const TD_ATK = document.createElement("td");
        const TD_HASH = document.createElement("td");
        const TD_PDEF = document.createElement("td");
        const TD_ODEF = document.createElement("td");
        const TD_CRATE = document.createElement("td");
        const TD_CDMG = document.createElement("td");
        const TD_PPEN = document.createElement("td");
        const TD_OPEN = document.createElement("td");
        const TD_DODGE = document.createElement("td");
        const TD_REGEN = document.createElement("td");
        const TD_HASTE = document.createElement("td");
        const TD_DBOOST = document.createElement("td");
        const TD_DREDUC = document.createElement("td");
        const TD_HBOOST = document.createElement("td");

        this.updateStat = () => {
            TD_HP.textContent = String(this[STATS.HEALTH]);
            TD_ATK.textContent = String(this[STATS.ATTACK]);
            TD_HASH.textContent = String(this[STATS.HASHRATE]);
            TD_PDEF.textContent = String(this[STATS.PDEFENSE]);
            TD_ODEF.textContent = String(this[STATS.ODEFENSE]);
            TD_CRATE.textContent = `${this[STATS.CRITRATE]}%`;
            TD_CDMG.textContent = `${this[STATS.CRITDMG]}%`;
            TD_PPEN.textContent = String(this[STATS.PPENETRATE]);
            TD_OPEN.textContent = String(this[STATS.OPENETRATE]);
            TD_DODGE.textContent = `${this[STATS.DODGE]}%`;
            TD_REGEN.textContent = this[STATS.POSTHEAL];
            TD_HASTE.textContent = `${this[STATS.HASTE]}%`;
            TD_DBOOST.textContent = `${this[STATS.DMGBOOST]}%`;
            TD_DREDUC.textContent = `${this[STATS.DMGREDUCE]}%`;
            TD_HBOOST.textContent = `${this[STATS.HEALBOOST]}%`;
        }
        this.updateStat()

        this.row = document.createElement("tr");
        this.row.append(
            TD_NAME,
            TD_HP,
            TD_ATK,
            TD_HASH,
            TD_PDEF,
            TD_ODEF,
            setattr(document.createElement("td"), {textContent: this[STATS.ATKSPD]}),
            TD_CRATE,
            TD_CDMG,
            TD_PPEN,
            TD_OPEN,
            TD_DODGE,
            TD_REGEN,
            TD_HASTE,
            setattr(document.createElement("td"), {textContent: this[STATS.DEBUFFRES]}),
            setattr(document.createElement("td"), {textContent: `${this[STATS.BACKLASH]}%`}),
            TD_DBOOST,
            TD_DREDUC,
            TD_HBOOST
        )

        //#privatefield cannot be called dynamically, use exec/eval instead
    }
}
//#endregion

//#region Function Declarations
const CLASS_BUTTONS: HTMLInputElement[] = Array.from(document.querySelectorAll("#classes input"));
function updateTable() {
    const SHOWN_CLASS = CLASS_BUTTONS.filter(x => x.checked).map(x => x.value);
    TBODY.replaceChildren(...UNIT_LIST.filter(x => SHOWN_CLASS.includes(x.class)).map(x => x.row));
}
for (const INPUT of CLASS_BUTTONS) INPUT.addEventListener("change", updateTable);

function sortMethod(this: HTMLTableCellElement, event: MouseEvent) {
    const DATA = this.dataset;
    switch (DATA.sort) {
        case "no":
        case "lo":
            DATA.sort = "hi";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key!], reverse: (DATA.type === "number")}));
            break;
        case "hi":
            DATA.sort = "lo";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key!], reverse: (DATA.type === "string")}));
            break;
    }
    updateTable();
}
//#endregion

const UNITS = (await UNITS_PROMISE).slice(0, -1);

//#region Statistics Table
const UNIT_LIST = UNITS.map(x => new Units(x));
for (const UNIT of UNIT_LIST) {
    ARMA_BUTTON.addEventListener("change", () => UNIT.updateStat());
    POTB_BUTTON.addEventListener("change", () => UNIT.updateStat());
}

const [THEAD, HEADER_TR] = nestElements("thead", "tr");

const TBODY = document.createElement("tbody");
updateTable()

const TABLE = document.createElement("table");
TABLE.classList.add("freeze-col", "freeze-row");
TABLE.append(THEAD, TBODY);

const HEADER_VALUES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Physical Def", "Operand Def", "Attack Speed", "Crit Rate", "Crit Damage", "Physical Pen", "Operand Pen", "Dodge Rate", "Post-battle Regen", "Skill Haste", "Debuff Resist", "Backlash", "Damage Boost", "Injury Mitigation", "Healing Effect"];
const STATVAR = ["name", ...Object.values(STATS)];
for (const [NAME, KEY, TYPE] of zip(HEADER_VALUES, STATVAR, (function*() {yield "string"; while (true) yield "number"})())) {
    const TH = document.createElement("th");
    setattr(TH, {textContent: NAME, addEventListener: ["click", sortMethod, true]});
    setattr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

const STAT_TABLE: HTMLDivElement = document.querySelector("#stat > .table")!;
STAT_TABLE.classList.add("func_table");
STAT_TABLE.appendChild(TABLE);
//#endregion

//#region Others
tableSort(
    document.querySelector("#data > .table")!,
    [["Doll Name", "Reference", "Fragments"], ...UNITS.map(x => [x.name, x.reference, x.fragments])],
    [
        x => x,
        x => brJoin(Object.entries(x).map(([name, link]) => setattr(document.createElement("a"), {textContent: name, href: link}))),
        x => brJoin(x)
    ],
    {frzcol: true, frzhdr: true}
);
//#endregion

