import {STATS} from "./typing.js";

//#region Base
/** @typedef {keyof MAINSTATS | keyof SUBSTATS} StatAttributes */
/** @typedef {[StatAttributes, number]} StatInfo */
/** @typedef {STATS[keyof STATS]} StatNames */

const MAINSTATS = {
    hpflat: 1800,   hpperc: 12,
    atkflat: 54,    atkperc: 12,
    hashflat: 54,   hashperc: 12,
    pdefflat: 56,   pdefperc: 7.2,
    odefflat: 56,   odefperc: 7.2,

    crateperc: 8,
    cdmgperc: 16,
    ppenflat: 20,   ppenperc: 7.2,
    openflat: 12,   openperc: 7.2,

    regenflat: 720,
    hasteperc: 8,
    hboostperc: 4
}

const SUBSTATS = {
    hpflat: 1080,   hpperc: 7.2,
    atkflat: 32,    atkperc: 7.2,
    hashflat: 32,   hashperc: 7.2,
    pdefflat: 33,   pdefperc: 4.3,
    odefflat: 33,   odefperc: 3.3,

    crateperc: 4.8,
    cdmgperc: 9.6,
    ppenflat: 12,
    openflat: 12,

    dodgeperc: 3.9,
    regenflat: 432,
    hasteperc: 4.8,
    resflat: 30,
    dboostperc: 3.9,
    dreducperc: 3.9,
    hboostperc: 2.4
}

class Algorithm {
    /** @type {StatInfo?} */ SET2;

    /** @type {[StatAttributes, StatAttributes]} */ #substat;
    /** @type {StatAttributes} */ #mainstat;

    constructor() {
        this.#substat = new Array(2);
    }

    /** @param {StatAttributes?} attribute @returns {StatInfo} */
    mainstat(attribute = null) {
        if (attribute)
            this.#mainstat = attribute;
        return [this.#mainstat, MAINSTATS[this.#mainstat]];
    }

    /** @param {number} position @param {StatAttributes?} attribute @returns {StatInfo} */
    substat(position, attribute = null) {
        if (attribute)
            this.#substat[position] = attribute;
        return [this.#substat[position], SUBSTATS[this.#substat[position]]];
    }

    /** @returns {Map<StatAttributes, number>} */
    get stats() {
        const OUT = new Map();

        if (this.SET2 !== null) {
            const [name, value] = this.SET2;
            OUT.set(name, value);
        }

        {
            const [name, value] = this.mainstat();
            OUT.set(name, (OUT.get(name) ?? 0) + value * 2);
        }

        {
            console.log(this.#substat)
            const [first, second] = this.#substat;
            OUT.set(first, (OUT.get(first) ?? 0) + SUBSTATS[first]);
            OUT.set(second, (OUT.get(second) ?? 0) + (SUBSTATS[second] ?? 0));
        }

        return OUT;
    }
}
//#endregion

//#region Offense
/** @typedef {"atkflat"|"atkperc"|"hashflat"|"hashperc"|"ppenflat"|"ppenperc"|"openflat"|"openperc"} OffenseMainstat */
/** @typedef {"hpflat"|"atkflat"|"atkperc"|"hashflat"|"hashperc"|"pdefflat"|"odefflat"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dboostperc"} OffenseSubstat*/

class Offense extends Algorithm {
    /** @param {OffenseMainstat?} attribute @returns {number} */
    mainstat(attribute = null) {
        return super.mainstat(attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat1(attribute = null) {
        return super.substat(0, attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat2(attribute = null) {
        return super.substat(1, attribute);
    }
}

class OffenseBlock extends Algorithm {
    SET2 = null;

    /** @param {OffenseMainstat?} attribute @returns {number} */
    mainstat(attribute = null) {
        return super.mainstat(attribute) / 2;
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat(attribute = null) {
        return super.substat(0, attribute);
    }
}

class FeedForward extends Offense {
    SET2 = ["atkperc", 15];
}

class Progression extends Offense {
    SET2 = ["hashperc", 15];
}

class Stack extends Offense {
    SET2 = ["hashperc", 15];
}

class Deduction extends Offense {
    SET2 = ["aspdflat", 30];
}

class DataRepair extends Offense {
    SET2 = ["resflat", 30];
}

class MLRMatrix extends Offense {
    SET2 = ["dboostperc", 5];
}

class LimitValue extends Offense {
    SET2 = ["dboostperc", 5];
}

class LowerLimit extends Offense {
    SET2 = null;
}
//#endregion

//#region Stability
/** @typedef {"hpflat"|"hpperc"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"regenflat"} StabilityMainstat */
/** @typedef {"hpflat"|"hpperc"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dreducperc"} StabilitySubstat */

class Stability extends Algorithm {
    /** @param {StabilityMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat1(attribute) {
        return super.substat(0, attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat2(attribute) {
        return super.substat(1, attribute);
    }
}

class StabilityBlock extends Algorithm {
    SET2 = null;

    /** @param {StabilityMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute) / 2;
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat(attribute) {
        return super.substat(0, attribute);
    }
}

class Perception extends Stability {
    SET2 = ["hpperc", 15];
}

class Rationality extends Stability {
    SET2 = ["pdefperc", 15];
}

class Connection extends Stability {
    SET2 = ["resflat", 50];
}

class Iteration extends Stability {
    SET2 = ["lashperc", 5];
}

class Reflection extends Stability {
    SET2 = ["lashperc", 5];
}

class Encapsulate extends Stability {
    SET2 = ["dreducperc", 5];
}

class Resolve extends Stability {
    SET2 = ["dreducperc", 5];
}

class Overflow extends Stability {
    SET2 = null;
}
//#endregion

//#region Special
/** @typedef {"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"hasteperc"|"hboostperc"} SpecialMainstat */
/** @typedef {"hpflat"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"dodgeperc"|"regenflat"|"hasteperc"|"resflat"|"hboostperc"} SpecialSubstat*/

class Special extends Algorithm {
    /** @param {SpecialMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat1(attribute) {
        return super.substat(0, attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat2(attribute) {
        return super.substat(1, attribute);
    }
}

class SpecialBlock extends Algorithm {
    SET2 = null;

    /** @param {SpecialMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super.mainstat(attribute) / 2;
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat(attribute) {
        return super.substat(0, attribute);
    }
}

class Paradigm extends Special {
    SET2 = ["aspdflat", 30];
}

class Cluster extends Special {
    SET2 = ["crateperc", 10];
}

class Convolution extends Special {
    SET2 = ["cdmgperc", 20];
}

class Stratagem extends Special {
    SET2 = ["dodgeperc", 8];
}

class DeltaV extends Special {
    SET2 = ["hasteperc", 10];
}

class Exploit extends Special {
    SET2 = ["hasteperc", 10];
}

class LoopGain extends Special {
    SET2 = ["hboostperc", 7.5];
}

class SVM extends Special {
    SET2 = ["hboostperc", 7.5];
}

class Inspiration extends Special {
    SET2 = null;
}
//#endregion

//#region Typed Definitions
/** @typedef {"Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond"} IntimacyStats */

/**
 * @typedef UnitObject
 * @property {string} UnitObject.name
 * @property {"Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic"} UnitObject.class
 * @property {{[linkname: string]: [linkurl: string]}} UnitObject.reference
 * @property {string[]} UnitObject.fragments

 * @property {object} UnitObject.base
 * @property {number} UnitObject.base.hp
 * @property {number} UnitObject.base.atk
 * @property {number} UnitObject.base.hash
 * @property {number} UnitObject.base.pdef
 * @property {number} UnitObject.base.odef
 * @property {number} UnitObject.base.aspd
 * @property {number} UnitObject.base.crate
 * @property {number} UnitObject.base.ppen
 * @property {number} UnitObject.base.open
 * @property {number} UnitObject.base.dodge
 * @property {number} UnitObject.base.regen

 * @property {objecy} UnitObject.arma
 * @property {number} UnitObject.arma.hp
 * @property {number} UnitObject.arma.atk
 * @property {number} UnitObject.arma.hash
 * @property {number} UnitObject.arma.pdef
 * @property {number} UnitObject.arma.odef
 * @property {number} UnitObject.arma.ppen
 * @property {number} UnitObject.arma.open

 * @property {[IntimacyStats, IntimacyStats, IntimacyStats]} UnitObject.intimacy
*/
//#endregion

export class AlgoField{
    #layout;
    #statvalues;

    get [STATS.HEALTH]() {
        return 0;
    }

    get [STATS.ATTACK]() {
        return 0;
    }

    get [STATS.HASHRATE]() {
        return 0;
    }

    get [STATS.PDEFENSE]() {
        return 0;
    }

    get [STATS.ODEFENSE]() {
        return 0;
    }

    get [STATS.ATKSPD]() {
        return 0;
    }

    get [STATS.CRITRATE]() {
        return 0;
    }

    get [STATS.CRITDMG]() {
        return 0;
    }

    get [STATS.PPENETRATE]() {
        return 0;
    }

    get [STATS.OPENETRATE]() {
        return 0;
    }

    get [STATS.DODGE]() {
        return 0;
    }

    get [STATS.POSTHEAL]() {
        return 0;
    }

    get [STATS.HASTE]() {
        return 0;
    }

    get [STATS.DEBUFFRES]() {
        return 0;
    }

    get [STATS.BACKLASH]() {
        return 0;
    }

    get [STATS.DMGBOOST]() {
        return 0;
    }

    get [STATS.DMGREDUCE]() {
        return 0;
    }

    get [STATS.HEALBOOST]() {
        return 0;
    }

    /** @param {UnitObject} unit */
    constructor(unit) {
        this.#layout = {
            "Guard": "465",
            "Sniper": "645",
            "Warrior": "654",
            "Specialist": "546",
            "Medic": unit.name === "Imhotep" ? "546" : "456"
        }[unit.class];

            //return {
        //    /** @param {number} x @returns {number} */ [STATS.HEALTH]: x => x * (OUT["hpperc"] ?? 0) + (OUT["hpflat"] ?? 0),
        //    /** @param {number} x @returns {number} */ [STATS.ATTACK]: x => x * (OUT["atkperc"] ?? 0) + (OUT["atkflat"] ?? 0),
        //    /** @param {number} x @returns {number} */ [STATS.HASHRATE]: x => x * (OUT["hashperc"] ?? 0) + (OUT["hashflat"] ?? 0),
        //    /** @param {number} x @returns {number} */ [STATS.PDEFENSE]: x => x * (OUT["pdefperc"] ?? 0) + (OUT["pdefflat"] ?? 0),
        //    /** @param {number} x @returns {number} */ [STATS.ODEFENSE]: x => x * (OUT["odefperc"] ?? 0) + (OUT["odefflat"] ?? 0),
        //    /** @returns {number} */ [STATS.ATKSPD]: () => OUT["aspdflat"],
        //    /** @returns {number} */ [STATS.CRITRATE]: () => OUT["crateperc"],
        //    /** @returns {number} */ [STATS.CRITDMG]: () => OUT["cdmgperc"],
        //    /** @param {number} x @returns {number} */ [STATS.PPENETRATE]: x => x * (OUT["ppenperc"] ?? 0) + (OUT["ppenflat"] ?? 0),
        //    /** @param {number} x @returns {number} */ [STATS.OPENETRATE]: x => x * (OUT["openperc"] ?? 0) + (OUT["openflat"] ?? 0),
        //    /** @returns {number} */ [STATS.DODGE]: () => OUT["dodgeperc"],
        //    /** @returns {number} */ [STATS.POSTHEAL]: () => OUT["regenflat"],
        //    /** @returns {number} */ [STATS.HASTE]: () => OUT["hasteperc"],
        //    /** @returns {number} */ [STATS.DEBUFFRES]: () => OUT["resflat"],
        //    /** @returns {number} */ [STATS.BACKLASH]: () => OUT["lashperc"],
        //    /** @returns {number} */ [STATS.DMGBOOST]: () => OUT["dboostperc"],
        //    /** @returns {number} */ [STATS.DMGREDUCE]: () => OUT["dreducperc"],
        //    /** @returns {number} */ [STATS.HEALBOOST]: () => OUT["hboostperc"]
        //};

    }

    add() {

    }

    remove() {

    }

    clear() {
        
    }

    update() {

    }
}