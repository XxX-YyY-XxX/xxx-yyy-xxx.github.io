const lessEqual = '≤';
const star = '★';
const tm = '™️';
//🍰

export const dTag = Object.freeze({
    //#region Combat Tabs
        //STORY : 'StoryEvents',          //For questions that apply to Major, Collab, and Seasonal Events.
            MAJOR : Object.freeze({val : 'MajorEvents', desc : 'Main story. Added to Campaign after a while.'}),
            SEASON : Object.freeze({val : 'SeasonalEvents', desc : 'Happens every New Year, X-mas, Halloween, etc.'}),
            COLLAB : Object.freeze({val : 'Collaboration', desc : 'Reason: "He liked it."'}),
        MAIN : Object.freeze({val : 'CombatMissions', desc : 'Main missions aka Chapters 1-13.'}),
            AUTO : Object.freeze({val : 'AutoBattles', desc : 'Lazy farming.'}),
        LOGI : Object.freeze({val : 'Logistics', desc : 'Main source of MARP and tickets.'}),
        SIMS : Object.freeze({val : 'CombatSimulations', desc : 'Place to get upgrade materials.'}),
        CAMPAIGN : Object.freeze({val : 'CampaignMissions', desc : 'Permanent Major Events.'}),
        THEATER : Object.freeze({val : 'Theater', desc : 'Backstab central.'}),
    //#endregion
    //#region Armory Tabs
        TDOLL : Object.freeze({val : 'TacticalDolls', desc : 'Anything T-Doll related. Use as secondary tag.'}),
            LEDOLL : Object.freeze({val : 'CycleDropDolls', desc : 'Reward dolls that now wander the rerun hell.'}),
        COALITION : Object.freeze({val : 'CoalitionUnits', desc : 'PA counterpart of Tactical Dolls.'}),
        EQUIP : Object.freeze({val : 'Equipments', desc : 'Gun attachments.'}),
            SPEQ : Object.freeze({val : 'SpecialEquipments', desc : 'Equips specific to a doll.'}),
        ITEM : Object.freeze({val : 'ConsumableItems', desc : 'Tickets, cores, gems, batteries, shop items...'}),
            TCM : Object.freeze({val : 'TrueCoreMask', desc : `Used to redeem 5${star} prod dolls.`}),
        FAIRY : Object.freeze({val : 'Fairies', desc : 'Sixth man of the team.'}),
        FST : Object.freeze({val : 'FireSupportTeam', desc : 'Rockets and mortars, the first of the HOC.'}),
    //#endregion
    //#region Facilities
        ECH : Object.freeze({val : 'EchelonFormation', desc : 'Deployable teams.'}),
        PROD : Object.freeze({val : 'FactoryProduction', desc : 'Ancient Unit Gacha.'}),
        MOD : Object.freeze({val : 'NeuralUpgrade', desc : 'Extra limit break.'}),
        DORM : Object.freeze({val : 'Dormitories', desc : 'Battery charger.'}),
            RESUPPLY : Object.freeze({val : 'Resupply', desc : 'Dorm gacha.'}),
            SKIN : Object.freeze({val : 'Costumes', desc : 'True money sink.'}),
            FURN : Object.freeze({val : 'Furniture', desc : '"Dorm Equipments."'}),
        HOC : Object.freeze({val : 'HeavyOrdnanceCorps', desc : 'Shelling support.'}),
        EXPED : Object.freeze({val : 'ForwardBasecamp', desc : "Casual's dream QOL."}),
        PA : Object.freeze({val : 'ProtocolAssimilation', desc : 'PA pulling and coalition drills.'}),
    //#endregion
    //#region Devices
    APPLE : Object.freeze({val : 'AppleDevices', desc : 'iOS exclusive features.'}),
    EMU : Object.freeze({val : 'Emulators', desc : 'Emulator exclusive features.'}),
    //ANDROID : 'AndroidDevices',
    //#endregion
    //#region Home Tabs
    CMDR : Object.freeze({val : 'Commander', desc : '"Self-insert."'}),
    MINI : Object.freeze({val : 'MiniEvents', desc : 'Keycard Events, Point Events, etc.'}),
    SHOP : Object.freeze({val : 'Shop', desc : 'Buy things here.'}),
    FRIEND : Object.freeze({val : 'Friends', desc : 'The helpful kind.'}),
    //#endregion
    MISC : Object.freeze({val : 'Miscellaneous', desc : 'Default tag.'}),
    ACCT : Object.freeze({val : 'AccountManagement', desc : 'Account data and integrity.'}),
    TECH : Object.freeze({val : 'Troubleshooting', desc : 'DIY tech support.'}),
    '3P' : Object.freeze({val : 'ThirdParty', desc : 'Safe until said otherwise.'}),
    NEWB : Object.freeze({val : 'NewbieGuide', desc : 'Things new/early-game players should know.'}),
    PRIME : Object.freeze({val : 'TopicPrimer', desc : "Starter explanation of it's paired tag."}), //Must be the first box of it's paired tag.
    TIER : Object.freeze({val : 'TierList', desc : 'Basic guideline on who are the best.'}),
    ANNIV : Object.freeze({val : 'Anniversary', desc : "Anything concerning the game's anniversary."}),
    IMPT : Object.freeze({val : 'Important', desc : 'Things new players would need for late-game.'}),
    SYSMECH : Object.freeze({val : 'SystemMechanics', desc : 'Explanation on underlying mechanics of the game.'}),
    ENEMY : Object.freeze({val : 'EnemyUnits', desc : 'Things regarding enemy info.'}),
    MAP : Object.freeze({val : 'FieldMap', desc : 'Node-based overworld.'}),
        BATTLE : Object.freeze({val : 'Skirmishes', desc : 'Where bullets rain.'}),
    SIDE : Object.freeze({val : 'SideStory', desc : 'Extra stories.'}),
    SKILL : Object.freeze({val : 'Skills', desc : 'Unit skills.'}),
    LOVE : Object.freeze({val : 'Affection', desc : '"Keep it high."'}),
        OATH : Object.freeze({val : 'OathSystem', desc : 'Marriage.'}),
    LEVEL : Object.freeze({val : 'Leveling', desc : 'Mostly Corpse Drag.'}),
    PET : Object.freeze({val : 'Pets', desc : 'Yes.'}),
    OJ : Object.freeze({val : 'LuffberryChess', desc : 'PVP sidegame.'}),
    LORE : Object.freeze({val : 'Story/Lore', desc : 'Main meat of the series.'}),
    MARP : Object.freeze({val : 'FourResources', desc : 'Manpower, Ammunition, Rations, Parts.'}),
    REF : Object.freeze({val : 'Compilation', desc : 'Reference compilations.'}),
    CE : Object.freeze({val : 'CombatEffectiveness', desc : 'Clutch metric.'}),
    //KALINA : "Kalina",
});

//#region Functions
/** @param {string} link */
function image(link, onHover = null, onLoadFail = 'Image loading failed.') {
    return `<img src="${link}" alt="${onLoadFail}" ${onHover ? `title="${onHover}"` : ''}>`
}

/** @param {string} link */
function link(linkText, link) {
    return `<a href="${link}">${linkText}</a>`;
}

/** @param {boolean} ordered */
function list(ordered, ...any) {
    const htmlElem = ordered ? 'ol' : 'ul';
    return `<${htmlElem}>${any.map(val => `<li>${val}</li>`).join('')}</${htmlElem}>`;
}

/** @param {string} docLink Ends in alphanumeric */
function googleEmbed(docLink) {
    return `<figure>
        <iframe src="${docLink}/preview?pli=1"></iframe>
        <figcaption><a onclick="ReloadIFrame(this)">Reload Frame</a> \| ${link('Source Link', docLink)}</figcaption>
    </figure>`;
}   //<button type="button" ></button>

/** @param {string} videoID Youtube video or playlist ID*/
function youtubeEmbed(videoID) {
    var identifier = videoID.length == 11 ? videoID : `videoseries?list=${videoID}`
    return `<iframe src="https://www.youtube.com/embed/${identifier}" allowfullscreen></iframe>`
}

/** @param permalink ...comments/${permalink}/?...*
function redditEmbed(permalink) {                                       //needs more fix, how to check support
    return `<a href="https://www.reddit.com/r/girlsfrontline/comments/${permalink}/">For load fail purposes.</a><br>
    <iframe id="reddit-embed" src="https://www.redditmedia.com/r/girlsfrontline/comments/${permalink}/?depth=1&amp;showmore=false&amp;embed=true&amp;showmedia=false&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="278" width="640" scrolling="no"></iframe>`
}*/

/** @param {Array} headerArray Nullable value @param {Array[]} arrayOfArrays */
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

/** @param {Object} dictOfArray \{key : descriptions[]} */
function descriptionList(dictOfArray) {
    var descs = '';
    for (const descObject in dictOfArray) {
        descs += `<dt>${descObject}</dt>` + dictOfArray[descObject].map(val => `<dd>${val}</dd>`).join('');
    }
    return `<dl>${descs}</dl>`;
}
//#endregion

export const cardData = Object.freeze([
    //#region Topic Primers
    {
        questions : `I can't access/press/see things, what do I do?`,
        answers : `Have you tried restarting your application? This should be the default response to everything.`,
        tags : [dTag.TECH, dTag.PRIME, dTag.IMPT]
    },
    {
        questions : `How do I level my girls?`,
        answers : `First is grinding them on leveling maps, mainly through ${spoilerSummary('corpse dragging', 
            `Also called Poor Run or Beggar Run, it is a method of leveling dolls (and fairy) using minimal resources. This is done by only supplying a single doll echelon then placing them in a non-supplied echelon composed of dolls you want to level.<br>
            ${spoilerSummary("Ceia's 0-2 drag guide.", 
                `${youtubeEmbed('vqvPpO1vKqw')}<br>
                ${googleEmbed('https://docs.google.com/document/u/0/d/1PkxJ7ObdGW_cS_qbzAxQ_hoC1SFse3HNYWlnywZfPuo')}`)}<br>
            ${link('Matsuda guide per leveling map.', 'https://gfl.matsuda.tips/post/leveling_guide')}<br>
            ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/optimizing-leveling-introduction')}<br>
            ${link('GFLCorner guide.', 'https://www.gflcorner.com/efficient-leveling-guide/')}<br>
            ${link('DMesse guide.', 'http://dmesse.egloos.com/m/3567918')}`)}.<br>
        Second is using ${spoilerSummary('Combat Reports (CR)', list(false,
            'Acquired through Forward Basecamp, Data Room, the shop during events, or as a reward.',
            "Can be gifted by going to the Dorm>Warehouse>Gift tab or going to your owned doll's profile and tapping the + button by the EXP bar.",
            'Gives 3000 fixed EXP per report, unaffected by dummy link EXP multiplier.'))}.`,
        tags : [dTag.TDOLL, dTag.LEVEL, dTag.PRIME, dTag.NEWB]
    },
    {
        questions : `What is Combat Effectiveness?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/ce')}`,
        tags : [dTag.CE, dTag.PRIME]
    },
    {
        questions : `What is Expedition/Forward Basecamp?`,
        answers : `${link('Gamepress Detailed Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-basecamp-and-exploration')}<br>
        ${link('GFC Primer.', 'https://www.gflcorner.com/expedition-system-mini-guide/')}<br>
        ${link('ATM Guide.', 'https://gfl.matsuda.tips/post/weareabsolutenotlostiswear')}<br>
        Important note is that FB unlocks at Commander Lv. 20.`,
        tags : [dTag.EXPED, dTag.PRIME, dTag.NEWB]
    },
    {
        questions : `Are there any general guides for Protocol Assimilation/Coalition Units/SF Capture Operation?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/ironbloodedairconditioning')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Protocol_Assimilation')}<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-first-impressions-revamped')}<br>
        ${spoilerSummary("Cleista's basic Twitter guide.", 
            `${link(image('https://pbs.twimg.com/media/E5CzhbRXEAEB-XH?format=jpg&name=4096x4096'), 'https://twitter.com/CleistaCeleste/status/1409824210571214849')}<br>
            Applicable mainly for "I really want to get this ringleader."`)}<br>
        Apparently, this unlocks after beating 7-5 Normal.`,
        tags : [dTag.PA, dTag.PRIME]
    },
    {
        questions : `How do Neural Upgrades/MODs work?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-neural-upgrade')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/modding')}<br>
        ${link('GFC guide.', 'https://www.gflcorner.com/neural')}`,
        tags : [dTag.MOD, dTag.PRIME]
    },
    {
        questions : `What are Fairies?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/fairies')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Technical_Fairies')} Unupdated rework skills.<br>
        ${link('GFC guide Part 1.', 'https://www.gflcorner.com/fairy/')} Fairies up to CT only.<br>
        ${spoilerSummary('GFC guide Part 2.', googleEmbed('https://docs.google.com/spreadsheets/d/1x6_YysDi0h89jKE9vEW2_fbxi7gG7XV5jjJqX8O41rw'))} Unupdated fairy list.`,
        tags : [dTag.FAIRY, dTag.PRIME]
    },
    {
        questions : `How to HOC?`,
        answers : `${link('Gamepress Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-hoc-combat-basics')}<br>
        ${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Heavy_Ordnance_Corps')}<br>
        ${link('Matsuda Guide.', 'https://gfl.matsuda.tips/post/hocs')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/hoc-guide-by-gfc/')}<br>
        ${spoilerSummary("Ceia's Video Guide.", youtubeEmbed('rsFyXRDAi6I'))}<br>
        ${link("u/Xealiouth's Guide.", 'https://redd.it/95nrou')}`,
        tags : [dTag.HOC, dTag.PRIME]
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
        tags : [dTag.THEATER, dTag.PRIME]
    },
    {
        questions : `What's a True Core Mask and how do I use it?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/true-core-mask-revamped-who-get')}`,
        tags : [dTag.TCM, dTag.PRIME]
    },
    {
        questions : `Are there any sort of guides on how and when to roll for skins?`,
        answers : `${link('BigStupidJellyfish guide.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/gacha')}`,
        tags : [dTag.RESUPPLY, dTag.TDOLL, dTag.SKIN, dTag.PRIME]
    },
    {
        questions : `What does Affection do?`,
        answers : `${descriptionList({
            'Tactical Dolls' : ['At 90 and above, gives stat bonuses indicated by pink numbers.',
                'At 10 below, gives stat penalties indicated by blue numbers.',
                'Enables oathing at 100.',
                'If a doll dies in a non-boss fight, that particular doll will lose 10 points. Everyone else loses 5 points.'],
            'Coalition Units' : ['If a unit dies in battle, only that unit will lose affection.',
                'Enables oathing at 100 for ringleaders only.'],
            'Kalina' : ['Raised through daily hearts or spending gems<!-- on non-infrastructures-->.']
        })}`,
        tags : [dTag.LOVE, dTag.PRIME, dTag.OATH, dTag.TDOLL, dTag.COALITION]
    },
    {
        questions : `What is Luffberry Chess?`,
        answers : `GFL version of 100% Orange Juice, I guess?<br>
        And it's called "chess" only because boardgame.<br>
        ${link("u/fortis_99's tips.", 'https://redd.it/rz4uye')}`,
        tags : [dTag.OJ, dTag.PRIME]
    },
    //#endregion
    //#region Tier Lists
    {
        questions : `Is XXX doll good and is it safe to retire them?`,
        answers : `${link('Matsuda Quips.', 'https://gfl.matsuda.tips/dolls/')}<br>
        ${link('Gamepress Overview.', 'https://gamepress.gg/girlsfrontline/t-dolls-list')}<br>
        ${link('KR Wiki.', 'https://namu.wiki/w/%EC%86%8C%EB%85%80%EC%A0%84%EC%84%A0/%EC%9D%B8%ED%98%95%EB%8F%84%EA%B0%90')}<br>
        ${link("Fatalchapter's bilibili guide.", 'https://www.bilibili.com/read/readlist/rl100361')} Updated up to Jashin dolls.<br>
        ${link("Sijun's list.", 'https://www.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i1rph1l/')} Translated by u/ConductorBichir.`,
        tags : [dTag.TDOLL, dTag.TIER]
    },
    {
        questions : `Is there a tier list for good PA units?`,
        answers : `${link("u/CheneyQWER's tier list.", 'https://redd.it/uirvxz')}<br>
        ${link('Gamepress units guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units')} Use the search bar if a certain PA unit is unavailable in the page.`,
        tags : [dTag.COALITION, dTag.TIER]
    },
    {
        questions : `Who should I prioritize to MOD first?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/neural-upgrade-priority-guide')}<br>
        ${spoilerSummary('CN MOD list.', image('./assets/images/CNMODTier.png'))}`,
        tags : [dTag.MOD, dTag.TIER]
    },
    {
        questions : `Is there a tier list for fairies?`,
        answers : `${image('./assets/images/FairyTier.png', "Sijun's list")}<br>
        For the equipments, top number is the recommended quantity, bottom number is the reserve quantity.<br>
        ${link(`u/UnironicWeeaboo's spreadsheet.`, 'https://docs.google.com/spreadsheets/d/1RORciafqtspkxy3fqBrFdKIxVfanV2-fLl9FlvY3QtM')}<br>
        ${link('u/BigStupidJellyfish_ review.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/fairy-reviews')}`,
        tags : [dTag.FAIRY, dTag.TIER, dTag.EQUIP]
    },  //https://imgur.com/a/pfSSel9
    {
        questions : `Anyone have a nice infographic for equipment priority and how many to have ideally?`,
        answers : `${image('./assets/images/EqupTier.png')}`,
        tags : [dTag.EQUIP, dTag.TDOLL, dTag.TIER]
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
        tags : [dTag.HOC, dTag.FST, dTag.TIER]
    },  //Rudimentary rankings. Last place reserved for incomplete FSTs.
    {
        questions : `Which doll should I get with True Core Masks?`,
        answers : `${image('./assets/images/VeryReliableTCMGuide.png')}<br>
        ${image('./assets/images/SeriousTCMGuide.png')}`,
        tags : [dTag.TCM, dTag.TIER]
    },
    //#endregion
    //#region Compilations
    {
        questions : `T-Doll Costumes available now?`,
        answers : `u/ConductorBichir spreadsheets.<br>
        ${spoilerSummary('Costume Banners.', googleEmbed('https://docs.google.com/spreadsheets/d/10ceReDBnWKelZhSN0ztsK6EA2_14Ll8ktcXBHMMs9gQ'))} Includes furniture set and its complete set special effect.<br>
        ${spoilerSummary("Tactical Doll Skins.", googleEmbed('https://docs.google.com/spreadsheets/d/1fEnzlpQk5Jvja5PwzlpDn2ypqP3BHcGftqWWOLnK17E'))} Contains censor comparison for each unit.`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.RESUPPLY, dTag.REF]
    },
    {
        questions : `Which dolls have a MOD in the older servers?`,
        answers : `u/ConductorBichir's list. Includes all Special Equipments.<br>
        ${googleEmbed('https://docs.google.com/spreadsheets/d/1u2sXat4FD7jFLdjMLrq5zIiDrGJMEVaGvB2z2JysxLI')}`,
        tags : [dTag.MOD, dTag.SPEQ, dTag.REF]
    },
    //#endregion
    //#region Important Details
    {
        questions : `Where and how can I get my favorite gun/doll/unit/character?`,
        answers : `${descriptionList({
            'Factory Production' : [`5${star} dolls that can drop here are the only ones redeemable through True Core Masks, bar spaghetti.`],
            'Rescue Drops' : ['For "Limited" dolls in Combat Missions, they are limited to that particular map. Not limited by time, but by place. Until Rescue Event happens.',
                link(`Farmable dolls in campaign maps, both 3${star} monthlies and debut dolls.`, 'https://big-stupid-jellyfish.github.io/GFMath/pages/campaign-rewards'),
                'During collabs, major events, side events, and Rescue Event/Boss Bully, event rewards become temporarily available for farming.'],
            'Event Rewards' : [link("BigStupidJellyfish's Event/Clear Reward dolls list.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/limited-dolls')],
            'Shop' : ['Mostly applicable to collab dolls or by using TCM.']
        })}`,
        tags : [dTag.TDOLL, dTag.IMPT, dTag.LEDOLL, dTag.PROD, dTag.MAJOR, dTag.CAMPAIGN, dTag.MINI, dTag.TCM, dTag.MAIN, dTag.COLLAB, dTag.SHOP]
    },
    {
        questions : `When should I begin trying to produce fairies/do Heavy Equipment Constructions (HEC)?`,
        answers : `When you have sufficient income for 4 resources and cores. Ideally ASAP since raising one to 5${star} takes a considerable amount of time.`,
        tags : [dTag.FAIRY, dTag.PROD, dTag.IMPT]
    },
    {
        questions : `What is kiting?`,
        answers : `Kiting, in general, is the method of moving your tanks rightwards to make the enemy aim at them then moving leftwards to make the enemy walk towards you, while your DPS constantly shoots them. This is effective because most enemies have aim time where they do nothing, and range where you have to be in their sights to start aiming. Therefore, lengthening the lifespans of your dolls, especially the tanks.<br>
        This is the reason why putting your whole team at the back of the grid is preferable.<br>
        Sometimes called wiggling which in this context means moving your DPS to retarget.<br>
        ${link('GFC guide','https://www.gflcorner.com/battle-controls/')}<br>
        ${spoilerSummary('Mitsu video guide', youtubeEmbed('ITUtRuF4TLY'))}<br>
        ${link("u/Reikyu09's reddit post", 'https://redd.it/8o18an')}`,
        tags : [dTag.BATTLE, dTag.IMPT]
    },
    {
        questions : `What are Main Tanks and Off Tanks?`,
        answers : `${descriptionList({'Main Tanks' : ['Guns that have survivability skills (i.e. smoke, eva boost, stun etc.).', 'Generally situated at the middle of the pack.'],
        'Off Tanks' : ['Guns that generally have damage skills (i.e. molotov, grenade, damage boost etc.) and/or a secondary damage soaker in some instances.', 'Situated at either middle-top or middle-bottom.']})}<br>
        All of these usually refer to SMGs.`,
        tags : [dTag.ECH, dTag.IMPT]
    },
    {
        questions : `Is fairy leveling for increasing rarity only?`,
        answers : `Mainly yes, but there is a gradual aura boost where a Lv.20 is better than Lv.1 even at 1${star}. And increasing rarity is very important, from increasing the aura stat cap, to making the talent proc more consistently. Not to mention that you can cap them to Lv.100 even as a 1${star} so there's no hurry to raise their rarity.`,
        tags : [dTag.FAIRY, dTag.LEVEL, dTag.IMPT]
    },
    {
        questions : `What is Anchored Construction?`,
        answers : `${link('Pity System for newly added production dolls.', 'https://redd.it/szdua2')} Appears on the rate up for them which is on Saturdays and Sundays. Access it through the doll production screen. If it doesn't appear, try restarting app. It happens when you log-in earlier than the rate up.<br>
        ${altTextStyle('Points of Interest:', TextStyle.BOLD)}<br>
        ${list(false, 'Anchor rate-up is closed once a doll has been anchored.')}`,
        tags : [dTag.PROD, dTag.IMPT, dTag.TECH]
    },  //@Too many to fix, @Visual
    //#endregion
    {
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `${image('./assets/images/SFEnemy.png')}<br>
        Note that Jupiter Cannons count as unarmored machine type.`,
        tags : [dTag.ENEMY]
    },
    {
        questions : `Will there be problems with switching between multiple devices regularly?`,
        answers : `Only if you think that manually logging in every switch is a problem.`,
        tags : [dTag.ACCT]
    },
    {
        questions : `Where to go for tech support?`,
        answers : `FB and Twitter is said to be responsive enough. Or you can use ${link('this', 'https://forms.gle/bZNnQeh5sJaD3pim8')} for reporting.`,
        tags : [dTag.TECH, dTag["3P"]]
    },
    {
        questions : `Which combat sim is better to focus on?`,
        answers : `Data. Always data.`,
        tags : [dTag.SIMS, dTag.ITEM, dTag.NEWB]
    },
    {
        questions : `How do I get more Quick Training Contracts?`,
        answers : `End of daily log-ins, Keycard Event, gem shop.`,
        tags : [dTag.ITEM, dTag.MINI, dTag.SHOP]
    },
    {
        questions : `How do I unlock the next chapter?`,
        answers : `Beat X-6 Normal of the last unlocked chapter again. If it still doesn't appear after that, restart client.`,
        tags : [dTag.MAIN, dTag.TECH]
    },
    {
        questions : `Which emulators are good for GFL?`,
        answers : `${list(true, 'Mumu.', 'Memu.', 'LDPlayer.', 'Nox.', 'Bluestacks.')}`,
        tags : [dTag.EMU]
    },
    {
        questions : `How can I play GFL if Apple Store doesn't have it?`,
        answers : `Use Android, use emulator, use VPN, use jailbreak.`,
        tags : [dTag.APPLE]
    },
    {
        questions : `When is the anniversary?`,
        answers : `May 8 for EN server.`,
        tags : [dTag.ANNIV]
    },
    {
        questions : `How do I unlock Chapter 0?`,
        answers : `Beat Chapter 4 Emergency Map 4.`,
        tags : [dTag.MAIN]
    },
    {
        questions : `Would the equipment I'm enhancing get bonus points if I use an enhanced fodder?`,
        answers : `No.`,
        tags : [dTag.EQUIP, dTag.LEVEL]
    },
    {
        questions : `Is there a list of which logistics to do if I want to prioritize certain resources?`,
        answers : `${link('GFC GDoc.', 'https://docs.google.com/spreadsheets/d/1ah2JO6ggWuVaBho9yxgDMC-ucEKA8C42SBkjIlnIcWk')} Up to Chapter 11.<br>
        ${link("u/elgatoroid's calculator.", 'https://gfl-logistics.neko.gg/')} Up to Chapter 11.<br>
        ${link('GFGFork site.', 'https://gfgfork.github.io/gf/main')} Up to Chapter 12.<br>
        ${link('Tempkaridc calculator.', 'https://tempkaridc.github.io/gf/')} Up to Chapter 13.<br>
        ${link("u/tehcavy's spreadsheet.", 'https://docs.google.com/spreadsheets/d/1N-PvxbrZJqg-upImk5uwEmB9GcCrNqjmVgdY00cdvS8')} Up to Chapter 13.`,
        tags : [dTag.LOGI, dTag.MARP, dTag.ITEM]
    },
    {
        questions : `Do I still need to use advantaged dolls for Theater?`,
        answers : `Not as much as before. They no longer make or break the CE, though they do get stat boosts.<br>
        HG = 20% CDR, SMG/SG = 15% Arm, 50% EVA, AR/RF/MG = 20% FP, 20% ACC.<br>
        The endgame now goes to MODs and oaths.<br>
        The CE you see on each doll when toggling the Boss CE button is the adjusted number, with the advantaged dolls having 20% bonus CE accounted for.`,
        tags : [dTag.TDOLL, dTag.THEATER]
    },
    {
        questions : `For limited-time bonuses (i.e. auto-battles, logistics), when are the rewards calculated?`,
        answers : `${descriptionList({
           'If the runs can be cancelled without penalty, rewards are calculated at the end.' : [
                'The "Use Battery" bingo mission when exp-training HOCs.'
            ],
           "If they can't be cancelled, or is cancellable with a penalty or cost (ie quick tickets), calculated at the start." : [
                'Expedition rewards.',
                'Productions.'
           ]
        })}`,
        tags : [dTag.SYSMECH, dTag.MINI, dTag.EXPED, dTag.PROD]
    },
    {
        questions : `How does Armor Penetration work?`,
        answers : `${link('Matsuda explanation.', 'https://gfl.matsuda.tips/post/armour')}`,
        tags : [dTag.BATTLE, dTag.SYSMECH]
    },
    {
        questions : `Is there a penalty for using HOC charges and Fairy points in Theater battles?`,
        answers : `Nope. Joins boss battle regardless of charges and has no bearing on final score. Go ham.<br>
        Except if you used them and lost that battle, they won't be refunded, even in Electronic Warfare.`,
        tags : [dTag.THEATER, dTag.HOC, dTag.FAIRY]
    },
    {
        questions : `Will the current event currency carry over to the next event?`,
        answers : `No can do. Dissolves into nothingness one week after its corresponding event is finished.`,
        tags : [dTag.ITEM, dTag.SEASON, dTag.COLLAB]
    },
    {
        questions : `I've heard of GFAlarm. Is it safe to use?`,
        answers : `${link('Gamepress breakdown.', 'https://gamepress.gg/girlsfrontline/how-use-gfalarm-girls-frontline-alarm')}`,
        tags : [dTag["3P"]]
    },
    {
        questions : `Is there any way to reset my battles so I can get a win?`,
        answers : `Turn off WiFi during battle. You can still finish the fight with no connection. Though be wary of connection timeouts so do it near the end.<br>
        If you don't like the result or you lost, exit client, turn on WiFi, re-enter client, take the fight again.<br>
        If satisfied ${altTextStyle('or saving your sanity', TextStyle.STRIKE)}, turn on WiFi after the battle finished.`,
        tags : [dTag.BATTLE]
    },
    {
        questions : `Is there a way to know the map layout and its spawnable enemy units?`,
        answers : `${link('GFLMaps site.', 'https://pengupengupengu.github.io/gflmaps/')}`,
        tags : [dTag["3P"], dTag.MAP, dTag.ENEMY]
    },
    {
        questions : `How can I save the enemy composition for later practice?`,
        answers : `${descriptionList({
            'Add Target' : [
                "Long press the enemy on the map and you'll see the button on the top-left.",
                'Pause while in battle to see the button on the bottom-left.',
                'Button appears on the bottom-left after losing a battle.',
                'Adds the current enemy formation to the Target Practice in the Combat Sims.'],
            'GFAlarm' : [
                'Use GFLMaps to take the enemy IDs you want to fight and enter them in the Custom Target Train under Packet Forger, with IDs separated by commas.',
                image('./assets/images/GFAlarmCTT.png', 'From u/UnironicWeeaboo'),
                `Works for comps that has been loaded into the client and is ${link('very safe', 'https://www.reddit.com/r/girlsfrontline/comments/tqur46/weekly_commanders_lounge_march_29_2022/i312oo2/')}.`],
            '<a href="https://gfl.matsuda.tips/post/everything-sucks-forever">Matsuda recommendations</a>' : []
        })}`,
        tags : [dTag.ENEMY, dTag.BATTLE, dTag.MAP, dTag["3P"]]
    },  //@Visual
    {
        questions : `How do I connect to GFAlarm with an emulator?`,
        answers : `Enter the GFAlarm proxy address to ProxyDroid or Drony.<br>
        ${link("u/Signal_Abroad1427's google-fu for Bluestacks.", 'https://www.reddit.com/r/girlsfrontline/comments/umdikk/weekly_commanders_lounge_may_10_2022/i8hj47h/')}`,
        tags : [dTag["3P"], dTag.EMU]
    },
    {
        questions : `Is there a list of voodoo recipes and their crafting rates for *insert pennies here*?`,
        answers : `${link('GFDB Github Database.', 'https://gf-db.github.io/')} Freedom of information, just add internet connection.`,
        tags : [dTag.PROD]
    },
    {
        questions : `Is there a way for my game to feel smoother?`,
        answers : `${link('Gamepress article.', 'https://gamepress.gg/girlsfrontline/fixing-gfl-client-lag-possible-workarounds')}<br>
        ${link('Decompressed obb.', 'https://redd.it/mroqui')} Removes damage numbers, the main source of in-battle lag.<br>
        ${link('DIY decompression.', 'https://www.reddit.com/r/girlsfrontline/comments/lvwwtv/weekly_commanders_lounge_march_02_2021/gpugenl/')}`,
        tags : [dTag.MISC]
    },
    {
        questions : `What's the Fire Control Component (FCC) used for and where can I get them?`,
        answers : `Upgrading 5${star} dolls to 6${star} through modding.<br>
        Obtainable through Black Market (2 monthly), major events, and special log-ins.`,
        tags : [dTag.ITEM, dTag.MOD]
    },
    {
        questions : `What is Bookshelf of Memories?`,
        answers : `Sidestories for the featured dolls. Rewards Friend Gossips or Unity Skills.`,
        tags : [dTag.SIDE]
    },  //Get Friend Gossips list and Unity Skill pairings.
    {
        questions : `What is Central Data for?`,
        answers : `Unlocking the corresponding FST, promoting said FST, and used as a Data Patch if 5${star}.`,
        tags : [dTag.ITEM, dTag.HOC]
    },
    {
        questions : `When should I do T-Doll Heavy Production?`,
        answers : `Preferably during rate ups due to its high costs. Low priority otherwise since it's use at this stage of the game is for getting non-5${star} SGs and them not being widely used.`,
        tags : [dTag.TDOLL, dTag.PROD]
    },
    {
        questions : `How do I fill up/unlock enemies in the Enemy Index?`,
        answers : `Just fight them. Win or lose, we get them.`,
        tags : [dTag.ENEMY]
    },
    {
        questions : `What best-in-slot (BiS) equipments should I use on my dolls?`,
        answers : `${spoilerSummary('General equipments.', `${link(image('./assets/images/EquipInfograph.png'), 'https://big-stupid-jellyfish.github.io/GFMath/pages/newquip')}<br>AS-Val at night follows the day schema. SOP and STAR is SPEQ + VFL/PEQ. M16 is SPEQ + Exo/Armor.`)}<br>
        ${spoilerSummary('#2 Chip equipment.', list(false,
            spoilerSummary('BigStupidJellyfish_', 
                `${link(image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/chips/infographic.png'), 'https://big-stupid-jellyfish.github.io/GFMath/pages/chips')}<br>
                ${googleEmbed('https://docs.google.com/spreadsheets/d/14xV50MSMBFGgN75E-Gy10WtzACb_KZdpxRKCYQ6FDQA')}`),
            spoilerSummary('mis', googleEmbed('https://docs.google.com/spreadsheets/d/1c0JhaSX9WyL3EB-7RCDE4NrfzR1YuWdYWidQ_06-PrQ'))
        ))}<br>
        ${spoilerSummary('AP thresholds.', image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/newquip/armor-reference.png'))}`,
        tags : [dTag.TDOLL, dTag.EQUIP, dTag.ENEMY]
    },
    {
        questions : `How do I maximize the efficiency of my echelon's ROF?`,
        answers : `${link("u/BigStupidJellyfish_'s ROF calc.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/rof-calc')}<br>
        ${spoilerSummary('GFC Spreadsheet.', googleEmbed('https://docs.google.com/spreadsheets/d/1k74SCGGMHtwbl8gmTaETLsa8t12A7dWdj0V1tjdMD4Y'))}`,
        tags : [dTag.TDOLL, dTag.BATTLE, dTag.SYSMECH]
    },
    {
        questions : `How do I get some Extra Potential Energy for Coalition Drills?`,
        answers : `Shop.`,
        tags : [dTag.ITEM, dTag.PA, dTag.SIMS, dTag.SHOP]
    },
    {
        questions : `Which dolls should I duplicate?`,
        answers : `${link('Matsuda notes.', 'https://gfl.matsuda.tips/post/worthwhiledupes')}<br>
        ${link('Gamepress suggestions.', 'https://gamepress.gg/girlsfrontline/t-doll-duping-guide')} Some details may not be applicable.<br>
        ${spoilerSummary('Discord recommendations.', image('./assets/images/RecommendedDupeGuns.png'))}<br>
        Note that duplication is not mandatory for progression and ranking.`,
        tags : [dTag.TDOLL]
    },  //Jesse, Varz, etc.
    {
        questions : `How high is fairy rate up?`,
        answers : `${googleEmbed('https://docs.google.com/spreadsheets/d/1CSC17pKJ8BDDm9YYNB8pFqT8k0Np_jWDeu_1X-qJ7yI')}`,
        tags : [dTag.FAIRY, dTag.PROD]
    },  //Redditor u/ConductorBichir's list IIRC
    {
        questions : `What's the drop rate for farmable dolls?`,
        answers : `Limited dolls on chapters aproximately have 0.8% drop rate on normal and 1% on emergency.<br>
        Event farms have around 1%, which also carries over to campaign missions.<br>
        5${star} on normal maps have rates way below 1%... usually. Their droprates at Chapter 10 onwards seem to have higher rates.<br>
        As for SPEQs, probably 1% too.<br>
        If you plan to farm a 5${star} doll in Combat Missions, just do Productions. You'll get more chances there.`,
        tags : [dTag.TDOLL, dTag.MAIN, dTag.SPEQ, dTag.MAJOR, dTag.CAMPAIGN, dTag.SEASON, dTag.COLLAB]
    },
    {
        questions : `Do events get a rerun? And if so, when?`,
        answers : `Major events get a permanent rerun called Campaign Missions.<br>
        Seasonal events get one when it's their time.<br>
        Collabs are subject to their holders whims.`,
        tags : [dTag.MAJOR, dTag.CAMPAIGN, dTag.SEASON, dTag.COLLAB]
    },
    {
        questions : `How do I remove HOCs from Target Practice?`,
        answers : `Unselect them like how you selected them.`,
        tags : [dTag.SIMS, dTag.HOC]
    },
    {
        questions : `How can I save my own voodoo recipe?`,
        answers : `${list(true, 'Craft from production using your own recipe.', 'Take the item.', 'Wait for 10 minutes for the voodoo list to refresh.', 'Look for it.')}`,
        tags : [dTag.PROD]
    },
    {
        questions : `How can I resupply a single doll and not the whole echelon?`,
        answers : `The Trifectra of Rejuvenation compels you. Or just do a one-man echelon (this one's a corpse drag staple).`,
        tags : [dTag.TDOLL, dTag.MAP, dTag.ECH]
    },
    {
        questions : `If I MOD my T-Doll, is Level 100 still considered max level?`,
        answers : `Thankfully, this is where common sense wins. In short, ${altTextStyle('NO', TextStyle.BOLD)}.`,
        tags : [dTag.MOD, dTag.LEVEL]
    },
    {
        questions : `I can't get the gold (S Rank) and silver medals in maps because the enemies keep running all over me. How do I get them?`,
        answers : `Not now. Blaze through chapters until 7-6 first to get your account running, then come back to it later when you have at least 2 strong (Lv. 90, 5 links) echelons.`,
        tags : [dTag.NEWB, dTag.MAIN]
    },  // You can get this quickly through Newbie Career Quests. And you can complete the quests faster if you use friend/support echelons.
    {
        questions : `Can I transfer my Google Account to a Sunborn one?`,
        answers : `It's a one-way street from there.`,
        tags : [dTag.ACCT]
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
            '{Username}_{UID}__theater_optimize_team.csv for current armory.',
            'Use predicted damage instead of combat effectiveness.')}`,
        tags : [dTag["3P"], dTag.THEATER, dTag.CE]
    },
    {
        questions : `How are people just rolling in 5${star} fairies?`,
        answers : `<p>${altTextStyle('Even dust, when piled up, can become a mountain.', TextStyle.ITALIC)}</p>
        Good logistics upkeep and rolling HECs everyday. Just think of crafting them a side thing that doesn't take a lot of attention.<br>
        For perspective on how long to raise one:<br>
        ${image('./assets/images/FairyRaising.png', 'From u/UnironicWeeaboo')}`,
        tags : [dTag.FAIRY, dTag.PROD]
    },
    {
        questions : `How high is a certain doll's pull rate during rate ups?`,
        answers : `Something like Anchored > Targeted > General >>> Normal.`,
        tags : [dTag.TDOLL, dTag.PROD]
    },
    {
        questions : `What are the resources I can get from Kalina's Daily Gift?`,
        answers : `${image('./assets/images/DailyGift.png')}<br>
        Gift amount apparently scales with her affection.`,
        tags : [dTag.MARP, dTag.ITEM]
    },
    {
        questions : `What is Corpse Whipping?`,
        answers : `The act of overkilling a dummy link by a huge amount. Especially egregious if 2 RFs hit an enemy on its deathbed. This is generally the reason why ROF-based guns are favored against low link-HP enemies.`,
        tags : [dTag.BATTLE]
    },
    {
        questions : `What's the gacha rate for costumes?`,
        answers : `${table(['Item', 'Rate'],
        ['Costumes',                '02.00%'],
        [`5${star} furniture`,      '08.00%'],
        [`4${star} furniture`,      '34.20%'],
        [`4${star} gifts/cakes`,    '01.80%'],
        [`3${star} furniture`,      '54.00%'])}`,
        tags : [dTag.RESUPPLY, dTag.SKIN, dTag.FURN]
    },
    {
        questions : `Can the Liu clones get stat buffs?`,
        answers : `${link('IOPWiki Trivia section says yes.', 'https://iopwiki.com/wiki/General_Liu#Trivia')}`,
        tags : [dTag.TDOLL, dTag.SKILL]
    },
    {
        questions : `Why is the PA notification in the home screen always lit up?`,
        answers : `There are available pulls left to burn.`,
        tags : [dTag.PA]
    },
    {
        questions : `What are Black Beans/Red Beans?`,
        answers : `Golyat and Golyat+, respectively.`,
        tags : [dTag.ENEMY]
    },
    {
        questions : `What is Combat Effectiveness Stacking?`,
        answers : `The process of stacking the useless number as high as possible, battle performance be damned.<br>
        ARSMG = 80k+, RFHG = 40-90k, MGSG = 100k+ average max CE, including maxed dolls, maxed fairies, equips, mods, oaths, and formation bonuses.<br>
        It's main purpose is for Theater Bosses and being on top of the Friend List.`,
        tags : [dTag.CE]
    },
    {
        questions : `What does the PA chip Pilfer do?`,
        answers : `Allows players to have a ${spoilerSummary('chance', image('./assets/images/PIlferRNG.png') + '<br>' + altTextStyle('Context: PIlfer subject to RNG.', TextStyle.QOUTE))} of getting ${spoilerSummary('S-Rank drops', youtubeEmbed('t6Vu72cajO0') + altTextStyle('Context: Coalition Medals require S-Rank battles.', TextStyle.QOUTE))} from adjacent enemies without fighting. This uses one bar of ration and ammo.<br> 
        Combine this with the ability to fight on one ammo bar to get two chances on one enemy.`,
        tags : [dTag.COALITION, dTag.EQUIP]
    },
    {
        questions : `What does oathing a doll do?`,
        answers : `Additional line for oath, higher affection cap, double EXP gain (map EXP, auto-battles, CRs) on MODs, complete repair and resupply (one-time only), stat bonuses for damage/evasion/accuracy (because higher affection cap).`,
        tags : [dTag.TDOLL, dTag.OATH, dTag.MOD, dTag.LEVEL, dTag.LOVE]
    },
    {
        questions : `How do I get more support echelons?`,
        answers : `Add friends. Post your UID on a GFL community board and someone would ${altTextStyle('surely', TextStyle.STRIKE)}probably add you.`,
        tags : [dTag.FRIEND, dTag.ECH]
    },
    {
        questions : `Which map is best for auto-battles?`,
        answers : `Includes EXP per fight and level threshold to EXP penalty.<br>
        ${googleEmbed('https://docs.google.com/spreadsheets/d/1e_1oAa9Qm_tmWqbgFQca8ohzo29qcjctIwyIU9Mc1H0')}`,
        tags : [dTag.AUTO, dTag.LEVEL]
    },
    {
        questions : `Where can I fight Goliath Factories?`,
        answers : `In your dreams. Or maybe a custom enemy ID. Thing is, it's for PA purposes only.`,
        tags : [dTag.ENEMY]
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
        tags : [dTag.PROD, dTag.TDOLL]
    },
    {
        questions : `I can't beat the current stage. Is this it for me?`,
        answers : `For the triple stages, just fall back to the last boss node you can handle. These nodes can mitigate the "Cleared Stage" penalty so it's worth more than non-boss higher node.<br>
        For Core stage, highest node clearable.`,
        tags : [dTag.THEATER]
    },
    {
        questions : `Which facilities/base upgrades should I prioritize for battery expenditures?`,
        answers : `${list(true,
            'Forward Basecamp',
            'Protocol Control Centre',
            'Intelligence Room',
            'Firing Range (Garage)',
            'Fairy Chamber',
            'Data Room',
            'Rescue Station')}`,
        tags : [dTag.NEWB]
    },  //@Upgrade priority per facility
    {
        questions : `What do I need for 8-1N Zas drag?`,
        answers : `${googleEmbed('https://docs.google.com/spreadsheets/d/1VT52c-_m4zTx-OFRPcxE9iFmmJY_AMC7CyJT1B7FLt8')}`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        questions : `Do the purchaseable items in the Expedition Black Market ever change?`,
        answers : `No.`,
        tags : [dTag.EXPED, dTag.SHOP]
    },
    {
        questions : `Which dolls should I use for expedition?`,
        answers : `${image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-advantaged-dolls_0.jpg', 'Taken from Gamepress')}<br>
        Dummy links and skill levels are not taken into account.`,
        tags : [dTag.EXPED, dTag.TDOLL]
    },
    {
        questions : `Where to use gems?`,
        answers : `${list(true,
            'Echelon slots up to 6 minimum, 8 for actually constant (ranking not included) logistics.',
            '5 dorms for batteries, enough to upgrade important facilities. More than that is your call.',
            "Storage slots especially if you're a collector. Or whenever you're getting annoyed with the pop-up.",
            'Your Mileage May Vary (YMMV).')}`,
        tags : [dTag.NEWB, dTag.ITEM]
    },
    {
        questions : `What teams/echelons should I build?`,
        answers : ` 2 ARSMGs first for general content, then RFHG for lategame, then MGSG if you want to deal with specialized enemies. The first team should ideally be Lv. 90 5-links before going for the next team.`,
        tags : [dTag.NEWB, dTag.ECH]
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
        tags : [dTag["3P"], dTag.HOC, dTag.FST, dTag.EQUIP, dTag.IMPT]
    },
    {
        questions : `How does the Rescue Station work?`,
        answers : `${link('DMesse guide.', 'http://dmesse.egloos.com/m/3588696')}`,
        tags : [dTag.PET]
    },
    {
        questions : `How often do general rate ups occur?`,
        answers : `January, May, September`,
        tags : [dTag.PROD]
    },
    {
        questions : `Do autobattles give affection?`,
        answers : `A tiny bit.`,
        tags : [dTag.AUTO, dTag.LOVE]
    },
    {
        questions : `Do support echelons use equipment?`,
        answers : `Equipments used, formation, and apparently costumes too are saved instances.<br>
        Doll levels, equipment levels, skill levels, and chibis aren't. Meaning supports can be saved then leveled afterwards.`,
        tags : [dTag.FRIEND, dTag.ECH]
    },
    {
        questions : `I wasn't able to clear the event. Will I still get the clear rewards when they get added to Campaign?`,
        answers : `Nope. Gutted rewards compared to original, even True Core Masks (TCM). Free shit is free shit though, and doll/crate rewards gets cycled to Limited Dolls. So skip the current major event's story if you have to and reap the rewards.`,
        tags : [dTag.MARP, dTag.ITEM, dTag.CAMPAIGN, dTag.MAJOR, dTag.LEDOLL, dTag.TCM]
    },
    {
        questions : `How do tilescan skills work?`,
        answers : `Real-time scanning of dolls on own tiles when activating their skills. Meaning setup formation can have them with no dolls on top of their tiles and when they activate their skills in battle, whoever are on top of their bufftiles will get the effects of their skill. Note that their bufftiles basically move with them.`,
        tags : [dTag.TDOLL, dTag.SKILL, dTag.IMPT]
    },
    {
        questions : `My resources (Manpower, Ammunitions, Rations, Parts) are uncomfortably low? Where can I get some?`,
        answers : `Most efficient and consistent is logistics. Though you can get them through the shop, quest and event rewards, campaign/major story node clears, and random nodes.`,
        tags : [dTag.MARP, dTag.LOGI, dTag.NEWB]
    },
    {
        questions : `How do I get Platinum and Nova Medals?`,
        answers : `From whatever Major/Seasonal/Collab Event running right now. Platinum are for 5${star} dolls and Nova are for dolls 4${star} and below.`,
        tags : [dTag.ITEM, dTag.TDOLL, dTag.MAJOR, dTag.SEASON, dTag.COLLAB]
    },
    {
        questions : `How do I build Vector to no-damage 13-4?`,
        answers : `${link('tempkaridc calculator.', 'https://tempkaridc.github.io/gf/vec')}<br>
        ${link('xVarz spreadsheet for different draggers.', 'https://docs.google.com/spreadsheets/d/1cuZPF-r1e6TyE4Rj2DNkSEova7Tc-Cczs7RaoAK2vII')}<br>
        ${link('Infographic.', 'https://cdn.discordapp.com/attachments/564028599682727937/929724568258629642/134.png')}`,
        tags : [dTag.LEVEL, dTag.TDOLL]
    },
    {
        questions : `How do I get a higher success rate for logistics?`,
        answers : `${altTextStyle('floor(mean of doll levels in echelon) * 0.45 + 15', TextStyle.CODE)} for normal logistics and<br>
        ${altTextStyle('floor(mean of doll levels in echelon) * 0.60 + 30', TextStyle.CODE)} for rate up logistics.`,
        tags : [dTag.LOGI]
    },
    {
        questions : `What do they mean by bamboo?`,
        answers : `Bamboos are, in general, rifles with skills like Locked Shot, Steady Shot, Interdiction Shot, and the likes, wherein off cooldown, they have a charge gauge that dictates how powerful the skillshot is on activation. They're usually used to deal massive damage to a target, especially if coupled with FP buffers.`,
        tags : [dTag.TDOLL, dTag.SKILL, dTag.IMPT]
    },
    {
        questions : `What are the resources that has a defined max capacity and how much can they store?`,
        answers : `${image('./assets/images/ResourceCap.png')}<br>
        Train Coin = Training Data, Furniture Coin = Tokens, Memory Pieces = Neural Fragments<br>
        Even then, all resources can be obtained without regards to max capacity through daily gifts, mission rewards, and whaling.`,
        tags : [dTag.MARP, dTag.ITEM]
    },
    {
        questions : `Is there a way to buy a missed day for daily log-ins?`,
        answers : `No chance.`,
        tags : [dTag.MISC]
    },
    {
        questions : `I'm trying to clear the newbie career quests but I haven't gotten the rewards yet. Did I miss something?`,
        answers : `Those quests are not retroactive and should be cleared in sequence. Try clearing them from the top.`,
        tags : [dTag.NEWB]
    },
    {
        questions : `What does Svarog High Altitude EMP Bombing Aid Commissions do and how do I get more of them?`,
        answers : `Pulls from the entire pool where the entire pool is the X in the X/100 units.<br>
        Weekly quest (8 standard captures), daily log-in, major events, shop (whenever a new banner starts).`,
        tags : [dTag.ITEM, dTag.PA, dTag.SHOP]
    },
    {
        questions : `Recipe for Parachute/Paradrop Fairy?`,
        answers : `2000/500/2000/1000`,
        tags : [dTag.FAIRY, dTag.PROD]
    },
    {
        questions : `What does equipment calibration and enhancement do?`,
        answers : `${image('./assets/images/EquipCalibEnhance.png')}<br>
        Meaning calibration and enhancement are independent of each other.<br>
        Equipment Calibration raises the equipment's base stat. The RNG dictates how many calib tickets are wasted before maxing. When it's on its highest calibration, a MAX in blue box appears on said equipment.<br>
        Equipment Enhancement multiplies the base stat up to Lv. 10. Doesn't matter if Equip Enhancement Pills or fodder equips are used, it's merely a matter of resource cost per point raised.`,
        tags : [dTag.EQUIP, dTag.LEVEL, dTag.NEWB]
    },
    {
        questions : `Does Hanyang Type 88 still do skipping stones?`,
        answers : `${link('Yes she does.', 'https://www.reddit.com/r/girlsfrontline/comments/qkzc9s/weekly_commanders_lounge_november_02_2021/hjvcbmt/')}<br>
        ${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/hanyangle-2')}<br>
        Apparently also happens on tiles 7 and 9.`,
        tags : [dTag.TDOLL, dTag.SKILL]
    },  //reddit fix    
    {
        questions : `How viable is 2AR2SMG1HG?`,
        answers : `${link('BigStupidJellyfish analysis vs. 3AR2SMG.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/2v3ar')}<br>
        Depends on if there is no good AR-buffing AR for position 4. If there is one, 3AR1SMG1HG is a thing, specially for night maps.`,
        tags : [dTag.TDOLL, dTag.ECH]
    },
    {
        questions : `What are all the available pets right now?`,
        answers : `${image('./assets/images/PetSale.png')}<br>
        If you see a pet that is not on this list, it's a Cafe Story reward, collab pet, or event reward that haven't been added yet to the station.`,
        tags : [dTag.PET]
    },
    {
        questions : `How do friend batteries work?`,
        answers : `Friend batteries recharge at 3am and 3pm UTC-8. The number of charges/batteries depends on the number of dorms your friend has. Use Netlify if you want to know when it resets. And as the name suggests, it only appears on your friend's dorms, not on any strangers (especially on a Random Visit).`,
        tags : [dTag.FRIEND, dTag.ITEM]
    },
    {
        questions : `Is there an optimal recipe guide I could use for my production?`,
        answers : `${link('Applicable Reddit Post.', 'https://redd.it/gfmelo')}<br>
        For the new equips, 150/151/50/50 (with armor), 150/151/10/50 (without armor).`,
        tags : [dTag.PROD]
    },
    {
        questions : `Whats the best way of farming affection?`,
        answers : `Being in the leader slot in a battle echelon, being the MVP of a battle echelon, collecting daily hearts in dorms, cakes/lollipops/icecreams, passive regen by being in a dorm, gifting skins.<br>
        ${link('Write-up on what affects affection.', 'https://www.reddit.com/r/girlsfrontline/comments/cgpt7y/weekly_commanders_lounge_july_23_2019/ev0gw64/')}<br>
        ${link('Additional info on dorm affection.', 'https://www.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i29h382/')}`,
        tags : [dTag.LOVE]
    },
    {
        questions : `As a beginner, is it worth to use batteries for combat reports?`,
        answers : `Probably if surplus EXP is maxed out, otherwise doubt it.`,
        tags : [dTag.NEWB, dTag.ITEM]
    },
    {
        questions : `How does Symmetric Infusion work exactly?`,
        answers : `${descriptionList({'Cognitive Infusion' : ['Basically, swaps sizes. Technically, swaps all stats aside from size. If both sides are upgraded, say Lv. 31 and Lv. 23, they become 23 and 31, not 1 and 31+.'], 
        'Golden Infusion' : ['Swaps the golden status between the two units, nothing more, nothing less.']})}`,
        tags : [dTag.PA]
    },  //@Visual
    {
        questions : `Is the package in the shop worth it?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/energy-packages')}`,
        tags : [dTag.ITEM, dTag.OATH, dTag.SHOP]
    },
    {
        questions : `Can I put 2 L2D skins in the double adjutant slot?`,
        answers : `${altTextStyle('L2D mode', TextStyle.QOUTE)}<br>
        ${altTextStyle('Double Adjutant', TextStyle.QOUTE)}<br>
        Pick one.`,
        tags : [dTag.SKIN]
    },
    {
        questions : `How do I unlock special effects on commanders like flame auras etc.?`,
        answers : `${list(true, "Get a complete 5-slot from a set. Doesn't matter if male only or female only.",
        'Get their rare color variants.',
        '???',
        'Profit.')}`,
        tags : [dTag.CMDR, dTag.SKIN]
    },
    {
        questions : `Is there a list of doll farming routes for each map?`,
        answers : `Compilation of all farm routes for limited dolls and equipments on both campaign and main story.<br>
        ${googleEmbed('https://docs.google.com/document/d/1GUcA1ZHYVKBhTspdRYPIkECVZRoLFvqDnLrgrFb6VcU')}`,
        tags : [dTag.MAIN, dTag.CAMPAIGN]
    },  //By u/rcpz93 most likely
    {
        questions : `What's the chronological order for the story?`,
        answers : `u/pointblanksniper's observations.<br>
        ${link('Overall.', 'https://www.reddit.com/r/girlsfrontline/comments/sm75vk/where_can_i_see_mirror_stage_story_line/hvvpppk/')}<br>
        ${link('Night Chapters.', 'https://www.reddit.com/r/girlsfrontline/comments/scouvz/questions_regarding_404/hu995o6/')}`,
        tags : [dTag.LORE]
    },  //@Fix
    /*
        https://www.reddit.com/r/girlsfrontline/comments/sc8jed/weekly_commanders_lounge_january_25_2022/hupfxsr/
    */
    {
        questions : `Is it possible to earn previously missed hidden achievements in Campaign Missions?`,
        answers : `Yes.`,
        tags : [dTag.CAMPAIGN]
    },
    {
        questions : `If I delete my unused speqs, will I be able to recover them?`,
        answers : `Since 2.09, dismantled/disassembled SPEQs can now be recovered/retrieved.`,
        tags : [dTag.SPEQ]
    },
    {
        questions : `Is there a way to expand the armory, or am I stuck with 100 doll slots forever?`,
        answers : `${list(false, 'Shop>Items>Infrastructure>T-Doll slots +10.', 'Tap the locked echelon button.')}`,
        tags : [dTag.SHOP]
    },
    {
        questions : `Should I dummy link my dolls when corpse dragging?`,
        answers : `Recommended. Each link gives an additional 0.5x multiplier.`,
        tags : [dTag.LEVEL]
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
                'Shop. Especially when there is a seasonal/collab going on. Packages are also good.',
                'Maintenance (10 weekly) and Apolotokens.']
        })}`,
        tags : [dTag.ITEM, dTag.MAIN, dTag.MINI, dTag.EXPED, dTag.LOGI, dTag.MAJOR, dTag.SEASON, dTag.COLLAB, dTag.SHOP]
    },
    {
        questions : `Why aren't my dorm batteries appearing?`,
        answers : `If it's not within 11:00-14:00, 17:00-20:00, and 22:00-01:00 UTC-8, restart app.<br>
        You'll know that it's collection time if the dorm button has a number on top of it (for the facility shortcuts) or Dorm No.1 flashes pink/purple in the BASE button.`,
        tags : [dTag.DORM, dTag.ITEM, dTag.TECH]
    },
    {
        questions : `What are Extra Impulses and where can I get them?`,
        answers : `Stockable versions of Electronic Impulses.<br>
        You can get them through daily log-ins, weekly quests, achievements, and events.`,
        tags : [dTag.PA, dTag.ITEM]
    },
    {
        questions : `Read a guide that said to use a team of 2${star} & 3${star} dolls until I get enough cores to spend. Is it still worth doing it now?`,
        answers : `With the advent of Expeditions and Newbie Career Quests, you get enough dummy cores right off the bat. Don't overspend still.`,
        tags : [dTag.ITEM]
    },
    {
        questions : `What's the rate up increment for Anchored Construction?`,
        answers : `${table(['Target', 'Estimated Increment'],
        ['4' + star,  '0.396%'],
        ['5' + star,  '0.083%'],
        ['Starter',   '0.19%'])}
        ${link('Base rate shown per doll is more or less their true rates.','https://www.reddit.com/r/girlsfrontline/comments/s6s9xj/weekly_commanders_lounge_january_18_2022/htmbjuc/')}`,
        tags : [dTag.PROD]
    },
    {
        questions : `I got an "Illegal Action Detected" warning. What happened?`,
        answers : `Mostly desyncs and having "invalid" inputs. Just restart it.`,
        tags : [dTag.TECH]
    },
    {
        questions : `I can't deploy a friend echelon. What do I do?`,
        answers : `${image('./assets/images/InitialDeploySupports.png')}<br>
        Either after operation start, a client restart, or a no due to limit.`,
        tags : [dTag.FRIEND, dTag.ECH, dTag.TECH]
    },
    {
        questions : `How do I find Ouroburos in Operation Cube 1-4?`,
        answers : `${link('Oreo Finder.', 'https://kyouko.moe/urouro/#')}`,
        tags : [dTag.CAMPAIGN, dTag.ENEMY, dTag["3P"]]
    },
    {
        questions : `Which HOC can destroy buildings?`,
        answers : `All of them. Building damage uses the Pierce stat, which is also used for destroying Force Shields.<br>
        As for which class is best for the job, ATWs.`,
        tags : [dTag.HOC]
    },
    {
        questions : `What does "Rescue 5 T-Dolls" mean?`,
        answers : `Getting them as drops.`,
        tags : [dTag.MISC]
    },
    {
        questions : `Where can I see doll voicelines?`,
        answers : `Doll Index Page>Top left as speaker. If it's missing, check if you downloaded the voice pack yet. Or just go to IOPWiki. Though some do not have voices yet.`,
        tags : [dTag.TDOLL]
    },  //@Visual
    {
        questions : `Is a particular doll already available in the EN server?`,
        answers : `Check Index.`,
        tags : [dTag.TDOLL]
    },
    {
        questions : `I'm trying to contact support and one of the infos they need is Account ID. Where can I see it?`,
        answers : `UID that is present in your commander screen or intro card.`,
        tags : [dTag.TECH]
    },
    {
        questions : `Where can I get doll/fairy costume art?`,
        answers : `${link('36base Github Repository.', 'https://github.com/36base/girlsfrontline-resources')}`,
        tags : [dTag.MISC]
    },
    {
        questions : `Which oath packages are better?`,
        answers : `2.09 Week 1 Package > Double Oath Package (Valentine's, White Day, <!-- Qixi/Tanabata,  -->Christmas), New Year's Package`,
        tags : [dTag.OATH]
    },
    {
        questions : `What does "Event" mean on the left side of the mission select screen?`,
        answers : `Combat Missions: SPEQ rate up for X-4N or Special Rescue Event for X-6.<br>
        Combat/Campaign: 1.5x EXP, also includes the currently running event maps.<br>
        Logistics: Great Success Rate Up aka. higher rewards are more frequent.<br>
        Combat sim: All simulations unlocked.`,
        tags : [dTag.MAIN, dTag.CAMPAIGN, dTag.LOGI, dTag.SIMS]
    },
    {
        questions : `Can someone tell me what the difference is between Charge, Destroy, and Defend commands for coalition units?`,
        answers : `Lets melee units ${altTextStyle('Charge', TextStyle.BOLD)} down the lane.<br>
        Lets melee units approach and ${altTextStyle('Destroy', TextStyle.BOLD)} the nearest enemy.<br>
        Return and ${altTextStyle('Defend', TextStyle.BOLD)} the grid position.`,
        tags : [dTag.COALITION, dTag.BATTLE]
    },
    {
        questions : `How many Tactical Doll slots can I have?`,
        answers : `Up to 1000.`,
        tags : [dTag.MISC]
    },  //Condolensces to u/headphone_question's wallet.
    {
        questions : `Why do people use M16 as tank for 0-2 corpse dragging?`,
        answers : `Can use Armor/SPEQ to reduce damage taken to 1, and T-Exo for reducing the number of hits taken.`,
        tags : [dTag.LEVEL]
    },
    {
        questions : `Why are the doll skills not activating?`,
        answers : `Is the auto skill button on? Is it on forced manual? Is it a flare skill?<br>
        Active skills cannot activate when they cannot shoot, i.e. reloading, dolls moving, no enemy in range, no ammo/ration, in-between shot cooldowns.<br>
        Passive skills on the other hand will not activate only if they have no ammo or ration. This includes Slug's 3x damage and Flash's -3 damage.<br>
        Note though that there are a handful of exceptions.`,
        tags : [dTag.TDOLL, dTag.SKILL, dTag.IMPT]
    },
    {
        questions : `How and why does a StrawberryPython team work so well?`,
        answers : `${googleEmbed('https://docs.google.com/document/d/105DXX2AlMB_wX0JpKGjPGsJ_zjsKOz_0bbd5ZshUx_o')}`,
        tags : [dTag.ECH]
    },
    {
        questions : `The client in the Play Store is in a language I can't understand. Is there a way to download other server clients?`,
        answers : `CN - China (Bilibili and DigitalSky)<br>
        TW - Taiwan, Malaysia, Singapore<br>
        JP - Japan<br>
        KR - Korea<br>
        EN - Everything else<br>
        As for how to download it, check the sidebar of ${link('this', 'https://www.reddit.com/r/girlsfrontline/')} link under Downloads.`,
        tags : [dTag.MISC]
    },  //@Totally gonna fix
    {
        questions : `How do general rate ups work?`,
        answers : `There are 2 sets of rate ups per general rate up.<br>
        First is the HOC rate up, where every 2 days is a specific FST's day for rate up. Note that only that FST's rate is increased within the Central Data pool. The core data rate remains the same.<br>
        Second is the tried amd tested Production rate up. Goes from Normal Doll, Normal Equip, Heavy Doll, Heavy Equip. Pulling chance for all 4${star} and 5${star} are increased. IOP equipment crafts are also affected.`,
        tags : [dTag.PROD, dTag.HOC, dTag.FST, dTag.TDOLL, dTag.EQUIP]
    },  //@Check for errors
    {
        questions : `How do I scrap/retire coalition units? I'm lost.`,
        answers : `Factory > Retirement (Disassemble) > Fourth + symbol.`,
        tags : [dTag.COALITION]
    },
    {
        questions : `What do advantaged dolls in combat map mean?`,
        answers : `20% FP boost for AR, RF, MG. 20% EVA boost for SMG, HG, SG.`,
        tags : [dTag.MAP, dTag.TDOLL]
    },
    {
        questions : `How many Quick Autobattle Tickets does it cost per stage?`,
        answers : `${lessEqual} 1 hour: 1 ticket<br>
        1-2 hours: 2 tickets<br>
        2+ hours: 3 tickets`,
        tags : [dTag.AUTO, dTag.ITEM]
    },
    {
        questions : `What happens to the reshuffle/refresh timer when the banner changes?`,
        answers : `Restarts from the top. Meaning refreshing just hours before Ringleader change has the same effect as refreshing 2 days ago.<br>
        Reports suggest that the timer after the change doesn't start until opening the bombing screen.`,
        tags : [dTag.PA]
    },  //@Test - Check refresh timer after hours of banner change
    {
        questions : `Do links matter regarding the amount of resources a coalition unit would take on resupply?`,
        answers : `From a single-link Dinergate to an entire gunner stack, they all take 360 Ammo/Ration.`,
        tags : [dTag.COALITION, dTag.MAP]
    },
    {
        questions : `Anyone know what type of equipment "Medals" is?`,
        answers : `For now, placeholder. No equipment of its type exists yet.`,
        tags : [dTag.EQUIP]
    },
    {
        questions : `Where can I see stat previews of of PA units?`,
        answers : `${googleEmbed('https://docs.google.com/spreadsheets/d/1TYKbdjuOdOMsvaaIduWW_8FF0tm27BjwKbC4uggl1wE')}`,
        tags : [dTag.COALITION]
    },
    {
        questions : `I haven't seen this icon/card BG before. Where can I get some of it?`,
        answers : `Most likely a Cafe Costume Side Story reward.`,
        tags : [dTag.MISC]
    },
    {
        questions : `I'm in dummy core hell. How do I get some more?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/its_still_not_enough_fuck')}<br>
        ${link('BigStupidJellyfish write-up.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/core-rates')}<br>
        ${link("u/UnironicWeeaboo's easier 11-6.", 'https://www.reddit.com/r/girlsfrontline/comments/u1tr33/weekly_commanders_lounge_april_12_2022/i5178cy/')}<br>
        Run any daytime leveling maps for combined core and exp farming. You can also farm during core rate up by using the handgun recipe.`,
        tags : [dTag.ITEM]
    },
    {
        questions : `Any way to increase commander level really quickly?`,
        answers : `Leveling dolls through leveling maps.`,
        tags : [dTag.CMDR, dTag.LEVEL]
    },  //@Test - exact values per doll leveling
    {
        questions : `How do I switch accounts?`,
        answers : `Settings>Manage Accounts>Log out, then on the log-in screen, switch accounts.`,
        tags : [dTag.ACCT]
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
            'Main Story' : [link("u/RhythmLunatic's GFL Cutscene Interpreter (including collabs)", 'https://gfl.amaryllisworks.pw'),
                link("Shoul's Story Scenes Playlists", 'https://www.youtube.com/channel/UC_JmwXOfYqOKpGGtc5gcVmw'),
                link("Girls' Frontline Full Story Comprehension Playlist Translated up to Isomer", 'https://youtube.com/playlist?list=PL9y52Flm1yM-tJJoom2zfrWTpaO1mTw8M'),
                link("u/DoctuhD's Girls Frontline Summary from Isomer to Polarized Light", 'https://docs.google.com/document/d/1yn0sjoktIb2f-KC6bxn3R0qpCUChBPpIQuERcLmBHbg')]
        })}`,
        tags : [dTag.LORE, dTag.COLLAB]
    },
    {
        questions : `What's the use case for 5HGs?`,
        answers : `Good single target burst damage. Quick movespeed. Consumes minimal resources.`,
        tags : [dTag.ECH, dTag.TDOLL]
    },
    {
        questions : `What're the rewards for the Defense Drill?`,
        answers : `${link('Matsuda Guide and Line-up, circa 2.08.', 'https://gfl.matsuda.tips/post/defdrill')}`,
        tags : [dTag.SIMS]
    },
    {
        questions : `What would I need when building night ARSMGs?`,
        answers : `AR: Any.<br>
        SMG: Direct-fire SMGs are hard to sell because of low base ACC and night ACC penalty, so molotovs or grenades.<br>
        HG: Used for expanding vision 1 node away. Stacks with Illumination Fairy.<br>
        PEQ: Mainly used by ARs since SMGs are mostly either tank or AoE. 4${star} is a good stopgap.`,
        tags : [dTag.ECH, dTag.TDOLL]
    },
    {
        questions : `Which T-Doll would be better to anchor for the rate up?`,
        answers : `On one hand, 4${star} can't be TCM'd. On the other hand, 5${star} have low construction rates. And it also depends on the skills of said dolls.`,
        tags : [dTag.PROD, dTag.TDOLL, dTag.TCM]
    },
    {
        questions : `What does each gun class do?`,
        answers : `${table(['Class', 'Roles', 'Target Priority', 'Caveat'],
        ['Assualt Rifle (AR)', 'Anti-Swarm<br>Anti-Boss', 'Frontline', 'Weak to armored enemies'],
        ['Submachine Gun (SMG)', 'Evasion Tank<br>Anti-Swarm', 'Frontline', 'Accuracy is non-existent'],
        ['Rifle (RF)', 'Anti-Armor', 'Backline', 'Weak to swarms<br>Affected by night penalty'],
        ['Handgun (HG)', 'Buffer<br>Debuffer', '???', 'Cannot facetank'],
        ['Machine Gun (MG)', 'Opening Volley', 'Random', 'Reloads/Stops shooting at around 6s<br>Weak to high evasion'],
        ['Shotgun (SG)', 'Armor Tank', 'Frontline', 'Poor evasion'])}`,
        tags : [dTag.TDOLL, dTag.NEWB]
    },  //@Add info
    {
        questions : `How does AK-15's skill actually work?`,
        answers : `${link("BigStupidJellyfish_'s analysis.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/ak15')}`,
        tags : [dTag.TDOLL, dTag.SKILL]
    },
    {
        questions : `What's the time frame for modding dolls?`,
        answers : `From their release until EOS.`,
        tags : [dTag.MOD]
    },
    {
        questions : `Will I get the rewards after adding a returning commander as friend for the callback event?`,
        answers : `${image('./assets/images/CallbackSupporter.png')}<br>
        ${image('./assets/images/CallbackReturner.png')}`,
        tags : [dTag.FRIEND, dTag.ITEM, dTag.MARP]
    },
    {
        questions : `Are the previous monthly Special Equipments obtainable in some way?`,
        answers : `No word as of now.`,
        tags : [dTag.SPEQ]
    },
    {
        questions : `Is there an efficient way of raising a Parachute Fairy?`,
        answers : `${link("markhydroxyl's github notes.", 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_raising_paras.md')}<br>
        ${link('Logistics for HEC crafting.', 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_hec_logis.md')}<br>
        ${spoilerSummary('Fairy Development Calculator.', googleEmbed('https://docs.google.com/spreadsheets/d/1Zcz6Yp3sduhUXY9jo2HCX4pOdiIQioZcS8v6xMK01Pk'))}`,
        tags : [dTag.FAIRY, dTag.LEVEL]
    },
    {
        questions : `Which HOC/FSTs have L2Ds?`,
        answers : `AT4, BGM-71, AGS-30`,
        tags : [dTag.FST]
    },
    {
        questions : `Where are the skins? I can't find them.`,
        answers : `${image('./assets/images/SkinLocation.png', 'Dorms > Warehouse > Gifts')}`,
        tags : [dTag.SKIN]
    },
    {
        questions : `What should I do during a collab?`,
        answers : `Farm event specific currencies (NOT Platinum or Nova medals), get all collab characters, their Special Equipments, and the fairy, grind for the dolls you don't have yet. Combat reports and affection boosters are low on the shop priority list.`,
        tags : [dTag.COLLAB]
    },
    {
        questions : `Update progress is stuck at 90%/100%. What should I do?`,
        answers : `Wait a minute, change WiFi connection, change to data, use VPN, restart client, delete cache, ${link('do a manual patch', 'https://github.com/lloyddunamis/gfl_manualpatch/blob/main/FullResource_readme')}, ${link('delete some files', 'https://twitter.com/Synexcu/status/1310117595094216709?s=19')}, reinstall (with minimum data first), phone restart, or a combination of any of the above coupled with sheer determination to do it for days on end.`,
        tags : [dTag.TECH]
    },
    {
        questions : `What are these General Data I keep getting?`,
        answers : `Used for FSTs that are not yet 5${star}. Limitations being only usable to FSTs in the gacha pool, and the data can't be used for iteration.<br>
        If you plan to big brain with this, churn your FST-specific central data to patches first, because they're the priority data to use before general data.`,
        tags : [dTag.ITEM, dTag.HOC, dTag.FST]
    },
    {
        questions : `Just noticed that the Black Market Shop in the Forward Basecamp has a Costumes tab. Anyone know what that's about?`,
        answers : `Shop for previous event only cosmetics.<br>
        ${image('./assets/images/BlackMarketCostumes.png', 'From u/UnironicWeeaboo')}<br>
        Currently released items in the older servers.`,
        tags : [dTag.EXPED, dTag.SHOP]
    },
    {
        questions : `Should I try getting all ringleaders or should I just save for who I want?`,
        answers : `Ideally, yes. Statistically, getting all ringleaders on their first run is through luck or money. As an F2P, you could probably get a Ringleader every other month.`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        questions : `I'm getting a "resource full" warning. What would that item be?`,
        answers : `${image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-loot-rack.jpg', 'Taken from Gamepress')}<br>
        If the Mid Rewards rack is not empty, look at your armory.<br>
        If it's the End Rewards, check your Black Market currencies.`,
        tags : [dTag.EXPED, dTag.ITEM]
    },
    {
        questions : `I'm trying to S-Rank the stage and I got the kill requirements but I can't get the gold medal. What gives?`,
        answers : `Allied/support/friend echelons do not count. There's a counter on the bottom-left and the white number is what's being counted.`,
        tags : [dTag.MAP]
    },
    {
        questions : `Is it worth it to reset the pool once I got the Ringleader?`,
        answers : `Depends on if you want the remaining units.`,
        tags : [dTag.PA]
    },
    {
        questions : `Does cooldown reduction also reduce initial cooldown?`,
        answers : `Yes.`,
        tags : [dTag.SYSMECH, dTag.TDOLL, dTag.SKILL]
    },
    {
        questions : `What's the uncensor recipe?`,
        answers : `522/320/404/137 for EN, 666/666/666/666 everywhere else... probably.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        questions : `Is there a guide on how to build echelons/team compositions?`,
        answers : `${descriptionList({
            'Mixed' : [image('./assets/images/EchelonComps.png')],
            'Coalition Echelons' : [link('Reddit flowchart post.', 'https://redd.it/rkvisq'),
                link('Gamepress list of units and build suggestions.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units')],
            'Tactical Doll Echelons' : [link("u/BigStupidJellyfish_'s Imgur compilation of basic comps.", 'https://imgur.com/a/SHhVaBv')]
        })}<br>
        Shouldn't be a gospel but a good starting point nonetheless.`,
        tags : [dTag.ECH, dTag.COALITION, dTag.TDOLL]
    },
    {
        questions : `When will the costumes go to the Black Card Exchange?`,
        answers : `After around 2 banners.`,
        tags : [dTag.SKIN]
    },
    {
        questions : `Just bought a gem pack/monthly card but I didn't get it yet. What do I do?`,
        answers : `Go through the process again then back out at the payment screen. If it fails, contact support first if you're planning a refund.`,
        tags : [dTag.TECH]
    },
    {
        questions : `If I scrapped/retired my only copy of a doll, can I recover/get them back?`,
        answers : `First of all, how dare you?<br>
        Second of all, yes you can. Can also work on ${spoilerSummary('collab units', image('./assets/images/CollabScrap.png', 'From u/Angelic_Force'))} and the AR Team.<br>
        Can only work once a week, costs however much is needed for a x1 dummy-link, and scrapped dupes are poof.`,
        tags : [dTag.TDOLL, dTag.COLLAB, dTag.SYSMECH]
    },
    {
        questions : `Does AA-12's SPEQ count as a slug?`,
        answers : `No, apparently due to lacking x3 damage.`,
        tags : [dTag.SPEQ]
    },
    {
        questions : `When are True Core Masks given out?`,
        answers : `One every major event and anniversary.`,
        tags : [dTag.TCM, dTag.MAJOR, dTag.ANNIV]
    },
    {
        questions : `For Coalition Units, should I skip raising units that are below XL size?`,
        answers : `I say skip raising if you're satisfied with the units you have. Otherwise raise a unit regardless of size if you need them. Symmetric Infusion can cover the size problem.`,
        tags : [dTag.COALITION]
    },
    {
        questions : `Where can I see the costumes I have acquired?`,
        answers : `${list(false,
            'Commander Stat Card > Adjutants > Filter > Unlocked. Works for doll you have in inventory.',
            'Index > Furniture > Posters. Works for costumes that have been gifted/given.')}`,
        tags : [dTag.SKIN, dTag.TDOLL]
    },
    {
        questions : `Does Luffberry Chess have any exclusive rewards?`,
        answers : `${link('Icons, furnitures, and as of 2.09, skins.', 'https://www.reddit.com/r/girlsfrontline/comments/uhb3jo/weekly_commanders_lounge_may_03_2022/i7kg6bu/')}`,
        tags : [dTag.OJ, dTag.FURN, dTag.SKIN]
    },
    {
        questions : `General tips on defeating deathstacks?`,
        answers : `For the most part, you don't. But if you really want to, this is the epitome of "CE is useless", "what dolls, formation, fairy to use depend on what you're going against", and "learn kiting". Just don't expect to come out of it unscathed.<br>
        ${descriptionList({
            'Swarm deathstacks' : ['Usually AoE pierce such as Kord, Type 88, KSVK with HOC support and tank/delay fairies.',
                'Kill them all before they kill you.'],
            'Golyat+ deathstacks' : ['Either stun+smoke or forceshields.']
        })}`,
        tags : [dTag.ENEMY]
    },
    {
        questions : `Can fairies be recovered from Index?`,
        answers : `No, unfortunately.`,
        tags : [dTag.FAIRY]
    },
    {
        questions : `Is there anything similar to the True Core Mask but for Coalition units?`,
        answers : `PA shop. 800 supernovas.`,
        tags : [dTag.PA, dTag.ITEM, dTag.COALITION, dTag.TCM, dTag.SHOP]
    },
    {
        questions : `Can I get gold tier fairy talents through calibration?`,
        answers : `Pretty much the main way of getting it.`,
        tags : [dTag.FAIRY]
    },
    {
        questions : `What are Prototype Fairies used for?`,
        answers : `Enhancing other fairies. They act like dupes in a sense that they give 100 enhancement EXP a pop, or 150 with matching talents. Recommended to use on expensive craft fairies.`,
        tags : [dTag.FAIRY]
    },
    {
        questions : `Where can I redeem the event boxes?`,
        answers : `Main Screen > Event > Time-Limited Event Tab > Supply Boxes.`,
        tags : [dTag.ANNIV]
    },  //@Visual
    {
        questions : `Will the TCM icons become available in the Friend Shop?`,
        answers : `Yes, otherwise SOON${tm}.`,
        tags : [dTag.TCM]
    },
    {
        questions : `Do I keep the drops if I terminate/restart?`,
        answers : `"Recently acquired" option in the armory says yes.`,
        tags : [dTag.TDOLL, dTag.MAP]
    },
    {
        questions : `Found out that there are seasonal lines for some dolls. How do I trigger them?`,
        answers : `Set them as your adjutant wearing the appropriate costume for the occasion.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },  //@Clarify
    {
        questions : `Is there a compilation of anniversary adjutant lines?`,
        answers : `${youtubeEmbed('PLoDB_FcnOA5zXkZ9XmQMTog1F7uIRZ_Qa')}<br>
        ${googleEmbed('https://docs.google.com/document/d/1W5JzUGaC_fL5itce05WnkHcu7wX_sEn2vQlbgQNeKAk')}`,
        tags : [dTag.LORE, dTag.ANNIV]
    },  //@PL4Z0akElhimzHHiVMCozfUn1B6tYKjwPR playlist by redditor u/paperrabbit. New by u/ConductorBichir.
    {
        questions : `My team says Ammo/Ration depleted. How do I fill it up?`,
        answers : `${list(true,
            'Stand on a captured Command Center, captured open Heliport, captured open Heavy Heliport, or Cache Box.',
            'Double-tap the echelon standing on it.',
            'Yellow Resupply button on the bottom-right.')}<br>
        If you have auto-resupply on, they will be automatically supplied at the start of your turn if they stand on nodes that can resupply them.<br>
        Note that the act of resupplying in and of itself costs you only rations and ammo. AP will not be consumed.`,
        tags : [dTag.TDOLL, dTag.MAP, dTag.NEWB, dTag.IMPT]
    },  //@Visual
    {
        questions : `What does the ${link('glitter/sparkle', './assets/images/ShinyIndicator.png')} in my coalition unit's portrait mean? Their sprites also has a golden aura/glow around it.`,
        answers : `A shiny ${altTextStyle('pokemon', TextStyle.STRIKE)} coalition unit. And the very reason Golden Infusion is a thing.<br>
        If put on a Lv.100, XL unit, something special may happen.`,
        tags : [dTag.COALITION]
    },
    {
        questions : `My audio is gone when I exit the app and return to it. What's happening?`,
        answers : `Just iOS things. One way to get around it is client restart.`,
        tags : [dTag.APPLE, dTag.TECH]
    },
    {
        questions : `How do I throw/get Abandonded Goliaths/interact with consoles?`,
        answers : `There should be panels on thhe left side of the screen. If they don't appear, restart app.`,
        tags : [dTag.MAP, dTag.TECH]
    },  //@Visual
    {
        questions : `When should I start doing night chapters?`,
        answers : `Anytime. Unlock them by completing the next chapter's last emergency map (i.e. 11-4e unlocks 10-1n). Remember to equip PEQs to negate the accuracy penalty and bring HGs for map vision. ARSMG should be fine for the first few night maps.<br>
        ${link("BigStupidJellyfish_ requirements breakdown.", 'https://www.reddit.com/r/girlsfrontline/comments/pf1dsb/weekly_commanders_lounge_august_31_2021/hb4b257/')}`,
        tags : [dTag.MAIN]
    },
    {
        questions : `Why is this game downloading game files when I open it?`,
        answers : `Either you're just booting it up at the most opportune of times or you closed the Bluestacks emulator directly before closing the GFL app.`,
        tags : [dTag.EMU]
    },
    {
        questions : `I can't log-in with Facebook. What are my options?`,
        answers : `One solution is through the FB app.`,
        tags : [dTag.TECH]
    },
    {
        questions : `I don't know how to change the AI behaviour of my support/friend echelon, anyone can help me?`,
        answers : `Tap on them and there should be options at their feet.`,
        tags : [dTag.FRIEND, dTag.ECH, dTag.MAP]
    },  //@Visual
    {
        questions : `When will dorm battery, daily gift, friend battery reset?`,
        answers : `${link('Netlify timer.', 'https://gftimers.netlify.app')} Note that ranking updates one hour after Kalina's Daily Gift.`,
        tags : [dTag.DORM, dTag.FRIEND, dTag["3P"]]
    },
    {
        questions : `Visited a random dorm and they had a different audio playing, what caused that?`,
        answers : `Specific furniture with a specific doll or a complete furniture set.`,
        tags : [dTag.DORM, dTag.FURN]
    },
    {
        questions : `I didn't get *insert reward here*. I checked my inventory but they're not there. How do I get them?`,
        answers : `Have you checked the quests?<br>
        What about the mail? Stage clear rewards are sent there.<br>
        If you did and they're still not there, either restart or wait for a few days.`,
        tags : [dTag.TECH]
    },
    {
        questions : `What are the chances on getting a specific fairy talent?`,
        answers : `${link('u/BigStupidJellyfish_ analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/talent-data')}`,
        tags : [dTag.FAIRY]
    },
    {
        questions : `Why is the event map still here? It should've ended, right?`,
        answers : `Happens if you didn't close the app throughout maintenance. Can still be played and drop limited dolls.<!-- u/BigStupidJellyfish_ -->`,
        tags : [dTag.MAJOR, dTag.SEASON, dTag.COLLAB]
    },
    {
        questions : `I missed a major event, will it come back?`,
        answers : `6 months minimum after their release, they get added to the Campaign tab. For collabs... hope for the best.`,
        tags : [dTag.MAJOR, dTag.CAMPAIGN]
    },
    {
        questions : `Is there a list of game terms and their abbreviations? And is there any for dolls' nicknames?`,
        answers : `${link('u/BigStupidJellyfish_.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/terms')} Includes in-game and community terms.<br>
        ${link('u/Kipdid.', 'https://www.reddit.com/r/girlsfrontline/comments/urhg1y/weekly_commanders_lounge_may_17_2022/i9fmiwm/')}<br>
        ${link('u/totestemp', 'https://www.reddit.com/r/girlsfrontline/comments/urhg1y/weekly_commanders_lounge_may_17_2022/i972mqd/')}`,
        tags : [dTag.MISC]
    },
    {
        questions : `How do I oath Ringleaders?`,
        answers : `Through the Formations route or the Armory route, with 100 Affection in hand, just like the Dolls. Going through the Protocol Control Center route is reported to be bugged.`,
        tags : [dTag.PA, dTag.COALITION, dTag.OATH, dTag.TECH]
    },
    {
        questions : `Do HP shields stack?`,
        answers : `TLDR: Yes.<br>
        ${image('./assets/images/HPShield.png', 'From u/UnironicWeeaboo')}`,
        tags : [dTag.BATTLE, dTag.SKILL]
    },  //@Trim Image
    {
        questions : `What exactly are Friend Gossips?`,
        answers : `Unique dialogues when two paired dolls are in the double adjutant.`,
        tags : [dTag.MISC]
    },  //<!-- Confirmed Pairs: -->
    {
        questions : `What should I prioritize buying from the black market?`,
        answers : `${list(true,
            'Fire Control Cores',
            'Dummy Cores',
            'Standard Combat Reports',
            'Special Combat Reports',
            'Doll Enhancement Pills',
            'Equipment Enhancement Pills')}`,
        tags : [dTag.EXPED, dTag.ITEM, dTag.SHOP]
    },  //@Visual
    {
        questions : `Is Radiant Collection worth it?`,
        answers : `Not in the slightest. For early game furnishing, the Black Market is better since you can get a 5${star} bonus.<br>
        Rates being 2% divided by the number of costumes in the radiant is the chance of pulling a specific skin. Aside from the fact that no exchange tickets and no L2D.<br>`,
        tags : [dTag.RESUPPLY, dTag.FURN, dTag.EXPED, dTag.SKIN]
    },
    {
        questions : `What are pets used for?`,
        answers : `Extra comfort for dorms and raises chance to go to a specific expedition biome.`,
        tags : [dTag.PET, dTag.DORM, dTag.EXPED]
    },
    {
        questions : `How do I strengthen FSTs?`,
        answers : `${list(false,
            'Leveling up mostly by SCR',
            'Iterations (only available at LV100 and 5★)',
            'Enhancements using pills',
            'Skill levels',
            'Tetrimino chips')}`,
        tags : [dTag.FST, dTag.LEVEL]
    },
    {
        questions : `Are keybinds bannable?`,
        answers : `${link('Highly recommended against using keybinds.', 'https://www.reddit.com/r/girlsfrontline/comments/grht76/monthly_qa/fs239z8/')}<br>
        A lot of emulator players still use them, especially for ${link('kiting', 'https://www.reddit.com/r/girlsfrontline/comments/hmqhw8/weekly_commanders_lounge_july_07_2020/fxgu8g8/')}, so if you're willing to take the risk, go for it. Macros ARE a bannable offense, full stop.`,
        tags : [dTag.EMU]
    },
    {
        questions : `Can C-93's passive trigger with self-debuffs?`,
        answers : `Yes.`,
        tags : [dTag.TDOLL, dTag.SKILL]
    },
    {
        questions : `Why do I get the "Ammo/Ration depleted" warning and sometimes not?`,
        answers : `You'll get the warning when you lack either of them, when you can see the enemy, and when you engage them first in battle.`,
        tags : [dTag.MAP]
    },
    {
        questions : `What are the best deals for RL money?`,
        answers : `${list(false,
            'Monthly gems card')}`,
        tags : [dTag.MISC]
    },
    {
        questions : `What's the release order for PA banners?`,
        answers : `${googleEmbed('https://docs.google.com/spreadsheets/d/1nwlyZxoYaC44idP8SnAjk1OgQX4ND0lIzG3_Fs1We_0')}`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        questions : `Should I keep equipping capes to RFs?`,
        answers : `${link('Yes.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/myths#capes')}`,
        tags : [dTag.TDOLL, dTag.EQUIP]
    },
    {
        questions : `Where can I get calibration tickets?`,
        answers : `Defense Drill, expeditions, shop, mini-events, log-in.`,
        tags : [dTag.ITEM, dTag.SIMS, dTag.EXPED, dTag.MINI, dTag.SHOP]
    },
    {
        questions : `How do I get duplicate ringleaders?`,
        answers : `If you successfully captured the RL, there is a "Reset Pool" button beside the Svarog button. This allows you to refresh the pool back to 100 for another round of RL pulling. Dupe RLs are autofed to your first copy. Any more pulls of the same RL with full petal is an autoscrap.`,
        tags : [dTag.COALITION, dTag.PA]
    },
    {
        questions : `How many ways can I terminate the current mission?`,
        answers : `${list(false,
            'Terminate mission button on the top-left of the field map.',
            "Combat Missions/Campaign/Event Map > the mission you're currently doing > Terminate.")}`,
        tags : [dTag.MAIN, dTag.CAMPAIGN, dTag.MAJOR, dTag.SEASON, dTag.COLLAB]
    },
    {
        questions : `I keep fat-fingering my kiting. Any help?`,
        answers : `To move a doll, you would have to drag their feet, not on their body.`,
        tags : [dTag.BATTLE]
    },
    {
        questions : `When will the ringleader capture special animation start playing?`,
        answers : `When they get captured with Svarog's airstrikes.`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        questions : `Is there any particular reason why not to overextend on crafting for dailies?`,
        answers : `Rate ups. They exist. They take our contracts and quick prods.`,
        tags : [dTag.PROD]
    },
    {
        questions : `Can I farm for the equipment/doll without clearing the map first?`,
        answers : `Yes, but better to clear it to remove the objectives pop-up.`,
        tags : [dTag.SPEQ, dTag.TDOLL]
    },
    {
        questions : `Is Sniper Fairy any good?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/sniper-rework')}`,
        tags : [dTag.FAIRY]
    },
    {
        questions : `How do I strengthen T-Dolls?`,
        answers : `${descriptionList({
            'As an individual unit' : ['Leveling up',
                'Equipments',
                'Skill Levels',
                'MODs'],
            'As a team' : ['Tile synergy',
                'Skill synergy',
                'Fairies']
        })}`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        questions : `Is there any Live2D viewer for GFL?`,
        answers : `${link('Pengu', 'https://pengupengupengu.github.io/live2d-viewer-web/')}. Don't know how this works.<br>
        Or tryi IOPWiki.`,
        tags : [dTag['3P']]
    },
    {
        questions : `How long would visitors stay in my dormitory?`,
        answers : `${link('u/BigStupidJellyfish_ says 8 hours.', 'https://old.reddit.com/r/girlsfrontline/comments/v6pt9o/weekly_commanders_lounge_june_07_2022/ibyvjnm/')}`,
        tags : [dTag.DORM]
    },
    {
        questions : `Which exped location gives which resources and which pet is best for each?`,
        answers : `${table(
            ['Pets', 'Location', 'Currency', 'Ration'],
            ['Cat', 'City', 'Toy Brick', '???'],
            ['Dog', 'Snowfield', 'Buttstock', '???'],
            ['Bird', 'Forest', 'Acorn', '???'],
            ['Misc', 'Wasteland', 'Collapse', '???']
        )}`,
        tags : [dTag.EXPED, dTag.PET, dTag.ITEM]
    },  //@Visual
    {
        questions : `Does getting S rank in a mission increase the chance of getting the map specific doll in story and events?`,
        answers : `Yes.`,
        tags : [dTag.TDOLL]
    },
    {
        questions : `What is "ranking" that people are talking about?`,
        answers : `${link("u/pointblanksniper's essay.", 'https://old.reddit.com/r/girlsfrontline/comments/vbydlq/weekly_commanders_lounge_june_14_2022/id4n4dr/')}`,
        tags : [dTag.MAJOR]
    },
    {
        questions : ``,
        answers : ``,
        tags : []
    },
]);