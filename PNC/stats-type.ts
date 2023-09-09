type IntimacyStats = "Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond";

export interface UnitObject {
    name: string;
    class: "Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic";
    reference: { [linkname: string]: [linkurl: string]; };
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
    potential: {
        hp: number;
        atk: number;
        hash: number;
        pdef: number;
        odef: number;
        ppen: number;
        open: number;
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