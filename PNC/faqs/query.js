import {spoilerSummary, table, link, tooltip} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import {Embed, textStyle, img} from "../../univasset/scripts/html/index.js";
import List from '../../univasset/scripts/htmlfunctions/lists.js';
import * as SC from '../../univasset/scripts/specialchars.js';

//#region Constants
const IMG_ASSET = "../assets/images/faqs/"
//#endregion

//#region Functions
/** @param {string} text @param {...number} ids */
function getID(text, ...ids) {
    return `<a href="https://xxx-yyy-xxx.github.io/PNC/faqs/?id=${ids.join("+")}">${text}</a>`
}
//#endregion

const dTag = {
    STORY: {name: "StoryAndEvents", description: "Story and lore."},
        MAJOR: {name: "MajorEvents", description: "A Mica staple."},
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
    FRAGS: {name: "NeuralFragments", description: "Used for Neural Expansion and Arma Inscripta."},
    DAILY: {name: "DailyWeeklyMissions", description: 'Missions under the "Permanent" tab.'},
};
window.tags = dTag;

window.cards = [
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
        answer: `${img("https://i.imgur.com/WoonBbq.png", "Available rolls per month.", "Discord: .rolls")}
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
            "Android": [img(IMG_ASSET+"RedeemGift.png", "Redeem gift tab.", "Under Settings")],
            "iOS": [link("Redemption page.", "https://42lab-us.sunborngame.com/redeem")]
        })}`,
        tags: [dTag.MISC]
    },
    {
        id: 8,
        question: `Do battlepass skins rerun?`,
        answer: `${img(IMG_ASSET+"BPRerun.png", "Battlepass rerun shop.")}`,
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
        answer: `${img("https://media.discordapp.net/attachments/648373344600850434/1183221959643889684/image.png?ex=65878c52&is=65751752&hm=0bdf4e93564225c0dab105e618eab2f4e348b2f8902042da82d3e5b460f442a5&=&format=webp&quality=lossless", "Designated Neural Acquisition suggestion guide.", "By u/Whole-Arm4526")}`,
        tags: [dTag.DOLL]
    },
    {
        id: 17,
        question: `Why does the set suggestion button not show the new (and better) algorithms for the dolls?`,
        answer: `Maybe it's actually not better? Or maybe, it actually means "Set Use Rate", not "Set Recommendation".`,
        tags: [dTag.ALGO]
    },
    {
        id: 18,
        question: `Where can I read the events I've missed?`,
        answer: `In-game file room or ${link("Shoul's playlist", "https://youtube.com/playlist?list=PLTpD-lAtY-jDF5A945-HEjqzdVjJ57XJJ&si=K0GaXy1NpDH9aQbt")}.`,
        tags: [dTag.STORY, dTag.MAJOR]
    },  //@Visual
    {
        id: 19,
        question: `What stages do I need to do to complete the weekly mission "Complete 20 battles with a Support Doll"?`,
        answer: `Main Story Sectors - Standard and Dark Mode. As long as the "Amount of Support left today" counter can go down, it counts.`,
        tags: [dTag.DAILY]
    },  //@Visual
    {
        id: 20,
        question: `Which units are good and how should I build them?`,
        answer: `${Embed.google(
            ["L.U.S.T. 2", "https://docs.google.com/spreadsheets/d/1FMK713okcJNQuCv625Ut0TZuQbm9RlHk7l1yOUF9Qdw"],
        )}`,
        tags: [dTag.DOLL, dTag.TIER]
    },
    {
        id: 0,
        question: ``,
        answer: ``,
        tags: []
    },
].slice(0, -1);

//what is arma - cleista?
//upgrading to l2d
//algorithm guide - lizzy?
//character event guide
//l2d upgrade for bp has time limit

// https://old.reddit.com/r/GFLNeuralCloud/comments/18l63g8/weekly_professors_lounge_december_18_2023/kepo2px/
// https://old.reddit.com/r/GFLNeuralCloud/comments/18l63g8/weekly_professors_lounge_december_18_2023/kerq0qj/

// https://old.reddit.com/r/GFLNeuralCloud/comments/18qglj9/weekly_professors_lounge_december_25_2023/
// https://old.reddit.com/r/GFLNeuralCloud/comments/18vukqz/weekly_professors_lounge_january_01_2024/