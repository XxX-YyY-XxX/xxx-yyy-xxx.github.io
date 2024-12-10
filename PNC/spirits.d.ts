interface SpiritSkill {
    name: string;
    type: "Active" | "Passive";
    value: [string, number][];
    description: string;
}

interface SpecificSkill extends SpiritSkill {
    /** Only one Active per spirit. */
    type: "Active" | "Passive";
    value: [];
}

interface Spirit {
    name: string;
    attributes: [[string, number], [string, number], [string, number], [string, number], [string, number]];
    skills: [SpecificSkill, SpecificSkill, SpecificSkill, SpecificSkill]
}

//{
//        "attributes": [
//            {
//                "stat": "",
//                "value": 0
//            }
//        ],
//    }
//]

///**
// * @typedef {object} SpecificSkill
// * @property {"Passive" | "Auto"} SpecificSkill.type
// * @property {[string, number][]} SpecificSkill.value
// * @property {string} SpecificSkill.description
// */

///**
// * @typedef {object} GenericSkill
// * @property {"Passive"} GenericSkill.type
// * @property {[STAT_KEYS_TYPE[keyof STAT_KEYS_TYPE], number][]} GenericSkill.value
// * @property {string} GenericSkill.description
// */
