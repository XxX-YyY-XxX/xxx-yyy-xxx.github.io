import {spoilerSummary, image, table, link, tooltip} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import {Embed, textStyle} from "../../univasset/scripts/html/index.js";
import List from '../../univasset/scripts/htmlfunctions/lists.js';
import * as SC from '../../univasset/scripts/specialchars.js';

//#region Constants
const IMG_ASSET = "../assets/images/faqs/"
//#endregion

//#region Functions
/** @param {string} text @param {...number} ids */
function getID(text, ...ids) {
    return `<a href="https://xxx-yyy-xxx.github.io/PNC/faqs/?id=${ids.map(x => String(x).padStart(5, "0")).join("+")}">${text}</a>`
}
//#endregion

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
    MAJOR: {name: "MajorEvents", description: "A Mica staple."},
    FRAGS: {name: "NeuralFragments", description: "Used for Neural Expansion and Arma Inscripta."},
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
            "Android": [image(IMG_ASSET+"RedeemGift.png", "Under Settings")],
            "iOS": [link("Redemption page.", "https://42lab-us.sunborngame.com/redeem")]
        })}`,
        tags: [dTag.MISC]
    },
    {
        id: 8,
        question: `Do battlepass skins rerun?`,
        answer: `${image(IMG_ASSET+"BPRerun.png")}`,
        tags: [dTag.SKIN, dTag.BP]
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
        tags: [dTag.MISC]
    },
    {
        id: 10,
        question: `I'm 15 Neural Fragments away from raising the welfare unit to 5${SC.STAR}. Where can I get the remaining frags?`,
        answer: `Intimacy.`,
        tags: [dTag.DOLL, dTag.FRAGS]
    },
    {
        id: 11,
        question: `What's the best way to pull for limited units?`,
        answer: `General consensus is to pull on kits banner (because kits is more in-demand than fragments) until 59/60 soft pity, switch to fragment banner (due to 50% banner unit chance on a 3${SC.STAR} pull), and pull one.<br>
        In terms of sand expenditure, the only important part here is pulling on the fragments on pity.`,
        tags: [dTag.GACHA]
    },
    {
        id: 12,
        question: `Will limited units get a rerun?`,
        answer: `Yes.`,
        tags: [dTag.DOLL, dTag.GACHA]
    },
    {
        id: 13,
        question: `I can't see the character in Fragment Search. Where would I get their fragments?`,
        answer: `Shop is the only option. Applicable only to Limited and Welfare units.`,
        tags: [dTag.DOLL, dTag.FRAGS]
    },
    {
        id: 14,
        question: `How long is the gap between major story events?`,
        answer: `Usually around 2-3 months.`,
        tags: [dTag.MAJOR]
    },
    {
        id: 15,
        question: `Which gifts are liked by which unit?`,
        answer: `${Embed.google(
            ["Neural Cloud Gift Stuff", "https://docs.google.com/spreadsheets/d/1CSqGRSHz51spQXjwHN8LRNrW21_OHf9zlTgWnx3Y2Tg"],
            ["Neural Cloud Gifts", "https://docs.google.com/spreadsheets/d/1vohWGNxRO0kXSBxAGlVBezleV2YgxnCHY2yE_4scdTc"],  //@Owner
        )}`,
        tags: [dTag.DOLL]
    },
    {
        id: 16,
        question: `Who should I get in Designated Neural Acquisition?`,
        answer: `${image("https://media.discordapp.net/attachments/648373344600850434/1183221959643889684/image.png?ex=65878c52&is=65751752&hm=0bdf4e93564225c0dab105e618eab2f4e348b2f8902042da82d3e5b460f442a5&=&format=webp&quality=lossless", "By u/Whole-Arm4526")}`,
        tags: [dTag.DOLL]
    },
    {
        id: 0,
        question: ``,
        answer: ``,
        tags: []
    },
].slice(0, -1);

//what is arma
//upgrading to l2d


// try {
//     console.log("import.meta.url:", import.meta.url)
// } catch {
//     console.warn("import.meta.url unavailable.")
// }
