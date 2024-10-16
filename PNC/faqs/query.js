import {Embed, List, textStyle, image, figure, details, anchor, fragment} from "../../univasset/scripts/html/index.js";
import * as SC from '../../univasset/scripts/specialchars.js';
import {getID} from "../../univasset/scripts/faqs/index.js";

//#region Constants
const IMG_ASSET = "../assets/images/faqs/"
//#endregion

const dtag = {
    STORY: {name: "StoryAndEvents", description: "Story and lore."},
        MAJOR: {name: "MajorEvents", description: "A Mica staple."},
    ASST: {name: "Assistant", description: "Unit shown in your home screen."},
    ALGO: {name: "Algorithms", description: "Equipments in this game."},
    TIER: {name: "TierList", description: "Power ratings of doll units. Approach with caution."},
    DOLL: {name: "Dolls", description: "Collectible units of this game."},
        ARMA: {name: "ArmaInscripta", description: "Strengthens dolls to keep up with the current challenges... supposedly."},
    MISC: {name: "Miscellaneous", description: "Queries with no specific tag as of yet."},
    PRIME: {name: "TopicPrimer", description: "Write-ups that should answer majority of the questions."},
    SKIN: {name: "NeuralProjections", description: "The money-bait, so to speak."},
    OATH: {name: "OathSystem", description: "Reject real life, marry PNGs."},
    GACHA: {name: "NeuralSearch", description: "Modern monetization."},
    BP: {name: "MagraseaBattlePass", description: "Gives skin, resources, frames, furnitures."},
    FRAGS: {name: "NeuralFragments", description: "Used for Neural Expansion and Arma Inscripta."},
    DAILY: {name: "DailyWeeklyMissions", description: 'Missions under the "Permanent" tab.'},
    LEVEL: {name: "Leveling", description: "Ways to strengthen/level up a unit/equipment."},
    TECH: {name: "Troubleshooting", description: "Firstly, have you tried turning it off and on?"},
    DORM: {name: "Dormitories", description: "Doll rest rooms."},
    TEAM: {name: "TeamComposition", description: "Doll combinations for funny stuffs."},
    VC: {name: "VulnerabilityCheck", description: "Game mode for getting specific doll fragments and spirit currencies."},
    SHOP: {name: "Shop", description: "Buy every ware if you have the means."},
};
window.tags = dtag;

window.cards = [
    {
        id: 0,
        question: `How do I change what weapon Jiangyu holds in her L2D?`,
        answer: `Left hand tap.`,
        tags: [dtag.ASST]
    },
    {
        id: 1,
        question: `Which algorithms should I decompose/fodder/keep?`,
        answer: `Purple algos, blue algos (aka. Auto-Decompose) if you're lazy, trash single slot algos.
        ${details("Google Sheets for Algorithm Usefulness.", Embed.google(
            ["Algorithm Viability List - Gamma", "https://docs.google.com/spreadsheets/d/1_HRAj20Gp7bvP2KjoJOsYhKwd2SyVuYEFZHDRHFKReQ"],
            ["PNC Algo Mainstat Viability List", "https://docs.google.com/spreadsheets/d/1DSK4d94RdRCV_ji7NXC0Klyf7v_dUkIY9n9qW9y2UeQ"]
        ))}`,
        tags: [dtag.ALGO]
    },
    {
        id: 2,
        question: `How many pulls/Advanced Search Commands/Quartz Sands can I get per month?`,
        answer: `${figure(image("https://i.imgur.com/WoonBbq.png", "Available rolls per month."), "Discord: .rolls")}
        Maintenance (150 sands each > 600~ sands)<br>
        Character Events (3 tickets)<br>
        Discrete Point Redemption Center (1 ticket per 200 points)<br>
        + other events`,
        tags: [dtag.GACHA]
    },
    {
        id: 3,
        question: `If I oath my doll, do I get an oath skin?`,
        answer: `Great as it may be, they're separate purchases.`,
        tags: [dtag.SKIN, dtag.OATH]
    },
    {
        id: 4,
        question: `Is there any other way to get more oath certificates besides quartz?`,
        answer: `None as of yet.`,
        tags: [dtag.OATH]
    },
    {
        id: 5,
        question: `What's the use of High Fashion Voucher?`,
        answer: `Upgrading certain skins to L2D.`,
        tags: [dtag.SKIN]
    },  //@List of upgradeable skins
    {
        id: 6,
        question: `What's the difference between Neural Search - Kits and Neural Search - Fragments when pulling for limiteds?`,
        answer: `Spark counter is separate, while pity counter is shared (as usual).<br>
        ${List.description({
            "Search Mode - Kits": [
                fragment(`3.6% chance for a 3${SC.STAR}, essentially making the banner unit 27.`, textStyle("77", "over"), "%."),
                "Gives neural kits on duplicates."
            ],
            "Search Mode - Fragments": [
                `2% chance for a 3${SC.STAR}, essentially making the banner unit 50%.`,
                "Gives neural fragments on duplicates."
            ]
        })}`,
        tags: [dtag.GACHA]
    },
    {
        id: 7,
        question: `Where do I enter the redemption code?`,
        answer: `${List.description({
            "Android": [figure(image(IMG_ASSET+"RedeemGift.png", "Redeem gift tab."), "Under Settings")],
            "iOS": [anchor("Redemption page.", "https://42lab-us.sunborngame.com/redeem")]
        })}`,
        tags: [dtag.MISC]
    },
    {
        id: 8,
        question: `Do battlepass skins rerun?`,
        answer: `${figure(image(IMG_ASSET+"BPRerun.png", "Battlepass rerun shop."), "Requires Gestalt Aspect currency")}`,
        tags: [dtag.SKIN, dtag.BP]
    },
    {
        id: 9,
        question: `What resources can I get from a Character Event?`,
        answer: `${List.unordered(
            "30 Neural Fragments for the featured Doll",
            "150 Neural Kits",
            "30 Pioneering Breakthrough Widgets for the featured Doll's class",
            "500 Furniture Coins",
            "1000 AI Enhancement Experience",
            "30 AI Core Fragments",
            "8 Special Algorithm Selection Boxes",
            "9 Reconfiguration Generators",
            "25 3-Pc Set Orange Algorithm - α",
            "3 Advanced Search Commands",
            "54000+ Combat EXPs",
            "16000+ Diggcoins",
            "4000+ Skill Samples",
            "12+ Skill Pivots",
            "1 Painting",
            "1 Profile Background",
            "1 Accolade"
        )}`,
        tags: [dtag.MISC]
    },
    {
        id: 10,
        question: `I'm 15 Neural Fragments away from raising the welfare unit to 5${SC.STAR}. Where can I get the remaining frags?`,
        answer: `Intimacy.`,
        tags: [dtag.DOLL, dtag.FRAGS]
    },
    {
        id: 11,
        question: `What's the best way to pull for limited units?`,
        answer: `General consensus is to pull on kits banner (because kits is more in-demand than fragments) until 59/60 soft pity, switch to fragment banner (due to 50% banner unit chance on a 3${SC.STAR} pull), and pull one.<br>
        In terms of sand expenditure, the only important part here is pulling on the fragments on pity.`,
        tags: [dtag.GACHA]
    },
    {
        id: 12,
        question: `Will limited units get a rerun?`,
        answer: `Yes.`,
        tags: [dtag.DOLL, dtag.GACHA]
    },
    {
        id: 13,
        question: `I can't see the character in Fragment Search. Where would I get their fragments?`,
        answer: `Shop is the only option. Applicable only to Limited and Welfare units.`,
        tags: [dtag.DOLL, dtag.FRAGS]
    },
    {
        id: 14,
        question: `How long is the gap between major story events?`,
        answer: `Usually around 2-3 months.`,
        tags: [dtag.MAJOR]
    },
    {
        id: 15,
        question: `Which gifts are liked by which unit?`,
        answer: `${Embed.google(
            ["Neural Cloud Gift Stuff", "https://docs.google.com/spreadsheets/d/1CSqGRSHz51spQXjwHN8LRNrW21_OHf9zlTgWnx3Y2Tg"],
            ["Neural Cloud Gifts", "https://docs.google.com/spreadsheets/d/1vohWGNxRO0kXSBxAGlVBezleV2YgxnCHY2yE_4scdTc"],  //@Owner
        )}`,
        tags: [dtag.DOLL]
    },
    {
        id: 16,
        question: `Who should I get in Designated Neural Acquisition?`,
        answer: `${figure(image(
            "https://cdn.discordapp.com/attachments/648373344600850434/1183221959643889684/image.png?ex=6608bf52&is=65f64a52&hm=09d1c5f3872da11d7e06097d368ce88c0f4af5030e95e2aaa8961f8f40886710&",
            "Designated Neural Acquisition suggestion guide."
        ), "Discord: .selector, by u/Whole-Arm4526")}`,
        tags: [dtag.DOLL]
    },
    {
        id: 17,
        question: `Why does the set suggestion button not show the new (and better) algorithms for the dolls?`,
        answer: `Maybe it's actually not better? Or maybe, it actually means "Set Use Rate", not "Set Recommendation".`,
        tags: [dtag.ALGO]
    },
    {
        id: 18,
        question: `Where can I read the events I've missed?`,
        answer: `${List.unordered(
            details("Permanent Events", figure(image(IMG_ASSET+"Static Iteration.png", "Static Iteration page of Main Story."), "Requires Recopy Core Chip")),
            anchor("Shoul's playlist", "https://youtube.com/playlist?list=PLTpD-lAtY-jDF5A945-HEjqzdVjJ57XJJ&si=K0GaXy1NpDH9aQbt")
        )}`,
        tags: [dtag.STORY, dtag.MAJOR]
    },
    {
        id: 19,
        question: `What stages do I need to do to complete the weekly mission "Complete 20 battles with a Support Doll"?`,
        answer: `Main Story Sectors - Standard and Dark Mode. As long as the "Amount of Support left today" counter can go down, it counts.`,
        tags: [dtag.DAILY]
    },  //@Visual
    {
        id: 20,
        question: `Which units are good and how should I build them?`,
        answer: `${figure(Embed.google(["L.U.S.T. 2", "https://docs.google.com/spreadsheets/d/1FMK713okcJNQuCv625Ut0TZuQbm9RlHk7l1yOUF9Qdw"]), "For those who long for Iana's spreadsheet")}`,
        tags: [dtag.DOLL, dtag.TIER]
    },
    {
        id: 21,
        question: `What things do I need to do to strengthen my dolls?`,
        answer: `${List.unordered(
            "Potential Breakthrough up to Lv. 60 (Lv. 70 optional).",
            `Neural Expansion to 5${SC.STAR} (pure supports to 3.5 at minimum).`,
            "Skill levels at 10/10/5.",
            "Algorithm Efficiency at 2x.",
            "Algorithms with matching sets, useful mainstats, and at least one useful substat.",
            "Arma Inscripta (stopping point dependent on the doll in question)."
        )}`,
        tags: [dtag.DOLL, dtag.LEVEL]
    },
    {
        id: 22,
        question: `I'm having trouble logging into the game. Any solutions?`,
        answer: `If it says along the lines of "Network Connection Problem" despite having good internet connection, it might be a service provider issue. Use VPN for now.`,
        tags: [dtag.TECH]
    },
    {
        id: 23,
        question: `Is there a guide to teambuilding for this game?`,
        answer: `${Embed.google(["MMG Entry 1: Team Building", "https://docs.google.com/spreadsheets/d/1KxJgCmfdLt3MbE1IC4T38hOCfauxSGQ6B2to8doXig8"])}`,
        tags: [dtag.DOLL]
    },
    {
        id: 24,
        question: `Where can I get more Fashion Vouchers?`,
        answer: `Enigma Blackhole, In-game Shop, Returner Rewards`,
        tags: [dtag.SKIN]
    },
    {
        id: 25,
        question: `Which should I focus on first, Arma Inscripta or Neural Expansion to 5${SC.STAR}?`,
        answer: `${List.ordered(
            "Arma Inscripta since it expands your unit's skill repertoire (up until the breakpoint, which depends on each unit).",
            `Expand to 4.5${SC.STAR} to unlock all import algorithm slots.`,
            "YMMV."
        )}`,
        tags: [dtag.DOLL, dtag.LEVEL, dtag.ARMA]
    },
    {
        id: 26,
        question: `I'm having trouble updating the game. Any fix?`,
        answer: `Reinstalling might help.`, // https://old.reddit.com/r/GFLNeuralCloud/comments/1adsqjg/weekly_professors_lounge_january_29_2024/kod2xsi/
        tags: [dtag.TECH]
    },
    {
        id: 27,
        question: `How do I add more dolls in a room?`,
        answer: `Beds and sofas.`,
        tags: [dtag.DOLL, dtag.DORM]
    },
    {
        id: 28,
        question: `How much Neural Fragments do I need for Arma Inscriptas?`,
        answer: `${anchor(image("https://pbs.twimg.com/media/FuCwlWlaIAAmSg9?format=jpg&name=4096x4096", "Cleista's Arma Inscripta guide."), "https://twitter.com/CleistaCeleste/status/1648512012216041472")}`,
        tags: [dtag.FRAGS, dtag.ARMA, dtag.PRIME]
    },
    {
        id: 29,
        question: `Can I get a unit through fragments?`,
        answer: `Apart from limiteds, yes.`,
        tags: [dtag.DOLL, dtag.FRAGS]
    },
    {
        id: 30,
        question: `Are there team presets for this game?`,
        answer: `${figure(image("https://i.postimg.cc/tJSmx85q/Screenshot-2024-02-05-22-08-59-65-08f8a97de7bd41bb2394ebe61dcb8f9f.jpg", "Team preset screen."), "Team preset before fights, from u/WhistleOfDeath")}`,
        tags: [dtag.TEAM]
    },
    {
        id: 31,
        question: `What's the use of Precious Memory Tickets`,
        answer: `Used for buying Polaroid Projections (skins with no chibi change).`,
        tags: [dtag.SKIN]
    },
    {
        id: 32,
        question: `What is Recopy Core Chip for?`,
        answer: `Rereading permanent events.<br>
        You can use it on the ${getID("Main Storyline's second story page", 18)}.`,
        tags: [dtag.STORY]
    },
    {
        id: 33,
        question: `How many kits do I need to 5${SC.STAR} a limited unit?`,
        answer: `5625`, // https://old.reddit.com/r/GFLNeuralCloud/comments/1b688sg/weekly_professors_lounge_march_04_2024/ktrfl2e/
        tags: [dtag.DOLL, dtag.LEVEL]
    },  //@Change to all sources
    {
        id: 34,
        question: `Would projection skins rerun?`,
        answer: `After their debut release, yes. After that, it becomes permanently available.`,
        tags: [dtag.SKIN]
    },
    {
        id: 35,
        question: `Will Vulnerability Check add new doll fragments?`,
        answer: `As of now, no.`,
        tags: [dtag.FRAGS, dtag.DOLL, dtag.VC]
    },
    {
        id: 36,
        question: `Should I farm for event currency to use on the last shop tab?`,
        answer: `Practically speaking, no. It's an excess currency dump.`,
        tags: [dtag.MAJOR, dtag.SHOP]
    },
    {
        id: 37,
        question: `Do I need to buy Gestalt Aspect coins in advance?`,
        answer: `For now, no need. Each pack is enough to buy one rerun battlepass skin.`,
        tags: [dtag.BP, dtag.SKIN]
    },
    //{
    //    id: 0,
    //    question: ``,
    //    answer: ``,
    //    tags: []
    //},
];

// upgrading to l2d
// algorithm guide - lizzy?
// character event guide
// l2d upgrade for bp limited to bp availability
// unit skill ui breakdown
// apparently one month minimum for returner rewards (30 days? 31?)

// https://old.reddit.com/r/GFLNeuralCloud/comments/18l63g8/weekly_professors_lounge_december_18_2023/kerq0qj/
// https://old.reddit.com/r/GFLNeuralCloud/comments/18qglj9/weekly_professors_lounge_december_25_2023/kfe8yxm/
// https://old.reddit.com/r/GFLNeuralCloud/comments/191ipmg/weekly_professors_lounge_january_08_2024/khmz92o/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1adsqjg/weekly_professors_lounge_january_29_2024/kow77hi/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1b0evdy/weekly_professors_lounge_february_26_2024/ksmuvzx/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1b688sg/weekly_professors_lounge_march_04_2024/ktwh9ev/ - Exception Protocol Guide

// GFAnon Fairy Guide - https://rentry.org/2gfwqgvf

// https://www.reddit.com/r/GFLNeuralCloud/comments/z5446s/algorithm_sets_recommendations_google_doc/
// https://nalu.wiki/neuralcloud
// https://old.reddit.com/r/GFLNeuralCloud/comments/1b0evdy/weekly_professors_lounge_february_26_2024/ksdzfoe/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1d9avll/new_system_spirit_system_on_june_11th/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1dee3bd/cant_rebind_my_account_getting_game_center/

// https://old.reddit.com/r/GFLNeuralCloud/comments/1bt0r9e/weekly_professors_lounge_april_01_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1byv1s5/weekly_professors_lounge_april_08_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1c4jd5v/weekly_professors_lounge_april_15_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1ca7t9t/weekly_professors_lounge_april_22_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1cfw9d4/weekly_professors_lounge_april_29_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1clg91d/weekly_professors_lounge_may_06_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1cqwig3/weekly_professors_lounge_may_13_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1cwct1n/weekly_professors_lounge_may_20_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1d1oy3m/weekly_professors_lounge_may_27_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1d71oio/weekly_professors_lounge_june_03_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1dcisas/weekly_professors_lounge_june_10_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1dhvcm4/weekly_professors_lounge_june_17_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1dnarda/weekly_professors_lounge_june_24_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1dsq7tg/weekly_professors_lounge_july_01_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1dy62ab/weekly_professors_lounge_july_08_2024/
// https://old.reddit.com/r/GFLNeuralCloud/comments/1e3ryy5/weekly_professors_lounge_july_15_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1e9bfq8/weekly_professors_lounge_july_22_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1eewnax/weekly_professors_lounge_july_29_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1ekkxt0/weekly_professors_lounge_august_05_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1eqaq6z/weekly_professors_lounge_august_12_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1evyw1r/weekly_professors_lounge_august_19_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1f1le7t/weekly_professors_lounge_august_26_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1f73ylt/weekly_professors_lounge_september_02_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1fcmnm4/weekly_professors_lounge_september_09_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1fi1p9h/weekly_professors_lounge_september_16_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1fnhoxj/weekly_professors_lounge_september_23_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1fsss52/weekly_professors_lounge_september_30_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1fy4vwa/weekly_professors_lounge_october_07_2024/
//https://old.reddit.com/r/GFLNeuralCloud/comments/1g3d31c/weekly_professors_lounge_october_14_2024/