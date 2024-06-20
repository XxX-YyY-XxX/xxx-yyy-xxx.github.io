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

/** STAT_KEYS but appended with flat/perc. */
export const STAT_KEYS_TYPE = Object.freeze({
    HEALTH_F: "hpflat",         HEALTH_P: "hpperc",
    ATTACK_F: "atkflat",        ATTACK_P: "atkperc",
    HASHRATE_F: "hashflat",     HASHRATE_P: "hashperc",
    PDEFENSE_F: "pdefflat",     PDEFENSE_P: "pdefperc",
    ODEFENSE_F: "odefflat",     ODEFENSE_P: "odefperc",
    ATKSPD_F: "aspdflat",
    CRITRATE_P: "crateperc",
    CRITDMG_P: "cdmgperc",
    PPENETRATE_F: "ppenflat",   PPENETRATE_P: "ppenperc",
    OPENETRATE_F: "openflat",   OPENETRATE_P: "openperc",
    DODGE_P: "dodgeperc",
    POSTHEAL_F: "regenflat",
    HASTE_P: "hasteperc",
    DEBUFFRES_F: "resflat",
    BACKLASH_P: "lashperc",
    DMGBOOST_P: "dboostperc",
    DMGREDUCE_P: "dreducperc",
    HEALBOOST_P: "hboostperc"
});

export const STAT_KEYS_TYPENAME = Object.freeze({
    hpflat: "Health+",      hpperc: "Health%",
    atkflat: "Attack+",     atkperc: "Attack%",
    hashflat: "Hashrate+",  hashperc: "Hashrate%",
    pdefflat: "PhysDef+",   pdefperc: "PhysDef%",
    odefflat: "OpDef+",     odefperc: "OpDef%",

    crateperc: "CritRate",
    cdmgperc: "CritDmg",
    ppenflat: "PhysPen+",   ppenperc: "PhysPen%",
    openflat: "OpPen+",     openperc: "OpPen%",

    dodgeperc: "Dodge",
    regenflat: "PostRegen",
    hasteperc: "SkillHaste",
    resflat: "DebuffRes",
    dboostperc: "DmgBoost",
    dreducperc: "InjuryMtg",
    hboostperc: "HealEffect",

    aspdflat: "AtkSpd",
    lashperc: "Backlash"
})


export const UNITFILTER = new CustomEvent("c_filter");
/** Calls all `_updateStat`. */
export const UNITSTATUPDATE = new CustomEvent("c_update");