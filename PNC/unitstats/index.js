import {zip, cmp, setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";
import {AlgoField, AlgoFilter} from "./algorithms.js";
import {STAT_KEYS, UNITFILTER, UNITSTATUPDATE} from "./typing.js";
import {image} from '../../univasset/scripts/html/index.js';
import {SPIRIT_STAT} from "./fairies.js";

const UNIT_PROMISE = Async.getJSON("../units.json")
    .then((/** @type {UnitObject[]} */x) => x.filter(y => !y.tags.includes("Unreleased")))
    .then(x => x.map(y => new Units(y)));

//#region Constant Declarations
const BUTTON = {
    /** @type {HTMLInputElement} */ ARMA: document.querySelector(`#bonus [value="Arma"]`),
    /** @type {HTMLInputElement} */ BOND: document.querySelector(`#bonus [value="Bond"]`),
    /** @type {HTMLInputElement} */ SPEC: document.querySelector(`#bonus [value="Spec"]`),
    /** @type {HTMLInputElement} */ POTB: document.querySelector(`#bonus [value="PotB"]`),
    /** @type {HTMLInputElement} */ ALGO: document.querySelector(`#bonus [value="Algo"]`),
    /** @type {HTMLInputElement} */ OATH: document.querySelector(`#bonus [value="Oath"]`),
    /** @type {HTMLInputElement} */ SPRT: document.querySelector(`#bonus [value="Sprt"]`),
}

const CLASSES = {
    /** @type {HTMLInputElement} */ Guard:      document.querySelector('#classes [value="Guard"]'),
    /** @type {HTMLInputElement} */ Sniper:     document.querySelector('#classes [value="Sniper"]'),
    /** @type {HTMLInputElement} */ Warrior:    document.querySelector('#classes [value="Warrior"]'),
    /** @type {HTMLInputElement} */ Specialist: document.querySelector('#classes [value="Specialist"]'),
    /** @type {HTMLInputElement} */ Medic:      document.querySelector('#classes [value="Medic"]')
}
for (const INPUT of Object.values(CLASSES)) INPUT.addEventListener("change", event => document.dispatchEvent(UNITFILTER));
//#endregion

//#region Class Declarations
class Units {
    name;
    class;

    #base;
    #arma;

    #hp;
    get [STAT_KEYS.HEALTH]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#hp;
        if (BUTTON.POTB.checked) output += this.#hp * 0.61;
        if (BUTTON.ARMA.checked && this.#hasarma) output += this.#arma.hp;
        if (BUTTON.BOND.checked && this.#intistats.includes("Code Robustness")) output += 1320;
        if (BUTTON.SPEC.checked && ["Guard", "Warrior", "Specialist"].includes(this.class)) output += this.#hp * 0.21 + 1200;
        if (BUTTON.ALGO.checked) {
            const [FLAT, PERC] = this.#algofield.hp;
            output += (this.#base.hp * PERC / 100) + FLAT;
        }
        if (BUTTON.OATH.checked) output += this.#hp * 0.08;
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.hp[0];
        // FLAT_PERC.reduce((p, c) => [p[0] + c[0], p[1] + c[1]], [0, 0])
        return Math.trunc(output);
    }

    #atk;
    get [STAT_KEYS.ATTACK]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#atk;
        if (BUTTON.POTB.checked) output += this.#atk * 0.61;
        if (BUTTON.ARMA.checked && this.#hasarma) output += this.#arma.atk;
        if (BUTTON.BOND.checked && this.#intistats.includes("Power Connection")) output += 55;
        if (BUTTON.SPEC.checked && ["Sniper", "Warrior", "Specialist"].includes(this.class)) output += this.#atk * 0.22 + 38;
        if (BUTTON.ALGO.checked) {
            const [FLAT, PERC] = this.#algofield.atk;
            output += (this.#base.atk * PERC / 100) + FLAT;
        }
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.atk[0];
        return Math.trunc(output);
    }

    #hash;
    get [STAT_KEYS.HASHRATE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#hash;
        if (BUTTON.POTB.checked) output += this.#hash * 0.61;
        if (BUTTON.ARMA.checked && this.#hasarma) output += this.#arma.hash;
        if (BUTTON.BOND.checked && this.#intistats.includes("Neural Activation")) output += 55;
        if (BUTTON.SPEC.checked && ["Sniper", "Warrior", "Specialist", "Medic"].includes(this.class)) output += this.#hash * 0.22 + 38;
        if (BUTTON.ALGO.checked) {
            const [FLAT, PERC] = this.#algofield.hash;
            output += (this.#base.hash * PERC / 100) + FLAT;
        }
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.hash[0];
        return Math.trunc(output);
    }

    #pdef;
    get [STAT_KEYS.PDEFENSE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#pdef;
        if (BUTTON.POTB.checked) output += this.#pdef * 0.61;
        if (BUTTON.ARMA.checked && this.#hasarma) output += this.#arma.pdef;
        if (BUTTON.BOND.checked && this.#intistats.includes("Shield of Friendship")) output += 55;
        if (BUTTON.SPEC.checked && ["Guard", "Medic"].includes(this.class)) output += this.#pdef * 0.21 + 31;
        if (BUTTON.ALGO.checked) {
            const [FLAT, PERC] = this.#algofield.pdef;
            output += (this.#base.pdef * PERC / 100) + FLAT;
        }
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.pdef[0];
        return Math.trunc(output);
    }

    #odef;
    get [STAT_KEYS.ODEFENSE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#odef;
        if (BUTTON.POTB.checked) output += this.#odef * 0.61;
        if (BUTTON.ARMA.checked && this.#hasarma) output += this.#arma.odef;
        if (BUTTON.SPEC.checked && ["Guard", "Medic"].includes(this.class)) output += this.#odef * 0.21 + 31;
        if (BUTTON.ALGO.checked) {
            const [FLAT, PERC] = this.#algofield.odef;
            output += (this.#base.odef * PERC / 100) + FLAT;
        }
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.odef[0];
        return Math.trunc(output);
    }

    #aspd;
    get [STAT_KEYS.ATKSPD]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#aspd;
        if (BUTTON.ALGO.checked) output += this.#algofield.aspd[0];
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.aspd[0];
        return output;
    }

    #crate;
    get [STAT_KEYS.CRITRATE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#crate;
        if (BUTTON.BOND.checked && this.#intistats.includes("Coordinated Strike")) output += 8;
        if (BUTTON.SPEC.checked && ["Sniper", "Warrior"].includes(this.class)) output += 9;
        if (BUTTON.ALGO.checked) output += this.#algofield.crate[1];
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.crate[1];
        return Math.round(output, 1);
    }

    #cdmg = 50;
    get [STAT_KEYS.CRITDMG]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#cdmg;
        if (BUTTON.BOND.checked && this.#intistats.includes("Victorious Inspiration")) output += 12;
        if (BUTTON.SPEC.checked && ["Sniper"].includes(this.class)) output += 18;
        if (BUTTON.ALGO.checked) output += this.#algofield.cdmg[1];
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.cdmg[1];
        return Math.round(output, 1);
    }

    #ppen;
    get [STAT_KEYS.PPENETRATE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#ppen;
        if (BUTTON.POTB.checked) output += this.#ppen * 0.61;
        if (BUTTON.ARMA.checked && this.#hasarma) output += this.#arma.ppen;
        if (BUTTON.SPEC.checked && ["Sniper"].includes(this.class)) output += this.#ppen * 0.07 + 65;
        if (BUTTON.ALGO.checked) {
            const [FLAT, PERC] = this.#algofield.ppen;
            output += (this.#base.ppen * PERC / 100) + FLAT;
        }
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.ppen[0];
        return Math.trunc(output);
    }

    #open;
    get [STAT_KEYS.OPENETRATE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#open;
        if (BUTTON.POTB.checked) output += this.#open * 0.61;
        if (BUTTON.ARMA.checked && this.#hasarma) output += this.#arma.open;
        if (BUTTON.ALGO.checked) {
            const [FLAT, PERC] = this.#algofield.open;
            output += (this.#base.open * PERC / 100) + FLAT;
        }
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.open[0];
        return Math.trunc(output);
    }

    #dodge;
    get [STAT_KEYS.DODGE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#dodge;
        if (BUTTON.BOND.checked && this.#intistats.includes("Risk Evasion Aid")) output += 8;
        if (BUTTON.ALGO.checked) output += this.#algofield.dodge[1];
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.dodge[1];
        return output;
    }

    #regen;
    get [STAT_KEYS.POSTHEAL]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#regen;
        if (BUTTON.POTB.checked) output += {"Guard": 3584, "Sniper": 1084, "Warrior": 3301, "Specialist": 1485, "Medic": 1075}[this.class];
        if (BUTTON.ALGO.checked) output += this.#algofield.regen[0];
        return output;
    }

    #haste = 0;
    get [STAT_KEYS.HASTE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#haste;
        if (BUTTON.BOND.checked && this.#intistats.includes("Mechanical Celerity")) output += 8;
        if (BUTTON.SPEC.checked) output += {"Guard": 20, "Specialist": 25, "Medic": 15}[this.class] ?? 0;
        if (BUTTON.ALGO.checked) output += this.#algofield.haste[1];
        if (BUTTON.SPRT.checked) output += SPIRIT_STAT.haste[1];
        return Math.round(output, 1);
    }

    #res = 0;
    get [STAT_KEYS.DEBUFFRES]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#res;
        if (BUTTON.SPEC.checked && ["Guard", "Warrior"].includes(this.class)) output += 150;
        if (BUTTON.ALGO.checked) output += this.#algofield.res[0];
        return output;
    }

    #lash = 0;
    get [STAT_KEYS.BACKLASH]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#lash;
        if (BUTTON.ALGO.checked) output += this.#algofield.lash[1];
        return output;
    }

    #dboost = 0;
    get [STAT_KEYS.DMGBOOST]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#dboost;
        if (BUTTON.BOND.checked && this.#intistats.includes("Coordinated Formation")) output += 5;
        if (BUTTON.ALGO.checked) output += this.#algofield.dboost[1];
        return output;
    }

    #dreduc = 0;
    get [STAT_KEYS.DMGREDUCE]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#dreduc;
        if (BUTTON.BOND.checked && this.#intistats.includes("Through Fire and Water")) output += 5;
        if (BUTTON.ALGO.checked) output += this.#algofield.dreduc[1];
        return output;
    }

    #hboost = 0;
    get [STAT_KEYS.HEALBOOST]() {
        /** @type {[number, number][]} */ const FLAT_PERC = [];
        var output = this.#hboost;
        if (BUTTON.BOND.checked && this.#intistats.includes("Healing Bond")) output += 5;
        if (BUTTON.SPEC.checked && ["Medic"].includes(this.class)) output += 9;
        if (BUTTON.ALGO.checked) output += this.#algofield.hboost[1];
        return Math.round(output, 1);
    }

    #hasarma;
    #intistats;
    #algofield;
    #algofilter;

    row;
    
    /** @param {UnitObject} unitobject */
    constructor(unitobject) {
        const MISSING = [];
        const VISIBILITY_CHANGED = {
            algo: false
        }

        this.#algofield = new AlgoField(unitobject);
        this.#algofilter = new AlgoFilter((set, main, sub1, sub2) => {
            const IS_REMOVE = set === "Remove";
            const HAS_BLANK_SUB = !(sub1 && sub2);
            
            const VISIBLE = (IS_REMOVE && !main && !sub1 && !sub2) || this.#algofield.info.some(([a, b, c, d]) => {
                // if (set === "Remove" && !d) {
                //     s1b1 = !(sub1 && sub2) && (!sub1 || c === sub1)
                //     s2b1 = !(sub1 && sub2) && (!sub2 || c === sub2)
                // } else {
                //     s1b2 = !sub1 || c === sub1 || d === sub1
                //                                  "" === sub1
                //            !sub1 || c === sub1 || false
                //     s1b1 = !sub1 || c === sub1
                // 
                //     s2b2 = !sub2 || c === sub2 || d === sub2
                //            !""
                //            true  || c === sub2 || d === sub2
                //     s2b1 = true
                // }
                
                return [
                    IS_REMOVE || a === set,
                    !main || b === main,
                    (IS_REMOVE && !d) ? (HAS_BLANK_SUB && emptyOrC(sub1, c)) : (emptyOrC(sub1, c) || d === sub1),
                    (IS_REMOVE && !d) ? (HAS_BLANK_SUB && emptyOrC(sub2, c)) : (emptyOrC(sub2, c) || d === sub2)
                ].every(x => x);
            });

            VISIBILITY_CHANGED.algo = this.row.classList.contains("hidden-algo") !== this.row.classList.toggle("hidden-algo", !VISIBLE);
        });

        this.name = unitobject.name;
        this.class = unitobject.class;
        const CLASS_INPUT = CLASSES[this.class];
        CLASS_INPUT.addEventListener("change", event => this.row.classList.toggle("hidden-class", !CLASS_INPUT.checked), true);

        this.#base = unitobject.base;

        this.#hp = this.#base.hp;
        this.#atk = this.#base.atk;
        this.#hash = this.#base.hash;
        this.#pdef = this.#base.pdef;
        this.#odef = this.#base.odef;
        this.#aspd = this.#base.aspd;
        this.#crate = this.#base.crate;
        this.#ppen = this.#base.ppen;
        this.#open = this.#base.open;
        this.#dodge = this.#base.dodge;
        this.#regen = this.#base.regen;

        this.#arma = unitobject.arma;
        this.#hasarma = unitobject.tags.includes("Arma");

        this.#intistats = unitobject.intimacy;
        if (this.#intistats.length !== 3) MISSING.push("Intimacy");

        const TD_NAME = document.createElement("td");
        TD_NAME.addEventListener("click", event => {
            this.#algofield.show();
            this.#algofilter.show(VISIBILITY_CHANGED);
        });
        if (this.#hasarma) {
            // change alt to arma name?
            const IMAGE = image(`../assets/images/arma/${this.name.replace(/[\s.]/g, "")}.png`, `${this.name} arma.`);
            const SPAN = setattr(document.createElement("span"), {append: [this.name, IMAGE], classList: {add: ["arma"]}});
            TD_NAME.appendChild(SPAN);
            if (Object.values(this.#arma).some(x => x === -1)) MISSING.push("Arma")
        } else {
            TD_NAME.textContent = this.name;
        }

        const TD_HP = document.createElement("td");
        const TD_ATK = document.createElement("td");
        const TD_HASH = document.createElement("td");
        const TD_PDEF = document.createElement("td");
        const TD_ODEF = document.createElement("td");
        const TD_ASPD = document.createElement("td");
        const TD_CRATE = document.createElement("td");
        const TD_CDMG = document.createElement("td");
        const TD_PPEN = document.createElement("td");
        const TD_OPEN = document.createElement("td");
        const TD_DODGE = document.createElement("td");
        const TD_REGEN = document.createElement("td");
        const TD_HASTE = document.createElement("td");
        const TD_DEBUFF = document.createElement("td");
        const TD_LASH = document.createElement("td");
        const TD_DBOOST = document.createElement("td");
        const TD_DREDUC = document.createElement("td");
        const TD_HBOOST = document.createElement("td");

        const _updateStat = () => {
            TD_HP.textContent = this[STAT_KEYS.HEALTH];
            TD_ATK.textContent = this[STAT_KEYS.ATTACK];
            TD_HASH.textContent = this[STAT_KEYS.HASHRATE];
            TD_PDEF.textContent = this[STAT_KEYS.PDEFENSE];
            TD_ODEF.textContent = this[STAT_KEYS.ODEFENSE];
            TD_ASPD.textContent = this[STAT_KEYS.ATKSPD];
            TD_CRATE.textContent = `${this[STAT_KEYS.CRITRATE]}%`;
            TD_CDMG.textContent = `${this[STAT_KEYS.CRITDMG]}%`;
            TD_PPEN.textContent = this[STAT_KEYS.PPENETRATE];
            TD_OPEN.textContent = this[STAT_KEYS.OPENETRATE];
            TD_DODGE.textContent = `${this[STAT_KEYS.DODGE]}%`;
            TD_REGEN.textContent = this[STAT_KEYS.POSTHEAL];
            TD_HASTE.textContent = `${this[STAT_KEYS.HASTE]}%`;
            TD_DEBUFF.textContent = this[STAT_KEYS.DEBUFFRES];
            TD_LASH.textContent = `${this[STAT_KEYS.BACKLASH]}%`;
            TD_DBOOST.textContent = `${this[STAT_KEYS.DMGBOOST]}%`;
            TD_DREDUC.textContent = `${this[STAT_KEYS.DMGREDUCE]}%`;
            TD_HBOOST.textContent = `${this[STAT_KEYS.HEALBOOST]}%`;
        }
        for (const BUTT of Object.values(BUTTON)) BUTT.addEventListener("change", _updateStat);
        document.addEventListener(UNITSTATUPDATE.type, _updateStat);
        this.#algofield.setStatUpdate(_updateStat);
        _updateStat();

        this.row = document.createElement("tr");
        this.row.append(
            TD_NAME,
            TD_HP,
            TD_ATK,
            TD_HASH,
            TD_PDEF,
            TD_ODEF,
            TD_ASPD,
            TD_CRATE,
            TD_CDMG,
            TD_PPEN,
            TD_OPEN,
            TD_DODGE,
            TD_REGEN,
            TD_HASTE,
            TD_DEBUFF,
            TD_LASH,
            TD_DBOOST,
            TD_DREDUC,
            TD_HBOOST
        )

        if (MISSING.length) document.addEventListener("c_alert", event => alert(`${this.name} has incomplete data: ${MISSING.join(" ")}`), {once: true});
        
        //#privatefield cannot be called dynamically, use exec/eval instead
    }
}
//#endregion

//#region Function Declarations
/** @param {string} sub @param {string} c */
function emptyOrC(sub, c) {return !sub || c === sub}

/** @this {HTMLTableCellElement} @param {MouseEvent} event */
function sortMethod(event) {
    const DATA = this.dataset;
    switch (DATA.sort) {
        case "no":
        case "lo":
            DATA.sort = "hi";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: DATA.type === "number"}));
            break;
        case "hi":
            DATA.sort = "lo";
            UNIT_LIST.sort(cmp({key: x => x[DATA.key], reverse: DATA.type === "string"}));
            break;
    }
    document.dispatchEvent(UNITFILTER); // Not for filtering, but to keep the filter
}
//#endregion

const HEADER_TR = document.querySelector("thead > tr");
const HEADER_VALUES = ["Doll Name", "Max HP", "Attack", "Hashrate", "Physical Def", "Operand Def", "Attack Speed", "Crit Rate", "Crit Damage", "Physical Pen", "Operand Pen", "Dodge Rate", "Post-battle Regen", "Skill Haste", "Debuff Resist", "Backlash", "Damage Boost", "Injury Mitigation", "Healing Effect"];
for (const [NAME, KEY, TYPE] of zip(HEADER_VALUES, ["name", ...Object.values(STAT_KEYS)], (function*() {yield "string"; while (true) yield "number"})())) {
    const TH = setattr(document.createElement("th"), {textContent: NAME, addEventListener: ["click", sortMethod]});
    setattr(TH.dataset, {sort: "no", key: KEY, type: TYPE});
    HEADER_TR.appendChild(TH);
}

document.addEventListener(UNITFILTER.type, function(event) {
    TBODY.replaceChildren(...UNIT_LIST.filter(x => !x.row.className.includes("hidden-")).map(x => x.row));
});
const TBODY = document.querySelector("tbody"), UNIT_LIST = await UNIT_PROMISE;
TBODY.append(...UNIT_LIST.map(x => x.row));

document.dispatchEvent(new CustomEvent("c_alert"));