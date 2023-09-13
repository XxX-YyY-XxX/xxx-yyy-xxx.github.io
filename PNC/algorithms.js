import {UnitObject, STATS} from "./stats-type.ts";

//#region Base
/** @typedef {keyof MAINSTATS | keyof SUBSTATS} StatAttributes*/
/** @typedef {[StatAttributes, number]} StatInfo */

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
    /** @type {StatInfo?}*/ SET2;

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

    /** @param {UnitObject} unitstats @return {{[attributes: keyof STATS]: number | undefined}} */
    output(unitstats) {
        const stats = {};
        for (const [attr, value] of [this.SET2, this.mainstat(), ...this.#substat.map(x => [x, SUBSTATS[x]])].filter())
            stats[attr] = (stats[attr] ?? 0) + value;
        const out = {};
        
        for (const [unitattr, unitvalue] of Object.entries(unitstats.base)) {
            if ([STATS.HEALTH, STATS.ATTACK, STATS.HASHRATE, STATS.PDEFENSE, STATS.ODEFENSE, STATS.PPENETRATE, STATS.OPENETRATE].includes(unitattr))
                out[unitattr] = unitvalue * (stats[unitattr+"perc"] ?? 0) + (stats[unitattr+"flat"] ?? 0);
            else
                out[unitattr] = stats[unitattr+"perc"] ?? stats[unitattr+"flat"] ?? 0;
        }
        return out;
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

export class Offense1Slot extends Algorithm {
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

export class FeedForward extends Offense {
    SET2 = ["atkperc", 15];
}

export class Progression extends Offense {
    SET2 = ["hashperc", 15];
}

export class Stack extends Offense {
    SET2 = ["hashperc", 15];
}

export class Deduction extends Offense {
    SET2 = ["aspdflat", 30];
}

export class DataRepair extends Offense {
    SET2 = ["resflat", 30];
}

export class MLRMatrix extends Offense {
    SET2 = ["dboostperc", 5];
}

export class LimitValue extends Offense {
    SET2 = ["dboostperc", 5];
}

export class LowerLimit extends Offense {
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

export class Stability1Slot extends Algorithm {
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

export class Perception extends Stability {
    SET2 = ["hpperc", 15];
}

export class Rationality extends Stability {
    SET2 = ["pdefperc", 15];
}

export class Connection extends Stability {
    SET2 = ["resflat", 50];
}

export class Iteration extends Stability {
    SET2 = ["lashperc", 5];
}

export class Reflection extends Stability {
    SET2 = ["lashperc", 5];
}

export class Encapsulate extends Stability {
    SET2 = ["dreducperc", 5];
}

export class Reflection extends Stability {
    SET2 = ["dreducperc", 5];
}

export class Overflow extends Stability {
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

export class Stability1Slot extends Algorithm {
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

export class Paradigm extends Special {
    SET2 = ["aspdflat", 30];
}

export class Cluster extends Special {
    SET2 = ["crateperc", 10];
}

export class Convolution extends Special {
    SET2 = ["cdmgperc", 20];
}

export class Stratagem extends Special {
    SET2 = ["dodgeperc", 8];
}

export class DeltaV extends Special {
    SET2 = ["hasteperc", 10];
}

export class Exploit extends Special {
    SET2 = ["hasteperc", 10];
}

export class LoopGain extends Special {
    SET2 = ["hboostperc", 7.5];
}

export class SVM extends Special {
    SET2 = ["hboostperc", 7.5];
}

export class Inspiration extends Special {
    SET2 = null;
}
//#endregion