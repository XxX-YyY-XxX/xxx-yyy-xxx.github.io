export const STAT_KEYS = Object.freeze({
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
export const STATS = STAT_KEYS;

export const UNITFILTER = new CustomEvent("c_filter");