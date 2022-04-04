const dataTags = {
    EMPTY : 'Others',               //Default tag if I dunno what to put.
    SF : 'SangvisFerri',            //Mainly involves SF. Might phase out.
    ACCT : 'AccountManagement',
    TECH : 'Troubleshooting',       //For resolving issues that shouldn't even happen.
    '3P' : 'ThirdParty',            //Non-dev-made applications that are recommended to use. Safe until said otherwise.
    SIMS : 'CombatSimulations',
    RSC : 'Resources/Currency',     //MARP, tickets, cores, etc.
    MOD : 'NeuralUpgrade',
    NEWB : 'NewbieGuide',           //Things new/early-game players should know.
    PRIME : 'TopicPrimer',          //Explanation of the specific system it's paired with. Usually made up of links. Must be the first box of it's paired tag.
    MAIN : 'CombatMissions',        //Main missions aka Chapters.
    EMU : 'Emulators',
    TDOLL : 'TacticalDolls',        //Anything that directly involves Tactical Dolls.
    EQUIP : 'Equipments',           //Attachments on units.
    APPLE : 'AppleDevices',         //Anything primarily concerning iOS devices.
    ANDROID : 'AndroidDevices',
    ANNIV : 'Anniversary',          //Anything concerning the game's anniversary.
    THEATER : 'Theater',
    LOGI : 'Logistics',
    BATTLE : 'Skirmishes',          //The battle mode where everyone shoots at one another.
    IMPT : 'Important',             //Things new players would need for late-game. Append answers with 'Importance:' and an explanation why.
    EXPED : 'ForwardBasecamp',
    SYSMECH : 'SystemMechanics',    //Explanation on underlying mechanics of the game.
    PA : 'ProtocolAssimilation',    //PA pulling and coalition drills.
    COALITION : 'CoalitionUnits',   //PA counterpart of Tactical Dolls.
    ENEMY : 'EnemyUnits',
    FAIRY : 'Fairies',
    HOC : 'HeavyOrdnanceCorps',
    FST : 'FireSupportTeam',        //Rockets and mortars, the first of the HOC.
    MAJOR : 'MajorEvents',          //Part of the main story. The ones added to the Campaign tab.
    COLLAB : 'Collaboration',
    SEASON : 'SeasonalEvents',      //Story events that happen each New Year, X-mas, Halloween, etc.
    MINI : 'MiniEvents',            //Bingo, Point Event, etc.
    EVENT : 'StoryEvents',          //For questions that apply to Major, Collab, and Seasonal Events.
    MAP : 'FieldMap',               //Node-based overworld.
};
Object.freeze(dataTags)

function image(link, onHover = '', onLoadFail = 'Image loading failed.') {
    return `<img src="${link}" alt="${onLoadFail}" ${onHover ? `title="${onHover}"` : ''}>`
}

function link(linkText, link) {
    return `<a href="${link}">${linkText}</a>`;
}

function orderedList() {
    return `<ol>${Array.from(arguments).map(val => `<li>${val}</li>`).join('')}</ol>`;
}

function strikethrough(string) {
    return `<del>${string}</del>`;
}

function importance(reasoning) {
    return `<br>Importance: ${reasoning}`;
}

const cardData = [
    {
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `${image('/GFL/assets/images/SFEnemy.png')}<br>
        Note that Jupiter Cannons count as unarmored machine type.`,
        tags : [dataTags.SF]
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
        tags : [dataTags.SIMS, dataTags.RSC, dataTags.NEWB]
    },
    {
        questions : `How do Neural Upgrades/MODs work?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-neural-upgrade')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/modding')}<br>
        ${link('GFC guide.', 'https://www.gflcorner.com/neural')}`,
        tags : [dataTags.MOD, dataTags.PRIME]
    },
    {
        questions : `How do I get more Quick Training Contracts?`,
        answers : `Monthlies only.`,
        tags : [dataTags.RSC]
    },
    {
        questions : `I can't access the new chapter even though I already cleared the prerequisite map.`,
        answers : `Beat X-6 Normal of the last chapter again. If it still doesn't appear after that, restart client.`,
        tags : [dataTags.MAIN, dataTags.TECH]
    },
    {
        questions : `Which emulators are good for GFL?`,
        answers : `${orderedList('Mumu.', 'Memu.', 'LDPlayer.', 'Nox.', 'Bluestacks.')}`,
        tags : [dataTags.EMU]
    },
    {
        questions : `What do I need to consider when using the #2 Chip equipment?`,
        answers : `${link(image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/chips/infographic.png', '', `u/BigStupidJellyfish_'s chip usage flowchart.`), 'https://big-stupid-jellyfish.github.io/GFMath/pages/chips')}`,
        tags : [dataTags.TDOLL, dataTags.EQUIP]
    },
    {
        questions : `How can I play GFL if Apple Store doesn't have it?`,
        answers : `Use Android, use emulator, use VPN, use jailbreak.`,
        tags : [dataTags.APPLE, dataTags.EMU]
    },
    {
        questions : `When is the anniversary?`,
        answers : `May 8. Basically around the second week of May.`,
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
        tags : [dataTags.EQUIP]
    },
    {
        questions : `Is there a list of which logistics to do if I want to prioritize certain resources?`,
        answers : `${link('GFC GDoc.', 'https://docs.google.com/spreadsheets/d/1ah2JO6ggWuVaBho9yxgDMC-ucEKA8C42SBkjIlnIcWk')} Up to Chapter 11.<br>
        ${link(`Redditor u/elgatoroid's calculator.`, 'https://gfl-logistics.neko.gg/')} Up to Chapter 11.<br>
        ${link('Tempkaridc calculator.', 'https://tempkaridc.github.io/gf/')} Up to Chapter 13.`,
        tags : [dataTags.LOGI, dataTags.RSC]
    },
    {
        questions : `What is kiting?`,
        answers : `Kiting, in general, is the method of moving your tanks rightwards to make the enemy aim at them then moving leftwards to make the enemy walk towards you, while your DPS constantly shoots them. This is effective because most enemies have aim time where they do nothing, and range where you have to be in their sights to start aiming. Therefore, lengthening the lifespans of your dolls, especially the tanks.<br>
        ${link('GFC guide.','https://www.gflcorner.com/battle-controls/')}<br>
        ${link('Mitsu video guide.', 'https://youtu.be/ITUtRuF4TLY')}<br>
        ${link(`u/Reikyu09's reddit post.`, 'https://redd.it/8o18an')}<br>
        ${importance('Enables late-game strategies beyond just strong armory.')}`,
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
        questions : `What is Expedition/Forward Basecamp?`,
        answers : `${link('Gamepress Detailed Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-basecamp-and-exploration')}<br>
        ${link('GFC Primer.', 'https://www.gflcorner.com/expedition-system-mini-guide/')}<br>
        ${link('ATM Guide.', 'https://gfl.matsuda.tips/post/weareabsolutenotlostiswear')}<br>
        Important note is that FB unlocks at Commander Lv. 20.`,
        tags : [dataTags.EXPED, dataTags.PRIME, dataTags.NEWB]
    },
    {
        questions : `For limited-time bonuses (i.e. auto-battles, logistics), when are the rewards calculated?`,
        answers : `If the runs can be cancelled without penalty, rewards are calculated at the end. Very noticeable with the "Use Battery" bingo mission when exp-training HOCs.<br>
        If they can't be cancelled, or is cancellable with a penalty or cost, calculated at the start. Primary example is exped rewards.`,
        tags : [dataTags.SYSMECH]
    },
    {
        questions : `Are there any general guides for Protocol Assimilation/Coalition Units?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/ironbloodedairconditioning')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Protocol_Assimilation')}<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-first-impressions-revamped')}`,
        tags : [dataTags.PA, dataTags.PRIME]
    },
    {
        questions : `How does Armor Penetration work?`,
        answers : `${link('Matsuda explanation.', 'https://gfl.matsuda.tips/post/armour')}`,
        tags : [dataTags.BATTLE]
    },
    {
        questions : `Is there a guide on which Coalition unit to pull for and how?`,
        answers : `${link(image('https://pbs.twimg.com/media/E5CzhbRXEAEB-XH?format=jpg&name=4096x4096', 'Rudimentary pulling and tier list guide'), 'https://twitter.com/CleistaCeleste/status/1409824210571214849')}`,
        tags : [dataTags.PA, dataTags.COALITION]
    },
    {
        questions : `What are Fairies?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/fairies')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Technical_Fairies')} Unupdated rework skills.<br>
        ${link('GFC guide Part 1.', 'https://www.gflcorner.com/fairy/')} Fairies up to CT only.<br>
        ${link('GFC guide Part 2.', 'https://docs.google.com/spreadsheets/d/1x6_YysDi0h89jKE9vEW2_fbxi7gG7XV5jjJqX8O41rw')} Unupdated fairy list.`,
        tags : [dataTags.FAIRY, dataTags.PRIME]
    },
    {
        questions : `How to HOC?`,
        answers : `${link('Gamepress Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-hoc-combat-basics')}<br>
        ${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Heavy_Ordnance_Corps')}<br>
        ${link('Matsuda Guide.', 'https://gfl.matsuda.tips/post/hocs')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/hoc-guide-by-gfc/')}<br>
        ${link(`Ceia's Video Guide.`, 'https://youtu.be/rsFyXRDAi6I')}<br>
        ${link(`Redditor u/Xealiouth's Guide.`, 'https://redd.it/95nrou')}`,
        tags : [dataTags.HOC, dataTags.PRIME]
    },
    {
        questions : `Is there a penalty for using HOC charges and Fairy points in Theater battles?`,
        answers : `Nope. Joins boss battle regardless of charges and has no bearing on final score. Go ham.`,
        tags : [dataTags.THEATER, dataTags.HOC, dataTags.FAIRY]
    },
    {
        questions : `Can I save the event currencies for the next event?`,
        answers : `No can do. Dissolves into nothingness one week after the event is finished.`,
        tags : [dataTags.RSC, dataTags.EVENT]
    },
    {
        questions : `How do I get a higher success rate for logistics?`,
        answers : `Just doll levels.<br>
        ${link('Matsuda formula.', 'https://gfl.matsuda.tips/post/logistics1')} Remember to floor the mean average for a more accurate number.`,
        tags : [dataTags.LOGI, dataTags.TDOLL]
    },  //Ask if floored after + 15 for great success purposes.
    {
        questions : `I've heard of GFAlarm. Is it safe to use?`,
        answers : `${link('Gamepress breakdown.', 'https://gamepress.gg/girlsfrontline/how-use-gfalarm-girls-frontline-alarm')}`,
        tags : [dataTags["3P"]]
    },
    {
        questions : `Is there any way to reset my battles so I can get a win?`,
        answers : `Turn off WiFi during battle. You can still finish the fight with no connection. Though be wary of connection timeouts so do it near the end.<br>
        If you don't like the result or you lost, exit client, turn on WiFi, re-enter client, take the fight again.<br>
        If satisfied ${strikethrough('or saving your sanity')}, turn on WiFi after the battle finished.<br>
        ${importance('Enables fail-safe for harder than hard fights.')}`,
        tags : [dataTags.BATTLE, dataTags.IMPT]
    },
    {
        questions : `Is there a way to know the initially deployed enemy units and map layout?`,
        answers : `${link('GFLMaps site.', 'https://pengupengupengu.github.io/gflmaps/')}`,
        tags : [dataTags["3P"], dataTags.MAP]
    },
    {
        questions : ``,
        answers : ``,
        tags : []
    },
]
Object.freeze(cardData);