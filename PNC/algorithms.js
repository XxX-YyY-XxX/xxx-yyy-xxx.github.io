import {UnitObject, STATS} from "./stats-type.js";

//#region Base
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
    /** @type {[string, "add" | "mul", number] | null}*/ EFFECT2;

    constructor() {
        this.#substat = new Array(2);
    }

    /** @param {string?} attribute @returns {number} */
    _mainstat(attribute = null) {
        if (attribute)
            this.#mainstat = [attribute, MAINSTATS[attribute]];
        return this.#mainstat;
    }

    /** @param {number} position @param {string?} attribute @returns {number} */
    _substat(position, attribute = null) {
        if (attribute)
            this.#substat[position] = [attribute, SUBSTATS[attribute]];
        return this.#substat[position];
    }

    output(unitstats) {
        const out = {};
        
    }
}
//#endregion

//#region Offense
/** @typedef {"atkflat"|"atkperc"|"hashflat"|"hashperc"|"ppenflat"|"ppenperc"|"openflat"|"openperc"} OffenseMainstat */
/** @typedef {"hpflat"|"atkflat"|"atkperc"|"hashflat"|"hashperc"|"pdefflat"|"odefflat"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dboostperc"} OffenseSubstat*/

class Offense extends Algorithm {
    /** @param {OffenseMainstat?} attribute @returns {number} */
    mainstat(attribute = null) {
        return super._mainstat(attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat1(attribute = null) {
        return super._substat(0, attribute);
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat2(attribute = null) {
        return super._substat(1, attribute);
    }
}

export class Offense1Slot extends Algorithm {
    EFFECT2 = null;

    /** @param {OffenseMainstat?} attribute @returns {number} */
    mainstat(attribute = null) {
        return super._mainstat(attribute) / 2;
    }

    /** @param {OffenseSubstat?} attribute @returns {number} */
    substat(attribute = null) {
        return super._substat(0, attribute);
    }
}

export class FeedForward extends Offense {
    EFFECT2 = ["atk", "mul", 15];
}

export class Progression extends Offense {
    EFFECT2 = ["hash", "mul", 15];
}

export class Stack extends Offense {
    EFFECT2 = ["hash", "mul", 15];
}

export class Deduction extends Offense {
    EFFECT2 = ["aspd", "add", 30];
}

export class DataRepair extends Offense {
    EFFECT2 = ["res", "add", 30];
}

export class MLRMatrix extends Offense {
    EFFECT2 = ["dboost", "add", 5];
}

export class LimitValue extends Offense {
    EFFECT2 = ["dboost", "add", 5];
}

export class LowerLimit extends Offense {
    EFFECT2 = null;
}
//#endregion

//#region Stability
/** @typedef {"hpflat"|"hpperc"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"regenflat"} StabilityMainstat */
/** @typedef {"hpflat"|"hpperc"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"regenflat"|"resflat"|"dreducperc"} StabilitySubstat */

class Stability extends Algorithm {
    /** @param {StabilityMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super._mainstat(attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat1(attribute) {
        return super._substat(0, attribute);
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat2(attribute) {
        return super._substat(1, attribute);
    }
}

export class Stability1Slot extends Algorithm {
    EFFECT2 = null;

    /** @param {StabilityMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super._mainstat(attribute) / 2;
    }

    /** @param {StabilitySubstat?} attribute @returns {number} */
    substat(attribute) {
        return super._substat(0, attribute);
    }
}

export class Perception extends Stability {
    EFFECT2 = ["hp", "mul", 15];
}

export class Rationality extends Stability {
    EFFECT2 = ["pdef", "mul", 15];
}

export class Connection extends Stability {
    EFFECT2 = ["res", "add", 50];
}

export class Iteration extends Stability {
    EFFECT2 = ["lash", "add", 5];
}

export class Reflection extends Stability {
    EFFECT2 = ["lash", "add", 5];
}

export class Encapsulate extends Stability {
    EFFECT2 = ["dreduc", "add", 5];
}

export class Reflection extends Stability {
    EFFECT2 = ["dreduc", "add", 5];
}

export class Overflow extends Stability {
    EFFECT2 = null;
}
//#endregion

//#region Special
/** @typedef {"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"hasteperc"|"hboostperc"} SpecialMainstat */
/** @typedef {"hpflat"|"atkflat"|"hashflat"|"pdefflat"|"pdefperc"|"odefflat"|"odefperc"|"crateperc"|"cdmgperc"|"ppenflat"|"openflat"|"dodgeperc"|"regenflat"|"hasteperc"|"resflat"|"hboostperc"} SpecialSubstat*/

class Special extends Algorithm {
    /** @param {SpecialMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super._mainstat(attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat1(attribute) {
        return super._substat(0, attribute);
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat2(attribute) {
        return super._substat(1, attribute);
    }
}

export class Stability1Slot extends Algorithm {
    EFFECT2 = null;

    /** @param {SpecialMainstat?} attribute @returns {number} */
    mainstat(attribute) {
        return super._mainstat(attribute) / 2;
    }

    /** @param {SpecialSubstat?} attribute @returns {number} */
    substat(attribute) {
        return super._substat(0, attribute);
    }
}

export class Paradigm extends Special {
    EFFECT2 = ["aspd", "add", 30];
}

export class Cluster extends Special {
    EFFECT2 = ["crate", "add", 10];
}

export class Convolution extends Special {
    EFFECT2 = ["cdmg", "add", 20];
}

export class Stratagem extends Special {
    EFFECT2 = ["dodge", "add", 8];
}

export class DeltaV extends Special {
    EFFECT2 = ["haste", "add", 10];
}

export class Exploit extends Special {
    EFFECT2 = ["haste", "add", 10];
}

export class LoopGain extends Special {
    EFFECT2 = ["hboost", "add", 7.5];
}

export class SVM extends Special {
    EFFECT2 = ["hboost", "add", 7.5];
}

export class Inspiration extends Special {
    EFFECT2 = null;
}
//#endregion