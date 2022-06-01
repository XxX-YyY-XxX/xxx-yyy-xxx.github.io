const dataTags = Object.freeze({
    //#region Combat Tabs
        STORY : 'StoryEvents',          //For questions that apply to Major, Collab, and Seasonal Events.
            MAJOR : 'MajorEvents',      //Part of the main story. The ones added to the Campaign tab.
            COLLAB : 'Collaboration',   //"He liked it."
        MAIN : 'CombatMissions',        //Main missions aka Chapters.
            AUTO : 'AutoBattles',       //Lazy farming.
        LOGI : 'Logistics',             //Main source of MARP.
        SIMS : 'CombatSimulations',     //Capsule, Data, EXP, Neural, DefDrill, CoaDrill, Target Practice
        CAMPAIGN : 'CampaignMissions',  //Permanent Major Events
        THEATER : 'Theater',            //Backstab central
    //#endregion
    //#region Armory Tabs
        TDOLL : 'TacticalDolls',        //Anything that directly involves Tactical Dolls.
            LEDOLL : 'CycleDropDolls',  //Dolls that were once mini event/crate/completion rewards that now wander the rerun hell.
        COALITION : 'CoalitionUnits',   //PA counterpart of Tactical Dolls.
        EQUIP : 'Equipments',           //Attachments on units.
            SPEQ : 'SpecialEquipments', //Equips specific to a doll.
        ITEM : 'ConsumableItems',       //Tickets, cores, gems, batteries, shop items...
        FAIRY : 'Fairies',              //Sixth man of the team.
        FST : 'FireSupportTeam',        //Rockets and mortars, the first of the HOC.
    //#endregion
    //#region Facilities
        ECH : 'EchelonFormation',       //Deployable teams
        PROD : 'FactoryProduction',     //Unit Gacha 1.0
        MOD : 'NeuralUpgrade',          //MODding dolls and its resources.
        DORM : 'Dormitories',           //Battery charger.
            RESUPPLY : 'Resupply',      //Dorm gacha.
            SKIN : 'Costumes',          //Primary money sink.
            FURN : 'Furniture',         //"Dorm Equipments"
        HOC : 'HeavyOrdnanceCorps',     //FST division only for now.
        EXPED : 'ForwardBasecamp',      //Lazy leveling
        PA : 'ProtocolAssimilation',    //PA pulling and coalition drills.
    //#endregion
    MISC : 'Miscellaneous',         //Default tag if I dunno what to put. Should be useless, but meh.
    ACCT : 'AccountManagement',     //Anything concerning account data and integrity.
    TECH : 'Troubleshooting',       //For resolving issues that shouldn't even happen.
    '3P' : 'ThirdParty',            //Non-dev-made applications that are recommended to use. Safe until said otherwise.
    NEWB : 'NewbieGuide',           //Things new/early-game players should know.
    PRIME : 'TopicPrimer',          //Explanation of the specific system it's paired with. Usually made up of links. Must be the first box of it's paired tag.
    TIER : 'TierList',              //May not technically be one, just overall description on who is stronger than who.
    EMU : 'Emulators',              //Anytihing related to emulators.
    APPLE : 'AppleDevices',         //Anything primarily concerning iOS devices.
    //ANDROID : 'AndroidDevices',
    ANNIV : 'Anniversary',          //Anything concerning the game's anniversary.
    IMPT : 'Important',             //Things new players would need for late-game. Mostly consists of things not explained by the game.
    SYSMECH : 'SystemMechanics',    //Explanation on underlying mechanics of the game.
    ENEMY : 'EnemyUnits',           //For things that primarily interact with enemy units.
    //SEASON : 'SeasonalEvents',      //Story events that happen each New Year, X-mas, Halloween, etc.
    MINI : 'MiniEvents',            //Bingo, Point Event, etc.
    MAP : 'FieldMap',               //Node-based overworld.
        BATTLE : 'Skirmishes',      //The battle mode where everyone shoots at one another.
    SIDE : 'SideStory',             //Extra stories.
    SKILL : 'Skills',               //Unit skills.
    LOVE : 'Affection',             //
        OATH : 'OathSystem',        //Marriage.
    FRIEND : 'Friends',
    LEVEL : 'Leveling',             //Mostly Corpse Drag.
    PET : 'Pets',                   //ANIMAL
    CMDR : 'Commander',             //"Self-insert"
    OJ : 'LuffberryChess',          //PVP sidegame
    LORE : 'Story/Lore',            //Main meat of the series
    MARP : 'FourResources',         //Manpower, Ammunition, Rations, Parts
    REF : 'References',             //Reference compilations
    //Devices
});

const star = '★';
const lessEqual = '≤';

//#region Functions
/** @param {URLString} link */
function image(link, onHover = null, onLoadFail = 'Image loading failed.') {
    return `<img src="${link}" alt="${onLoadFail}" ${onHover ? `title="${onHover}"` : ''}>`
}

/** @param {URLString} link */
function link(linkText, link) {
    return `<a href="${link}">${linkText}</a>`;
}

/** @param {boolean} ordered */
function list(ordered, ...any) {
    const htmlElem = ordered ? 'ol' : 'ul';
    return `<${htmlElem}>${any.map(val => `<li>${val}</li>`).join('')}</${htmlElem}>`;
}

/** @param {URLString} docLink Ends in alphanumeric */
function googleEmbed(docLink) {
    return `<figure>
        <iframe class="gdoc" src="${docLink}/preview?pli=1"></iframe><br>
        <figcaption><a onclick="reloadIFrame(this.parentElement.parentElement.firstElementChild)">Reload Frame</a> \| ${link('Source Link', docLink)}</figcaption>
    </figure>`;
}   //<button type="button" ></button>

/** @param {URLString} shortlink */
function youtubeEmbed(shortlink) {
    const identifier = shortlink.split('/').pop();
    return `<iframe class="ytvid" src="https://www.youtube.com/embed/${identifier}" allowfullscreen></iframe>`
}

/** @param permalink ...comments/${permalink}/?...*/
function redditEmbed(permalink) {                                       //needs more fix, how to check support
    return `<a href="https://old.reddit.com/r/girlsfrontline/comments/${permalink}/">For load fail purposes.</a><br>
    <iframe id="reddit-embed" src="https://www.redditmedia.com/r/girlsfrontline/comments/${permalink}/?depth=1&amp;showmore=false&amp;embed=true&amp;showmedia=false&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="278" width="640" scrolling="no"></iframe>`
}

/** @param {Array} headerArray @param {Array[]} arrayOfArrays */
function table(headerArray, ...arrayOfArrays) {
    headerArray = headerArray ? `<thead><tr>${headerArray.map(val => `<th>${val}</th>`).join('')}</tr></thead>` : '';
    return `<table>
        ${headerArray}
        <tbody>
            ${arrayOfArrays.map(val1 => `<tr>${val1.map(val2 => `<td>${val2}</td>`).join('')}</tr>`).join('')}
        </tbody>    
    </table>`;
}

class TextStyle {
    static STRIKE = 'del';
    static ITALIC = 'em';
    static BOLD = 'strong';
    static CODE = 'code';
    static QOUTE = 'blockquote';
}

/** @param {TextStyle[]} styles @param {string} string */
function altTextStyle(string, ...styles) {
    for (const htmlElem of styles) {
        string = `<${htmlElem}>${string}</${htmlElem}>`;
    }
    return string;
}

function spoilerSummary(summaryName, details) {
    return `<details><summary>${summaryName}</summary>${details}</details>`;
}   //ontoggle

/** @param dictOfArray \{key : descriptions[]} */
function descriptionList(dictOfArray) {
    var descs = '';
    for (const descObject in dictOfArray) {
        descs += `<dt>${descObject}</dt>` + dictOfArray[descObject].map(val => `<dd>~ ${val}</dd>`).join('');
    }
    return `<dl>${descs}</dl>`;
}
//#endregion

const cardData = Object.freeze([
    //#region Topic Primers
    {
        questions : `How do I level my girls?`,
        answers : `First is grinding them on leveling maps, mainly through ${spoilerSummary('corpse dragging.', 
        `<br>Also called Poor Run or Beggar Run, is a method of leveling dolls (and fairy) using minimal resources. This is done by only supplying a single doll echelon then placing them in a non-supplied echelon composed of dolls you want to level.<br>
        ${link("Ceia's 0-2 drag guide. Docs Edition.", 'https://docs.google.com/document/u/0/d/1PkxJ7ObdGW_cS_qbzAxQ_hoC1SFse3HNYWlnywZfPuo')}<br>
        ${link("Ceia's 0-2 drag guide. Vids Edition.", 'https://youtu.be/vqvPpO1vKqw')}<br>
        ${link('Matsuda guide per leveling map.', 'https://gfl.matsuda.tips/post/leveling_guide')}<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/optimizing-leveling-introduction')}<br>
        ${link('GFLCorner guide.', 'https://www.gflcorner.com/efficient-leveling-guide/')}<br>
        ${link('DMesse guide.', 'http://dmesse.egloos.com/m/3567918')}`)}<br>
        Second is using Combat Reports. You can get them in the Forward Basecamp or through the Data Room. You can give them by going to the Dorm>Warehouse>Gift tab or going to your owned doll profile and tapping the + button by the EXP bar. They give 3000 fixed EXP per report, unaffected by dummy link EXP multiplier.`,
        tags : [dataTags.TDOLL, dataTags.LEVEL, dataTags.NEWB, dataTags.PRIME]
    },
    {
        questions : `What is Expedition/Forward Basecamp?`,
        answers : `${link('Gamepress Detailed Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-basecamp-and-exploration')}<br>
        ${link('GFC Primer.', 'https://www.gflcorner.com/expedition-system-mini-guide/')}<br>
        ${link('ATM Guide.', 'https://gfl.matsuda.tips/post/weareabsolutenotlostiswear')}<br>
        Important note is that FB unlocks at Commander Lv. 20.`,
        tags : [dataTags.EXPED, dataTags.PRIME, dataTags.NEWB]
    },
    {
        questions : `Are there any general guides for Protocol Assimilation/Coalition Units/SF Capture?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/ironbloodedairconditioning')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Protocol_Assimilation')}<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-first-impressions-revamped')}<br>
        ${spoilerSummary("Cleista's basic Twitter guide.", link(image('https://pbs.twimg.com/media/E5CzhbRXEAEB-XH?format=jpg&name=4096x4096'), 'https://twitter.com/CleistaCeleste/status/1409824210571214849')
         + `<br>Applicable mainly for "I really want to get this ringleader."`)}<br>
        Apparently, this unlocks after beating 7-5 Normal.`,
        tags : [dataTags.PA, dataTags.PRIME]
    },
    {
        questions : `How do Neural Upgrades/MODs work?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-neural-upgrade')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/modding')}<br>
        ${link('GFC guide.', 'https://www.gflcorner.com/neural')}`,
        tags : [dataTags.MOD, dataTags.PRIME]
    },
    {
        questions : `What are Fairies?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/fairies')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Technical_Fairies')} Unupdated rework skills.<br>
        ${link('GFC guide Part 1.', 'https://www.gflcorner.com/fairy/')} Fairies up to CT only.<br>
        ${spoilerSummary('GFC guide Part 2.', googleEmbed('https://docs.google.com/spreadsheets/d/1x6_YysDi0h89jKE9vEW2_fbxi7gG7XV5jjJqX8O41rw'))} Unupdated fairy list.`,
        tags : [dataTags.FAIRY, dataTags.PRIME]
    },
    {
        questions : `How to HOC?`,
        answers : `${link('Gamepress Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-hoc-combat-basics')}<br>
        ${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Heavy_Ordnance_Corps')}<br>
        ${link('Matsuda Guide.', 'https://gfl.matsuda.tips/post/hocs')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/hoc-guide-by-gfc/')}<br>
        ${spoilerSummary("Ceia's Video Guide.", youtubeEmbed('https://youtu.be/rsFyXRDAi6I'))}<br>
        ${link("u/Xealiouth's Guide.", 'https://redd.it/95nrou')}`,
        tags : [dataTags.HOC, dataTags.PRIME]
    },
    {
        questions : `What is Luffberry Chess?`,
        answers : `GFL version of 100% Orange Juice, I guess?<br>
        And it's called "chess" only because boardgame.<br>
        ${link("u/fortis_99's tips.", 'https://redd.it/rz4uye')}`,
        tags : [dataTags.OJ, dataTags.PRIME]
    },
    //#endregion
    //#region Tier Lists
    {
        questions : `Is XXX doll good?`,
        answers : `${link('Matsuda Quips.', 'https://gfl.matsuda.tips/dolls/')}<br>
        ${link('Gamepress Overview.', 'https://www.gamepress.gg/girlsfrontline/tier-list')}<br>
        ${link('KR Wiki.', 'https://namu.wiki/w/%EC%86%8C%EB%85%80%EC%A0%84%EC%84%A0/%EC%9D%B8%ED%98%95%EB%8F%84%EA%B0%90')}<br>
        ${link("Fatalchapter's bilibili guide.", 'https://www.bilibili.com/read/readlist/rl100361')} Updated up to Jashin dolls.<br>
        ${link("Sijun's list.", 'https://old.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i1rph1l/')} Translated by u/ConductorBichir.`,
        tags : [dataTags.TDOLL, dataTags.TIER]
    },
    {
        questions : `Is there a tier list for good PA units?`,
        answers : `${image('./assets/images/SFTier.png')}<br>
        ${link('Gamepress units guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units')} Use the search bar if a certain PA unit is unavailable in the page.`,
        tags : [dataTags.COALITION, dataTags.TIER]
    },
    {
        questions : `Who should I prioritize to MOD first?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/neural-upgrade-priority-guide')}<br>
        ${spoilerSummary('CN MOD list.', image('./assets/images/CNMODTier.png'))}`,
        tags : [dataTags.MOD, dataTags.TIER]
    },
    {
        questions : `Is there a tier list for fairies?`,
        answers : `${image('./assets/images/FairyTier.png', "Sijun's list")}<br>
        For the equipments, top number is the recommended quantity, bottom number is the reserve quantity.<br>
        ${link(`u/UnironicWeeaboo's spreadsheet.`, 'https://docs.google.com/spreadsheets/d/1RORciafqtspkxy3fqBrFdKIxVfanV2-fLl9FlvY3QtM')}`,
        tags : [dataTags.FAIRY, dataTags.TIER, dataTags.EQUIP]
    },  //https://imgur.com/a/pfSSel9
    //#endregion
    //#region Compilations
    {
        questions : `Which dolls have a MOD in the older servers?`,
        answers : `u/ConductorBichir's list. Includes all Special Equipments.<br>
        ${googleEmbed('https://docs.google.com/spreadsheets/d/1u2sXat4FD7jFLdjMLrq5zIiDrGJMEVaGvB2z2JysxLI')}`,
        tags : [dataTags.MOD, dataTags.SPEQ, dataTags.REF]
    },
    //#endregion
    //#region Important Details
    {
        questions : `When should I begin trying to produce fairies/do Heavy Equipment Constructions (HEC)?`,
        answers : `When you have sufficient income for 4 resources and cores. Ideally ASAP since raising one to 5${star} takes a considerable amount of time.`,
        tags : [dataTags.FAIRY, dataTags.PROD, dataTags.IMPT]
    },
    {
        questions : `Is fairy leveling for increasing rarity only?`,
        answers : `Mainly yes, but there is a gradual aura boost where a Lv.20 is better than Lv.1 even at 1${star}. And increasing rarity is very important, from increasing the aura stat cap, to making the talent proc more consistently. Not to mention that you can cap them to Lv.100 even as a 1${star} so there's no hurry to raise their rarity.`,
        tags : [dataTags.FAIRY, dataTags.LEVEL, dataTags.IMPT]
    },
    {
        questions : `What is Anchored Construction?`,
        answers : `${link('Pity System for newly added production dolls.', 'https://redd.it/szdua2')} Appears on the rate up for them which is on Saturdays and Sundays. Access it through the doll production screen. If it doesn't appear, try restarting app. It happens when you log-in earlier than the rate up.<br>
        ${altTextStyle('Points of Interest:', TextStyle.BOLD)}<br>
        ${list(false, 'Anchor rate-up is closed once a doll has been anchored.')}`,
        tags : [dataTags.PROD, dataTags.IMPT, dataTags.TECH]
    },  //@Too many to fix, @Visual
    //#endregion
    {
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `${image('./assets/images/SFEnemy.png')}<br>
        Note that Jupiter Cannons count as unarmored machine type.`,
        tags : [dataTags.ENEMY]
    },
    {
        questions : `Will there be problems with switching between multiple devices regularly?`,
        answers : `Only if you think that manually logging in every switch is a problem.`,
        tags : [dataTags.ACCT]
    },
    {
        questions : `Where to go for tech support?`,
        answers : `FB and Twitter is said to be responsive enough. Or you can use ${link('this', 'https://forms.gle/bZNnQeh5sJaD3pim8')} for reporting.`,
        tags : [dataTags.TECH, dataTags["3P"]]
    },
    {
        questions : `Which combat sim is better to focus on?`,
        answers : `Data. Always data.`,
        tags : [dataTags.SIMS, dataTags.ITEM, dataTags.NEWB]
    },
    {
        questions : `How do I get more Quick Training Contracts?`,
        answers : `End of daily log-ins, Keycard Event, gem shop.`,
        tags : [dataTags.ITEM, dataTags.MINI]
    },
    {
        questions : `I can't access the new chapter even though I already cleared the prerequisite map.`,
        answers : `Beat X-6 Normal of the last chapter again. If it still doesn't appear after that, restart client.`,
        tags : [dataTags.MAIN, dataTags.TECH]
    },
    {
        questions : `Which emulators are good for GFL?`,
        answers : `${list(true, 'Mumu.', 'Memu.', 'LDPlayer.', 'Nox.', 'Bluestacks.')}`,
        tags : [dataTags.EMU]
    },
    {
        questions : `How can I play GFL if Apple Store doesn't have it?`,
        answers : `Use Android, use emulator, use VPN, use jailbreak.`,
        tags : [dataTags.APPLE]
    },
    {
        questions : `When is the anniversary?`,
        answers : `May 8 for EN server.`,
        tags : [dataTags.ANNIV]
    },
    {
        questions : `How to do Theater/Theatre?`,
        answers : `${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Theater_Mode')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/theater-system-introduction-by-gfc/')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/rng_backstabbing')}<br>
        ${link('Gamepress Guide Part 1.', 'https://gamepress.gg/girlsfrontline/theater-7-overhaul-guide-new-mechanics-new-enemies-same-pain')} The updated theater version.<br>
        ${link('Gamepress Guide Part 2.', 'https://gamepress.gg/girlsfrontline/theater-7-combat-guide')} Still good for Theater 8.<br>
        TLDR is 5-6 Defense Drills in a row, twice per day, with differing battle effects. Do scouting bets where you pick one zone. Dump points on construction for easier battles.<br>
        Echelon formations are now 1 team + backups.`,
        tags : [dataTags.THEATER, dataTags.PRIME]
    },
    {
        questions : `How do I unlock Chapter 0?`,
        answers : `Beat Chapter 4 Emergency Map 4.`,
        tags : [dataTags.MAIN]
    },
    {
        questions : `Would the equipment I'm enhancing get bonus points if I use an enhanced fodder?`,
        answers : `No.`,
        tags : [dataTags.EQUIP, dataTags.LEVEL]
    },
    {
        questions : `Is there a list of which logistics to do if I want to prioritize certain resources?`,
        answers : `${link('GFC GDoc.', 'https://docs.google.com/spreadsheets/d/1ah2JO6ggWuVaBho9yxgDMC-ucEKA8C42SBkjIlnIcWk')} Up to Chapter 11.<br>
        ${link("u/elgatoroid's calculator.", 'https://gfl-logistics.neko.gg/')} Up to Chapter 11.<br>
        ${link('GFGFork site.', 'https://gfgfork.github.io/gf/main')} Up to Chapter 12.<br>
        ${link('Tempkaridc calculator.', 'https://tempkaridc.github.io/gf/')} Up to Chapter 13.<br>
        ${link("u/tehcavy's spreadsheet.", 'https://docs.google.com/spreadsheets/d/1N-PvxbrZJqg-upImk5uwEmB9GcCrNqjmVgdY00cdvS8')} Up to Chapter 13.`,
        tags : [dataTags.LOGI, dataTags.MARP, dataTags.ITEM]
    },
    {
        questions : `What is kiting?`,
        answers : `Kiting, in general, is the method of moving your tanks rightwards to make the enemy aim at them then moving leftwards to make the enemy walk towards you, while your DPS constantly shoots them. This is effective because most enemies have aim time where they do nothing, and range where you have to be in their sights to start aiming. Therefore, lengthening the lifespans of your dolls, especially the tanks.<br>
        ${link('GFC guide.','https://www.gflcorner.com/battle-controls/')}<br>
        ${link('Mitsu video guide.', 'https://youtu.be/ITUtRuF4TLY')}<br>
        ${link("u/Reikyu09's reddit post.", 'https://redd.it/8o18an')}`,
        tags : [dataTags.BATTLE, dataTags.IMPT]
    },
    {
        questions : `Do I still need to use advantaged dolls for Theater?`,
        answers : `Not as much as before. They no longer make or break the CE, though they do get stat boosts.<br>
        HG = 20% CDR, SMG/SG = 15% Arm, 50% EVA, AR/RF/MG = 20% FP, 20% ACC.<br>
        The endgame now goes to MODs and oaths.<br>
        The CE you see on each doll when toggling the Boss CE button is the adjusted number, with the advantaged dolls having 20% bonus CE accounted for.`,
        tags : [dataTags.TDOLL, dataTags.THEATER]
    },
    {
        questions : `For limited-time bonuses (i.e. auto-battles, logistics), when are the rewards calculated?`,
        answers : `If the runs can be cancelled without penalty, rewards are calculated at the end.<br>
        ${spoilerSummary('Examples:', list(false, 'The "Use Battery" bingo mission when exp-training HOCs.'))}<br>
        If they can't be cancelled, or is cancellable with a penalty or cost (ie quick tickets), calculated at the start.<br>
        ${spoilerSummary('Examples:', list(false, 'Expedition rewards.', 'Productions.'))}`,
        tags : [dataTags.SYSMECH, dataTags.MINI, dataTags.EXPED, dataTags.PROD]
    },
    {
        questions : `How does Armor Penetration work?`,
        answers : `${link('Matsuda explanation.', 'https://gfl.matsuda.tips/post/armour')}`,
        tags : [dataTags.BATTLE, dataTags.SYSMECH]
    },
    {
        questions : `Is there a penalty for using HOC charges and Fairy points in Theater battles?`,
        answers : `Nope. Joins boss battle regardless of charges and has no bearing on final score. Go ham.<br>
        Except if you used them and lost that battle, they won't be refunded, even in Electronic Warfare.`,
        tags : [dataTags.THEATER, dataTags.HOC, dataTags.FAIRY]
    },
    {
        questions : `Will the current event currency carry over to the next event?`,
        answers : `No can do. Dissolves into nothingness one week after the event is finished.`,
        tags : [dataTags.ITEM, dataTags.STORY]
    },
    {
        questions : `I've heard of GFAlarm. Is it safe to use?`,
        answers : `${link('Gamepress breakdown.', 'https://gamepress.gg/girlsfrontline/how-use-gfalarm-girls-frontline-alarm')}`,
        tags : [dataTags["3P"]]
    },
    {
        questions : `Is there any way to reset my battles so I can get a win?`,
        answers : `Turn off WiFi during battle. You can still finish the fight with no connection. Though be wary of connection timeouts so do it near the end.<br>
        If you don't like the result or you lost, exit client, turn on WiFi, re-enter client, take the fight again.<br>
        If satisfied ${altTextStyle('or saving your sanity', TextStyle.STRIKE)}, turn on WiFi after the battle finished.`,
        tags : [dataTags.BATTLE]
    },
    {
        questions : `Is there a way to know the map layout and its spawnable enemy units?`,
        answers : `${link('GFLMaps site.', 'https://pengupengupengu.github.io/gflmaps/')}`,
        tags : [dataTags["3P"], dataTags.MAP, dataTags.ENEMY]
    },
    {
        questions : `How can I save the enemy composition for later practice?`,
        answers : `Add Target<br>
        ${list(false, "Long press the enemy on the map and you'll see the button on the top-left.", 'Pause while in battle to see the button on the bottom-left.', 'Button appears on the bottom-left after losing a battle.', 'Adds the current enemy formation to the Target Practice in the Combat Sims.')}<br>
        GFAlarm<br>
        ${list(false, 
            `Use GFLMaps to take the enemy IDs you want to fight and enter them in the Custom Target Train under Packet Forger, with IDs separated by commas.<br>
            ${image('./assets/images/GFAlarmCTT.png', 'From u/UnironicWeeaboo')}<br>
            Works for comps that has been loaded into the client and is ${link('very safe.', 'https://old.reddit.com/r/girlsfrontline/comments/tqur46/weekly_commanders_lounge_march_29_2022/i312oo2/')}`)}<br>
        ${link('Matsuda recommendations.', 'https://gfl.matsuda.tips/post/everything-sucks-forever')}`,
        tags : [dataTags.ENEMY, dataTags.BATTLE, dataTags.MAP, dataTags["3P"]]
    },
    {
        questions : `How do I connect to GFAlarm with an emulator?`,
        answers : `Enter the GFAlarm proxy address to ProxyDroid or Drony.`,
        tags : [dataTags["3P"], dataTags.EMU]
    },
    {
        questions : `Is there a voodoo recipe for *insert pennies here*?`,
        answers : `${link('Github Database.', 'https://gf-db.github.io/')} Freedom of information, just add internet connection.`,
        tags : [dataTags.PROD]
    },
    {
        questions : `Is there a way for my game to feel smoother?`,
        answers : `${link('Gamepress article.', 'https://gamepress.gg/girlsfrontline/fixing-gfl-client-lag-possible-workarounds')}<br>
        ${link('Decompressed obb.', 'https://redd.it/mroqui')} Removes damage numbers, the main source of in-battle lag.<br>
        ${link('DIY decompression.', 'https://www.reddit.com/r/girlsfrontline/comments/lvwwtv/weekly_commanders_lounge_march_02_2021/gpugenl/')}`,
        tags : [dataTags.MISC]
    },
    {
        questions : `What's the Fire Control Component (FCC) used for?`,
        answers : `Upgrading 5${star} dolls to 6${star} through modding.`,
        tags : [dataTags.ITEM, dataTags.MOD]
    },
    {
        questions : `What is Bookshelf of Memories?`,
        answers : `Sidestories for the featured dolls. Rewards Friend Gossips or Unity Skills.`,
        tags : [dataTags.SIDE]
    },  //Get Friend Gossips list and Unity Skill pairings.
    {
        questions : `What is Central Data for?`,
        answers : `Unlocking the corresponding FST, promoting said FST, and used as a Data Patch if 5${star}.`,
        tags : [dataTags.ITEM, dataTags.HOC]
    },
    {
        questions : `When should I do T-Doll Heavy Production?`,
        answers : `Preferably during rate ups due to its high costs. Low priority otherwise since it's use at this stage of the game is for getting non-5${star} SGs and them not being widely used.`,
        tags : [dataTags.TDOLL, dataTags.PROD]
    },
    {
        questions : `How do I fill up/unlock enemies in the Enemy Index?`,
        answers : `Just fight them. Win or lose, we get them.`,
        tags : [dataTags.ENEMY]
    },
    {
        questions : `What equipments should I use on my dolls for battle purposes?`,
        answers : `${spoilerSummary('General equipments.', `${link(image('./assets/images/EquipInfograph.png'), 'https://big-stupid-jellyfish.github.io/GFMath/pages/newquip')}<br>AS-Val at night follows the day schema. SOP and STAR is SPEQ + VFL/PEQ. M16 is SPEQ + Exo/Armor.`)}<br>
        ${spoilerSummary('#2 Chip equipment.', 
            list(false,
                spoilerSummary('BigStupidJellyfish_', 
                    `${link(image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/chips/infographic.png'), 'https://big-stupid-jellyfish.github.io/GFMath/pages/chips')}<br>
                    ${googleEmbed('https://docs.google.com/spreadsheets/d/14xV50MSMBFGgN75E-Gy10WtzACb_KZdpxRKCYQ6FDQA')}`),
                spoilerSummary('mis', googleEmbed('https://docs.google.com/spreadsheets/d/1c0JhaSX9WyL3EB-7RCDE4NrfzR1YuWdYWidQ_06-PrQ'))
            ))}<br>
        ${spoilerSummary('AP thresholds.', image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/newquip/armor-reference.png'))}`,
        tags : [dataTags.TDOLL, dataTags.EQUIP, dataTags.ENEMY]
    },
    {
        questions : `How do I maximize the efficiency of my echelon's ROF?`,
        answers : `${link("u/BigStupidJellyfish_'s ROF calc.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/rof-calc')}<br>
        ${spoilerSummary('GFC Spreadsheet.', googleEmbed('https://docs.google.com/spreadsheets/d/1k74SCGGMHtwbl8gmTaETLsa8t12A7dWdj0V1tjdMD4Y'))}`,
        tags : [dataTags.TDOLL, dataTags.BATTLE, dataTags.SYSMECH]
    },
    {
        questions : `How do I get some Extra Potential Energy for Coalition Drills?`,
        answers : `Shop.`,
        tags : [dataTags.ITEM, dataTags.PA, dataTags.SIMS]
    },
    {
        questions : `Which dolls should I duplicate?`,
        answers : `${link('Matsuda notes.', 'https://gfl.matsuda.tips/post/worthwhiledupes')}<br>
        ${link('Gamepress suggestions.', 'https://gamepress.gg/girlsfrontline/t-doll-duping-guide')} Some details may not be applicable.<br>
        ${spoilerSummary('Discord recommendations.', image('./assets/images/RecommendedDupeGuns.png'))}`,
        tags : [dataTags.TDOLL]
    },  //Jesse, Varz, etc.
    {
        questions : `How high is fairy rate up?`,
        answers : `${googleEmbed('https://docs.google.com/spreadsheets/d/1CSC17pKJ8BDDm9YYNB8pFqT8k0Np_jWDeu_1X-qJ7yI')}`,
        tags : [dataTags.FAIRY, dataTags.PROD]
    },  //Redditor u/ConductorBichir's list IIRC
    {
        questions : `What's the drop rate for farmable dolls?`,
        answers : `Limited dolls on chapters aproximately have 0.8% drop rate on normal and 1% on emergency. Event farms have around 1%. 5${star} on normal maps have rates way below 1%... usually. Their droprates at Chapter 10 onwards seem to have higher rates. As for SPEQs, probably 1% too.<br>
        If you plan to farm a 5${star} doll in Combat Missions, just do Productions. You'll get more chances there.`,
        tags : [dataTags.TDOLL, dataTags.MAIN, dataTags.STORY, dataTags.SPEQ, dataTags.PROD]
    },
    {
        questions : `What does the term Limited in dolls in the chapters mean?`,
        answers : `Only limited to that particular map, nowhere else. Not limited by time, but by place.<br>
        Unless there's a Rescue Event/Boss Bully, but that's something else.`,
        tags : [dataTags.MAIN, dataTags.TDOLL]
    },
    {
        questions : `Do events get a rerun? And if so, when?`,
        answers : `Major events get a permanent rerun called Campaign Missions.<br>
        Seasonal events get one when it's their time.<br>
        Collabs are subject to their holders whims.`,
        tags : [dataTags.STORY]
    },
    {
        questions : `How do I remove HOCs from Target Practice?`,
        answers : `Unselect them like how you selected them.`,
        tags : [dataTags.SIMS, dataTags.HOC]
    },
    {
        questions : `How can I save my own voodoo recipe?`,
        answers : `${list(true, 'Craft from production using your own recipe.', 'Take the item.', 'Wait for 10 minutes for the voodoo list to refresh.', 'Look for it.')}`,
        tags : [dataTags.PROD]
    },
    {
        questions : `If a unit in my coalition echelon dies, will the rest of the team's affection drop too?`,
        answers : `No. Affection only drops if the unit itself kicks it.`,
        tags : [dataTags.COALITION, dataTags.LOVE, dataTags.ECH]
    },
    {
        questions : `How can I resupply a single doll and not the whole echelon?`,
        answers : `The Trifectra of Rejuvenation compels you. Or just do a one-man echelon (this one's a corpse drag staple).`,
        tags : [dataTags.TDOLL, dataTags.MAP, dataTags.ECH]
    },
    {
        questions : `If I MOD my T-Doll, is Level 100 still considered max level?`,
        answers : `Thankfully, this is where common sense wins. In short, ${altTextStyle('NO', TextStyle.BOLD)}.`,
        tags : [dataTags.MOD, dataTags.LEVEL]
    },
    {
        questions : `I can't get the gold (S Rank) and silver medals in maps because the enemies keep running all over me. How do I get them?`,
        answers : `Not now. Blaze through chapters until 7-6 first to get your account running, then come back to it later when you have at least 2 strong (Lv. 90, 5 links) echelons.`,
        tags : [dataTags.NEWB, dataTags.MAIN]
    },  // You can get this quickly through Newbie Career Quests. And you can complete the quests faster if you use friend/support echelons.
    {
        questions : `Can I transfer my Google Account to a Sunborn one?`,
        answers : `It's a one-way street from there.`,
        tags : [dataTags.ACCT]
    },
    {
        questions : `Does anyone know how to CE stack using GFAlarm?`,
        answers : `${list(true,
            'GFAlarm.',
            'File Save under Settings tab.',
            'Check "Save Theater Optimize Team".',
            'Open GFL under GFAlarm proxy (up to main screen).',
            'Go to the GFAlarm folder.',
            'Info folder.',
            '{Username}_{UID}__theater_optimize_team.csv for current armory.')}`,
        tags : [dataTags["3P"], dataTags.THEATER]
    },
    {
        questions : `Which HOC FSTs should I raise first?`,
        answers : `${table(['Rank', 'To Lv. 60', `To 5${star}`, 'To Max Iter'],
        ['01', 'BGM-71', '2B14',   '2B14'  ],
        ['02', '2B14',   'Mk 153', 'Mk 153'],
        ['03', 'Mk 153', 'AT4',    'M2'    ],
        ['04', 'AT4',    'M2',     'AT4'   ],
        ['05', 'M2',     'AGS-30', 'AGS-30'],
        ['06', 'AGS-30', 'BGM-71', 'BGM-71'],
        ['07', 'QLZ-04', 'QLZ-04', 'QLZ-04'],
        ['08', 'PP-93',  'PP-93',  'PP-93' ])}`,
        tags : [dataTags.HOC, dataTags.FST, dataTags.TIER]
    },  //Rudimentary rankings. Last place reserved for incomplete FSTs.
    {
        questions : `What are Main Tanks and Off Tanks?`,
        answers : `${descriptionList({'Main Tanks' : ['Guns that have survivability skills (i.e. smoke, eva boost, stun etc.).', 'Generally situated at the middle of the pack.'],
        'Off Tanks' : ['Guns that generally have damage skills (i.e. molotov, grenade, damage boost etc.) and/or a secondary damage soaker in some instances.', 'Situated at either middle-top or middle-bottom.']})}<br>
        All of these usually refer to SMGs.`,
        tags : [dataTags.ECH, dataTags.IMPT]
    },
    {
        questions : `How are people just rolling in 5${star} fairies?`,
        answers : `<p>${altTextStyle('Even dust, when piled up, can become a mountain.', TextStyle.ITALIC)}</p>
        Good logistics upkeep and rolling HECs everyday. Just think of crafting them a side thing that doesn't take a lot of attention.<br>
        For perspective on how long to raise one:<br>
        ${image('./assets/images/FairyRaising.png', 'From u/UnironicWeeaboo')}`,
        tags : [dataTags.FAIRY, dataTags.PROD]
    },
    {
        questions : `How high is a certain doll's pull rate during rate ups?`,
        answers : `Something like Anchored > Targeted > General >>> Normal.`,
        tags : [dataTags.TDOLL, dataTags.PROD]
    },
    {
        questions : `What are the resources I can get from Kalina's Daily Gift?`,
        answers : `${image('./assets/images/DailyGift.png')}<br>
        Gift amount apparently scales with her affection.`,
        tags : [dataTags.MARP, dataTags.ITEM]
    },
    {
        questions : `What is Corpse Whipping?`,
        answers : `The act of overkilling a dummy link by a huge amount. Especially egregious if 2 RFs hit an enemy on its deathbed. This is generally the reason why ROF-based guns are favored against low link-HP enemies.`,
        tags : [dataTags.BATTLE]
    },
    {
        questions : `Are there any sort of guides on how and when to roll for skins?`,
        answers : `${link('BigStupidJellyfish guide.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/gacha')}`,
        tags : [dataTags.RESUPPLY, dataTags.SKIN, dataTags.PRIME]
    },
    {
        questions : `What's the gacha rate for costumes?`,
        answers : `${table(['Item', 'Rate'],
        ['Costumes',                '02.00%'],
        [`5${star} furniture`,      '08.00%'],
        [`4${star} furniture`,      '34.20%'],
        [`4${star} gifts/cakes`,    '01.80%'],
        [`3${star} furniture`,      '54.00%'])}`,
        tags : [dataTags.RESUPPLY, dataTags.SKIN, dataTags.FURN]
    },
    {
        questions : `Can the Liu clones get stat buffs?`,
        answers : `${link('IOPWiki Trivia section says yes.', 'https://iopwiki.com/wiki/General_Liu#Trivia')}`,
        tags : [dataTags.TDOLL, dataTags.SKILL]
    },
    {
        questions : `Why is the PA notification in the home screen always lit up?`,
        answers : `There are available pulls left to burn.`,
        tags : [dataTags.PA]
    },
    {
        questions : `What are Black Beans/Red Beans?`,
        answers : `Golyat and Golyat+, respectively.`,
        tags : [dataTags.ENEMY]
    },
    {
        questions : `What is Combat Effectiveness Stacking?`,
        answers : `The process of stacking the useless number as high as possible, battle performance be damned.<br>
        ARSMG = 50-70k, RFHG = 40-60k, MGSG = 100k+ average max CE, including maxed fairies, equips, mods, oaths, and formation bonuses.<br>
        It's main purpose is for Theater Bosses and being on top of the Friend List.`,
        tags : [dataTags.MISC]
    },
    {
        questions : `What does the PA chip Pilfer do?`,
        answers : `Allows players to have a ${spoilerSummary('chance', image('./assets/images/PIlferRNG.png') + '<br>' + altTextStyle('Context: PIlfer subject to RNG.', TextStyle.QOUTE))} of getting ${spoilerSummary('S-Rank drops', youtubeEmbed('https://youtu.be/t6Vu72cajO0') + altTextStyle('Context: Coalition Medals require S-Rank battles.', TextStyle.QOUTE))} from adjacent enemies without fighting. This uses one bar of ration and ammo.<br> 
        Combine this with the ability to fight on one ammo bar to get two chances on one enemy.`,
        tags : [dataTags.COALITION, dataTags.EQUIP]
    },
    {
        questions : `What does oathing a doll do?`,
        answers : `Additional line for oath, higher affection cap, double EXP gain (map EXP, auto-battles, CRs) on MODs, complete repair and resupply (one-time only), stat bonuses for damage/evasion/accuracy (because higher affection cap).`,
        tags : [dataTags.TDOLL, dataTags.OATH]
    },
    {
        questions : `How do I get more support echelons?`,
        answers : `Add friends. Post your UID on a GFL community board and someone would ${altTextStyle('surely', TextStyle.STRIKE)}probably add you.`,
        tags : [dataTags.FRIEND, dataTags.ECH]
    },
    {
        questions : `Which map is best for auto-battles?`,
        answers : `Includes EXP per fight and level threshold to EXP penalty.<br>
        ${googleEmbed('https://docs.google.com/spreadsheets/d/1e_1oAa9Qm_tmWqbgFQca8ohzo29qcjctIwyIU9Mc1H0')}`,
        tags : [dataTags.AUTO, dataTags.LEVEL]
    },
    {
        questions : `Where can I fight Goliath Factories?`,
        answers : `In your dreams. Or maybe a custom enemy ID. Thing is, it's for PA purposes only.`,
        tags : [dataTags.ENEMY]
    },
    {
        questions : `For T-Doll Heavy Construction, how much worth is Tier 1 to Tier 2 or 3?`,
        answers : `Individual SG rate as of Feb 28-Mar 8, 2022 (Normal)<br>
        ${table(['Tiers', `3${star}`, `4${star}`, `5${star}`],
        ['Tier 1', '2.5-2.7%', '1.6/2.5-3.3%', '0.5/1-1.5%'],
        ['Tier 2', '1.2-1.5%', '1.9/2.7-4%', '0.8/1-2%'],
        ['Tier 3', '0%', '3-5.5%', '1-1.9%'],
        ['Special Rate', '', 'Super-Shorty', 'FP-6'])}<br>
        Overall SG rate is 50% every tier.`,
        tags : [dataTags.PROD, dataTags.TDOLL]
    },
    {
        questions : `I can't beat the current stage. Is this it for me?`,
        answers : `For the triple stages, just fall back to the last boss node you can handle. These nodes can mitigate the "Cleared Stage" penalty so it's worth more than non-boss higher node.<br>
        For Core stage, highest node clearable.`,
        tags : [dataTags.THEATER]
    },
    {
        questions : `Which facilities/base upgrades should I prioritize for battery expenditures?`,
        answers : `${list(true, 'Forward Basecamp.', 'Protocol Control Centre.', 'Intelligence Room.', 'Firing Range (Garage).', 'Fairy Chamber.', 'Data Room.', 'Rescue Station.')}`,
        tags : [dataTags.NEWB]
    },
    {
        questions : `What do I need for 8-1N Zas drag?`,
        answers : `${googleEmbed('https://docs.google.com/spreadsheets/d/1VT52c-_m4zTx-OFRPcxE9iFmmJY_AMC7CyJT1B7FLt8')}`,
        tags : [dataTags.TDOLL, dataTags.LEVEL]
    },
    {
        questions : `Do the purchaseable items in the Expedition Black Market ever change?`,
        answers : `No.`,
        tags : [dataTags.EXPED]
    },
    {
        questions : `Which dolls should I use for expedition?`,
        answers : `${image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-advantaged-dolls_0.jpg', 'Taken from Gamepress')}<br>
        And dummy links are not taken into account.`,
        tags : [dataTags.EXPED, dataTags.TDOLL]
    },
    {
        questions : `Where to use gems?`,
        answers : `${list(true,
            'Echelon slots up to 6 minimum, 8 for actually constant (ranking not included) logistics.',
            '5 dorms for batteries, enough to upgrade important facilities. More than that is your call.',
            "Storage slots especially if you're a collector. Or whenever you're getting annoyed with the pop-up.",
            'Your Mileage May Vary (YMMV).')}`,
        tags : [dataTags.NEWB, dataTags.ITEM]
    },
    {
        questions : `What teams/echelons should I build?`,
        answers : ` 2 ARSMGs first for general content, then RFHG for lategame, then MGSG if you want to deal with specialized enemies. The first team should ideally be Lv. 90 5-links before going for the next team.`,
        tags : [dataTags.NEWB, dataTags.ECH]
    },
    {
        questions : `Which HOC chips should I use?`,
        answers : `${link('Reddit guide for desktop calc.', 'https://redd.it/fnh1ey')}<br>
        ${spoilerSummary('Google Docs guide.', googleEmbed('https://docs.google.com/document/d/1pR6g-mgsy22_MhRPASL9c1wDoCuxfUwr-DCCMYmb7Ss'))}<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/guide-gfchipcalc-hoc-calculator-optimization-tool')}<br>
        ${link('GFChipCalc versions page.', 'https://github.com/Bunnyspa/GFChipCalc/releases')} If the proxy method doesn't work, use 7.3.0 or import the {username}_{UID}_user_info.json from GFAlarm.<br>
        ${link('Android Chip Calc download page.', 'https://bunnyspa.github.io/gfl/chipcalc')}<br>
        ${link('Alternate link for Android Chip Calc.', 'https://apkpure.com/girls-frontline-chip-calculator/bunnyspa.gfl.chipcalc/versions')}<br>
        ${link('Browser Chip Calc by FatalChapter.', 'https://hycdes.com/pages/GFT_ChipCal-EN.html')}<br>
        ${spoilerSummary('5-block chips that can be disassembled.', image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/2020-01/hoc-chip-shape-minmax-example.jpg', 'Taken from Gamepress'))}<br>
        These apps are safe for your account.`,
        tags : [dataTags["3P"], dataTags.HOC, dataTags.FST, dataTags.EQUIP, dataTags.IMPT]
    },
    {
        questions : `How does the Rescue Station work?`,
        answers : `${link('DMesse guide.', 'http://dmesse.egloos.com/m/3588696')}`,
        tags : [dataTags.PET]
    },
    {
        questions : `How often do general rate ups occur?`,
        answers : `January, May, September`,
        tags : [dataTags.PROD]
    },
    {
        questions : `Do autobattles give affection?`,
        answers : `A tiny bit.`,
        tags : [dataTags.AUTO, dataTags.LOVE]
    },
    {
        questions : `Do support echelons use equipment?`,
        answers : `Equipments used, formation, and apparently costumes too are saved instances.<br>
        Doll levels, equipment levels, skill levels, and chibis aren't. Meaning supports can be saved then leveled afterwards.`,
        tags : [dataTags.FRIEND, dataTags.ECH]
    },
    {
        questions : `Can I get the monthly log-in dolls again? If so, where?`,
        answers : `${link(`Farmable dolls in campaign maps, especially the 3${star} ones (aka the monthly dolls). Also includes the new clear rewards.`, 'https://big-stupid-jellyfish.github.io/GFMath/pages/campaign-rewards')}<br>
        As for the missing monthlies, just wait for a new event/campaign.`,
        tags : [dataTags.TDOLL, dataTags.CAMPAIGN]
    },
    {
        questions : `I wasn't able to clear the event. Will I still get the clear rewards when they get added to Campaign?`,
        answers : `Nope. Gutted rewards compared to original, even True Core Masks (TCM). Free shit is free shit though, and doll/crate rewards gets cycled to Limited Dolls. So skip the current major event's story if you have to and reap the rewards.`,
        tags : [dataTags.MARP, dataTags.ITEM, dataTags.CAMPAIGN, dataTags.MAJOR, dataTags.LEDOLL]
    },
    {
        questions : `How do tilescan skills work?`,
        answers : `Real-time scanning of dolls on own tiles when activating their skills. Meaning setup formation can have them with no dolls on top of their tiles and when they activate their skills in battle, whoever are on top of their bufftiles will get the effects of their skill. Note that their bufftiles basically move with them.`,
        tags : [dataTags.TDOLL, dataTags.SKILL, dataTags.IMPT]
    },
    {
        questions : `My resources (Manpower, Ammunitions, Rations, Parts) are uncomfortably low? Where can I get some?`,
        answers : `Most efficient and consistent is logistics. Though you can get them through the shop, quest and event rewards, campaign/major story node clears, and random nodes.`,
        tags : [dataTags.MARP, dataTags.LOGI, dataTags.NEWB]
    },
    {
        questions : `How do I get Platinum and Nova Medals?`,
        answers : `From whatever Major/Seasonal/Collab Event running right now. Platinum are for 5${star} dolls and Nova are for dolls 4${star} and below.`,
        tags : [dataTags.ITEM, dataTags.STORY, dataTags.TDOLL]
    },
    {
        questions : `T-Doll Costumes available now?`,
        answers : `u/ConductorBichir spreadsheets.<br>
        ${spoilerSummary('Costume Banners.', googleEmbed('https://docs.google.com/spreadsheets/d/10ceReDBnWKelZhSN0ztsK6EA2_14Ll8ktcXBHMMs9gQ'))} Includes furniture set and its complete set special effect.<br>
        ${spoilerSummary("Tactical Doll Skins.", googleEmbed('https://docs.google.com/spreadsheets/d/1fEnzlpQk5Jvja5PwzlpDn2ypqP3BHcGftqWWOLnK17E'))} Contains censor comparison for each unit.`,
        tags : [dataTags.TDOLL, dataTags.SKIN, dataTags.RESUPPLY]
    },
    {
        questions : `How do I build Vector to no-damage 13-4?`,
        answers : `${link('tempkaridc calculator.', 'https://tempkaridc.github.io/gf/vec')}<br>
        ${link('xVarz spreadsheet for different draggers.', 'https://docs.google.com/spreadsheets/d/1cuZPF-r1e6TyE4Rj2DNkSEova7Tc-Cczs7RaoAK2vII')}<br>
        ${link('Infographic.', 'https://cdn.discordapp.com/attachments/564028599682727937/929724568258629642/134.png')}`,
        tags : [dataTags.LEVEL, dataTags.TDOLL]
    },
    {
        questions : `How do I get a higher success rate for logistics?`,
        answers : `${altTextStyle('floor(mean of doll levels in echelon) * 0.45 + 15', TextStyle.CODE)} for normal logistics and<br>
        ${altTextStyle('floor(mean of doll levels in echelon) * 0.60 + 30', TextStyle.CODE)} for rate up logistics.`,
        tags : [dataTags.LOGI]
    },
    {
        questions : `What do they mean by bamboo?`,
        answers : `Bamboos are, in general, rifles with skills like Locked Shot, Steady Shot, Interdiction Shot, and the likes, wherein off cooldown, they have a charge gauge that dictates how powerful the skillshot is on activation. They're usually used to deal massive damage to a target, especially if coupled with FP buffers.`,
        tags : [dataTags.TDOLL, dataTags.SKILL, dataTags.IMPT]
    },
    {
        questions : `What are the resources that has a defined cap and how much can they store?`,
        answers : `${image('./assets/images/ResourceCap.png')}<br>
        Even then, all resources can be obtained without regards to max capacity through daily gifts, mission rewards, and whaling.`,
        tags : [dataTags.MARP, dataTags.ITEM]
    },
    {
        questions : `Where can I get a specific doll?`,
        answers : `For starters, check the index entry of that doll. There should be a panel that tells you where they can be obtained.`,
        tags : [dataTags.TDOLL]
    },
    {
        questions : `Is there a way to buy a missed day for daily log-ins?`,
        answers : `No chance.`,
        tags : [dataTags.MISC]
    },
    {
        questions : `I'm trying to clear the newbie career quests but I haven't gotten the rewards yet. Did I miss something?`,
        answers : `Those quests are not retroactive and should be cleared in sequence. Try clearing them from the top.`,
        tags : [dataTags.NEWB]
    },
    {
        questions : `How can I get some more Svarog High Altitude Bombing Aid Commissions?`,
        answers : `Weekly quest (8 standard captures), daily log-in, major events, shop (whenever a new banner starts).`,
        tags : [dataTags.ITEM, dataTags.PA]
    },
    {
        questions : `Recipe for Parachute/Paradrop Fairy?`,
        answers : `2000/500/2000/1000`,
        tags : [dataTags.FAIRY, dataTags.PROD]
    },
    {
        questions : `What does equipment calibration and enhancement do?`,
        answers : `${image('./assets/images/EquipCalibEnhance.png')}<br>
        Meaning calibration and enhancement are independent of each other.<br>
        Equipment Calibration raises the equipment's base stat. The RNG dictates how many calib tickets are wasted before maxing. When it's on its highest calibration, a MAX in blue box appears on said equipment.<br>
        Equipment Enhancement multiplies the base stat up to Lv. 10. Doesn't matter if Equip Enhancement Pills or fodder equips are used, it's merely a matter of resource cost per point raised.`,
        tags : [dataTags.EQUIP, dataTags.LEVEL, dataTags.NEWB]
    },
    {
        questions : `Does Hanyang Type 88 still do skipping stones?`,
        answers : `${link('Yes she does.', 'https://www.reddit.com/r/girlsfrontline/comments/qkzc9s/weekly_commanders_lounge_november_02_2021/hjvcbmt/')}
        Apparently also happens on tiles 7 and 9.`,
        tags : [dataTags.TDOLL, dataTags.SKILL]
    },  //reddit fix    
    {
        questions : `How viable is 2AR2SMG1HG?`,
        answers : `${link('BigStupidJellyfish analysis vs. 3AR2SMG.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/2v3ar')}<br>
        Depends on if there is no good AR-buffing AR for position 4. If there is one, 3AR1SMG1HG is a thing, specially for night maps.`,
        tags : [dataTags.TDOLL, dataTags.ECH]
    },
    {
        questions : `What are all the available pets right now?`,
        answers : `${image('./assets/images/PetSale.png')}<br>
        If you see a pet that is not on this list, it's a Cafe Story reward, collab pet, or event reward that haven't been added yet to the station.`,
        tags : [dataTags.PET]
    },
    {
        questions : `How do friend batteries work?`,
        answers : `Friend batteries recharge at 3am and 3pm UTC-8. The number of charges/batteries depends on the number of dorms your friend has. Use Netlify if you want to know when it resets. And as the name suggests, it only appears on your friend's dorms, not on any strangers (especially on a Random Visit).`,
        tags : [dataTags.FRIEND, dataTags.ITEM]
    },
    {
        questions : `What recipes should I use for my production?`,
        answers : `${link('Applicable Reddit Post.', 'https://redd.it/gfmelo')}<br>
        For the new equips, 150/151/50/50 (with armor), 150/151/10/50 (without armor).`,
        tags : [dataTags.PROD]
    },
    {
        questions : `Whats the best way of farming affection?`,
        answers : `Being in the leader slot in a battle echelon, being the MVP of a battle echelon, collecting daily hearts in dorms, cakes/lollipops/icecreams, passive regen by being in a dorm, gifting skins.<br>
        ${link('Write-up on what affects affection.', 'https://www.reddit.com/r/girlsfrontline/comments/cgpt7y/weekly_commanders_lounge_july_23_2019/ev0gw64/')}<br>
        ${link('Additional info on dorm affection.', 'https://www.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i29h382/')}`,
        tags : [dataTags.LOVE]
    },
    {
        questions : `As a beginner, is it worth to use batteries for combat reports?`,
        answers : `Probably if surplus EXP is maxed out, otherwise doubt it.`,
        tags : [dataTags.NEWB, dataTags.ITEM]
    },
    {
        questions : `How does Symmetric Infusion work exactly?`,
        answers : `${descriptionList({'Cognitive Infusion' : ['Basically, swaps sizes. Technically, swaps all stats aside from size. If both sides are upgraded, say Lv. 31 and Lv. 23, they become 23 and 31, not 1 and 31+.'], 
        'Golden Infusion' : ['Swaps the golden status between the two units, nothing more, nothing less.']})}`,
        tags : [dataTags.PA]
    },  //@Visual
    {
        questions : `Is the package in the shop worth it?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/energy-packages')}`,
        tags : [dataTags.MISC]
    },
    {
        questions : `Can I put 2 L2D skins in the double adjutant slot?`,
        answers : `${altTextStyle('L2D mode', TextStyle.QOUTE)}<br>
        ${altTextStyle('Double Adjutant', TextStyle.QOUTE)}<br>
        Pick one.`,
        tags : [dataTags.SKIN]
    },
    {
        questions : `How do I unlock special effects on commanders like flame auras etc.?`,
        answers : `${list(true, "Get a complete 5-slot from a set. Doesn't matter if male only or female only.",
        'Get their rare color variants.',
        '???',
        'Profit.')}`,
        tags : [dataTags.CMDR, dataTags.SKIN]
    },
    {
        questions : `Is there a list of doll farming routes for each map?`,
        answers : `Compilation of all farm routes for limited dolls and equipments on both campaign and main story.<br>
        ${googleEmbed('https://docs.google.com/document/d/1GUcA1ZHYVKBhTspdRYPIkECVZRoLFvqDnLrgrFb6VcU')}`,
        tags : [dataTags.MAIN, dataTags.CAMPAIGN]
    },  //By u/rcpz93 most likely
    {
        questions : `How do I build Coalition echelons?`,
        answers : `${link('Flowchart post.', 'https://redd.it/rkvisq')}<br>
        ${link('Gamepress list of units and build suggestions.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units')}`,
        tags : [dataTags.COALITION, dataTags.ECH]
    },
    {
        questions : `Are there any meta line-ups/echelon formation/team compositions?`,
        answers : `${link("u/BigStupidJellyfish_'s Imgur compilation of basic comps.", 'https://imgur.com/a/SHhVaBv')} Shouldn't be a gospel but a good starting point nonetheless.`,
        tags : [dataTags.ECH]
    },
    {
        questions : `What's the chronological order for the story?`,
        answers : `u/pointblanksniper's observations.<br>
        ${link('Overall.', 'https://www.reddit.com/r/girlsfrontline/comments/sm75vk/where_can_i_see_mirror_stage_story_line/hvvpppk/')}<br>
        ${link('Night Chapters.', 'https://www.reddit.com/r/girlsfrontline/comments/scouvz/questions_regarding_404/hu995o6/')}`,
        tags : [dataTags.LORE]
    },  //@Fix
    /*
        https://old.reddit.com/r/girlsfrontline/comments/sc8jed/weekly_commanders_lounge_january_25_2022/hupfxsr/
    */
    {
        questions : `Is it possible to earn previously missed hidden achievements in Campaign Missions?`,
        answers : `Yes.`,
        tags : [dataTags.CAMPAIGN]
    },
    {
        questions : `If I delete my unused speqs, will I be able to recover them?`,
        answers : `Since 2.09, dismantled/disassembled SPEQs can now be recovered/retrieved.`,
        tags : [dataTags.SPEQ]
    },
    {
        questions : `Is there a way to expand the armory, or am I stuck with 100 doll slots forever?`,
        answers : `${list(false, 'Shop>Items>Infrastructure>T-Doll slots +10.', 'Tap the locked echelon button.')}`,
        tags : [dataTags.MISC]
    },
    {
        questions : `Should I dummy link my dolls when corpse dragging?`,
        answers : `Recommended. Each link gives an additional 0.5x multiplier.`,
        tags : [dataTags.LEVEL]
    },
    {
        questions : `I want to F2PBTW. How do I do that?`,
        answers : `${descriptionList({
            'Gems' : ['Daily log-ins (300 monthly).', 
                'Sharing in FB/Twitter (30 weekly). You can cancel it at the last minute.',
                'S-Ranking Normal (10) and Emergency (30) Chapters.',
                'Achievements.',
                'Mini-Events, mainly, Keycard Events (Bingo).',
                'Ranking participation.'],
            'Tokens' : [link('Dailies (7 daily) and weeklies (5 weekly).', 'https://dmesse.egloos.com/m/3594243'),
                'Expedition.',
                'Logistics (~19 weekly).',
                'Achievements.',
                'Mini-Events: Point Event (70).',
                'Shop. Especially when there is a seasonal/collab/major event going on. Packages are also good.',
                'Maintenance (10 weekly) and Apolotokens.']
        })}`,
        tags : [dataTags.ITEM, dataTags.MAIN, dataTags.MINI, dataTags.EXPED, dataTags.LOGI, dataTags.STORY]
    },
    {
        questions : `Why aren't my dorm batteries appearing?`,
        answers : `If it's not within 11:00-14:00, 17:00-20:00, and 22:00-01:00 UTC-8, restart app.`,
        tags : [dataTags.DORM, dataTags.ITEM, dataTags.TECH]
    },
    {
        questions : `What are Extra Impulses and where can I get them?`,
        answers : `Stockable versions of Electronic Impulses.<br>
        You can get them through daily log-ins, weekly quests, achievements, and events.`,
        tags : [dataTags.PA, dataTags.ITEM]
    },
    {
        questions : `Read a guide that said to use a team of 2${star} & 3${star} dolls until I get enough cores to spend. Is it still worth doing it now?`,
        answers : `With the advent of Expeditions and Newbie Career Quests, you get enough dummy cores right off the bat. Don't overspend still.`,
        tags : [dataTags.ITEM]
    },
    {
        questions : `What's the rate up increment for Anchored Construction?`,
        answers : `${table(['Target', 'Estimated Increment'],
        ['4' + star,  '0.396%'],
        ['5' + star,  '0.083%'],
        ['Starter',   '0.19%'])}
        ${link('Base rate shown per doll is more or less their true rates.','https://old.reddit.com/r/girlsfrontline/comments/s6s9xj/weekly_commanders_lounge_january_18_2022/htmbjuc/')}`,
        tags : [dataTags.PROD]
    },
    {
        questions : `I got an "Illegal Action Detected" warning. What happened?`,
        answers : `Mostly desyncs and having "invalid" inputs. Just restart it.`,
        tags : [dataTags.TECH]
    },
    {
        questions : `I can't deploy a friend echelon. What do I do?`,
        answers : `${image('./assets/images/InitialDeploySupports.png')}<br>
        Either after operation start, a client restart, or a no due to limit.`,
        tags : [dataTags.FRIEND, dataTags.ECH, dataTags.TECH]
    },
    {
        questions : `How do I find Ouroburos in Operation Cube 1-4?`,
        answers : `${link('Oreo Finder.', 'https://kyouko.moe/urouro/#')}`,
        tags : [dataTags.CAMPAIGN, dataTags.ENEMY, dataTags["3P"]]
    },
    {
        questions : `Which HOC can destroy buildings?`,
        answers : `All of them. Building damage uses the Pierce stat, which is also used for destroying Force Shields.<br>
        As for which class is best for the job, ATWs.`,
        tags : [dataTags.HOC]
    },
    {
        questions : `What does "Rescue 5 T-Dolls" mean?`,
        answers : `Getting them as drops.`,
        tags : [dataTags.MISC]
    },
    {
        questions : `Where can I see doll voicelines?`,
        answers : `Doll Index Page>Top left as speaker. If it's missing, check if you downloaded the voice pack yet. Or just go to IOPWiki.`,
        tags : [dataTags.TDOLL]
    },  //@Visual
    {
        questions : `Is a particular doll already available in the EN server?`,
        answers : `Check Index.`,
        tags : [dataTags.TDOLL]
    },
    {
        questions : `What does Affection do?`,
        answers : `At 90 and above, gives stat bonuses indicated by pink numbers. At 10 below, gives stat penalties indicated by blue numbers.<br>
        It also enables oathing at 100.`,
        tags : [dataTags.LOVE]
    },
    {
        questions : `I'm trying to contact support and one of the infos they need is Account ID. Where can I see it?`,
        answers : `UID that is present in your commander screen or intro card.`,
        tags : [dataTags.TECH]
    },
    {
        questions : `Where can I get doll/fairy costume art?`,
        answers : `${link('36base Github Repository.', 'https://github.com/36base/girlsfrontline-resources')}`,
        tags : [dataTags.MISC]
    },
    {
        questions : `Which oath packages are better?`,
        answers : `2.09 Week 1 Package > Double Oath Package (Valentine's, White Day, <!-- Qixi/Tanabata,  -->Christmas), New Year's Package`,
        tags : [dataTags.OATH]
    },
    {
        questions : `What does "Event" mean on the left side of the mission select screen?`,
        answers : `Combat Missions: SPEQ rate up for X-4N or Special Rescue Event for X-6.<br>
        Combat/Campaign: 1.5x EXP, also includes the currently running event maps.<br>
        Logistics: Great Success Rate Up aka. higher rewards are more frequent.<br>
        Combat sim: All simulations unlocked.`,
        tags : [dataTags.MAIN, dataTags.CAMPAIGN, dataTags.LOGI, dataTags.SIMS]
    },
    {
        questions : `Can someone tell me what the difference is between Charge, Destroy, and Defend commands for coalition units?`,
        answers : `Lets melee units ${altTextStyle('Charge', TextStyle.BOLD)} down the lane.<br>
        Lets melee units approach and ${altTextStyle('Destroy', TextStyle.BOLD)} the nearest enemy.<br>
        Return and ${altTextStyle('Defend', TextStyle.BOLD)} the grid position.`,
        tags : [dataTags.COALITION, dataTags.BATTLE]
    },
    {
        questions : `How many Tactical Doll slots can I have?`,
        answers : `Up to 1000.`,
        tags : [dataTags.MISC]
    },  //Condolensces to u/headphone_question's wallet.
    {
        questions : `Why do people use M16 as tank for 0-2 corpse dragging?`,
        answers : `Can use Armor/SPEQ to reduce damage taken to 1, and T-Exo for reducing the number of hits taken.`,
        tags : [dataTags.LEVEL]
    },
    {
        questions : `Why are the doll skills not activating?`,
        answers : `Is the auto skill button on? Is it on forced manual? Is it a flare skill?<br>
        Active skills cannot activate when they cannot shoot, i.e. reloading, dolls moving, no enemy in range, no ammo/ration, in-between shot cooldowns.<br>
        Passive skills on the other hand will not activate only if they have no ammo or ration. This includes Slug's 3x damage and Flash's -3 damage.<br>
        Note though that there are a handful of exceptions.`,
        tags : [dataTags.TDOLL, dataTags.SKILL, dataTags.IMPT]
    },
    {
        questions : `How and why does a StrawberryPython team work so well?`,
        answers : `${googleEmbed('https://docs.google.com/document/d/105DXX2AlMB_wX0JpKGjPGsJ_zjsKOz_0bbd5ZshUx_o')}`,
        tags : [dataTags.ECH]
    },
    {
        questions : `The client in the Play Store is in a language I can't understand. Is there a way to download other server clients?`,
        answers : `CN - China (Bilibili and DigitalSky)<br>
        TW - Taiwan, Malaysia, Singapore<br>
        JP - Japan<br>
        KR - Korea<br>
        EN - Everything else<br>
        As for how to download it, check the sidebar of ${link('this', 'https://old.reddit.com/r/girlsfrontline/')} link under Downloads.`,
        tags : [dataTags.MISC]
    },  //@Totally gonna fix
    {
        questions : `How do general rate ups work?`,
        answers : `There are 2 sets of rate ups per general rate up.<br>
        First is the HOC rate up, where every 2 days is a specific FST's day for rate up. Note that only that FST's rate is increased within the Central Data pool. The core data rate remains the same.<br>
        Second is the tried amd tested Production rate up. Goes from Normal Doll, Normal Equip, Heavy Doll, Heavy Equip. Pulling chance for all 4${star} and 5${star} are increased.`,
        tags : [dataTags.PROD, dataTags.HOC, dataTags.FST, dataTags.TDOLL, dataTags.EQUIP]
    },  //@Check for errors
    {
        questions : `How do I scrap coalition units? I'm lost.`,
        answers : `Factory > Retirement (Disassemble) > Fourth + symbol.`,
        tags : [dataTags.COALITION]
    },
    {
        questions : `How can I get my favorite gun/doll?`,
        answers : `${descriptionList({'Factory Production' : [],
        'Rescue Drops' : [],
        'Clear Rewards' : []})}`,
        tags : [dataTags.TDOLL]
    },  //@Mega fix
    {
        questions : `What do advantaged dolls in combat map mean?`,
        answers : `20% FP boost for AR, RF, MG. 20% EVA boost for SMG, HG, SG.`,
        tags : [dataTags.MAP, dataTags.TDOLL]
    },
    {
        questions : `How many Quick Autobattle Tickets does it cost per stage?`,
        answers : `${lessEqual} 1 hour: 1 ticket<br>
        1-2 hours: 2 tickets<br>
        2+ hours: 3 tickets`,
        tags : [dataTags.AUTO, dataTags.ITEM]
    },
    {
        questions : `What happens to the reshuffle/refresh timer when the banner changes?`,
        answers : `Restarts from the top. Meaning refreshing just hours before Ringleader change has the same effect as refreshing 2 days ago.<br>
        Reports suggest that the timer after the change doesn't start until opening the bombing screen.`,
        tags : [dataTags.PA]
    },  //@Test - Check refresh timer after hours of banner change
    {
        questions : `Do links matter regarding the amount of resources a coalition unit would take on resupply?`,
        answers : `From a single-link Dinergate to an entire gunner stack, they all take 360 Ammo/Ration.`,
        tags : [dataTags.COALITION, dataTags.MAP]
    },
    {
        questions : `Anyone know what type of equipment "Medals" is?`,
        answers : `For now, placeholder. No equipment of its type exists yet.`,
        tags : [dataTags.EQUIP]
    },
    {
        questions : `Where can I see stat previews of of PA units?`,
        answers : `${googleEmbed('https://docs.google.com/spreadsheets/d/1TYKbdjuOdOMsvaaIduWW_8FF0tm27BjwKbC4uggl1wE')}`,
        tags : [dataTags.COALITION]
    },
    {
        questions : `I haven't seen this icon/card BG before. Where can I get some of it?`,
        answers : `Most likely a Cafe Costume Side Story reward.`,
        tags : [dataTags.MISC]
    },
    {
        questions : `I'm in dummy core hell. How do I get some more?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/its_still_not_enough_fuck')}<br>
        ${link('BigStupidJellyfish write-up.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/core-rates')}<br>
        Run any daytime leveling maps for combined core and exp farming. You can also farm during core rate up by using the handgun recipe.`,
        tags : [dataTags.ITEM]
    },
    {
        questions : `Any way to increase commander level really quickly?`,
        answers : `Leveling dolls through leveling maps.`,
        tags : [dataTags.CMDR, dataTags.LEVEL]
    },  //@Test - exact values per doll leveling
    {
        questions : `How do I switch accounts?`,
        answers : `Settings>Manage Accounts>Log out, then on the log-in screen, switch accounts.`,
        tags : [dataTags.ACCT]
    },
    {
        questions : `Where can I read the MOD, costume, event stories, and all that?`,
        answers : `${descriptionList({
            'Compilations' : [link('GF Translated Story Material (+ other stuff)', 'https://drive.google.com/drive/folders/14sNze_lnv5EwL1bl_g3IOVQIo6GGYUJp'),
                link('GF Translations', 'https://drive.google.com/drive/folders/14bAuWaGbagJwucmlit3EkXFqMRV9NHZO'),
                link('The Official #gf-loreroom Information Index', 'https://docs.google.com/spreadsheets/d/1LYV05D7kGTKp_FS7cJrNrJlVxeRAnFVnr6vCTo5F-YM'),
                link('Campaign Stuff', 'https://drive.google.com/drive/folders/15EjxktNclESJ6e6rb5udNxOaczNTPZVZ'),
                link('Costume Stories', 'https://drive.google.com/drive/folders/13AiWn_jgIxWUTK2T7EVjFV8Rkk6jptEs'),
                link('GFL Manga', 'https://drive.google.com/drive/folders/1fEYYxtXAFTfyovwW-WRvNOpbXTu1_hlk'),
                link("u/TheGreyGhost00's Reddit Outline", 'https://redd.it/uwdiro')],
            'Lore' : [link('Confidential Files', 'https://docs.google.com/document/d/1JyJ-o9gHCeCdN2h8PhhRdFczejLs6Wve8dziQZUSEGk'),
                link('Confidential Files 2: New and Emerging Forms of Threat', 'https://drive.google.com/drive/folders/17_9Tu-90ZWrvlHPzgWbVwSQebJ4nHiR7'),
                link("The Background History of Girls' Frontline", 'https://twitter.com/YZsFerrari/status/1379877420732448777'),
                link('IOPWiki Lore', 'https://iopwiki.com/wiki/Lore'),
                link('Gamepress Lore Directory', 'https://gamepress.gg/girlsfrontline/lore-directory')],
            'Main Story' : [link("u/RhythmLunatic's GFL Cutscene Interpreter", 'https://gfl.amaryllisworks.pw'),
                link("Shoul's Story Scenes Playlists", 'https://www.youtube.com/channel/UC_JmwXOfYqOKpGGtc5gcVmw'),
                link("Girls' Frontline Full Story Comprehension Playlist Translated up to Isomer", 'https://youtube.com/playlist?list=PL9y52Flm1yM-tJJoom2zfrWTpaO1mTw8M'),
                link("u/DoctuhD's Girls Frontline Summary from Isomer to Polarized Light", 'https://docs.google.com/document/d/1yn0sjoktIb2f-KC6bxn3R0qpCUChBPpIQuERcLmBHbg')]
        })}`,
        tags : [dataTags.LORE]
    },
    {
        questions : `What's the use case for 5HGs?`,
        answers : `Good single target burst damage. Quick movespeed. Consumes minimal resources.`,
        tags : [dataTags.ECH, dataTags.TDOLL]
    },
    {
        questions : `What're the rewards for the Defense Drill?`,
        answers : `${link('Matsuda Guide and Line-up, circa 2.08.', 'https://gfl.matsuda.tips/post/defdrill')}`,
        tags : [dataTags.SIMS]
    },
    {
        questions : `Which doll should I get with True Core Masks?`,
        answers : `${image('./assets/images/VeryReliableTCMGuide.png')}<br>
        ${image('./assets/images/SeriousTCMGuide.png')}<br>
        Note that you can only use it on craftable dolls, so no P22(drop only) or Deagle(event reward).`,
        tags : [dataTags.ITEM]
    },
    {
        questions : `What would I need when building night ARSMGs?`,
        answers : `AR: Any.<br>
        SMG: Direct-fire SMGs are a hard sell because of low base ACC and night ACC penalty.<br>
        HG: Used for expanding vision 1 node away. Stack with Illumination Fairy.<br>
        PEQ: Mainly used by ARs since SMGs are mostly either tank or AoE. 4${star} is a good stopgap.`,
        tags : [dataTags.ECH, dataTags.TDOLL]
    },
    {
        questions : `Which T-Doll would be better to anchor for the rate up?`,
        answers : `On one hand, 4${star} can't be TCM'd. On the other hand, 5${star} have low construction rates. And it also depends on the skills of said dolls.`,
        tags : [dataTags.PROD, dataTags.TDOLL]
    },
    {
        questions : `What does each gun class do?`,
        answers : `${table(['Class', 'Roles', 'Target Priority', 'Caveat'],
        ['Assualt Rifle (AR)', 'Anti-Swarm<br>Anti-Boss', 'Frontline', 'Weak to armored enemies'],
        ['Submachine Gun (SMG)', 'Evasion Tank<br>Anti-Swarm', 'Frontline', 'Accuracy is non-existent'],
        ['Rifle (RF)', 'Anti-Armor', 'Backline', 'Weak to swarms'],
        ['Handgun (HG)', 'Buffer<br>Debuffer', '???', 'Cannot facetank'],
        ['Machine Gun (MG)', 'Opening Volley', 'Random', 'Reloads/Stops shooting at around 6s'],
        ['Shotgun (SG)', 'Armor Tank', 'Frontline', 'Poor evasion'])}`,
        tags : [dataTags.TDOLL, dataTags.NEWB]
    },  //@Add info
    {
        questions : `How does AK-15's skill actually work?`,
        answers : `${link("BigStupidJellyfish_'s analysis.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/ak15')}`,
        tags : [dataTags.TDOLL, dataTags.SKILL]
    },
    {
        questions : `What's the time frame for modding dolls?`,
        answers : `From their release until EOS.`,
        tags : [dataTags.MOD]
    },
    {
        questions : `Will I get the rewards after adding a returning commander as friend for the callback event?`,
        answers : `${image('./assets/images/CallbackSupporter.png')}<br>
        ${image('./assets/images/CallbackReturner.png')}`,
        tags : [dataTags.FRIEND]
    },
    {
        questions : `Are the previous monthly Special Equipments obtainable in some way?`,
        answers : `No word as of now.`,
        tags : [dataTags.SPEQ]
    },
    {
        questions : `Is there an efficient way of raising a Parachute Fairy?`,
        answers : `${link("markhydroxyl's github notes.", 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_raising_paras.md')}<br>
        ${link('Logistics for HEC crafting.', 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_hec_logis.md')}<br>
        ${spoilerSummary('Fairy Development Calculator.', googleEmbed('https://docs.google.com/spreadsheets/d/1Zcz6Yp3sduhUXY9jo2HCX4pOdiIQioZcS8v6xMK01Pk'))}`,
        tags : []
    },
    {
        questions : `Which HOC/FSTs have L2Ds?`,
        answers : `AT4, BGM-71, AGS-30`,
        tags : [dataTags.FST]
    },
    {
        questions : `Where are the skins? I can't find them.`,
        answers : `${image('./assets/images/SkinLocation.png', 'Dorms > Warehouse > Gifts')}`,
        tags : [dataTags.SKIN]
    },
    {
        questions : `What should I do during a collab?`,
        answers : `Farm event specific currencies (NOT Platinum or Nova medals), get all collab characters, their Special Equipments, and the fairy, grind for the dolls you don't have yet. Combat reports and affection boosters are low on the shop priority list.`,
        tags : [dataTags.COLLAB]
    },
    {
        questions : `For the datasheet GFAlarm generated for Theater, which is more important, combat effectiveness or predicted damage?`,
        answers : `Predicted damage.`,
        tags : [dataTags.THEATER, dataTags["3P"]]
    },
    {
        questions : `Update progress is stuck at 90%/100%. What should I do?`,
        answers : `Wait a minute, change WiFi connection, change to data, use VPN, restart client, delete cache, ${link('do a manual patch', 'https://github.com/lloyddunamis/gfl_manualpatch/blob/main/FullResource_readme')}, ${link('delete some files', 'https://twitter.com/Synexcu/status/1310117595094216709?s=19')}, reinstall (with minimum data first), phone restart, or a combination of any of the above coupled with sheer determination to do it for days on end.`,
        tags : [dataTags.TECH]
    },
    {
        questions : `What are these General Data I keep getting?`,
        answers : `Used for FSTs that are not yet 5${star}. Limitations being only usable to FSTs in the gacha pool, and the data can't be used for iteration.<br>
        If you plan to big brain with this, churn your FST-specific central data to patches first, because they're the priority data to use before general data.`,
        tags : [dataTags.ITEM, dataTags.HOC, dataTags.FST]
    },
    {
        questions : `Just noticed that the Black Market Shop in the Forward Basecamp has a Costumes tab. Anyone know what that's about?`,
        answers : `Shop for previous event only cosmetics.<br>
        ${image('./assets/images/BlackMarketCostumes.png', 'From u/UnironicWeeaboo')}<br>
        Currently released items in the older servers.`,
        tags : [dataTags.EXPED]
    },
    {
        questions : `Should I try getting all ringleaders or should I just save for who I want?`,
        answers : `Ideally, yes. Statistically, getting all ringleaders on their first run is through luck or money. As an F2P, you could probably get a Ringleader every other month.`,
        tags : [dataTags.PA, dataTags.COALITION]
    },
    {
        questions : `I'm getting a "resource full" warning. What would that item be?`,
        answers : `${image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-loot-rack.jpg', 'Taken from Gamepress')}<br>
        If the Mid Rewards rack is not empty, look at your armory.<br>
        If it's the End Rewards, check your Black Market currencies.`,
        tags : [dataTags.EXPED, dataTags.ITEM]
    },
    {
        questions : `I'm trying to S-Rank the stage and I got the kill requirements but I can't get the gold medal. What gives?`,
        answers : `Allied/support/friend echelons do not count. There's a counter on the bottom-left and the white number is what's being counted.`,
        tags : [dataTags.MAP]
    },
    {
        questions : `Is it worth it to reset the pool once I got the Ringleader?`,
        answers : `Depends on if you want the remaining units.`,
        tags : [dataTags.PA]
    },
    {
        questions : `Does cooldown reduction also reduce initial cooldown?`,
        answers : `Yes.`,
        tags : [dataTags.SYSMECH, dataTags.TDOLL, dataTags.SKILL]
    },
    {
        questions : ``,
        answers : ``,
        tags : []
    },
]);



