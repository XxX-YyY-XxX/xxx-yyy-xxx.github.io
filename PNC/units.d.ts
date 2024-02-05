type IntimacyStat = "Code Robustness" | "Power Connection" | "Neural Activation" | "Shield of Friendship" | "Coordinated Strike" | "Victorious Inspiration" | "Risk Evasion Aid" | "Mechanical Celerity" | "Coordinated Formation" | "Through Fire and Water" | "Healing Bond";
type UnitTags = "Unreleased" | "Arma";

interface UnitObject {
    id: number;
    name: string;
    class: "Guard" | "Sniper" | "Warrior" | "Specialist" | "Medic";
    reference: { [linkname: string]: string; };
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
    arma: {
        hp: number;
        atk: number;
        hash: number;
        pdef: number;
        odef: number;
        ppen: number;
        open: number;
    };
    intimacy: [IntimacyStat, IntimacyStat, IntimacyStat];
    tags: UnitTags[];
}