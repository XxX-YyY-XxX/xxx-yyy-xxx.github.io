type StatKeysType = "hpflat" | "atkflat" | "hashflat" | "aspdflat" | "dodgeperc" | "cdmgperc" | "hasteperc" | "crateperc" | "ppenflat" | "openflat" | "pdefflat" | "odefflat";

//export const STAT_KEYS_TYPE = Object.freeze({
//    PDEFENSE_F: "pdefflat",     PDEFENSE_P: "pdefperc",
//    ODEFENSE_F: "odefflat",     ODEFENSE_P: "odefperc",
//    POSTHEAL_F: "regenflat",
//    DEBUFFRES_F: "resflat",
//    BACKLASH_P: "lashperc",
//    DMGBOOST_P: "dboostperc",
//    DMGREDUCE_P: "dreducperc",
//    HEALBOOST_P: "hboostperc"
//});


interface SpiritSkill {
    name: string;
    description: string;
}

interface GenericSkill extends SpiritSkill {
    value: [string, number][];
}

interface SpecificSkill extends SpiritSkill {}

interface Spirit {
    name: string;
    /** {[statnames: StatKeysType]: number} */
    attributes: object;
    skills: [Passive1: SpecificSkill, Passive2: SpecificSkill, Passive3: SpecificSkill, Active: SpecificSkill];
}