import {spoilerSummary, image, table, link, tooltip} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import {Embed, textStyle} from "../../univasset/scripts/html/index.js";
import List from '../../univasset/scripts/htmlfunctions/lists.js';
import * as SC from '../../univasset/scripts/specialchars.js';

//#region Functions
/** @param {string} text @param {...number} ids */
function getID(text, ...ids) {
    return `<a href="https://xxx-yyy-xxx.github.io/PNC/faqs/?id=${ids.map(x => String(x).padStart(5, "0")).join("+")}">${text}</a>`
}

/** @param {string} imagename @returns {string} */
function imageAsset(imagename) {
    return `../assets/images/faqs/${imagename}`;
}
//#endregion

// try {
//     console.log("import.meta.url:", import.meta.url)
// } catch {
//     console.warn("import.meta.url unavailable.")
// }

export const dTag = {
    ASST: {name: "Assistant", description: "Unit shown in your home screen."},
    ALGO: {name: "Algorithms", description: "Equipments in this game."},
    TIER: {name: "TierList", description: "Power ratings of doll units. Approach with caution."},
    DOLL: {name: "Dolls", description: "Collectible units of this game."},
    MISC: {name: "Miscellaneous", description: "Queries with no specific tag as of yet."},
    PRIME: {name: "TopicPrimer", description: "Write-ups that should answer majority of the questions."},
    SKIN: {name: "NeuralProjections", description: "The money-bait, so to speak."},
    OATH: {name: "OathSystem", description: "Reject real life, marry PNGs."},
    GACHA: {name: "NeuralSearch", description: "Modern monetization."},
    BP: {name: "MagraseaBattlePass", description: "Gives skin, resources, frames, furnitures."},
};

/**
 * @typedef Card
 * @property {number} Card.id
 * @property {string} Card.question
 * @property {string} Card.answer
 * @property {{name: string, description: string}[]} Card.tags
 */

/** @type {Card[]} */ export const cardData = [
    {
        id: 0,
        question: `How do I change what weapon Jiangyu holds in her L2D?`,
        answer: `Left hand tap.`,
        tags: [dTag.ASST]
    },
    {
        id: 1,
        question: `Which algorithms should I decompose?`,
        answer: `Purple algos, blue algos if you're lazy, trash single slot algos.`,
        tags: [dTag.ALGO]
    },
    {
        id: 2,
        question: `How many pulls/Advanced Search Commands/Quartz Sands can I get per month?`,
        answer: `${image("https://i.imgur.com/WoonBbq.png", "Discord: .rolls")}
        Maintenance (150 sands each > 600~ sands)<br>
        Character Events (3 tickets)<br>
        Discrete Point Redemption Center (1 ticket per 200 points)<br>
        + other events`,
        tags: [dTag.GACHA]
    },
    {
        id: 3,
        question: `If I oath my doll, do I get an oath skin?`,
        answer: `Great as it may be, they're separate purchases.`,
        tags: [dTag.SKIN, dTag.OATH]
    },
    {
        id: 4,
        question: `Is there any other way to get more oath certificates besides quartz?`,
        answer: `None as of yet.`,
        tags: [dTag.OATH]
    },
    {
        id: 5,
        question: `What's the use of High Fashion Voucher?`,
        answer: `Upgrading certain skins to L2D.`,
        tags: [dTag.SKIN]
    },
    {
        id: 6,
        question: `What's the difference between Neural Search - Kits and Neural Search - Fragments when pulling for limiteds?`,
        answer: `Spark counter is separate, while pity counter is shared (as usual).<br>
        ${List.description({
            "Search Mode - Kits": [
                `3.6% chance for a 3${SC.STAR}, essentially making the banner unit 27.${textStyle("77", "over")}%.`,
                "Gives neural kits on duplicates."
            ],
            "Search Mode - Fragments": [
                `2% chance for a 3${SC.STAR}, essentially making the banner unit 50%.`,
                "Gives neural fragments on duplicates."
            ]
        })}`,
        tags: [dTag.GACHA]
    },
    {
        id: 7,
        question: `Where do I enter the redemption code?`,
        answer: `${List.description({
            "Android": [image(imageAsset("RedeemGift.png"), "Under Settings")],
            "iOS": [link("Redemption page.", "https://42lab-us.sunborngame.com/redeem")]
        })}`,
        tags: [dTag.MISC]
    },
    {
        id: 8,
        question: `Do battlepass skins rerun?`,
        answer: `Yes.`,
        tags: [dTag.SKIN, dTag.BP]
    },  //@Visual
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
        tags: [dTag.MISC]
    },
    {
        id: 10,
        question: `I'm 15 Neural Fragments away from raising the welfare unit to 5${SC.STAR}. Where can I get the remaining frags?`,
        answer: `Intimacy.`,
        tags: [dTag.DOLL]
    },
    {
        id: 11,
        question: `What's the best way to pull for limited units?`,
        answer: `General consensus is to pull on kits banner (because kits is more in-demand than fragments) until 59/60 soft pity, switch to fragment banner (due to 50% banner unit chance on a 3${SC.STAR} pull), and pull one.`,
        tags: [dTag.GACHA]
    },
    {
        id: 12,
        question: `Will limited units get a rerun?`,
        answer: `Yes.`,
        tags: [dTag.DOLL, dTag.GACHA]
    },
    {
        id: 0,
        question: ``,
        answer: ``,
        tags: []
    },
].slice(0, -1);

//what is arma
//updgrading to l2d