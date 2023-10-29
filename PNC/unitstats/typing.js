/** @typedef {"Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond"} IntimacyStats */

/**
 * @typedef UnitObject
 * @property {string} UnitObject.name
 * @property {"Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic"} UnitObject.class
 * @property {{[linkname: string]: string}} UnitObject.reference
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

 * @property {object} UnitObject.arma
 * @property {number} UnitObject.arma.hp
 * @property {number} UnitObject.arma.atk
 * @property {number} UnitObject.arma.hash
 * @property {number} UnitObject.arma.pdef
 * @property {number} UnitObject.arma.odef
 * @property {number} UnitObject.arma.ppen
 * @property {number} UnitObject.arma.open

 * @property {[IntimacyStats, IntimacyStats, IntimacyStats]} UnitObject.intimacy
*/

export const STATS = Object.freeze({
    HEALTH:     "hp",
    ATTACK:     "atk",
    HASHRATE:   "hash",
    PDEFENSE:   "pdef",
    ODEFENSE:   "odef",
    ATKSPD:     "aspd",
    CRITRATE:   "crate",
    CRITDMG:    "cdmg",
    PPENETRATE: "ppen",
    OPENETRATE: "open",
    DODGE:      "dodge",
    POSTHEAL:   "regen",
    HASTE:      "haste",
    DEBUFFRES:  "res",
    BACKLASH:   "lash",
    DMGBOOST:   "dboost",
    DMGREDUCE:  "dreduc",
    HEALBOOST:  "hboost",
});