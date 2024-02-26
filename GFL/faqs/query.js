import {spoilerSummary, image as img, table, link, tooltip, getID} from '../../univasset/scripts/htmlfunctions/htmlfunctions.js';
import TextStyle from '../../univasset/scripts/htmlfunctions/textstyle.js';
import MBD from '../../univasset/scripts/htmlfunctions/linkembed.js';
import List from '../../univasset/scripts/htmlfunctions/lists.js';
import {LESSEQUAL, STAR, TM} from "../../univasset/scripts/specialchars.js";
import {Embed, image, figure} from "../../univasset/scripts/html/index.js";

const IMG_ASSET = "../assets/images/query/";

export const dtag = {
    //#region Combat Tabs
        LORE : {name: 'Story/Lore', description: 'Main meat of the series.'},
            MAJOR : {name: 'MajorEvents', description: 'Main story. Added to Campaign after a while.'},
                RANK : {name: 'RankingMaps', description: 'Endgame for the megasweats.'},
            SEASON : {name: 'SeasonalEvents', description: 'Happens every New Year, X-mas, Halloween, etc.'},
            COLLAB : {name: 'Collaboration', description: 'Reason: "He liked it."'},
        MAIN : {name: 'CombatMissions', description: 'Main missions aka Chapters 0-13.'},
            AUTO : {name: 'AutoBattles', description: 'Lazy farming.'},
        LOGI : {name: 'Logistics', description: 'Main source of MARP and tickets.'},
        SIMS : {name: 'CombatSimulations', description: 'Place to get upgrade materials.'},
        CAMPAIGN : {name: 'CampaignMissions', description: 'Permanent Major Events.'},
        THEATER : {name: 'Theater', description: 'Backstab central.'},
        GZ : {name: 'GrayZoneExploration', description: 'SPEQ and Limited doll reruns, SPEQ sets, tank and mech parts.'},    
        //#endregion
    //#region Armory Tabs
        TDOLL : {name: 'TacticalDolls', description: 'Anything T-Doll related. Use as secondary tag.'},
            LEDOLL : {name: 'CycleDropDolls', description: 'Reward dolls that now wander the rerun hell.'},
        COALITION : {name: 'CoalitionUnits', description: 'PA counterpart of Tactical Dolls.'},
        EQUIP : {name: 'Equipments', description: 'Gun attachments, FST chips, PA chips.'},
            SPEQ : {name: 'SpecialEquipments', description: 'Equipments specific to a doll.'},
        ITEM : {name: 'ConsumableItems', description: 'Tickets, cores, shop items...'},
            TCM : {name: 'TrueCoreMask', description: `Used to redeem 5${STAR} prod dolls.`},
            GEMS : {name: 'Gems', description: 'Kalina demands you spend these on her.'},
            BATTERY : {name: 'Battery', description: 'Currency for upgrading facilities.'},
            CORE : {name: 'DummyCore', description: 'Used for dummy-linking, neural upgrades, and fairy/SG crafts.'},
        FAIRY : {name: 'Fairies', description: 'Sixth man of the team.'},
        FST : {name: 'FireSupportTeam', description: 'Rockets and mortars, the first of the HOC.'},
    //#endregion
    //#region Facilities
        ECH : {name: 'EchelonFormation', description: 'Deployable teams.'},
        PROD : {name: 'FactoryProduction', description: 'Ancient Unit Gacha.'},
        MOD : {name: 'NeuralUpgrade', description: 'Extra limit break.'},
        DORM : {name: 'Dormitories', description: 'Battery charger.'},
            RESUPPLY : {name: 'Resupply', description: 'Dorm gacha.'},
            SKIN : {name: 'Costumes', description: 'True money sink.'},
            FURN : {name: 'Furniture', description: '"Dorm Equipments."'},
        HOC : {name: 'HeavyOrdnanceCorps', description: 'Shelling support.'},
        EXPED : {name: 'ForwardBasecamp', description: "Casual's dream QOL."},
            BM : {name: 'BlackMarket', description: "Forward Basecamp's exclusive shop."},
        PA : {name: 'ProtocolAssimilation', description: 'PA pulling and coalition drills.'},
    //#endregion
    //#region Devices
    APPLE : {name: 'AppleDevices', description: 'iOS exclusive features.'},
    EMU : {name: 'Emulators', description: 'Emulator exclusive features.'},
    ANDROID : {name: 'AndroidDevices', description: 'Android exclusive features.'},
    //#endregion
    //#region Home Tabs
    CMDR : {name: 'Commander', description: '"Self-insert."'},
    MARP : {name: 'FourResources', description: 'Manpower, Ammunition, Rations, Parts.'},
    ADJUNCT : {name: 'Adjutants', description: 'T-Doll secretary.'},
    MINI : {name: 'MiniEvents', description: 'Keycard Events, Point Events, etc.'},
    BP : {name: 'FrontlineProtocol', description: 'Battlepass mostly for skins.'},
    QUEST : {name: 'Quests', description: 'Dailies, weeklies, main, career, intel.'},
    SHOP : {name: 'Shop', description: 'Buy things here.'},
    FRIEND : {name: 'Friends', description: 'The helpful kind.'},
    //#endregion
    //#region Meta Tags
    MISC : {name: 'Miscellaneous', description: 'Default tag.'},
    '3P' : {name: 'ThirdParty', description: 'Safe until said otherwise.'},
    TECH : {name: 'Troubleshooting', description: 'DIY tech support.'},
    NEWB : {name: 'NewbieGuide', description: 'Things new/early-game players should know.'},
    PRIME : {name: 'TopicPrimer', description: "Starter explanation of it's paired tag."}, //Must be the first box of it's paired tag.
    TIER : {name: 'TierList', description: 'Basic guideline on who are the best.'},
    IMPT : {name: 'Important', description: 'Things new players would need for late-game.'},
    SYSMECH : {name: 'SystemMechanics', description: 'Explanation on underlying mechanics of the game.'},
    REF : {name: 'Compilation', description: 'Reference compilations.'},
    GET : {name: 'Acquisition', description: 'How to get and where.'},
    //#endregion
    ACCT : {name: 'AccountManagement', description: 'Account data and integrity.'},
    ANNIV : {name: 'Anniversary', description: "Anything concerning the game's anniversary."},
    ENEMY : {name: 'EnemyUnits', description: 'Things regarding enemy info.'},
    MAP : {name: 'FieldMap', description: 'Node-based overworld.'},
        BATTLE : {name: 'Skirmishes', description: 'Where bullets rain.'},
    SIDE : {name: 'SideStory', description: 'Extra stories.'},
    SKILL : {name: 'Skills', description: 'Unit skills.'},
    LOVE : {name: 'Affection', description: '"Keep it high."'},
        OATH : {name: 'OathSystem', description: 'Marriage.'},
    LEVEL : {name: 'Leveling', description: 'EXP, enhancements, calibrations...'},
    PET : {name: 'Pets', description: 'Little critters.'},
    OJ : {name: 'LuffberryChess', description: 'PVP sidegame.'},
    CE : {name: 'CombatEffectiveness', description: 'Clutch metric.'},
    KALINA : {name: 'Kalina', description: 'Overworked logistics officer.'},
};
window.tags = dtag;

const CARDS = [
    //#region Topic Primers
    {
        id: '00000',
        question: `I can't access/press/see things, what do I do?`,
        answer: `Have you tried restarting your application/phone? This should be the default response to everything.`,
        tags: [dtag.TECH, dtag.PRIME, dtag.IMPT]
    },
    {
        id: '00001',
        question: `How do I level my girls?`,
        answer: `${List.description({
            "Leveling Maps": [
                `Done mainly through ${spoilerSummary('corpse dragging', "Also called Poor Run or Beggar Run, it is a method of leveling dolls (and fairy) using minimal resources. This is done by only supplying a single doll echelon then placing them in a non-supplied echelon composed of dolls you want to level.")}.`,
                getID('Draggable stages.', '00026'),
                getID("Supplying the dragger.", "00073")
            ],
            "Combat Reports (CR)": [
                'Acquired through Forward Basecamp, Data Room, the shop during events, EXP Sim, or as a reward.',
                `Can be gifted by going to the ${spoilerSummary('Dorm Gifts screen', figure(image(IMG_ASSET+"SkinLocation.png", "Skin cards loacation."), "Dorms > Warehouse > Gifts"))} or your ${spoilerSummary("Doll's Profile", figure(image(IMG_ASSET+"DollEXP.png", "Doll page exp up"), "+ button by the EXP bar"))}.`,
                'Gives 3000 fixed EXP per report, unaffected by dummy link EXP multiplier.',
                'Gives 6000 fixed EXP per report only when used on oathed+modded dolls.'
            ],
            "Auto-Battles": []
        })}`,
        tags: [dtag.TDOLL, dtag.LEVEL, dtag.PRIME, dtag.NEWB, dtag.OATH, dtag.MOD]
    },
    {
        id: '00421',
        question: `Is there a guide on how to use the equipments/attachments for Tactical Dolls?`,
        answer: `${link("Gamepress guide.", "https://gamepress.gg/girlsfrontline/equipment-basics-how-juggernaut-t-dolls")}`,
        tags: [dtag.TDOLL, dtag.EQUIP, dtag.PRIME]
    },
    {
        id: '00002',
        question: `What is Combat Effectiveness?`,
        answer: `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/ce')}<br>
        ${link("u/elgatoroid's CE calculation.", 'https://old.reddit.com/r/girlsfrontline/comments/kqtpcv/weekly_commanders_lounge_january_05_2021/gifxq8v/')}`,
        tags: [dtag.CE, dtag.PRIME]
    },
    {
        id: '00444',
        question: `What are batteries (battery) and where do I get them?`,
        answer: `Used to upgrade facilities, and more. You can get them from the Black Market, your dorm, and your friends' dorms.`,
        tags: [dtag.BATTERY, dtag.PRIME, dtag.GET]
    },
    {
        id: '00003',
        question: `What is Expedition/Forward Basecamp?`,
        answer: `${link('Gamepress Detailed Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-basecamp-and-exploration')}<br>
        ${link('GFC Primer.', 'https://www.gflcorner.com/expedition-system-mini-guide/')}<br>
        ${link('ATM Guide.', 'https://gfl.matsuda.tips/post/weareabsolutenotlostiswear')}<br>
        Important note is that FB unlocks at Commander Lv. 20.`,
        tags: [dtag.EXPED, dtag.PRIME, dtag.NEWB]
    },
    {
        id: '00004',
        question: `Are there any general guides for Protocol Assimilation/Coalition Units/SF Capture Operation?`,
        answer: `${link('Gamepress guide.', "https://gamepress.gg/girlsfrontline/protocol-assimilation-coalition-basics-and-teambuilding")}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/ironbloodedairconditioning')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Protocol_Assimilation')}<br>
        ${spoilerSummary("Cleista's basic Twitter guide.", MBD.twitter('CleistaCeleste', '1409824210571214849'))}`,
        tags: [dtag.PA, dtag.PRIME]
    },
    {
        id: '00005',
        question: `How do Neural Upgrades/MODs work?`,
        answer: `The only way to raise dolls beyond Lv. 100.<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-neural-upgrade')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/modding')}<br>
        ${link('GFC guide.', 'https://www.gflcorner.com/neural')}`,
        tags: [dtag.MOD, dtag.PRIME]
    },
    {
        id: '00006',
        question: `What are Fairies?`,
        answer: `${List.unordered(
            link('Matsuda guide.', 'https://gfl.matsuda.tips/post/fairies'),
            link('IOPWiki guide.', 'https://iopwiki.com/wiki/Technical_Fairies') + " Unupdated rework skills.",
            link('GFC guide.', 'https://www.gflcorner.com/fairy/') + " Fairies up to CT only.",
            link("Gamepress guide.", "https://gamepress.gg/girlsfrontline/fairies-where-they-live-and-how-craft-them"),
            spoilerSummary("GDoc guides.", Embed.google(
                ["Fairy Analytic(EN) v0.60 by 25thNight- and Emperoripmg (GFC) (Unupdated)", "https://docs.google.com/spreadsheets/d/1x6_YysDi0h89jKE9vEW2_fbxi7gG7XV5jjJqX8O41rw"],
                ["Fairy Crash Course (by Jesse #6406)", "https://docs.google.com/document/d/1dXZkOmAR0SWqL7UKCxmTP2hUPjpoRhskbJHn1ZlpNWc"]
            ))
        )}`,
        tags: [dtag.FAIRY, dtag.PRIME]
    },
    {
        id: '00007',
        question: `How to HOC?`,
        answer: `${link('Gamepress Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-hoc-combat-basics')}<br>
        ${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Heavy_Ordnance_Corps')}<br>
        ${link('Matsuda Guide.', 'https://gfl.matsuda.tips/post/hocs')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/hoc-guide-by-gfc/')}<br>
        ${link("u/Xealiouth's Guide.", 'https://redd.it/95nrou')}`,
        tags: [dtag.HOC, dtag.PRIME]
    },  //Privated - rsFyXRDAi6I
    {
        id: 420,
        question: `There's an event going on. What should I do?`,
        answer: `${List.description({
            "Seasonal Events": [
                "Farm maps to get 60 (80/120 if rerun) event specific tokens daily. You can miss a day of farming and still get all items in the shop.",
                "Complete the story to unlock farming maps. Story maps are largely balanced around a one-week player.",
                "Farming maps are either separate nodes/chapters, or updated story maps."
            ],
            "Major Events": [
                "Farm maps to get crates/supply boxes limited to 60 daily.",
                "Finish the event. Skip the story if you have to.",
                "Normal is for new commanders or lazies. Hard/EX is for mid-game players who wants a challenge. Nightmare/UX is for late-gamers."
            ],
            "All of the above": [
                `Grind the farming maps to obtain ${getID("event-reward dolls", "00024")}. You can pity/guarantee them with ${getID("Platinum and Nova medals", "00104")}.`
            ]
        })}`,
        tags: [dtag.SEASON, dtag.MAJOR, dtag.PRIME, dtag.NEWB]
    },
    {
        id: '00477',
        question: `What is Gray Zone Exploration?`,
        answer: `${link("Gamepress guide.", "https://gamepress.gg/girlsfrontline/gray-zone-introduction")}`,
        tags: [dtag.GZ, dtag.PRIME]
    },
    {
        id: '00008',
        question: `How to do Theater/Theatre?`,
        answer: `${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Theater_Mode')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/theater-system-introduction-by-gfc/')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/rng_backstabbing')}<br>
        ${link('Gamepress Guide Part 1.', 'https://gamepress.gg/girlsfrontline/theater-8-overhaul-guide-new-mechanics-new-enemies-same-pain')} The latest theater version.<br>
        ${link('Gamepress Guide Part 2.', 'https://gamepress.gg/girlsfrontline/theater-8-combat-guide')}<br>
        ${spoilerSummary('Theater for dummies.', image('https://cdn.discordapp.com/attachments/372235987520323596/881427651070410792/theaterguide.png', "Simple theater guide."))}<br>
        TLDR is 5-6 Defense Drills in a row, twice per day, with differing battle effects. Do scouting bets where you pick one zone. Dump points on construction for easier battles.<br>
        Echelon formations are now 1 team + backups.<br>
        Between 4:00-5:00AM UTC-8, a ceasefire occurs to tally the scores.`,
        tags: [dtag.THEATER, dtag.PRIME]
    },
    {
        id: '00009',
        question: `What's a True Core Mask, where do I get them, and how do I use it?`,
        answer: `One TCM is given out every major event and anniversary.<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/true-core-mask-revamped-who-get')}`,
        tags: [dtag.TCM, dtag.PRIME, dtag.MAJOR, dtag.ANNIV, dtag.GET]
    },
    {
        id: '00010',
        question: `Are there any sort of guides on how and when to roll for skins?`,
        answer: `${link('BigStupidJellyfish guide.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/gacha')}`,
        tags: [dtag.RESUPPLY, dtag.TDOLL, dtag.SKIN, dtag.PRIME]
    },
    {
        id: '00011',
        question: `What are auto-battles for?`,
        answer: `Saves your sanity from painful-AF-to-grind-for-drops maps for starters. Useful for getting the map limited dolls you want.`,
        tags: [dtag.AUTO, dtag.PRIME]
    },
    {
        id: '00012',
        question: `What does Affection do?`,
        answer: `${List.description({
            'Tactical Dolls' : [
                'At 90 and above, gives stat bonuses indicated by pink numbers.',
                'At 10 below, gives stat penalties indicated by blue numbers.',
                'Enables oathing at 100.',
                'If a doll dies in a non-boss fight, that particular doll will lose 10 points. Everyone else loses 5 points.'
            ],
            'Coalition Units' : [
                'If a unit dies in battle, only that unit will lose affection.',
                'Enables oathing at 100 for ringleaders only.'
            ],
            'Kalina' : ['Raised through daily hearts in the shop or spending gems.']    //Spending gems on infrastructures raises hearts?
        })}`,
        tags: [dtag.LOVE, dtag.PRIME, dtag.OATH, dtag.TDOLL, dtag.COALITION, dtag.KALINA]
    },  //@Clarify - https://old.reddit.com/r/girlsfrontline/comments/w2n556/weekly_commanders_lounge_july_19_2022/igti9c1/
    {
        id: '00098',
        question: `How does the Rescue Station work?`,
        answer: `${link('DMesse guide.', 'http://dmesse.egloos.com/m/3588696')}`,
        tags: [dtag.PET, dtag.PRIME]
    },
    {
        id: '00013',
        question: `What is Luffberry Chess?`,
        answer: `GFL version of 100% Orange Juice, I guess?<br>
        And it's called "chess" only because boardgame.
        ${List.unordered(
            link("Gamepress guide.", "https://gamepress.gg/girlsfrontline/springfields-cafe-haven-soothe-weary-souls-and-luffberry-chess"),
            link("u/fortis_99's tips.", 'https://redd.it/rz4uye'),
            spoilerSummary("u/StarBase10's doc guide.", Embed.google(
                ["The Skill Issue Guide to Luffberry Chess", "https://docs.google.com/document/d/1BHZ36zTKdQ9gd81a-RAHEzbs9OEgJraSRp5LQv8CB_A"]
            ))
        )}`,
        tags: [dtag.OJ, dtag.PRIME]
    },
    //#endregion
    //#region Tier Lists
    {
        id: '00464',
        question: `Is there a tier list for this game?`,
        answer: `${link("CN spreadsheet.", "https://shimo.im/sheets/47kgJne6BeIpR4qV")}<br>
        Take them more as a suggestion rather than a rule. Tier lists are usually for those generally ok in majority of content or very good at highly recurring niche.<br>
        It's better to know which units are good based on countering enemies and their formations.`,
        tags: [dtag.TIER]
    },
    {
        id: '00014',
        question: `Is XXX doll good and is it safe to retire them?`,
        answer: `Tier lists in general are a matter of countering enemies. And since the meta of this game varies wildly from event to event, most people would point to analysis links instead.
        ${List.unordered(
            link('Gamepress Overview.', 'https://gamepress.gg/girlsfrontline/t-dolls-list'),
            spoilerSummary("u/LuckyTenth's spreadsheet.", Embed.google(["T-doll relevance", "https://docs.google.com/spreadsheets/d/1w2qEbnNluSc6C4U73yyAnYE_zmXdARvDu3GZmMO7hl4"])),
            link('Matsuda Quips.', 'https://gfl.matsuda.tips/dolls/'),
            link('KR Wiki.', 'https://namu.wiki/w/%EC%86%8C%EB%85%80%EC%A0%84%EC%84%A0/%EC%9D%B8%ED%98%95%EB%8F%84%EA%B0%90'),
            link("Fatalchapter's bilibili guide.", 'https://www.bilibili.com/read/readlist/rl100361') + " Updated up to Jashin dolls.",
            link("Sijun's list.", 'https://www.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i1rph1l/') + " Translated by u/ConductorBichir.",
            spoilerSummary('BigStupidJellyfish analyses.', List.unordered(
                link('Vallhalla girls.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/valhalla'),
                link('AK-15.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/ak15')
            ))
        )}`,
        tags: [dtag.TDOLL, dtag.TIER]
    },
    {
        id: '00015',
        question: `Is there a tier list for good PA units?`,
        answer: `${link("u/CheneyQWER's tier list.", 'https://redd.it/uirvxz')}<br>
        ${link('Gamepress units guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units')} Use the search bar if a certain PA unit is unavailable in the page.<br>
        ${link("Matsuda tips.", "https://gfl.matsuda.tips/captures/")}`,
        tags: [dtag.PA, dtag.COALITION, dtag.TIER]
    },
    {
        id: 16,
        question: `Who should I prioritize to MOD first?`,
        answer: `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/neural-upgrade-priority-guide')}`,
        tags: [dtag.MOD, dtag.TIER]
    },  //${spoilerSummary('CN MOD list.', image(IMG_ASSET+"CNMODTier.png", "Chinese Neural Upgrade Tierlist."))}
    {
        id: '00017',
        question: `Is there a tier list for fairies and equipment?`,
        answer: `${List.unordered(
            spoilerSummary("Sijun's infographic", `${image("https://i.imgur.com/2nh8xHs.jpeg", "Fairy and equipment tier list")}<br>
            For the equipments, top number is the recommended quantity, bottom number is the reserve quantity.`),
            spoilerSummary("u/UnironicWeeaboo's fairy stat calculator", Embed.google(
                ["GFL - Fairy Stat Calculator", "https://docs.google.com/spreadsheets/d/1RORciafqtspkxy3fqBrFdKIxVfanV2-fLl9FlvY3QtM"]
            )),
            spoilerSummary("u/BigStupidJellyfish_ reviews", List.unordered(
                link('General reviews', 'https://big-stupid-jellyfish.github.io/GFMath/pages/fairy-reviews'),
                link('Sniper review', 'https://big-stupid-jellyfish.github.io/GFMath/pages/sniper-rework')
            ))
        )}`,
        tags: [dtag.FAIRY, dtag.EQUIP, dtag.TDOLL, dtag.TIER]
    },
    {
        id: '00018',
        question: `Anyone have a nice infographic for equipment priority and recommended/ideal number/amount of equipments?`,
        answer: `${figure(image('https://cdn.discordapp.com/attachments/951085201658871820/1063837601351610389/eq_prior_notheater.png', "Equipment quantity recommendations."), 'Discord: $eqpriority')}`,
        tags: [dtag.EQUIP, dtag.TDOLL, dtag.TIER]
    },
    {
        id: 19,
        question: `Which HOC FSTs should I raise first?`,
        answer: `${figure(image("https://cdn.discordapp.com/attachments/444348972035866634/971135326150090842/HOC_Priority.png", "HOC Enhancement Priority"), "Discord: $hocpriority")}`,
        tags: [dtag.HOC, dtag.FST, dtag.TIER]
    },
    {
        id: 20,
        question: `Which doll should I get using True Core Masks?`,
        answer: `${image(IMG_ASSET+"VeryReliableTCMGuide.png", "Memey guide.")}<br>
        ${image(IMG_ASSET+"SeriousTCMGuide.png", "Serious guide.")}`,   // add discord bot call
        tags: [dtag.TCM, dtag.TIER]
    },
    //#endregion
    //#region Compilations
    {
        id: '00297',
        question: `Is there a good place where I can find a spreadsheet on detailed doll stats?`,
        answer: `${link("u/UnironicWeeaboo's repository.", 'https://randomqwerty.github.io/?server=ch&file=gun')}<br>
        ${link('GFLDB.', 'https://gfl.zzzzz.kr/dolls.php?lang=en')}<br>
        ${link('GFWiki CN.', 'https://gfwiki.org/w/%E6%88%98%E6%9C%AF%E4%BA%BA%E5%BD%A2%E5%9B%BE%E9%89%B4')}`,
        tags: [dtag.TDOLL, dtag.REF]
    },  //Wait for additional repo.
    {
        id: 23,
        question: `Where can I read/rewatch the MOD, costume, event stories, and all that?`,
        answer: `${List.description({
            'Compilations' : [
                link('GF Translated Story Material (+ other stuff)', 'https://drive.google.com/drive/folders/14sNze_lnv5EwL1bl_g3IOVQIo6GGYUJp'),
                link('GF Translations', 'https://drive.google.com/drive/folders/14bAuWaGbagJwucmlit3EkXFqMRV9NHZO'),
                link('The Official #gf-loreroom Information Index', 'https://docs.google.com/spreadsheets/d/1LYV05D7kGTKp_FS7cJrNrJlVxeRAnFVnr6vCTo5F-YM'),
                link('Campaign Stuff', 'https://drive.google.com/drive/folders/15EjxktNclESJ6e6rb5udNxOaczNTPZVZ'),
                link('Costume Stories', 'https://drive.google.com/drive/folders/13AiWn_jgIxWUTK2T7EVjFV8Rkk6jptEs'),
                link('GFL Manga', 'https://drive.google.com/drive/folders/1fEYYxtXAFTfyovwW-WRvNOpbXTu1_hlk'),
                link("u/TheGreyGhost00's Reddit Outline", "https://redd.it/z1g738")
            ],
            'Lore' : [
                link('Confidential Files', 'https://docs.google.com/document/d/1JyJ-o9gHCeCdN2h8PhhRdFczejLs6Wve8dziQZUSEGk'),
                link('Confidential Files 2: New and Emerging Forms of Threat', 'https://drive.google.com/drive/folders/17_9Tu-90ZWrvlHPzgWbVwSQebJ4nHiR7'),
                link("The Background History of Girls' Frontline", 'https://twitter.com/YZsFerrari/status/1379877420732448777'),
                link('IOPWiki Lore', 'https://iopwiki.com/wiki/Lore'),
                link('Gamepress Lore Directory', 'https://gamepress.gg/girlsfrontline/lore-directory')
            ],
            'Main Story' : [
                link("u/RhythmLunatic's GFL Cutscene Interpreter (including collabs)", 'https://gfl.amaryllisworks.pw/'),
                link("Shoul's Story Scenes Playlists", 'https://www.youtube.com/channel/UC_JmwXOfYqOKpGGtc5gcVmw'),
                link("XtraNinja's GFL events playlists", "https://www.youtube.com/@XtraNinja/playlists"),
                link("Girls' Frontline Full Story Comprehension Playlist Translated up to Isomer", 'https://youtube.com/playlist?list=PL9y52Flm1yM-tJJoom2zfrWTpaO1mTw8M'),
                link("u/DoctuhD's Girls' Frontline Summary", 'https://docs.google.com/document/d/1oA07O2HGwvmoBqm-UKTTuSdxjLnSIbRHd5b2FuYOph0'),
                spoilerSummary("u/Signal_Abroad1427's Hurricane Rescue video", MBD.youtube("oH1st5OxdyY")),
                link("u/pointblanksniper collection", "https://old.reddit.com/r/girlsfrontline/comments/13phxi5/weekly_commanders_lounge_may_23_2023/jlv5bns/")
            ]
        })}`,
        tags: [dtag.LORE, dtag.MAJOR, dtag.COLLAB, dtag.REF]
    },
    //#endregion
    //#region Important Details
    {
        id: 24,
        question: `Where and how can I get my favorite gun/doll/unit/character?`,
        answer: `${List.description({
            'Factory Production': [
                // spoilerSummary('Infographic for resource efficient recipes.', image("https://media.discordapp.net/attachments/951085201658871820/1061272490309066762/recipes_2.png", "Factory prooduction recipes.")),
                link("GFDB Github Database.", 'https://gf-db.github.io/')
            ],
            'Rescue Drops': [
                spoilerSummary('"Limited" drops in Combat Missions.', 'Limited to that particular map. Not limited by time, but by place. Until Rescue Event happens.' +
                    table(['Chapter', 'Doll', 'SPEQ'],
                        ['00', 'N/A',       'N/A'],
                        ['01', 'G17',       'Springfield AP'],
                        ['02', 'FMG-9',     'BAR Ammo Box'],
                        ['03', 'CZ-805',    'AR-15 HV'],
                        ['04', 'M21',       'MP5 Exo'],
                        ['05', 'M249SAW',   'Mosin Cape'],
                        ['06', 'M1A1',      'M16 Armor/Exo'],
                        ['07', 'PSM',       'MG3 Ammo Box'],
                        ['08', 'SCW',       'FAMAS Optics'],
                        ['09', 'Ak 5',      'Stechkin Silencer'],
                        ['10', 'XM3',       'TAR21 Chip'],
                        ['11', 'Mk46',      'N/A'],
                        ['12', 'MAT-49',    'N/A'],
                        ['13', 'Defender',  'N/A'])),
                link(`Farmable dolls in campaign maps, both 3${STAR} monthly reward dolls and 4-5${STAR} dolls that debuted on their corresponding event.`, 'https://big-stupid-jellyfish.github.io/GFMath/pages/campaign-rewards'),
                `During collabs, major events, side events, and ${spoilerSummary('Rescue Events', `Also known as Boss Bully, where you get to farm for 4-5${STAR} event reward dolls in the story chapters 1-6.`)}, event rewards become temporarily available for farming.`,
                `Gray Zone cycles event reward dolls every season. Obtainable on grayzone node/field map S-rank.`,  // https://old.reddit.com/r/girlsfrontline/comments/17uxhw7/weekly_commanders_lounge_november_14_2023/k9edfcy/
                'Obtainable from random nodes, however unlikely.',
                `For 5${STAR} units that can also be crafted, their drop rates are less than 1%.`,
                "Whatever doll you recieved, whether you win, lose, or quit the stage, you keep it.",
                getID("Farming maps and routing.", "00123")
            ],
            'Event Rewards': [
                link("BigStupidJellyfish's Event/Clear Reward dolls list.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/limited-dolls'),
                'These dolls will become unavailable from campaign clear rewards.'
            ],  // https://gfl.matsuda.tips/post/limitedeventdolls
            'Shop': [
                'Applicable to collab dolls using event currency.',
                `5${STAR} dolls available in Factory Production are the only ones elegible for True Core Masks, bar spaghetti.`,
                `Paid ${link("Transfer Letters", "https://redd.it/zqfkzw")} for any 4 or 5${STAR} units. Very useful for 4${STAR} SGs. Rare occurence.`
            ],
            'Achievements': [
                "Type 97s and the AR Team, which are the only ones that can't be bought.",
                'All dolls come preleveled.'
            ]
        })}`,
        tags: [dtag.TDOLL, dtag.IMPT, dtag.GET, dtag.SPEQ, dtag.PROD, dtag.MAP, dtag.TCM, dtag.GZ]
    },  //${spoilerSummary('Dolls EN are missing.', image('https://cdn.discordapp.com/attachments/951085201658871820/1033732620384751636/en_missing_dolls_varz_asked_edition.png'))}
    {
        id: '00025',
        question: `How do I strengthen T-Dolls?`,
        answer: `${List.description({
            'As an individual unit' : ['Leveling up',
                'Stat enhancements',
                'Equipments',
                'Skill levels',
                'Dummy-linking',
                'MODs'],
            'As a team' : ['Tile synergy',
                'Skill synergy',
                'Fairies']
        })}`,
        tags: [dtag.TDOLL, dtag.ECH, dtag.LEVEL, dtag.IMPT]
    },
    {
        id: '00433',
        question: `What is Dummy-linking and how do I do it?`,
        answer: `A game mechanic to increase the total damage dealt and the health pool of a doll, and tile bonuses for HGs.<br>
        Each newly-acquired doll starts at dummy link x1.<br>
        The level thresholds of dolls to enable linking are levels 10(x2), 30(x3), 70(x4), 90(x5).<br>
        Which is why the general consensus on leveling is to stop at Lv.90, and why RFHGs are often regarded as mid-late game builds.<br>
        Each additional link also gives an additional 0.5x multiplier, up to x3 EXP. Affects auto-battle EXP gain.<br>
        This can be done by going to Factory>Dummy-Link and using duplicate dolls or dummy cores.`,
        tags: [dtag.SYSMECH, dtag.TDOLL, dtag.IMPT, dtag.LEVEL, dtag.AUTO]
    },
    {
        id: '00026',
        question: `What are the leveling stages I can corpse drag and how do I run them?`,
        answer: `${List.description({
            'General': [
                link('Matsuda guide per leveling map.', 'https://gfl.matsuda.tips/post/leveling_guide'),
                link('Gamepress guide.', "https://gamepress.gg/girlsfrontline/optimized-levelling-corpse-dragging-maps"),
                link('GFLCorner guide.', 'https://www.gflcorner.com/efficient-leveling-guide/'),
                link('DMesse guide.', 'http://dmesse.egloos.com/m/3567918')
            ],
            '0-2': [
                spoilerSummary("Ceia's 0-2 drag guide.", Embed.google(
                    ["The Art of 0-2 Dragging", "https://docs.google.com/document/d/1PkxJ7ObdGW_cS_qbzAxQ_hoC1SFse3HNYWlnywZfPuo"]
                ))
            ],
            "4-3E": [
                "For AR DPS, do not use MGs or caped RFs."
            ],
            '8-1N': [
                spoilerSummary('Zas drag.', Embed.google(
                    ["8-1N Zas Corpse Drag by 25thNight-", "https://docs.google.com/spreadsheets/d/1VT52c-_m4zTx-OFRPcxE9iFmmJY_AMC7CyJT1B7FLt8"]
                ))
            ],
            '13-4': [
                link('tempkaridc calculator for Vector.', 'https://tempkaridc.github.io/gf/vec'),
                link('xVarz spreadsheet for different draggers.', 'https://docs.google.com/spreadsheets/d/1cuZPF-r1e6TyE4Rj2DNkSEova7Tc-Cczs7RaoAK2vII'),
                spoilerSummary('Infographic.', image('https://cdn.discordapp.com/attachments/564028599682727937/929724568258629642/134.png', "Jesse infographic."))
            ],
            'SC 3-1 EX': [
                'Good for dragging coalition units.',
                spoilerSummary("Ceia's SC 3-1Ex guide.", MBD.youtube('UdmOZqypu_c')),
                spoilerSummary("Aqua's SC 3-1Ex.", MBD.streamable('0dpjje')),
                spoilerSummary("BigStupidJellyfish's SC 3-1Ex auto-pathing.", image(IMG_ASSET+"SCAuto-path.png", "Turn 1 auto-path."))
            ],
        })}`,
        tags: [dtag.TDOLL, dtag.COALITION, dtag.LEVEL, dtag.IMPT]
    },
    {
        id: '00027',
        question: `When should I begin trying to produce fairies/do Heavy Equipment Constructions (HEC)?`,
        answer: `When you have sufficient income for 4 resources and cores. Ideally ASAP since raising one to 5${STAR} takes a considerable amount of time.`,
        tags: [dtag.FAIRY, dtag.PROD, dtag.IMPT]
    },
    {
        id: '00028',
        question: `Is there a guide on how to build echelons/team compositions?`,
        answer: `Basic tip in this game is counterplay is more important than fixed synergy.<br>
        ${List.description({
            'Mixed' : [spoilerSummary("CheneyQWER's infographic.", img(IMG_ASSET+"EchelonComps.png"))],
            'Coalition Echelons' : [
                link('Reddit flowchart post.', 'https://redd.it/rkvisq'),
                link('Gamepress list of units and build suggestions.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units'),
                link('BigStupidJellyfish guide.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/ringleader-echelon')
            ],
            'Tactical Doll Echelons' : [
                link("u/BigStupidJellyfish_'s Imgur compilation of basic comps.", 'https://imgur.com/a/SHhVaBv'),
                link("ARSMG by warorpeace#7149.", "https://docs.google.com/document/d/e/2PACX-1vR4OYslSVaE5mv6xyu7rIun24Ltu0SWsEzwOrER2MiWseDt5Fy5LjFFEZZzTDvl9C2Xb7g3pcWObSC4/pub"),
                link("RFHG by warorpeace#7149.", "https://docs.google.com/document/d/e/2PACX-1vTR8LNVuBX4FiaAxLus5zZO6M4hQCu_4Fec0S0rqMmhPMXQXMcnU4uPhwwYAHOQDB5I9nq0VqSJd4-p/pub"),
                spoilerSummary("MGSG by canoxin#2789.", Embed.google(
                    ["An introduction to MGs and SGs", "https://docs.google.com/document/d/1-O7398S5sHcowCI8lp5Ktu_AiUBydJuvVHV-dX7g-l8"]
                )),
                link("Gamepress MGSG guide.", "https://gamepress.gg/girlsfrontline/mgs-sgs-and-teambuilding")
            ]
        })}<br>
        Shouldn't be a gospel but a good starting point nonetheless.<br>
        ${link('u/UnironicWeeaboo tips.', 'https://old.reddit.com/r/girlsfrontline/comments/vmhs0x/weekly_commanders_lounge_june_28_2022/ie3bw95/')}`,
        tags: [dtag.ECH, dtag.PA, dtag.COALITION, dtag.TDOLL, dtag.IMPT, dtag.NEWB]
    },
    {
        id: '00029',
        question: `What is kiting?`,
        answer: `Kiting, in general, is the method of moving your tanks rightwards to make the enemy aim at them then moving leftwards to make the enemy walk towards you, while your DPS constantly shoots them. This is effective because most enemies have aim time where they do nothing, and range where you have to be in their sights to start aiming. Therefore, lengthening the lifespans of your dolls, especially the tanks.<br>
        This is the reason why putting your whole team at the back of the grid is preferable.<br>
        Sometimes called wiggling which in this context means moving your DPS to retarget.<br>
        ${link('GFC guide','https://www.gflcorner.com/battle-controls/')}<br>
        ${spoilerSummary('Mitsu video guide', MBD.youtube('ITUtRuF4TLY'))}<br>
        ${link("u/Reikyu09's reddit post", 'https://redd.it/8o18an')}<br>
        ${link("Gamepress guide", "https://gamepress.gg/girlsfrontline/treatise-gfl-combat-kiting-basics")}`,
        tags: [dtag.BATTLE, dtag.IMPT]
    },
    {
        id: '00030',
        question: `What are Main Tanks and Off Tanks?`,
        answer: `${List.description({'Main Tanks' : ['Guns that have survivability skills (i.e. smoke, eva boost, stun etc.).', 'Generally situated at the middle of the pack.'],
        'Off Tanks' : ['Guns that generally have damage skills (i.e. molotov, grenade, damage boost etc.) and/or a secondary damage soaker in some instances.', 'Situated at either middle-top or middle-bottom.']})}<br>
        All of these usually refer to SMGs.`,
        tags: [dtag.ECH, dtag.IMPT]
    },
    {
        id: '00031',
        question: `Is fairy leveling for increasing rarity only?`,
        answer: `Mainly yes, but there is a gradual aura boost where a Lv.20 is better than Lv.1 even at 1${STAR}. And increasing rarity is very important, from increasing the aura stat cap, to making the talent proc more consistently. Not to mention that you can cap them to Lv.100 even as a 1${STAR} so there's no hurry to raise their rarity.`,
        tags: [dtag.FAIRY, dtag.LEVEL, dtag.IMPT]
    },
    {
        id: '00032',
        question: `Is there a rate up in this game? If so, how do they work?`,
        answer: `When a rate-up is in progress, an "EVENT" marker will be plastered on top of the Factory Production button.<br>
        ${List.description({
            'Anchored Construction' : [
                link(`Available for new players ${TextStyle.style('and for veterans not bothering with it', TextStyle.STRIKE)}.`, 'https://gamepress.gg/girlsfrontline/209-client-update-new-features#topic-230681'),
                link('Available on Tuesdays whenever a new batch of production dolls are released.', 'https://redd.it/szdua2') + ` Recommended anchors are usually 4${STAR} due to ${getID("TCM", "00009")} existing, especially for shotguns.`, 
                "Access it through the doll production screen. If it doesn't appear, try restarting app. It happens when you log-in earlier than the rate up."
            ],
            'Targeted Rate Up' : [
                'Available when a new skin banner is released. Rate up dolls are those who are present in the banner.',
                'Available during weekends when a new doll batch enters construction.'
            ],
            'General Rate Up' : ['January, May, September.']
        })}`,
        tags: [dtag.PROD, dtag.IMPT, dtag.TECH]
    },
    {
        id: '00033',
        question: `Why are the doll skills not activating?`,
        answer: `Is the auto skill button on? Is it on forced manual? Is it a flare skill?<br>
        Active skills cannot activate when they cannot shoot, i.e. reloading, dolls moving, no enemy in range, no ammo/ration<!--, in-between shot cooldowns-->.<br>
        Passive skills on the other hand will not activate only if they have no ammo or ration. This includes Slug's 3x damage and Flash's -3 damage. Though that there are a handful of exceptions.`,
        tags: [dtag.TDOLL, dtag.SKILL, dtag.IMPT]
    },  //@Visual
    {
        id: '00034',
        question: `How do I strengthen FSTs?`,
        answer: `${List.unordered(
            'Leveling up mostly by SCR',
            `Raising ${STAR}s using their central data or general data`,
            'Iterations by data patches (only available at LV100 and 5★)',
            'Enhancements using pills',
            'Skill levels',
            'Tetrimino chips')}`,
        tags: [dtag.FST, dtag.LEVEL, dtag.IMPT]
    },
    //#endregion
    {
        id: '00035',
        question: `Which SF units are considered dolls/machines/armored/unarmored?`,
        answer: `${img(IMG_ASSET+"SFEnemy.png", 'Jupiter Cannons count as unarmored machine type')}`,
        tags: [dtag.ENEMY]
    },
    {
        id: '00036',
        question: `Will there be problems with switching between multiple devices regularly?`,
        answer: `Only if you think that manually logging in every switch is a problem.`,
        tags: [dtag.ACCT]
    },  //If there's two simultaneous logins, who gets kicked the first or the second?
    {
        id: 37,
        question: `Where to go for tech support/bug report?`,
        answer: `${List.unordered(
            "In-game customer support",
            "Support address: mailto:support@sunborngame.com",
            "Facebook/Twitter",
            link("Google Form", 'https://forms.gle/bZNnQeh5sJaD3pim8')
        )}`,
        tags: [dtag.TECH, dtag["3P"]]
    },
    {
        id: '00038',
        question: `Which combat sim is better to focus on?`,
        answer: `Data. Always data.`,
        tags: [dtag.SIMS, dtag.ITEM, dtag.NEWB]
    },
    {
        id: '00039',
        question: `How do I get more Quick Training Contracts?`,
        answer: `End of daily log-ins, battlepass, Keycard Event, gem shop.<br>
        This contract/ticket is doesn't come in droves so use carefully.`,
        tags: [dtag.ITEM, dtag.MINI, dtag.SHOP, dtag.GET]
    },
    {
        id: '00040',
        question: `How do I unlock the next chapter?`,
        answer: `Beat X-6 Normal of the last unlocked chapter again. If it still doesn't appear after that, restart client.`,
        tags: [dtag.MAIN, dtag.TECH]
    },
    {
        id: '00041',
        question: `Which emulators are good for GFL?`,
        answer: `${List.ordered('Mumu.', 'Memu.', 'LDPlayer.', 'Nox.', 'Bluestacks.')}`,
        tags: [dtag.EMU, dtag.NEWB]
    },
    {
        id: '00042',
        question: `How can I play GFL if Apple Store doesn't have it?`,
        answer: `Use Android, use emulator, use VPN, use jailbreak.`,
        tags: [dtag.APPLE]
    },
    {
        id: '00043',
        question: `When is the anniversary?`,
        answer: `May 8 for EN server.`,
        tags: [dtag.ANNIV]
    },
    {
        id: '00044',
        question: `How do I unlock Chapter 0?`,
        answer: `Beat Chapter 4 Emergency Map 4.`,
        tags: [dtag.MAIN]
    },
    {
        id: '00046',
        question: `Is there a list of which logistics to do if I want to prioritize certain resources?`,
        answer: `${link('GFC GDoc.', 'https://docs.google.com/spreadsheets/d/1ah2JO6ggWuVaBho9yxgDMC-ucEKA8C42SBkjIlnIcWk')} Up to Chapter 11.<br>
        ${link("u/elgatoroid's calculator.", 'https://gfl-logistics.neko.gg/')} Up to Chapter 11.<br>
        ${link('GFGFork site.', 'https://gfgfork.github.io/gf/main')} Up to Chapter 12.<br>
        ${link('Tempkaridc calculator.', 'https://tempkaridc.github.io/gf/')} Up to Chapter 13.<br>
        ${link("u/tehcavy's spreadsheet.", 'https://docs.google.com/spreadsheets/d/1N-PvxbrZJqg-upImk5uwEmB9GcCrNqjmVgdY00cdvS8')} Up to Chapter 13.`,
        tags: [dtag.LOGI, dtag.MARP, dtag.ITEM]
    },
    {
        id: '00047',
        question: `Do I still need to use advantaged dolls for Theater?`,
        answer: `Not as much as before. They no longer make or break the CE, though they do get stat boosts, even outside strongholds.<br>
        HG = 20% CDR, SMG/SG = 15% Arm, 50% EVA, AR/RF/MG = 20% FP, 20% ACC.<br>
        The endgame now goes to MODs and oaths.<br>
        The CE you see on each doll when toggling the Boss CE button is the adjusted number, with the advantaged dolls having 20% bonus CE accounted for.`,
        tags: [dtag.TDOLL, dtag.THEATER]
    },
    {
        id: '00048',
        question: `For limited-time bonuses (i.e. auto-battles, logistics), when are the rewards calculated?`,
        answer: `${List.description({
           'If the runs can be cancelled without penalty, rewards are calculated at the end.' : [
                'The "Use Battery" bingo mission when exp-training HOCs.',
                'Auto-Battles.'],
           "If they can't be cancelled, or is cancellable with a penalty or cost (ie quick tickets), calculated at the start." : [
                'Expedition rewards.',
                'Productions.']
        })}`,
        tags: [dtag.SYSMECH, dtag.MINI, dtag.EXPED, dtag.PROD, dtag.AUTO]
    },
    {
        id: '00049',
        question: `How does Armor Penetration work?`,
        answer: `${link('Matsuda explanation.', 'https://gfl.matsuda.tips/post/armour')}`,
        tags: [dtag.BATTLE, dtag.SYSMECH]
    },
    {
        id: '00050',
        question: `Is there a penalty for using HOC charges and Fairy points in Theater battles?`,
        answer: `Nope. Joins boss battle regardless of charges and has no bearing on final score. Go ham.<br>
        Except if you used them and lost that battle, they won't be refunded, even in Electronic Warfare.`,
        tags: [dtag.THEATER, dtag.HOC, dtag.FAIRY]
    },
    {
        id: '00051',
        question: `Will the current event token/currency carry over to the next event?`,
        answer: `No can do. Dissolves into nothingness one week after its corresponding event is finished.`,
        tags: [dtag.ITEM, dtag.SEASON, dtag.COLLAB]
    },
    {
        id: '00052',
        question: `I've heard of GFAlarm. Is it safe to use?`,
        answer: `${link("Gamepress breakdown", 'https://gamepress.gg/girlsfrontline/how-use-gfalarm-girls-frontline-alarm')}. Also useful for getting data of HOC Chips.<br>
        ${link("Other usefulness.", "https://www.reddit.com/r/girlsfrontline/comments/14k79ub/weekly_commanders_lounge_june_27_2023/jqn0nvu/")}`,
        tags: [dtag["3P"]]
    },
    {
        id: '00053',
        question: `Is there any way to reset my battles so I can get a win?`,
        answer: `${List.description({
            "Method 1: In-game restart": [img(IMG_ASSET+"BattleRestart.png", "Restart Battle button in Pause menu. Beware the Withdraw button.")],
            "Method 2: Client restart": [
                "Turn off WiFi during battle. You can still finish the fight with no connection. Though be wary of connection timeouts so do it near the end.",
                "If you don't like the result or you lost, exit client, turn on WiFi, re-enter client, take the fight again.",
                "If satisfied ${TextStyle.style('or saving your sanity', TextStyle.STRIKE)}, turn on WiFi after the battle finished."
            ]
        })}`,
        tags: [dtag.BATTLE]
    },
    {
        id: '00054',
        question: `Is there a way to know the map layout and its spawnable enemy units?`,
        answer: `${link('Pengu GFLMaps site.', 'https://pengupengupengu.github.io/gflmaps/')}`,
        tags: [dtag["3P"], dtag.MAP, dtag.ENEMY]
    },
    {
        id: '00055',
        question: `How can I save the enemy composition for later practice?`,
        answer: `${List.description({
            'Add Target' : [
                "Long press the enemy on the map and you'll see the button on the top-left.",
                'Pause while in battle to see the button on the bottom-left.',
                'Button appears on the bottom-left after losing a battle.',
                'Adds the current enemy formation to the Target Practice in the Combat Sims.'],
            'GFAlarm' : [
                'Use GFLMaps to take the enemy IDs you want to fight and enter them in the Custom Target Train under Packet Forger, with IDs separated by commas.',
                `Works for comps that has been loaded into the client and is ${link('very', 'https://www.reddit.com/r/girlsfrontline/comments/tqur46/weekly_commanders_lounge_march_29_2022/i312oo2/')} ${link("safe", "https://www.reddit.com/r/girlsfrontline/comments/11e0hpg/weekly_commanders_lounge_february_28_2023/jan16s5/")}.`,
                img(IMG_ASSET+"GFAlarmCTT.png", 'From u/UnironicWeeaboo')
            ],
            '<a href="https://gfl.matsuda.tips/post/everything-sucks-forever">Matsuda recommendations</a>' : []
        })}`,
        tags: [dtag.ENEMY, dtag.BATTLE, dtag.MAP, dtag["3P"]]
    },  //@Visual
    {
        id: '00056',
        question: `How do I connect to GFAlarm with an emulator?`,
        answer: `Enter the GFAlarm proxy address to ProxyDroid or Drony.<br>
        ${link("u/Signal_Abroad1427's google-fu for Bluestacks.", 'https://www.reddit.com/r/girlsfrontline/comments/umdikk/weekly_commanders_lounge_may_10_2022/i8hj47h/')}`,
        tags: [dtag["3P"], dtag.EMU]
    },
    {
        id: '00058',
        question: `Is there a way for my game to feel smoother?`,
        answer: `${link('Gamepress article.', 'https://gamepress.gg/girlsfrontline/fixing-gfl-client-lag-possible-workarounds')}<br>
        ${link('Decompressed obb.', "https://drive.google.com/drive/folders/1QoWsDyh4rlh0DtpxomSGOKkaAzXPfvBG") /* https://old.reddit.com/r/girlsfrontline/comments/180bxy6/weekly_commanders_lounge_november_21_2023/kae6x8k/ */}<br>
        ${link('DIY decompression.', 'https://www.reddit.com/r/girlsfrontline/comments/lvwwtv/weekly_commanders_lounge_march_02_2021/gpugenl/')}`,
        tags: [dtag.MISC]
    },
    {
        id: '00059',
        question: `What's the Fire Control Component (FCC) used for and where can I get them?`,
        answer: `Upgrading 5${STAR} dolls to 6${STAR} through modding.<br>
        Obtainable through Black Market (2 monthly), major events/campaigns, special log-ins, shop packages, battlepass`,
        tags: [dtag.ITEM, dtag.MOD, dtag.GET, dtag.BM, dtag.MAJOR, dtag.CAMPAIGN, dtag.BP]
    },
    {
        id: '00061',
        question: `What is Central Data for?`,
        answer: `Unlocking their respective FST, promoting said FST, and converted to Data Patch if the FST is already 5${STAR}.<br>
        Obtainable in Theater and Intelligence Analysis.`,
        tags: [dtag.ITEM, dtag.HOC, dtag.FST, dtag.GET]
    },
    {
        id: '00062',
        question: `When should I do T-Doll Heavy Production/craft shotguns?`,
        answer: `Preferably during rate ups due to its high costs. Low priority otherwise since it's use at this stage of the game is for getting non-5${STAR} SGs and them not being widely used. Recommended to use the high-cost shotgun recipe for better chances.`,
        tags: [dtag.TDOLL, dtag.PROD]
    },
    {
        id: '00063',
        question: `How do I fill up/unlock enemies in the Enemy Index?`,
        answer: `Just fight them. Win or lose, we get them.`,
        tags: [dtag.ENEMY]
    },
    {
        id: '00064',
        question: `What best-in-slot (BiS) equipments should I use on my dolls?`,
        answer: `${List.unordered(
            spoilerSummary('General equipments.', figure(image("https://cdn.discordapp.com/attachments/951085201658871820/1059432568321224704/eq_suggestions.png", "Standard equipment setup."), "Taken from Discord")),
            spoilerSummary('#2 Chip equipment.', List.unordered(
                spoilerSummary('BigStupidJellyfish_ infograph.', link(image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/chips/infographic.png', "#2 Chip flowchart."), 'https://big-stupid-jellyfish.github.io/GFMath/pages/chips')),
                spoilerSummary("Google spreadsheets.", Embed.google(
                    ["2021 MAR, GFL New ARSMG Chip Analysis (by mis)", "https://docs.google.com/spreadsheets/d/1c0JhaSX9WyL3EB-7RCDE4NrfzR1YuWdYWidQ_06-PrQ"],
                    ["GFL #2 Processor Chip Calculator", "https://docs.google.com/spreadsheets/d/14xV50MSMBFGgN75E-Gy10WtzACb_KZdpxRKCYQ6FDQA"]
                ))
            )),
            spoilerSummary("AP thresholds.", image("https://big-stupid-jellyfish.github.io/GFMath/pages/images/newquip/armor-reference.png", "Effective AP ammo per enemy.")),
            link("2.09 equips.", "https://big-stupid-jellyfish.github.io/GFMath/pages/newquip"),
            link('3.0 equips.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/newerquip')
        )}`,
        tags: [dtag.TDOLL, dtag.EQUIP, dtag.ENEMY]
    },
    {
        id: '00065',
        question: `How do I maximize the efficiency of my echelon's ROF?`,
        answer: `${List.unordered(
            link("u/BigStupidJellyfish_'s ROF calc.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/rof-calc'),
            spoilerSummary("GFC Spreadsheet.", Embed.google(
                ["RoF chart by GF Corner (Credits: 25thNight-, Aria, Dabby, Omega)", "https://docs.google.com/spreadsheets/d/1k74SCGGMHtwbl8gmTaETLsa8t12A7dWdj0V1tjdMD4Y"]
            ))
        )}`,
        tags: [dtag.TDOLL, dtag.BATTLE, dtag.SYSMECH]
    },
    {
        id: '00066',
        question: `How do I get some Extra Potential Energy for Coalition Drills?`,
        answer: `Shop.`,
        tags: [dtag.ITEM, dtag.PA, dtag.SIMS, dtag.SHOP, dtag.GET]
    },
    {
        id: 67,
        question: `Which dolls should I dupe/duplicate?`,
        answer: `${List.unordered(
            link("Gamepress suggestions for dolls and coalition units.", "https://gamepress.gg/girlsfrontline/duping-recommendations-and-coalition-mooks"),
            link('Matsuda notes.', 'https://gfl.matsuda.tips/post/worthwhiledupes'),
            spoilerSummary('Discord recommendations.', img('https://cdn.discordapp.com/attachments/640157367056728133/1048531902065287188/dupe_gameing_pt3.png'))   //Jesse, Varz, etc.
        )}`,
        tags: [dtag.TDOLL, dtag.COALITION]
    },  
    {
        id: '00068',
        question: `How high is fairy rate up?`,
        answer: `${Embed.google(["Fairy enhancement rateup strategy", "https://docs.google.com/spreadsheets/d/1CSC17pKJ8BDDm9YYNB8pFqT8k0Np_jWDeu_1X-qJ7yI"])}`,  // u/ConductorBichir's list IIRC
        tags: [dtag.FAIRY, dtag.PROD]
    },
    {
        id: '00069',
        question: `What's the drop rate for farmable dolls?`,
        answer: `Limited dolls on Combat Missions aproximately have 0.8% drop rate on normal and 1% on emergency, with 5${STAR} seemingly have rates way below 1%. Their droprates Chapter 10 onwards are reported to have higher rates. If you do plan to farm a 5${STAR} doll, just do Productions. You'll get more chances there.<br>
        Event farms have around 1%, which also carries over to their respective campaign missions. Higher difficulties also get higher rates.<br>
        As for SPEQs, probably 1% too.`,
        tags: [dtag.TDOLL, dtag.MAIN, dtag.SPEQ, dtag.MAJOR, dtag.CAMPAIGN, dtag.SEASON, dtag.COLLAB]
    },  //https://old.reddit.com/r/girlsfrontline/comments/18r4oht/slow_shock_event_megathread/kggc294/
    {
        id: '00070',
        question: `Do events get a rerun? And if so, when?`,
        answer: `${List.description({
            "Major Events": [
                "Gets a permanent rerun called Campaign Missions 6-12 months or more after their initial release.",
                "You can read past major events in their entirety."
            ],
            "Seasonal Events": ["Gets one when it's their time.", "Much older ones will be added to Campaign Mission."],
            "Collab Events": ["Subjected to their holders whims."]
        })}`,
        tags: [dtag.MAJOR, dtag.CAMPAIGN, dtag.SEASON, dtag.COLLAB]
    },
    {
        id: '00071',
        question: `How do I remove HOCs from Target Practice?`,
        answer: `Unselect them like how you selected them.`,
        tags: [dtag.SIMS, dtag.HOC]
    },
    {
        id: '00072',
        question: `How can I save my own voodoo recipe?`,
        answer: `${List.ordered(
            'Craft from production using your own recipe.',
            'Take the item.',
            'Wait for 10 minutes for the voodoo list to refresh.',
            'Look for it.')}`,
        tags: [dtag.PROD]
    },
    {
        id: 73,
        question: `How can I resupply a single doll for corpse dragging and not the whole echelon?`,
        answer: `${figure(image(IMG_ASSET+"OneDollEchelon.png", 'Single-Doll Echelon'), 'Single-Doll Echelon')}`,
        tags: [dtag.TDOLL, dtag.MAP, dtag.ECH]
    },
    {
        id: '00074',
        question: `If I MOD my T-Doll, is Level 100 still considered max level?`,
        answer: `Thankfully, this is where common sense wins. In short, ${TextStyle.style('NO', TextStyle.BOLD)}.`,
        tags: [dtag.MOD, dtag.LEVEL]
    },
    {
        id: '00075',
        question: `I can't get the gold (S Rank) and silver medals in maps because the enemies keep running all over me. How do I get them?`,
        answer: `Not now. Blaze through chapters until 7-6 first to get your account running, then come back to it later when you have at least 2 strong (Lv. 90, 5 links) echelons.`,
        tags: [dtag.NEWB, dtag.MAIN]
    },  // You can get this quickly through Newbie Career Quests. And you can complete the quests faster if you use friend/support echelons.
    {
        id: '00076',
        question: `Can I transfer my Google Account to a Sunborn one?`,
        answer: `It's a one-way street from there.`,
        tags: [dtag.ACCT]
    },
    {
        id: '00077',
        question: `Does anyone know how to CE stack using GFAlarm?`,
        answer: `${List.ordered(
            'GFAlarm.',
            'File Save under Settings tab.',
            'Check "Save Theater Optimize Team".',
            'Open GFL under GFAlarm proxy (up to main screen).',
            'Go to the GFAlarm folder.',
            'Info folder.',
            '{Username}_{UID}__theater_optimize_team.csv for current armory.',
            'Use predicted damage instead of combat effectiveness.')}<br>
        This sheet already takes into account advantaged doll bonuses.`,
        tags: [dtag["3P"], dtag.THEATER, dtag.CE]
    },  //https://old.reddit.com/r/girlsfrontline/comments/tejuwb/weekly_commanders_lounge_march_15_2022/i0ttpc0/
    {
        id: '00078',
        question: `How are people just rolling in 5${STAR} fairies?`,
        answer: `<p>${TextStyle.style('Even dust, when piled up, can become a mountain.', TextStyle.ITALIC)}</p>
        Good logistics upkeep and rolling Fairy Construction everyday. Just think of crafting them a side thing that doesn't take a lot of attention.`,
        tags: [dtag.FAIRY, dtag.PROD]
    },
    {
        id: '00079',
        question: `How high is a certain doll's pull rate during rate ups?`,
        answer: `Something like Anchored > Targeted > General >>> Normal.`,
        tags: [dtag.TDOLL, dtag.PROD]
    },
    {
        id: '00080',
        question: `What are the resources I can get from Kalina's Daily Gift?`,
        answer: `${img(IMG_ASSET+"DailyGift.png")}<br>
        Gift amount apparently scales with her affection.`,
        tags: [dtag.MARP, dtag.ITEM, dtag.KALINA]
    },
    {
        id: '00081',
        question: `What is Corpse Whipping?`,
        answer: `The act of overkilling a dummy link by a huge amount. Especially egregious if 2 RFs hit an enemy on its deathbed. This is generally the reason why ROF-based guns are favored against low link-HP enemies.`,
        tags: [dtag.BATTLE]
    },
    {
        id: '00082',
        question: `What's the gacha rate for costumes?`,
        answer: `${table(['Item',                                                             'Rate'],
        [link('Costumes', 'https://big-stupid-jellyfish.github.io/GFMath/pages/gacha-rates'),   '02.00%'],
        [`5${STAR} furniture`,                                                                  '08.00%'],
        [`4${STAR} furniture`,                                                                  '34.20%'],
        [`4${STAR} gifts/cakes`,                                                                '01.80%'],
        [`3${STAR} furniture`,                                                                  '54.00%'])}`,
        tags: [dtag.RESUPPLY, dtag.TDOLL, dtag.SKIN, dtag.FURN]
    },
    {
        id: '00083',
        question: `Why is the PA notification in the home screen always lit up?`,
        answer: `There are available pulls left to burn, particularly Svarog EMPs it seems.`,
        tags: [dtag.PA]
    },
    {
        id: '00084',
        question: `What are Black Beans/Red Beans?`,
        answer: `Golyat and Golyat+, respectively.`,
        tags: [dtag.ENEMY]
    },
    {
        id: '00085',
        question: `What is Combat Effectiveness Stacking?`,
        answer: `The process of stacking the useless number as high as possible, battle performance be damned.<br>
        ARSMG = 80k+, RFHG = 40-90k, MGSG = 100k+ average max CE, including maxed dolls, maxed fairies, equips, mods, oaths, and formation bonuses.<br>
        It's main purpose is for Theater Bosses and being on top of the Friend List.`,
        tags: [dtag.CE]
    },
    {
        id: '00086',
        question: `What does the PA chip Pilfer do?`,
        answer: `Allows players to have a ${spoilerSummary('chance', img(IMG_ASSET+"PIlferRNG.png", 'Pilfer subject to RNG'))} of getting ${spoilerSummary('S-Rank drops', MBD.youtube('t6Vu72cajO0') + TextStyle.style('Context: Coalition Medals require S-Rank battles.', TextStyle.QUOTE))} from adjacent enemies without fighting. This uses one bar of ration and ammo.<br> 
        Combine this with the ability to fight on one ammo bar to get two chances on one enemy.`,
        tags: [dtag.COALITION, dtag.EQUIP]
    },
    {
        id: '00087',
        question: `What does oathing a doll do?`,
        answer: `Additional adjutant line after oath, higher affection cap, double EXP gain (map EXP, auto-battles, CRs) on MODs, complete repair and resupply (one-time only), stat bonuses for damage/evasion/accuracy (because higher affection cap).`,
        tags: [dtag.TDOLL, dtag.OATH, dtag.MOD, dtag.LEVEL, dtag.LOVE]
    },
    {
        id: '00088',
        question: `How do I get more support echelons?`,
        answer: `Add friends. Post your UID on a GFL community board and someone would ${TextStyle.style('surely', TextStyle.STRIKE)}probably add you.`,
        tags: [dtag.FRIEND, dtag.ECH]
    },
    {
        id: '00089',
        question: `Which map is best for auto-battles, or just leveling in general?`,
        answer: `${figure(Embed.google(["GFL EN Autobattle Comparison", "https://docs.google.com/spreadsheets/d/1e_1oAa9Qm_tmWqbgFQca8ohzo29qcjctIwyIU9Mc1H0"]), "Includes EXP per fight and level threshold to EXP penalty/drop-off")}`,
        tags: [dtag.AUTO, dtag.TDOLL, dtag.LEVEL]
    },
    {
        id: '00090',
        question: `Where can I fight Goliath Factories?`,
        answer: `In your dreams. Or maybe a custom enemy ID. Thing is, it's for PA purposes only.`,
        tags: [dtag.ENEMY]
    },
    {
        id: '00091',
        question: `For T-Doll Heavy Construction, how much worth is Tier 1 to Tier 2 or 3?`,
        answer: `Individual SG rate as of Feb 28-Mar 8, 2022 (Normal)<br>
        ${table(['Tiers', `3${STAR}`, `4${STAR}`, `5${STAR}`],
        ['Tier 1', '2.5-2.7%', '1.6/2.5-3.3%', '0.5/1-1.5%'],
        ['Tier 2', '1.2-1.5%', '1.9/2.7-4%', '0.8/1-2%'],
        ['Tier 3', '0%', '3-5.5%', '1-1.9%'],
        ['Special Rate', '', 'Super-Shorty', 'FP-6'])}<br>
        Overall SG rate is 50% every tier.`,
        tags: [dtag.PROD, dtag.TDOLL]
    },
    {
        id: '00092',
        question: `I can't beat the current stage. Is this it for me?`,
        answer: `For the triple stages, just fall back to the last boss node you can handle. These nodes can mitigate the "Cleared Stage" penalty so it's worth more than non-boss higher node.<br>
        For Core stage, highest node clearable.`,
        tags: [dtag.THEATER]
    },
    {
        id: '00093',
        question: `Which facilities/base upgrades should I prioritize for battery expenditures?`,
        answer: `${List.ordered(
            spoilerSummary('Forward Basecamp', List.ordered(
                'Gate Console',
                'Loot Rack')),
            spoilerSummary('Protocol Control Centre', List.ordered(
                'Impulse Reactor',
                'Tactical Chip Research Station')),
            'Intelligence Room',
            'Firing Range (Garage)',
            'Fairy Chamber',
            'Data Room',
            'Rescue Station')}`,
        tags: [dtag.NEWB, dtag.EXPED, dtag.PA, dtag.HOC, dtag.FAIRY, dtag.PET, dtag.BATTERY]
    },  //@Upgrade priority per facility
    {
        id: '00094',
        question: `Do the purchaseable items in the Expedition Black Market ever change?`,
        answer: `No.`,
        tags: [dtag.BM]
    },
    {
        id: '00095',
        question: `Which dolls should I use for expedition?`,
        answer: `${img('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-advantaged-dolls_0.jpg', 'Taken from Gamepress')}<br>
        Dummy links and skill levels are not taken into account.`,
        tags: [dtag.EXPED, dtag.TDOLL]
    },
    {
        id: '00096',
        question: `What's the priority to spend gems?`,
        answer: `${link("Gamepress guide.", "https://gamepress.gg/girlsfrontline/kalinas-shop-and-gems")}<br>
        ${List.description({
            "Echelon Slots": [
                "Costs 880, not 380.",
                "Up to 6 minimum, 8 for actually constant (ranking not included) logistics. Preferably maximum (14)."
            ],
            "Dormitories": [
                "Additional 3-4 for faster battery charge, enough to quickly upgrade important facilities. More than that is your call.",
                "Endgame players will almost always have their battery storage overflow."
            ],
            "T-Doll Storage Slots": [
                "Especially if you're a collector. Or whenever you're getting annoyed with the pop-up.",
                `This can be mitigated somewhat by scrapping easily acquirable dolls, and the ${getID("Recovery", "00185")} system.`
            ],
            "T-Doll Production Slots": [
                "Practically worthless due to the abundance of Quick Production Tickets."
            ],
            "Your Mileage May Vary (YMMV)": []
        })}`,
        tags: [dtag.NEWB, dtag.GEMS]
    },
    {
        id: '00097',
        question: `Which HOC chips should I use?`,
        answer: `${List.description({
            "Guides": [
                link('Reddit guide for desktop chip calculator.', 'https://redd.it/fnh1ey'),
                // spoilerSummary('Google Docs guide.', .google(MBD.G_WORD, '1pR6g-mgsy22_MhRPASL9c1wDoCuxfUwr-DCCMYmb7Ss')),
                spoilerSummary('5-block chips that can be disassembled.', img('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/2020-01/hoc-chip-shape-minmax-example.jpg', 'Taken from Gamepress'))
            ],
            "PC Downloads": [
                link('GFChipCalc Github page (Outdated).', 'https://github.com/Bunnyspa/GFChipCalc/releases'),
                link("GFChipCalc .jar file (Updated).", "https://gall.dcinside.com/mgallery/board/view/?id=micateam&no=1785059")
            ],
            "Android Downloads": [
                link('Android Chip Calc download page.', 'https://bunnyspa.github.io/gfl/chipcalc'),
                link('Alternate link for Android Chip Calc.', 'https://apkpure.com/girls-frontline-chip-calculator/bunnyspa.gfl.chipcalc/versions')
            ],
            "Browser": [
                link('Browser Chip Calc by FatalChapter.', 'https://hycdes.com/pages/GFT_ChipCal-EN')
            ]
        })}`,
        tags: [dtag["3P"], dtag.HOC, dtag.FST, dtag.EQUIP, dtag.IMPT]
    },  //@Outdated soon
    {
        id: '00099',
        question: `Do autobattles give affection?`,
        answer: `A tiny bit.`,
        tags: [dtag.AUTO, dtag.LOVE]
    },  //@Visual (loading screen)
    {
        id: '00100',
        question: `Do support echelons use equipment?`,
        answer: `Equipments used, formation, and apparently costumes too are saved instances.<br>
        Doll levels, equipment levels, skill levels, and chibis aren't. Meaning supports can be saved then leveled afterwards.`,
        tags: [dtag.FRIEND, dtag.ECH, dtag.EQUIP]
    },
    {
        id: '00101',
        question: `I wasn't able to clear the event during it's initial runtime. Will I still get the clear rewards when they get added to Campaign?`,
        answer: `${List.unordered(
            'Gutted rewards compared to original.',
            'No True Core Masks (TCM).',
            link('Reward and crate dolls get shuffled to farming lottery.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/limited-dolls')
        )}<br>
        Free shit is free shit though. So skip the current major event's story if you have to and reap the rewards.`,
        tags: [dtag.MARP, dtag.ITEM, dtag.CAMPAIGN, dtag.MAJOR, dtag.LEDOLL, dtag.TCM]
    },
    {
        id: '00102',
        question: `How do tilescan skills work?`,
        answer: `Real-time scanning of dolls on own tiles when activating their skills. Meaning setup formation can have them with no dolls on top of their tiles and when they activate their skills in battle, whoever are on top of their bufftiles will get the effects of their skill. Note that their bufftiles basically move with them.`,
        tags: [dtag.TDOLL, dtag.SKILL, dtag.IMPT]
    },
    {
        id: '00103',
        question: `My resources (Manpower, Ammunitions/Ammo, Rations, Parts) are uncomfortably low? Where can I get some?`,
        answer: `${TextStyle.style("Most efficient and consistent is logistics.", TextStyle.BOLD)}<br>
        Though you can get them through the shop, quest and event/crate rewards, campaign/major story node clears, and random nodes.`,
        tags: [dtag.MARP, dtag.LOGI, dtag.NEWB, dtag.GET]
    },
    {
        id: '00104',
        question: `How do I get Platinum and Nova Medals?`,
        answer: `From whatever Major/Seasonal/Collab Event running right now. Platinum are for 5${STAR} dolls and Nova are for dolls 4${STAR} and below.`,
        tags: [dtag.ITEM, dtag.TDOLL, dtag.MAJOR, dtag.SEASON, dtag.COLLAB, dtag.GET]
    },
    {
        id: '00105',
        question: `How do I get a higher success rate for logistics?`,
        answer: `${TextStyle.style('floor(mean of doll levels in echelon) * 0.45 + 15', TextStyle.CODE)} for normal logistics and<br>
        ${TextStyle.style('floor(mean of doll levels in echelon) * 0.60 + 30', TextStyle.CODE)} for rate up logistics.`,
        tags: [dtag.LOGI]
    },
    {
        id: '00106',
        question: `What do they mean by bamboo?`,
        answer: `Bamboos are, in general, rifles with skills like Locked Shot, Steady Shot, Interdiction Shot, and the likes, wherein off cooldown, they have a charge gauge that dictates how powerful the skillshot is on activation. They're usually used to deal massive damage to a target, especially if coupled with FP buffers.`,
        tags: [dtag.TDOLL, dtag.SKILL, dtag.IMPT]
    },
    {
        id: '00107',
        question: `What are the resources that has a defined max capacity and how much can they store?`,
        answer: `Resource limit for each currency.<br>
        ${img('https://cdn.discordapp.com/attachments/410790982116966400/905090370675830884/image0.jpg', 'Train Coin = Training Data | Furniture Coin = Tokens | Memory Pieces = Neural Fragments<br>' + link('Source', 'https://randomqwerty.github.io/?server=en&file=item'))}<br>
        Even then, all resources can be obtained without regards to max capacity through daily gifts, mission rewards, and whaling.<br>
        And no, the four resources will stay at 300k.`,
        tags: [dtag.MARP, dtag.ITEM]
    },
    {
        id: '00108',
        question: `Is there a way to buy a missed day for daily log-ins?`,
        answer: `No chance.`,
        tags: [dtag.MISC]
    },
    {
        id: '00109',
        question: `I'm trying to clear the newbie career quests but I haven't gotten the rewards yet. Did I miss something?`,
        answer: `Those quests are not retroactive and should be cleared in sequence. Try clearing them from the top.`,
        tags: [dtag.NEWB]
    },
    {
        id: '00110',
        question: `What does the Aid Commissions do and how do I get more of them?`,
        answer: `Also known as Svarog/High Altitude EMP Bombing Runs, it pulls from the entire pool where the entire pool is the X in the X/100 units.<br>
        Recommended to pull one at a time since 10-pull is literally 10 1-pulls.<br>
        Acquired from the daily quest's final node, daily log-in, major events, battlepass, shop (whenever a new banner starts).`,
        tags: [dtag.ITEM, dtag.PA, dtag.GET]
    },
    {
        id: '00111',
        question: `Recipe for Parachute/Paradrop Fairy?`,
        answer: `${link('The official recipe.', 'https://gf-db.github.io/gfdb/gfdb.html?type=fairy&id=11&epoch.fairy=29.0')}`,
        tags: [dtag.FAIRY, dtag.PROD]
    },
    {
        id: '00112',
        question: `What does equipment calibration and enhancement do?`,
        answer: `${img(IMG_ASSET+"EquipCalibEnhance.png", 'Calibration and enhancement are independent of each other')}
        ${List.description({
            'Equipment Calibration' : [
                "Raises the equipment's base stat.",
                'RNG dictates how many calibration tickets are wasted before maxing.',
                `When it's on its highest calibration, ${img(IMG_ASSET+"BlueMAXBox.png", 'inline')} appears on said equipment.`
            ],
            'Equipment Enhancement' : [
                'Multiplies the base stat up to Lv. 10.',
                "Doesn't matter if Equip Enhancement Pills or fodder equips are used, it's merely a matter of resource cost per point raised.",
                'As of 3.0, gets more enhancement points from enhanced fodders.'
            ]
        })}`,
        tags: [dtag.EQUIP, dtag.LEVEL, dtag.NEWB]
    },
    {
        id: '00113',
        question: `How viable is 2AR2SMG1HG?`,
        answer: `${link('BigStupidJellyfish analysis vs. 3AR2SMG.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/2v3ar')}<br>
        Depends on if there is no good AR-buffing AR for position 4. If there is one, 3AR1SMG1HG is a thing, specially for night maps.`,
        tags: [dtag.TDOLL, dtag.ECH]
    },
    {
        id: '00114',
        question: `What are all the available pets right now?`,
        answer: `${img(IMG_ASSET+"PetSale.png", 'From u/UnironicWeeaboo')}<br>
        If you see a pet that is not on this list, it's a Cafe Story reward, collab pet, or event reward that haven't been added yet to the station.`,
        tags: [dtag.PET]
    },
    {
        id: '00115',
        question: `How do friend batteries work?`,
        answer: `${List.unordered(
            `Friend batteries recharge at 3am and 3pm UTC-8, or whenever ${link("Netlify", "https://gftimers.netlify.app/")} says the time is.`,
            'The amount of charges/batteries depend on the number of dorms your friend has.',   //Tentative
            'A set number of people can claim one once per cycle.',
            "As the name suggests, it only appears on your friend's dorms, not on any strangers (especially on a Random Visit)."
        )}`,
        tags: [dtag.FRIEND, dtag.ITEM, dtag.BATTERY]
    },  //@Clarify
    {
        id: '00116',
        question: `Is there an optimal recipe guide I could use for my production?`,
        answer: `${link('Applicable Reddit Post.', 'https://redd.it/gfmelo')}<br>
        For the new equips, 150/151/50/50 (with armor), 150/151/10/50 (without armor).`,
        tags: [dtag.PROD]
    },
    {
        id: '00117',
        question: `Whats the best way of farming affection?`,
        answer: `Being in the leader slot in a battle echelon, being the MVP of a battle echelon, collecting daily hearts in dorms, cakes/lollipops/icecreams, passive regen by being in a dorm, gifting skins.<br>
        ${link('Write-up on what affects affection.', 'https://www.reddit.com/r/girlsfrontline/comments/cgpt7y/weekly_commanders_lounge_july_23_2019/ev0gw64/')}<br>
        ${link('Additional info on dorm affection.', 'https://www.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i29h382/')}`,
        tags: [dtag.LOVE]
    },
    {
        id: '00118',
        question: `As a beginner, is it worth to use batteries for combat reports?`,
        answer: `Probably if surplus EXP is maxed out, otherwise doubt it.`,
        tags: [dtag.NEWB, dtag.ITEM, dtag.BATTERY]
    },
    {
        id: '00119',
        question: `How does Symmetric Infusion work exactly?`,
        answer: `${List.description({
            'Cognitive Infusion' : ['Basically, swaps sizes. Technically, swaps all stats aside from size. If both sides are upgraded, say Lv. 31 and Lv. 23, they become 23 and 31, not 1 and 31+.'], 
            'Golden Infusion' : ['Swaps the golden status between the two units, nothing more, nothing less.']
        })}`,
        tags: [dtag.PA]
    },  //@Visual
    {
        id: '00120',
        question: `Is the package in the shop worth it?`,
        answer: `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/energy-packages')}<br>
        ${link("u/headphone_question's top-up gem math.", "https://old.reddit.com/r/girlsfrontline/comments/vh81jl/weekly_commanders_lounge_june_21_2022/idoig4j/")}
        For the 7 day new account package: Day 4 to jumpstart skill leveling (saves around 80 days of datasims on a normal day), Day 5 is the most efficient oath package so far, and Day 7 is a really good value for tokens.`,
        tags: [dtag.ITEM, dtag.OATH, dtag.GEMS, dtag.SHOP, dtag.NEWB]
    },
    {
        id: '00121',
        question: `Can I put 2 L2D skins in the double adjutant slot?`,
        answer: `${TextStyle.style('L2D mode', TextStyle.QUOTE)}<br>
        ${TextStyle.style('Double Adjutant', TextStyle.QUOTE)}<br>
        Pick one.`,
        tags: [dtag.TDOLL, dtag.SKIN, dtag.ADJUNCT]
    },
    {
        id: '00122',
        question: `How do I unlock special effects on commanders like flame auras etc.?`,
        answer: `${List.ordered(
            "Get a complete 5-slot from a costume set. Doesn't matter if male only or female only.",
            'Get their rare color variants.',
            '???',
            'Profit.'
        )}`,
        tags: [dtag.CMDR, dtag.SKIN]
    },
    {
        id: '00123',
        question: `Is there a list of doll farming routes for each map?`,
        answer: `${List.unordered(
            spoilerSummary('Compilation of all farm routes for limited dolls and equipments on both campaign and main story.', Embed.google(["Compilation of farming guides for limited dolls", "https://docs.google.com/document/d/1GUcA1ZHYVKBhTspdRYPIkECVZRoLFvqDnLrgrFb6VcU"])),   // by u/rcpz93 most likely
            link('Farming routes by RevenantXIII (with Pilfer strats), focusing on events and ranking-relevant campaign dolls.', 'https://rosedrake.github.io/GFL.html'),
            spoilerSummary('416 SPEQ Pilfer route.', MBD.youtube('5v6gEqydGm4'))
        )}`,
        tags: [dtag.TDOLL, dtag.GET, dtag.MAIN, dtag.CAMPAIGN, dtag.SPEQ]
    },
    {
        id: '00124',
        question: `What's the chronological order for the story?`,
        answer: `u/pointblanksniper's observations.<br>
        ${link('Overall.', 'https://www.reddit.com/r/girlsfrontline/comments/sm75vk/where_can_i_see_mirror_stage_story_line/hvvpppk/')}<br>
        ${link('Night Chapters.', 'https://www.reddit.com/r/girlsfrontline/comments/scouvz/questions_regarding_404/hu995o6/')}`,
        tags: [dtag.LORE]
    },  //@Fix, https://www.reddit.com/r/girlsfrontline/comments/sc8jed/weekly_commanders_lounge_january_25_2022/hupfxsr/
    {
        id: '00125',
        question: `Is it possible to earn previously missed hidden achievements in Campaign Missions?`,
        answer: `Yes.`,
        tags: [dtag.CAMPAIGN]
    },
    {
        id: '00126',
        question: `If I delete my unused speqs, will I be able to recover them?`,
        answer: `As of 2.09, dismantled/disassembled SPEQs can now be ${spoilerSummary('recovered/retrieved', figure(image(IMG_ASSET+"SPEQRecover.png", "SPEQ recovery button."), 'From u/UnironicWeeaboo'))}. Collab SPEQs can be found under the Limited tab.`,
        tags: [dtag.EQUIP, dtag.SPEQ, dtag.COLLAB]
    },
    {
        id: '00127',
        question: `Is there a way to expand the armory, or am I stuck with 100 doll slots forever?`,
        answer: `${List.unordered( 'Shop>Items>Infrastructure>T-Doll slots +10.', 'Tap the locked echelon button.')}`,
        tags: [dtag.SHOP]
    },
    {
        id: '00129',
        question: `I want to F2PBTW. How do I do that?`,
        answer: `${List.description({
            'Gems' : ['Daily log-ins (300 monthly).', 
                'Sharing in FB/Twitter (30 weekly). You can cancel it at the last minute.',
                'S-Ranking Normal (10) and Emergency (30) Chapters.',
                'Achievements.',
                'Mini-Events, mainly, Keycard Events (Bingo) (100).',
                'Ranking participation.'],
            'Tokens' : ['Dailies (5pts x 8) and weeklies (50pts x 3 or 4) (40 for 250 points).',
                'Expedition.',
                'Logistics (~19 weekly).',
                'Achievements.',
                'Mini-Events: Point Event (70), Keycard Event (70).',
                'Major Event crate rewards.',
                "Theater Point Rewards (70).",
                'Shop. Especially when there is a seasonal/collab going on. Packages are also good.',
                'Maintenance (10 weekly) and Apolotokens.']
        })}`,
        tags: [dtag.ITEM, dtag.RESUPPLY, dtag.GET, dtag.GEMS]
    },  //Site down - https://dmesse.egloos.com/m/3594243
    {
        id: '00130',
        question: `Why aren't my dorm batteries appearing?`,
        answer: `If it's not within 11:00-14:00, 17:00-20:00, and 22:00-01:00 UTC-8, restart app.<br>
        You'll know that it's collection time if the dorm button has a number on top of it (for the facility shortcuts) or Dorm No.1 flashes pink/purple in the BASE button.`,
        tags: [dtag.DORM, dtag.ITEM, dtag.TECH]
    },
    {
        id: '00131',
        question: `What are Extra Impulses and where can I get them?`,
        answer: `Stockable versions of Electronic Impulses.<br>
        You can get them through daily log-ins, weekly quests, achievements, and events.`,
        tags: [dtag.PA, dtag.ITEM, dtag.GET]
    },
    {
        id: '00132',
        question: `Read a guide that said to use a team of 2${STAR} & 3${STAR} dolls until I get enough cores to spend. Is it still worth doing it now?`,
        answer: `With the advent of Expeditions and Newbie Career Quests, you get enough dummy cores right off the bat. Don't overspend still.`,
        tags: [dtag.ITEM, dtag.CORE]
    },
    {
        id: '00133',
        question: `What's the rate up increment for Anchored Construction?`,
        answer: `${table(['Target', 'Estimated Increment'],
        ['4' + STAR,  '0.396%'],
        ['5' + STAR,  '0.083%'],
        ['Starter',   '0.19%'])}
        ${link('Base rate shown per doll is more or less their true rates.','https://www.reddit.com/r/girlsfrontline/comments/s6s9xj/weekly_commanders_lounge_january_18_2022/htmbjuc/')}`,
        tags: [dtag.PROD]
    },
    {
        id: '00134',
        question: `I got an "Illegal Action Detected" warning. What happened?`,
        answer: `Mostly desyncs and having "invalid" inputs. Just restart it.`,
        tags: [dtag.TECH]
    },
    {
        id: '00135',
        question: `I can't deploy a friend echelon. What do I do?`,
        answer: `${image(IMG_ASSET+"InitialDeploySupports.png", "Support Echelon warning window.")}<br>
        Either after operation start, a client restart, or a no due to limit.`,
        tags: [dtag.FRIEND, dtag.ECH, dtag.TECH]
    },
    {
        id: '00136',
        question: `How do I find Ouroburos in Operation Cube 1-4?`,
        answer: `${link('Oreo Finder.', 'https://kyouko.moe/urouro/#')}`,
        tags: [dtag.CAMPAIGN, dtag.ENEMY, dtag["3P"]]
    },
    {
        id: '00137',
        question: `Which HOC can destroy buildings?`,
        answer: `All of them. Building damage uses the Pierce stat, which is also used for destroying Force Shields.<br>
        As for which class is best for the job, ATWs.`,
        tags: [dtag.HOC]
    },
    {
        id: '00138',
        question: `What does "Rescue 5 T-Dolls" mean?`,
        answer: `Getting them as drops.`,
        tags: [dtag.MISC]
    },
    {
        id: '00139',
        question: `Where can I see doll voicelines?`,
        answer: `Doll Index Page>Top left as speaker. If it's missing, check if you downloaded the voice pack yet. Or just go to IOPWiki. Though some do not have voices yet.`,
        tags: [dtag.TDOLL]
    },  //@Visual
    {
        id: '00140',
        question: `Is a particular doll already available in the EN server?`,
        answer: `Check Index.`,
        tags: [dtag.TDOLL]
    },
    {
        id: '00141',
        question: `I'm trying to contact support and one of the infos they need is Account ID. Where can I see it?`,
        answer: `UID that is present in your commander screen or intro card.`,
        tags: [dtag.TECH]
    },
    {
        id: '00142',
        question: `Where can I get doll/fairy costume art?`,
        answer: `${link('36base Github Repository.', 'https://github.com/36base/girlsfrontline-resources')}`,
        tags: [dtag.MISC]
    },
    {
        id: '00143',
        question: `Which oath packages are better?`,
        answer: `2.09 Week 1 Package > Double Oath Package (Valentine's, White Day, <!-- Qixi/Tanabata,  -->Christmas), New Year's Package`,
        tags: [dtag.OATH]
    },
    {
        id: '00144',
        question: `What does "Event" mean on the left side of the mission select screen?`,
        answer: `${List.description({
            'Combat Missions' : ['SPEQ Rate Up for X-4N',
                'Special Rescue Event for X-6'],
            'Campaign Missions' : ['Newly added campaign'],
            'Combat and Campaign' : ['1.5x EXP',
                'Includes currently running event maps'],
            'Logistics' : ['Great Success Rate Up aka. higher rewards are more frequent'],
            'Combat Simulations' : ['Capsule, Data, EXP, Neural Frag rewards x2',
                'Coalition Drill rewards x3',
                'Limited-time practice targets']
        })}`,
        tags: [dtag.MAIN, dtag.CAMPAIGN, dtag.LOGI, dtag.SIMS]
    },
    {
        id: '00145',
        question: `Can someone tell me what the difference is between Charge, Destroy, and Defend commands for coalition units?`,
        answer: `Lets melee units ${TextStyle.style('Charge', TextStyle.BOLD)} down the lane.<br>
        Lets melee units approach and ${TextStyle.style('Destroy', TextStyle.BOLD)} the nearest enemy.<br>
        Return and ${TextStyle.style('Defend', TextStyle.BOLD)} their grid position.`,
        tags: [dtag.COALITION, dtag.BATTLE]
    },
    {
        id: '00146',
        question: `How many Tactical Doll slots can I have?`,
        answer: `Up to 1200 it seems.`,
        tags: [dtag.MISC, dtag.TDOLL]
    },  //Condolensces to u/headphone_question's wallet. Previously 1000.
    {
        id: '00147',
        question: `Why do people use M16 as tank for 0-2 corpse dragging?`,
        answer: `Can use Armor/SPEQ to reduce damage taken to 1, and T-Exo for reducing the number of hits taken.`,
        tags: [dtag.TDOLL, dtag.LEVEL]
    },
    {
        id: '00148',
        question: `How does a StrawberryPython team work?`,
        answer: `${Embed.google(["GFL Team Analysis: Strawberry + Python", "https://docs.google.com/document/d/105DXX2AlMB_wX0JpKGjPGsJ_zjsKOz_0bbd5ZshUx_o"])}`,
        tags: [dtag.ECH, dtag.TDOLL]
    },
    {
        id: '00149',
        question: `The client in the Play Store is in a language I can't understand. Is there a way to download other server clients?`,
        answer: `CN - China (Bilibili and DigitalSky)<br>
        TW - Taiwan, Malaysia, Singapore<br>
        JP - Japan<br>
        KR - Korea<br>
        EN - Everywhere else<br>
        As for how to download it, check the sidebar of ${link('this', 'https://www.reddit.com/r/girlsfrontline/')} link under Downloads.<br>
        Try downloading from Qooapp or ${link("APKpure", "https://apkpure.com/")}`,
        tags: [dtag.MISC]
    },  //@Totally gonna fix
    {
        id: '00150',
        question: `How do general rate ups work?`,
        answer: `There are 2 sets of rate ups per general rate up.<br>
        First is the HOC rate up, where every 2 days is a specific FST's day for rate up. Note that only that FST's rate is increased within the Central Data pool. The core data rate remains the same.<br>
        Second is the tried amd tested Production rate up. Goes from Normal Doll, Normal Equip, Heavy Doll, Heavy Equip. Pulling chance for all 4${STAR} and 5${STAR} are increased. IOP equipment crafts are also affected.`,
        tags: [dtag.PROD, dtag.HOC, dtag.FST, dtag.TDOLL, dtag.EQUIP]
    },  //@Check for errors
    {
        id: '00152',
        question: `What do advantaged dolls in combat map mean?`,
        answer: `20% FP boost for AR, RF, MG. 20% EVA boost for SMG, HG, SG.`,
        tags: [dtag.MAP, dtag.TDOLL]
    },
    {
        id: '00153',
        question: `How many Quick Autobattle Tickets does it cost per stage?`,
        answer: `${LESSEQUAL} 1 hour: 1 ticket per run.<br>
        1-2 hours: 2 tickets per run.<br>
        2+ hours: 3 tickets per run.`,
        tags: [dtag.AUTO, dtag.ITEM]
    },
    {
        id: '00154',
        question: `What happens to the reshuffle/refresh timer when the banner changes?`,
        answer: `Restarts from the top. Meaning refreshing just hours before Ringleader change has the same effect as refreshing 2 days ago.<br>
        Pool refresh timer doesn't start on banner change until after opening the bombing screen.`,
        tags: [dtag.PA]
    },
    {
        id: '00155',
        question: `Do links matter regarding the amount of resources a coalition unit would take on resupply?`,
        answer: `From a single-link Dinergate to an entire gunner stack, they all take 360 Ammo/Ration.`,
        tags: [dtag.COALITION, dtag.MAP]
    },
    {
        id: '00156',
        question: `Anyone know what type of equipment "Medals" is?`,
        answer: `For now, placeholder. No equipment of its type exists yet.`,
        tags: [dtag.EQUIP]
    },
    {
        id: '00157',
        question: `Where can I see the stat previews for PA units?`,
        answer: `${Embed.google(["GFL - Protocol Assimilation Stat Calculator", "https://docs.google.com/spreadsheets/d/1TYKbdjuOdOMsvaaIduWW_8FF0tm27BjwKbC4uggl1wE"])}`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00158',
        question: `I haven't seen this icon/card BG before. Where can I get some of it?`,
        answer: `Most likely a Cafe Costume Side Story reward.`,
        tags: [dtag.MISC, dtag.GET]
    },
    {
        id: '00159',
        question: `I'm in dummy core hell. How do I get some more?`,
        answer: `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/its_still_not_enough_fuck')}<br>
        ${link('BigStupidJellyfish write-up.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/core-rates')}<br>
        ${link("u/UnironicWeeaboo's easier 11-6.", 'https://www.reddit.com/r/girlsfrontline/comments/u1tr33/weekly_commanders_lounge_april_12_2022/i5178cy/')}<br>
        Run any daytime leveling maps for combined core and exp farming.<br>
        You can also farm during core rate up by using the handgun recipe.<br>
        Or buy from the Black Market every first day of the month.`,
        tags: [dtag.ITEM, dtag.CORE, dtag.GET]
    },
    {
        id: '00160',
        question: `Any way to increase commander level really quickly?`,
        answer: `Leveling dolls through leveling maps.`,
        tags: [dtag.CMDR, dtag.LEVEL]
    },  //@Test - exact values per doll leveling
    {
        id: '00161',
        question: `How do I switch accounts?`,
        answer: `Settings>Manage Accounts>Log out, then on the log-in screen, switch accounts.`,
        tags: [dtag.ACCT]
    },
    {
        id: '00162',
        question: `What's the use case for 5HGs?`,
        answer: `Good single target burst damage. Quick movespeed. Consumes minimal resources.`,
        tags: [dtag.ECH, dtag.TDOLL]
    },
    {
        id: '00163',
        question: `What're the rewards for the Defense Drill?`,
        answer: `Unlocks after clearing 2-4N.<br>
        ${link('Matsuda Guide and Line-up, circa 2.08.', 'https://gfl.matsuda.tips/post/defdrill')}<br>
        ${TextStyle.style('2.09 waves', TextStyle.BOLD)}:<br>
        ${spoilerSummary('Discord Leaderboard Comps.', `${img('https://cdn.discordapp.com/attachments/453784246515925003/988812408929804328/unknown.png')}<br>
            ${img(IMG_ASSET+"DiscordDefenseDrill.png")}`)}<br>
        ${spoilerSummary('General BLT vid.', MBD.youtube('P-GLrBNvFVs'))}<br>
        ${spoilerSummary('Ceia vid.', MBD.youtube('qgbF2eiIzps'))}<br>
        ${spoilerSummary("CosmicArcher's comfy clear.", MBD.youtube('avKEYzKSp0U'))}`,
        tags: [dtag.SIMS]
    },  //Proper guide under construction
    {
        id: '00164',
        question: `What would I need when building night ARSMGs?`,
        answer: `AR: Any.<br>
        SMG: Direct-fire SMGs are hard to sell because of low base ACC and night ACC penalty, so molotovs or grenades.<br>
        HG: Used for expanding vision 1 node away. Stacks with Illumination Fairy.<br>
        PEQ: Mainly used by ARs since SMGs are mostly either tank or AoE. 4${STAR} is a good stopgap.`,
        tags: [dtag.ECH, dtag.TDOLL]
    },
    {
        id: '00165',
        question: `Which T-Doll would be better to anchor for the rate up?`,
        answer: `On one hand, 4${STAR} can't be TCM'd. On the other hand, 5${STAR} have low construction rates. And it also depends on the skills of said dolls.`,
        tags: [dtag.PROD, dtag.TDOLL, dtag.TCM]
    },
    {
        id: 166,
        question: `What does each gun class do?`,
        answer: `${table(['Class', 'Roles', 'Target Priority', 'Caveat'],
        ['Assualt Rifle (AR)',                                                                                  'Anti-Swarm<br>Sustained DPS',  'Frontline',    'Weak to armored enemies'],
        ['Submachine Gun (SMG)',                                                                                'Evasion Tank<br>Anti-Swarm',   'Frontline',    'Accuracy is non-existent'],
        ['Rifle (RF)',                                                                                          'Big Damage<br>Anti-Armor',     'Backline',     'Weak to swarms<br>Affected by night penalty'],
        ['Handgun (HG)',                                                                                        'Buffer<br>Debuffer',           'Random',        'Cannot facetank'],
        [link("Machine Gun (MG)", "https://gamepress.gg/girlsfrontline/mgs-sgs-and-teambuilding#topic-270876"), 'Opening Volley',               'Random',       'Reloads/Stops shooting at around 6s<br>Weak to high evasion'],
        [link("Shotgun (SG)", "https://gamepress.gg/girlsfrontline/mgs-sgs-and-teambuilding#topic-270826"),     'Armor Tank',                   'Frontline',    'Poor evasion'])}`,
        tags: [dtag.TDOLL, dtag.BATTLE, dtag.NEWB]
    },
    {
        id: '00167',
        question: `What's the time frame for modding dolls?`,
        answer: `From their release until EOS.`,
        tags: [dtag.MOD]
    },
    {
        id: '00168',
        question: `Will I get the rewards after adding a returning commander as friend for the callback event?`,
        answer: `${img(IMG_ASSET+"CallbackSupporter.png")}<br>
        ${img(IMG_ASSET+"CallbackReturner.png")}`,
        tags: [dtag.FRIEND, dtag.ITEM, dtag.MARP]
    },
    {
        id: '00169',
        question: `Are the previous monthly Special Equipments obtainable in some way/getting a rerun?`,
        answer: `Yes. 4 returning SPEQs are added every season.`,
        tags: [dtag.SPEQ, dtag.GZ]
    },
    {
        id: '00170',
        question: `Is there an efficient way of raising a Parachute Fairy?`,
        answer: `${List.unordered(
            link("markhydroxyl's github notes.", 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_raising_paras.md'),
            link('Logistics for HEC crafting.', 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_hec_logis.md'),
            spoilerSummary('Fairy Development Calculator.', Embed.google(["Girls' Frontline: Fairy Development Calculator", "https://docs.google.com/spreadsheets/d/1Zcz6Yp3sduhUXY9jo2HCX4pOdiIQioZcS8v6xMK01Pk"]))
        )}`,
        tags: [dtag.FAIRY, dtag.LEVEL]
    },
    {
        id: '00171',
        question: `Which HOC/FSTs have L2Ds?`,
        answer: `AT4, BGM-71, AGS-30`,
        tags: [dtag.FST]
    },
    {
        id: '00172',
        question: `Where are the skins? I can't find them.`,
        answer: `${img(IMG_ASSET+"SkinLocation.png", 'Dorms > Warehouse > Gifts')}<br>
        You get Black Cards here by gifting it.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00173',
        question: `What should I do during a collab?`,
        answer: `${List.unordered(
            "Farm event specific currencies (NOT Platinum or Nova medals) (60 daily).",
            "Get all collab characters (Clear Reward, Farming, Shop), their Special Equipments, and the fairy.",
            "Combat reports and affection boosters are low on the shop priority list (costing 2 per item)."
        )}`,
        tags: [dtag.COLLAB]
    },
    {
        id: '00174',
        question: `I can't enter the game (stuck downloading/loading). What should I do?`,
        answer: `${List.unordered(
            "Wait and trudge through",
            "Download the bare minimum files first",
            "Restart client",
            "Change/Reset WiFi connection",
            "Switch to mobile data",
            "Use VPN",
            "Delete cache",
            link('Do a manual patch', 'https://github.com/lloyddunamis/gfl_manualpatch/blob/main/FullResource_readme'),
            spoilerSummary("Delete some files", MBD.twitter("Synexcu", "1310117595094216709")),
            "Reinstall (with minimum data first)",
            "Phone restart",
            "Any of the above coupled with sheer determination to do it for days on end"
        )}`,
        tags: [dtag.TECH]
    },
    {
        id: '00175',
        question: `What are these General Data I keep getting?`,
        answer: `Used for FSTs that are not yet 5${STAR}.<br>
        ${TextStyle.style('Limitations:', TextStyle.BOLD)}<br>
        ${List.unordered(
            'Only usable to FSTs in the gacha pool (added after a Theater for a new FST is ran).',
            "Cannot be used for iteration, or anythimg else for that matter."
        )}
        If you plan to big brain with this, churn your FST-specific central data to patches first, because they're the priority data to use before general data.`,
        tags: [dtag.HOC, dtag.FST, dtag.ITEM]
    },  //@Visual (5 yellow stars)
    {
        id: '00176',
        question: `Just noticed that the Black Market Shop in the Forward Basecamp has a Costumes tab. Anyone know what that's about?`,
        answer: `Shop for previous event only cosmetics.<br>
        ${img('../assets/images/query/BlackMarketCostumes.png', 'From u/UnironicWeeaboo')}<br>
        Currently released items in the older servers.`,
        tags: [dtag.BM]
    },
    {
        id: '00177',
        question: `Should I try getting all ringleaders or should I just save for who I want?`,
        answer: `Ideally, yes. Statistically, getting all ringleaders on their first run is through luck or money. As an F2P, you could probably get a Ringleader every other month.`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00178',
        question: `I'm getting a "resource full" warning. What would that item be?`,
        answer: `Or "Items have reached the max capacity, unable to receive."<br>
        ${img('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-loot-rack.jpg', 'Taken from Gamepress')}<br>
        If the Mid Rewards rack is not empty, look at your armory.<br>
        If it's the End Rewards, check your Black Market currencies.<br>
        Or maybe just pasta, try restarting.`,
        tags: [dtag.EXPED, dtag.ITEM, dtag.TECH]
    },
    {
        id: '00179',
        question: `I'm trying to S-Rank the stage and I got the kill requirements but I can't get the gold medal. What gives?`,
        answer: `Allied/support/friend echelons do not count. There's a counter on the bottom-left and the white number is what's being counted.`,
        tags: [dtag.MAP]
    },
    {
        id: '00180',
        question: `Is it worth it to reset the pool once I got the Ringleader?`,
        answer: `Depends on if you want the remaining units.`,
        tags: [dtag.PA]
    },
    {
        id: '00181',
        question: `Does cooldown reduction also reduce initial cooldown?`,
        answer: `Yes.`,
        tags: [dtag.SYSMECH, dtag.TDOLL, dtag.SKILL]
    },
    {
        id: '00182',
        question: `What's the uncensor recipe?`,
        answer: `522/320/404/137 for EN, 666/666/666/666 everywhere else... probably.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00183',
        question: `When will the costumes go to the Black Card Exchange?`,
        answer: `After around 2 banners. Banners with "4 skins, no L2D" will also go to Radiant Collections.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00184',
        question: `Just bought a gem pack/monthly card but I didn't get it yet. What do I do?`,
        answer: `Go through the process again then back out at the payment screen. If it fails, contact support first if you're planning a refund.`,
        tags: [dtag.TECH, dtag.GEMS]
    },
    {
        id: '00185',
        question: `If I scrapped/retired/disassembled my only copy of a doll, can I recover/get them back?`,
        answer: `First of all, how dare you?<br>
        Second of all, yes you can. Can also work on ${spoilerSummary('collab units', img(IMG_ASSET+"CollabScrap.png", 'From u/Angelic_Force'))} and the AR Team.<br>
        Can only work once a week, costs however much is needed for a x1 dummy-link, and scrapped dupes are poof.<br>
        Go to Index, then their Index page then Recover, which will need cores.`,
        tags: [dtag.TDOLL, dtag.COLLAB, dtag.SYSMECH]
    },  //@ Visual
    {
        id: '00186',
        question: `Does AA-12's SPEQ count as a slug?`,
        answer: `No, apparently due to lacking x3 damage.`,
        tags: [dtag.SPEQ]
    },
    {
        id: '00188',
        question: `For Coalition Units, should I skip raising units that are below XL size?`,
        answer: `I say skip raising if you're satisfied with the units you have. Otherwise raise a unit regardless of size if you need them. Symmetric Infusion can cover the size problem.`,
        tags: [dtag.COALITION]
    },
    {
        id: '00189',
        question: `Where can I see the costumes I have acquired?`,
        answer: `${List.unordered(
            'Commander Stat Card > Adjutants > Filter > Unlocked. Works for doll you have in inventory.',
            'Index > Furniture > Posters. Works for costumes that have been gifted/given.')}`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00190',
        question: `Does Luffberry Chess have any exclusive rewards?`,
        answer: `${link('Icons, furnitures, and as of 2.09, skins.', 'https://www.reddit.com/r/girlsfrontline/comments/uhb3jo/weekly_commanders_lounge_may_03_2022/i7kg6bu/')}`,
        tags: [dtag.OJ, dtag.FURN, dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00191',
        question: `General tips on defeating deathstacks?`,
        answer: `For the most part, you don't. But if you really want to, this is the epitome of "CE is useless", "what dolls, formation, fairy to use depend on what you're going against", and "learn kiting". Just don't expect to come out of it unscathed.<br>
        ${List.description({
            'Swarm deathstacks' : ['Usually AoE attacks such as Kord, Type 88, M4 exodia, KSVK with HOC support, and tank/delay fairies.',
                'Kill them all before they kill you.'],
            'Golyat+ deathstacks' : ['Either stun+smoke or forceshields.']
        })}`,
        tags: [dtag.ENEMY]
    },
    {
        id: '00192',
        question: `Can fairies be recovered from Index?`,
        answer: `No, unfortunately.`,
        tags: [dtag.FAIRY]
    },
    {
        id: '00193',
        question: `Is there anything similar to the True Core Mask but for Coalition units?`,
        answer: `PA shop. 800 supernovas.`,
        tags: [dtag.PA, dtag.ITEM, dtag.COALITION, dtag.TCM, dtag.SHOP]
    },
    {
        id: '00194',
        question: `Can I get gold tier fairy talents through calibration?`,
        answer: `Pretty much the main way of getting it.`,
        tags: [dtag.FAIRY]
    },
    {
        id: '00195',
        question: `What are Prototype Fairies used for?`,
        answer: `A Prototype Fairy is used to enhance other fairies. They act like dupes in a sense that they give 100 enhancement EXP a pop, or 150 with matching talents. Recommended to use on expensive craft fairies.`,
        tags: [dtag.FAIRY, dtag.LEVEL]
    },
    {
        id: '00196',
        question: `Where can I redeem the event boxes?`,
        answer: `Main Screen > Event > Time-Limited Event Tab > Supply Boxes.`,
        tags: [dtag.ANNIV, dtag.ITEM]
    },  //@Visual
    {
        id: '00197',
        question: `Will the TCM icons become available in the Friend Shop?`,
        answer: `Yes, otherwise SOON${TM}.`,
        tags: [dtag.TCM]
    },
    {
        id: '00198',
        question: `Do I keep the drops if I terminate/restart?`,
        answer: `"Recently acquired" option in the armory says yes.`,
        tags: [dtag.TDOLL, dtag.MAP]
    },
    {
        id: '00199',
        question: `Found out that there are seasonal lines for some dolls. How do I trigger them?`,
        answer: `Set them as your adjutant wearing the appropriate costume for the occasion.`,
        tags: [dtag.TDOLL, dtag.SKIN, dtag.ADJUNCT]
    },  //@Clarify
    {
        id: '00200',
        question: `Is there a compilation of anniversary adjutant lines?`,
        answer: `${List.unordered(
            spoilerSummary("3rd Anniversary", MBD.youtube("PL4Z0akElhimzHHiVMCozfUn1B6tYKjwPR")),   //u/paperrabbit
            spoilerSummary("4th Anniversary", MBD.youtube("PLoDB_FcnOA5zXkZ9XmQMTog1F7uIRZ_Qa")),   //u/ConductorBichir
            spoilerSummary("5th Anniversary", List.unordered(                                       //plants zaza
                spoilerSummary("Handguns", MBD.youtube("N-B_icnlDwg")),
                spoilerSummary("Submachine Guns", MBD.youtube("lQQ7aBEOFlc")),
                spoilerSummary("Rifles", MBD.youtube("gG8UUqZGzu4")),
                spoilerSummary("Assault Rifles", MBD.youtube("PRHbKntfgzY")),
                spoilerSummary("Machine Guns", MBD.youtube("AlbX92INYtY")),
                spoilerSummary("Shotguns", MBD.youtube("oQn1CT6WvPM")),
                spoilerSummary("Ringleaders", MBD.youtube("-erW_9CBkjQ")),
                spoilerSummary("NPCs", MBD.youtube("20kEk-lrxqY")),
                link("Cutscene interpreter", "https://gfl.amaryllisworks.pw/#side-12-0")
            ))
        )}`,
        tags: [dtag.LORE, dtag.ANNIV, dtag.ADJUNCT]
    },
    {
        id: '00201',
        question: `My team says Ammo/Ration depleted. How do I fill it up?`,
        answer: `${List.ordered(
            'Stand on a captured Command Center, captured open Heliport, captured open Heavy Heliport, or Cache Box.',
            'Double-tap the echelon standing on it.',
            'Yellow Resupply button on the bottom-right.')}<br>
        If you have auto-resupply on, they will be automatically supplied at the start of your turn if they stand on nodes that can resupply them.<br>
        Note that the act of resupplying in and of itself costs you only rations and ammo. AP will not be consumed.`,
        tags: [dtag.TDOLL, dtag.MAP, dtag.NEWB, dtag.IMPT]
    },  //@Visual
    {
        id: '00202',
        question: `What does the ${link('glitter/sparkle', IMG_ASSET+"ShinyIndicator.png")} in my coalition unit's portrait mean? Their sprites also has a golden aura/glow around it.`,
        answer: `A shiny ${TextStyle.style('pokemon', TextStyle.STRIKE)} coalition unit. And the very reason Golden Infusion is a thing.<br>
        If put on a Lv.100, XL unit, something special may happen.`,
        tags: [dtag.COALITION]
    },
    {
        id: '00203',
        question: `My audio is gone when I exit the app and return to it. What's happening?`,
        answer: `Just iOS things. One way to get around it is client restart.`,
        tags: [dtag.APPLE, dtag.TECH]
    },
    {
        id: '00204',
        question: `How do I throw/get Abandonded Goliaths/interact with consoles?`,
        answer: `There should be panels on thhe left side of the screen. If they don't appear, restart app.`,
        tags: [dtag.MAP, dtag.TECH]
    },  //@Visual
    {
        id: '00205',
        question: `When should I start doing night chapters?`,
        answer: `Anytime. Unlock them by completing the next chapter's last emergency map (i.e. 11-4e unlocks 10-1n). Remember to equip PEQs to negate the accuracy penalty and bring HGs for map vision. ARSMG should be fine for the first few night maps.<br>
        ${link("BigStupidJellyfish_ requirements breakdown.", 'https://www.reddit.com/r/girlsfrontline/comments/pf1dsb/weekly_commanders_lounge_august_31_2021/hb4b257/')}`,
        tags: [dtag.MAIN]
    },
    {
        id: '00206',
        question: `Why is this game downloading game files when I open it?`,
        answer: `${List.unordered(
            "You're just booting it up at the most opportune of times (maintenance/hotfix).",
            "You closed the Bluestacks emulator directly before closing the GFL app."
        )}`,
        tags: [dtag.TECH, dtag.EMU]
    },
    {
        id: '00207',
        question: `I can't log-in with Facebook. What are my options?`,
        answer: `One solution is through the FB app.`,
        tags: [dtag.TECH]
    },
    {
        id: '00208',
        question: `I don't know how to change the AI behaviour of my support/friend echelon, anyone can help me?`,
        answer: `${figure(image(IMG_ASSET+"FriendEchelonCommand.png", "Support echelon commands."), 'Double-tap the Friend Echelon to show options')}`,
        tags: [dtag.FRIEND, dtag.ECH, dtag.MAP]
    },
    {
        id: '00209',
        question: `When will dorm battery, daily gift, friend battery reset?`,
        answer: `${link('Netlify timer.', 'https://gftimers.netlify.app')} Note that ranking updates one hour after Kalina's Daily Gift.`,
        tags: [dtag.DORM, dtag.FRIEND, dtag["3P"]]
    },
    {
        id: '00210',
        question: `Visited a random dorm and they had a different audio playing, what caused that?`,
        answer: `Specific furniture with a specific doll or a complete furniture set.`,
        tags: [dtag.DORM, dtag.FURN]
    },
    {
        id: '00211',
        question: `I didn't get *insert reward here*. I checked my inventory but they're not there. How do I get them?`,
        answer: `Have you checked the quests?<br>
        What about the mail? Stage clear rewards are sent there.<br>
        If you did and they're still not there, either restart or wait for a few days.`,
        tags: [dtag.TECH, dtag.GET]
    },
    {
        id: '00212',
        question: `What are the chances on getting a specific fairy talent?`,
        answer: `${link('u/BigStupidJellyfish_ analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/talent-data')}`,
        tags: [dtag.FAIRY]
    },
    {
        id: '00213',
        question: `Why is the event map still here? It should've ended, right?`,
        answer: `Happens if you didn't close the app throughout maintenance. Can still be played and drop limited dolls.<!-- u/BigStupidJellyfish_ -->`,
        tags: [dtag.MAJOR, dtag.SEASON, dtag.COLLAB]
    },
    {
        id: '00214',
        question: `Is there a list of game terms and their abbreviations? And is there any for dolls' nicknames?`,
        answer: `${link('u/BigStupidJellyfish_.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/terms')} Includes in-game and community terms.<br>
        ${link('u/Kipdid.', 'https://www.reddit.com/r/girlsfrontline/comments/urhg1y/weekly_commanders_lounge_may_17_2022/i9fmiwm/')}<br>
        ${link('u/totestemp.', 'https://www.reddit.com/r/girlsfrontline/comments/urhg1y/weekly_commanders_lounge_may_17_2022/i972mqd/')}`,
        tags: [dtag.MISC]
    },
    {
        id: '00215',
        question: `How do I oath Ringleaders?`,
        answer: `Through the Formations route or the Armory route, with 100 Affection in hand, just like the Dolls. Going through the Protocol Control Center route is reported to be bugged.`,
        tags: [dtag.PA, dtag.COALITION, dtag.OATH, dtag.TECH]
    },
    {
        id: '00216',
        question: `Do HP shields stack?`,
        answer: `TLDR: Yes.<br>
        ${figure(image(IMG_ASSET+"HPShield.png", "Aqua's HP Shield dissertation."), 'From u/UnironicWeeaboo')}`,
        tags: [dtag.BATTLE, dtag.SKILL]
    },  //@Trim Image
    {
        id: '00217',
        question: `What should I prioritize buying from the black market?`,
        answer: `${List.ordered(
            'Fire Control Cores',
            'Dummy Cores',
            'Standard Combat Reports',
            'Special Combat Reports',
            'Doll Enhancement Pills',
            'Equipment Enhancement Pills')}`,
        tags: [dtag.BM, dtag.ITEM]
    },  //@Visual
    {
        id: '00218',
        question: `Is Radiant Collection worth it?`,
        answer: `Not in the slightest. For early game furnishing, the Black Market is better since you can get a 5${STAR} bonus.<br>
        Rates being 2% divided by the number of costumes in the radiant is the chance of pulling a specific skin. Aside from the fact that no exchange tickets and no L2D.<br>`,
        tags: [dtag.RESUPPLY, dtag.FURN, dtag.EXPED, dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00219',
        question: `What are pets used for?`,
        answer: `Extra comfort for dorms and raises chance to go to a specific expedition biome.`,
        tags: [dtag.PET, dtag.DORM, dtag.EXPED]
    },
    {
        id: '00220',
        question: `Are keybinds bannable?`,
        answer: `${link('Highly recommended against using keybinds.', 'https://www.reddit.com/r/girlsfrontline/comments/grht76/monthly_qa/fs239z8/')}<br>
        A lot of emulator players still use them, especially for ${link('kiting', 'https://www.reddit.com/r/girlsfrontline/comments/hmqhw8/weekly_commanders_lounge_july_07_2020/fxgu8g8/')}, so if you're willing to take the risk, go for it. Macros ARE a bannable offense, full stop.`,
        tags: [dtag.EMU]
    },
    {
        id: '00221',
        question: `Why do I get the "Ammo/Ration depleted" warning and sometimes not?`,
        answer: `You'll get the warning when you lack either of them, when you can see the enemy, and when you engage them first in battle.`,
        tags: [dtag.MAP]
    },
    {
        id: '00222',
        question: `What are the best deals for RL money?`,
        answer: `${List.unordered(
            'Monthly gems card')}`,
        tags: [dtag.MISC]
    },
    {
        id: '00223',
        question: `What's the release order for PA banners?`,
        answer: `${List.unordered(
            spoilerSummary('Google Doc.', Embed.google(["GFL Protocol Assimilation Banner Order", "https://docs.google.com/spreadsheets/d/1nwlyZxoYaC44idP8SnAjk1OgQX4ND0lIzG3_Fs1We_0"])),
            spoilerSummary('Image.', image('https://cdn.discordapp.com/attachments/564028599682727937/1003511535387283556/Proass_order.png', "Protocol Assimilation banner order."))
        )}`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00224',
        question: `Should I keep equipping capes to RFs?`,
        answer: `${link('Yes.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/myths#capes')}`,
        tags: [dtag.TDOLL, dtag.EQUIP]
    },
    {
        id: '00225',
        question: `Where can I get calibration tickets?`,
        answer: `Defense Drill, expeditions, shop, mini-events, log-in.`,
        tags: [dtag.ITEM, dtag.SIMS, dtag.EXPED, dtag.MINI, dtag.SHOP, dtag.GET]
    },
    {
        id: '00226',
        question: `How do I get duplicate ringleaders?`,
        answer: `If you successfully captured the RL, there is a "Reset Pool" button beside the Svarog button. This allows you to refresh the pool back to 100 for another round of RL pulling.<br>
        Dupe RLs are autofed to your first copy, raising their petals. Any more pulls of the same RL with full petal is an autoscrap.<br>
        Getting full petals is pretty much only relevant to Theater.`,
        tags: [dtag.COALITION, dtag.PA]
    },  //@Visual
    {
        id: '00227',
        question: `How many ways can I terminate the current mission?`,
        answer: `${List.unordered(
            'Terminate mission button on the top-left of the field map.',
            "Combat Missions/Campaign/Event Map > the mission you're currently doing > Terminate.")}`,
        tags: [dtag.MAIN, dtag.CAMPAIGN, dtag.MAJOR, dtag.SEASON, dtag.COLLAB]
    },
    {
        id: '00228',
        question: `I keep fat-fingering my kiting. Any help?`,
        answer: `To move a doll, you would have to drag their feet, not on their body.`,
        tags: [dtag.BATTLE]
    },
    {
        id: '00229',
        question: `When will the ringleader capture special animation start playing?`,
        answer: `When they get captured with Svarog's airstrikes or through the shop.`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00230',
        question: `Is there any particular reason why not to overextend on crafting for dailies?`,
        answer: `Rate ups. They exist. They take our contracts and quick prods.`,
        tags: [dtag.PROD]
    },
    {
        id: '00231',
        question: `Can I farm for the equipment/doll without clearing the map first?`,
        answer: `Yes, but better to clear it to remove the objectives pop-up.`,
        tags: [dtag.SPEQ, dtag.TDOLL]
    },
    {
        id: '00232',
        question: `Is there any Live2D viewer for GFL?`,
        answer: `${link('Pengu.', 'https://pengupengupengu.github.io/live2d-viewer-web/')} Don't know how this works.<br>
        Or try IOPWiki.`,
        tags: [dtag['3P']]
    },
    {
        id: '00233',
        question: `How long would visitors stay in my dormitory?`,
        answer: `${link('u/BigStupidJellyfish_ says 8 hours.', 'https://old.reddit.com/r/girlsfrontline/comments/v6pt9o/weekly_commanders_lounge_june_07_2022/ibyvjnm/')}`,
        tags: [dtag.DORM]
    },
    {
        id: '00234',
        question: `Which exped location gives which resources and which pet is best for each?`,
        answer: `${table(
            ['Pets', 'Location', 'Currency', 'Ration'],
            ['Cat', 'City', 'Toy Brick', '???'],
            ['Dog', 'Snowfield', 'Buttstock', '???'],
            ['Bird', 'Forest', 'Acorn', '???'],
            ['Misc', 'Wasteland', 'Collapse', '???']
        )}`,
        tags: [dtag.EXPED, dtag.PET, dtag.ITEM]
    },  //@Visual
    {
        id: '00235',
        question: `Does getting S rank in a mission increase the chance of getting the map specific doll in story and events?`,
        answer: `Yes.`,
        tags: [dtag.TDOLL]
    },
    {
        id: '00236',
        question: `What is "ranking" that people are talking about?`,
        answer: `${link("u/pointblanksniper's essay.", 'https://old.reddit.com/r/girlsfrontline/comments/vbydlq/weekly_commanders_lounge_june_14_2022/id4n4dr/')}`,
        tags: [dtag.MAJOR]
    },
    {
        id: '00237',
        question: `What are Specified Equipment Contracts for and how do I use them?`,
        answer: `Extra IOP Special Orders. Gets used when Equipment Production Special Order's 20 free charges are used up.`,
        tags: [dtag.ITEM, dtag.EQUIP, dtag.PROD]
    },  //@Visual
    {
        id: '00238',
        question: `Where is the in-game chip calculator and is it better than GFCalc?`,
        answer: `Under that specific FST's chip page.<br>
        IMO no, since it can't maximize strengths, though it is useful for temporary set-ups.<br>
        To use it properly, enable Preview Max-level Chip Stats.`,
        tags: [dtag.HOC, dtag.FST, dtag.EQUIP, dtag["3P"]]
    },  //@Visual
    {
        id: '00239',
        question: `How do I change my assistant/adjutant/lobby character?`,
        answer: `Commander Level > Base Management (bottom-left).<br>
        You can also change each one's background.`,
        tags: [dtag.ADJUNCT]
    },  //@Visual
    {
        id: '00240',
        question: `How do I edit my Friend Card?`,
        answer: `Friend > ID Card Tab`,
        tags: [dtag.MISC]
    },  //@Visual
    {
        id: '00241',
        question: `How do I dye my commander's clothes?`,
        answer: `Use an Infinite Surprise Dye or a Colorful Dye on a costume piece. Note that not every piece is dyeable, dirty and basic costumes in particular.`,
        tags: [dtag.CMDR, dtag.SKIN]
    },  //@Visual
    {
        id: '00242',
        question: `Where can I get a dyeable and free commander costume?`,
        answer: `Shattered Connexions.`,
        tags: [dtag.CMDR, dtag.SKIN, dtag.GET]
    },
    {
        id: '00243',
        question: `Why does the iOS version crash a lot?`,
        answer: `Grapevine: Mix iOS RAM overload prevention and GFL memory leak, and you have a totally definitely good time.<br>
        iPhone 7 and above should work really well though.`,
        tags: [dtag.TECH, dtag.APPLE]
    },
    {
        id: '00244',
        question: `How do I do EXP Sim?`,
        answer: `Deploy at least one echelon that can clear the whole map. Rewards 96 CRs on Advanced.`,
        tags: [dtag.SIMS]
    },  //@Check. Add SCR gain.
    {
        id: '00245',
        question: `What are Data Patches for and how do I get them?`,
        answer: `Used for iterating FSTs beyond yellow 5${STAR} (the red ${STAR}). Can also be used across all FSTs.<br>
        You can get them by getting a 5${STAR}'d FST's Central Data or by Code Refactoring in the Garage.`,
        tags: [dtag.HOC, dtag.FST, dtag.LEVEL, dtag.ITEM, dtag.GET]
    },
    {
        id: '00246',
        question: `Can I get Black Cards if I have a dupe of Luffberry skin?`,
        answer: `7000 Friend Points, take it or leave it.`,
        tags: [dtag.TDOLL, dtag.SKIN, dtag.OJ, dtag.ITEM]
    },
    {
        id: '00247',
        question: `How exactly does the Devastation Card work?`,
        answer: `Boosts all out-of-combat damage.`,
        tags: [dtag.OJ]
    },
    {
        id: '00248',
        question: `How does Enhancement work in Luffberry Chess?`,
        answer: `Gives permanent buffs to a doll.`,
        tags: [dtag.OJ]
    },
    {
        id: '00249',
        question: `How can I get T-Doll skins?`,
        answer: `${List.description({
            'Shop' : [
                'Dedicated gem-bought shop.',
                'Event shop during seasonal events.'
            ],
            'Resupply' : [
                'Banners and Reruns.',
                'Black Card Exchange.'
            ],
            'Mini-events' : [
                'Mini-events.',
                `Skins "rerun" during anniversary.`
            ],
            'Ranking Rewards' : ['Arctic Warfare only.'],
            'Frontline Protocol' : ['Basically the battlepass of this game.', '10$ at minimum.'],
            'New Player Rewards' : ["UMP45's Valentine's Skin, which is also available as gacha."]
        })}`,
        tags: [dtag.TDOLL, dtag.SKIN, dtag.GET, dtag.BP]
    },
    {
        id: '00250',
        question: `How do I know which dolls are in the Targeted rate up?`,
        answer: `Scrolling banner at the bottom-left of the home screen.`,
        tags: [dtag.PROD, dtag.TDOLL]
    },
    {
        id: '00251',
        question: `How do I get Friend ID icons?`,
        answer: `Resupply gacha (10 pulls), shop or clear reward during events, or Friend Shop.`,
        tags: [dtag.GET]
    },
    {
        id: '00252',
        question: `How do I know the final value of the doll stats? And what are the caps for each stat?`,
        answer: `${link('Matsuda Formula.', 'https://gfl.matsuda.tips/post/basicformula')}<br>
        99999 for final damage. FOR ROF, it's listed on the formation screen, but in reality, it's by 5, so max for 120 is 116, i.e. 116-120 ROF has no difference. Crit Rate is 100% as per common sense.`,
        tags: [dtag.SYSMECH, dtag.TDOLL]
    },
    {
        id: '00253',
        question: `How good are AR-15 and SOP's SPEQs?`,
        answer: `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/star-buffs')}`,
        tags: [dtag.SPEQ]
    },
    {
        id: '00254',
        question: `What are Dream Astralites and where do I get it?`,
        answer: `Milestone currency for Bookshelf of Memories.`,
        tags: [dtag.ITEM, dtag.SIDE, dtag.GET]
    },
    {
        id: '00255',
        question: `Is there a way to quickly unequip dolls?`,
        answer: `Armory > Equipment > Remove All at bottom-right.`,
        tags: [dtag.EQUIP]
    },  //@Visual
    {
        id: '00256',
        question: `Is there a chibi viewer for each doll?`,
        answer: `${link('IOPWiki', 'https://iopwiki.com/wiki/Category:T-Dolls')}<br>
        ${link('GFWiki', 'http://www.gfwiki.org/w/%E6%88%98%E6%9C%AF%E4%BA%BA%E5%BD%A2%E5%9B%BE%E9%89%B4')}`,
        tags: [dtag.TDOLL, dtag.MISC]
    },
    {
        id: '00257',
        question: `I'm moving overseas. Will there be problems for playing the same account?`,
        answer: `Each client is tied to their specific server.`,
        tags: [dtag.ACCT]
    },
    {
        id: '00258',
        question: `I see people have their Tdolls as their avatar in other people's dorms. How do you do that?`,
        answer: `In dorm, bottom-left, top-right, uncheck third checkbox.`,
        tags: [dtag.DORM]
    },  //@Visual
    {
        id: '00259',
        question: `Why does the current event not have auto-battles?`,
        answer: `All currently running "limited" events have no auto-battles, only main chapters and campaign map have those. Why? Engagement, probably.`,
        tags: [dtag.AUTO, dtag.MAJOR, dtag.SEASON, dtag.COLLAB]
    },
    {
        id: '00260',
        question: `Which of the enemies count as an elite?`,
        answer: `${spoilerSummary("pengu's enemy dex spreadsheet (includes high threat).", Embed.google(["GFL Enemy Dex Dump", "https://docs.google.com/spreadsheets/d/1_WPjx2WUE8zYhhfJ3wJkGCmpLn6dgwmcY-R7ZfKWTZ8"]))}`,  //according to u/MrFunkyBoy (https://old.reddit.com/r/girlsfrontline/comments/111xab7/weekly_commanders_lounge_february_14_2023/j957swj/)
        tags: [dtag.ENEMY]
    },  //${link('Powered by randomqwerty.', '../elites')}<br>
    {
        id: '00261',
        question: `Can I unbind my Sunborn Account?`,
        answer: `AFAIK, can't.`,
        tags: [dtag.ACCT]
    },
    {
        id: '00262',
        question: `Is it fine to use green equips?`,
        answer: `Advised to use if lacking gold equips. Do calibration only on gold ones for calibration ticket efficiency. Otherwise, fine to level them up.`,
        tags: [dtag.TDOLL, dtag.EQUIP]
    },
    {
        id: '00263',
        question: `How do I get the gold medals in maps?`,
        answer: `${List.unordered(
            'Read the Gold Medal description in the combat summary.',
            'Never retreat your team from the field map either by losing skirmishes (losses) or manual retreating (withdrawing).',
            "Never repair fielded teams (red warning at the bottom left tells you this, don't miss it).",
            'Retreating a doll from the battle phase/skirmish is fine. Really, anything that you SHOULD DO/ SHOULD NOT DO are already listed.',
            'Retreating Support Echelons does not prevent you from gold medals, nor does support kills (shown in green +#) count towards.')}`,
        tags: [dtag.MAP]
    },  //@Visual + Fix + Clarify
    {
        id: '00264',
        question: `What level is a good stopping point for raising dolls?`,
        answer: `Lv. 90 is the last level to get a power spike, before MODs, due to the 5th link.`,
        tags: [dtag.TDOLL, dtag.LEVEL]
    },
    {
        id: '00266',
        question: `Why do some attacks ignore my doll's armor/gets orange hits?`,
        answer: `Enemy has higher AP or they hit with explosive attacks.`,
        tags: [dtag.ENEMY, dtag.BATTLE]
    },
    {
        id: '00267',
        question: `Is there a limit to how many people I can blacklist?`,
        answer: `50.`,
        tags: [dtag.MISC]
    },
    {
        id: '00268',
        question: `Can I use duplicates to raise my doll's MOD level?`,
        answer: `Yes, unless you're modding 2★ dolls. First, go to factory then dismantle all dupes. When you get enough cores, you can use them to raise MOD levels.`,
        tags: [dtag.MOD]
    },
    {
        id: '00269',
        question: `How do I bind my account?`,
        answer: `${link('Settings>Manage Account>Bind to your preferred account.', 'https://old.reddit.com/r/girlsfrontline/comments/h9zoat/weekly_commanders_lounge_june_16_2020/fvpm1q8/')} To see your account password, check the spam section of your bound email address.<br>
        You can then change devices provided that you use the same account.`,
        tags: [dtag.ACCT]
    },  //@Visual
    {
        id: '00270',
        question: `Why do I sometimes get 1 defense die in battle?`,
        answer: `Opponent piece landed on top of your own, signified by a die breaking.`,
        tags: [dtag.OJ]
    },  //@In-game manual
    {
        id: '00271',
        question: `Do SMGs and HGs need to bother with PEQs?`,
        answer: `Direct-fire guns do.`,
        tags: [dtag.TDOLL, dtag.EQUIP]
    },
    {
        id: '00272',
        question: `What's a T-Doll Memoir?`,
        answer: `MOD stories.`,
        tags: [dtag.SIDE, dtag.MOD]
    },  //@Clarify
    {
        id: '00273',
        question: `Will I lose the tile buffs if my dolls retreated/moved/lose link/die?`,
        answer: `${spoilerSummary('No', MBD.youtube('tQRqcTDmAKE'))}. On that note, retreating dolls who had their buffs activate will not remove said buff. Also, tile buffs don't degrade even if your dummy count does.`,
        tags: [dtag.TDOLL, dtag.SKILL, dtag.BATTLE]
    },
    {
        id: '00274',
        question: `I'm planning to use a max level oathed MOD doll to farm surplus exp. Is that a good idea?`,
        answer: `${figure(image("https://cdn.discordapp.com/attachments/410790982116966400/970892903247384576/Surplus-and-fairy-exp-oath-no-oath.gif", "Effect of oathed MODs on surplus and fairy EXP."), "From u/UnironicWeeaboo")}`,
        tags: [dtag.TDOLL, dtag.LEVEL, dtag.MOD, dtag.OATH]
    },
    {
        id: '00275',
        question: `How long does it take to max out Kalina's affection?`,
        answer: `${spoilerSummary("A very long time.", Embed.google(["Kalina Affection Level and Gifts by 25thNight-", "https://docs.google.com/spreadsheets/d/1rshL9qGZfmuacCzjs7GdLN4qNs_ZWRoJNn-1vTwr6hc"]))}<br>
        You can increase it by collecting an affection point from her at the shop or by buying things from the shop.`,
        tags: [dtag.KALINA, dtag.LOVE]
    },
    {
        id: '00276',
        question: `I think I drove myself into a wall by not doing things efficiently. Do I have to restart my account to progress better?`,
        answer: `Nah. You'll be just fine continuing. Just do things better from now on.`,
        tags: [dtag.NEWB]
    },
    {
        id: '00277',
        question: `Do spare dorms contribute to comfort/battery generation?`,
        answer: `No. The comfort values shown in it is for when they're actually used.`,
        tags: [dtag.DORM, dtag.ITEM, dtag.BATTERY]
    },
    {
        id: '00278',
        question: `Is there a way to change the skill icon order in battle?`,
        answer: `${link('Explanation and manipulation.', 'https://old.reddit.com/r/girlsfrontline/comments/oeqgwt/weekly_commanders_lounge_july_06_2021/h48qu1v/')}`,
        tags: [dtag.BATTLE, dtag.SKILL]
    },
    {
        id: '00279',
        question: `Is there an easy way to get Luffberry tickets?`,
        answer: `${List.ordered(
            'Create private lobby.',
            'Start match with bots.',
            'Recover game every 5 minutes or buy cards during shop phase. Important or else you get no tickets.',
            'Quit match after 20 minutes. No prompt but additional tickets are still added.')}`,
        tags: [dtag.OJ]
    },
    {
        id: '00280',
        question: `How does one change their dormitory representative/avatar/visitor?`,
        answer: `${img(IMG_ASSET+"VisitorAvatar.png", 'Visit > Setting > Dorm Visit')}<br>
        Checked uses your commander avatar, unchecked and it uses your first adjutant.`,
        tags: [dtag.DORM]
    },
    {
        id: '00282',
        question: `I bought the L2D background but I saw nothing move. Is this really L2D?`,
        answer: `If you won't move then it wouldn't. Yes, panoramic${TextStyle.style('sorta L2D', TextStyle.SUPER)}.`,
        tags: [dtag.MISC]
    },
    {
        id: '00283',
        question: `How do I bypass enemy defenses?`,
        answer: `${table(['Defense', 'Counter'],
            ['Health Bar', 'Just shoot them'],
            ['Evasion', 'High accuracy<br>Evasion debuff<br>Surehits like skillshots or explosives'],
            ['Armor', 'High firepower<br>AP bullets<br>Explosives<br>Armor-ignoring attacks'],
            ['HP Shields', 'Basic shooting<br>Strippers like LTLX or De Lisle<br>Shield bypass like DEagle or NTW'],
            ['Force Shields<br>Distortion Barriers', 'HOCs (specifically FSTs)<br>Base Architect support'],
            ['Damage Reduction', 'Shoot harder<br>Buff strippers'])}`,
        tags: [dtag.BATTLE, dtag.NEWB]
    },
    {
        id: '00284',
        question: `How do I know when my registration date was?`,
        answer: `user_info.json from GFAlarm > reg_time value > convert to gregorian ("reg_time" unix time) with ${link('this', 'https://www.wolframalpha.com/')}.`,
        tags: [dtag.ACCT]
    },
    {
        id: '00285',
        question: `How do fairy talents work?`,
        answer: `Activates at the start of battle but activates after the echelon's fairy skll. As for it's effects, aside from Fervor (which boosts at 0s, 8s, 16s mark), exactly what it says (i.e. unlimited if no limit was stated).`,
        tags: [dtag.FAIRY, dtag.BATTLE]
    },
    {
        id: '00286',
        question: `If a ringleader equips a support buff/debuff chip, does it apply on themselves as well?`,
        answer: `Yes. But only as an engaging unit.`,
        tags: [dtag.COALITION, dtag.EQUIP]
    },
    {
        id: '00287',
        question: `Can I deploy two or three of the same pets in expedition?`,
        answer: `Actually, that is the method used by min-maxers regarding advantaged pets.`,
        tags: [dtag.EXPED, dtag.PET]
    },
    {
        id: '00288',
        question: `Does the flare equipment's accuracy boost stack?`,
        answer: `Yes.`,
        tags: [dtag.TDOLL, dtag.EQUIP]
    },
    {
        id: '00289',
        question: `How can Alina get black marks/Adeline get white marks?`,
        answer: `Have them support each other as HOCs.`,
        tags: [dtag.COALITION, dtag.BATTLE]
    },
    {
        id: '00290',
        question: `How do I complete the quest for taking on drill targets?`,
        answer: `Drill target = permanent preset of enemies. You know, the ones already available.`,
        tags: [dtag.MISC]
    },
    {
        id: '00291',
        question: `Can I change the censored sprites to uncensored/rejected ones?`,
        answer: `Apparently no since it'll revert back to its default file., And you might get in trouble.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00292',
        question: `How can I unlock the Fairy Room?`,
        answer: `Clear 60 different maps, then get your first fairy using Heavy Equipment Production.`,
        tags: [dtag.FAIRY]
    },
    {
        id: '00293',
        question: `Which PA unit has explosion attacks?`,
        answer: `Manticores, Goliaths, Jaguars`,
        tags: [dtag.COALITION]
    },
    {
        id: '00294',
        question: `Which fairy talent should I get?`,
        answer: `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/fairy-talents')}`,
        tags: [dtag.FAIRY]
    },
    {
        id: '00295',
        question: `Can I farm ranking maps for the cumulative points?`,
        answer: `Yes.`,
        tags: [dtag.MAJOR]
    },
    {
        id: '00296',
        question: `Where did my Ringleader duplicates go?`,
        answer: `As petals or as kernels. There can never be a dupe of the same Ringleader (literally same, alters are different).`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00298',
        question: `Guides show more echelons deployed than regular heliports in the map. What am I missing?`,
        answer: `Heavy Heliports > Top Tab > Choose Echelon`,
        tags: [dtag.MAP]
    },
    {
        id: '00299',
        question: `What is vulnerability?`,
        answer: `A debuff that amplifies all damage recieved from all sources after armor calculation.`,
        tags: [dtag.SKILL]
    },
    {
        id: '00300',
        question: `Is there something like an account/inventory/roster spreadsheet for this game?`,
        answer: `${link('Make a copy for personal use.', 'https://old.reddit.com/r/girlsfrontline/comments/wpoce9/weekly_commanders_lounge_august_16_2022/ikyqyb1/')}`,
        tags: [dtag.MISC]
    },
    {
        id: '00302',
        question: `How do I place dolls in dorms?`,
        answer: `Having a doll in an echelon. Dorm 1 corresponds to Echelon 1, Dorm 2 to Echelon 2, etc.`,
        tags: [dtag.DORM]
    },
    {
        id: '00303',
        question: `Do I get Friend Points if someone likes my dorm?`,
        answer: `No<!--KookyInspection-->, but you get FP when you like theirs.`,
        tags: [dtag.FRIEND]
    },
    {
        id: '00304',
        question: `Do auto-battles count for "Defeat Enemies"?`,
        answer: `No.`,
        tags: [dtag.AUTO]
    },  //See [question in sys mech]
    {
        id: '00305',
        question: `Where can I see my event ranking map placement?`,
        answer: `Homescreen > Rank > Event Rank Tab`,
        tags: [dtag.MAJOR]
    },
    {
        id: '00306',
        question: `I haven't used my starter anchor. Do I have to use it to see the new doll anchors?`,
        answer: `You can swipe between them. If you can't, restart app.`,
        tags: [dtag.PROD, dtag.TECH]
    },
    {
        id: '00307',
        question: `Can I change my name?`,
        answer: `Using Name Change Card, which only appears during certain packages.`,
        tags: [dtag.MISC]
    },
    {
        id: '00308',
        question: `What happens when a Luffberry Chess season is over?`,
        answer: `Unclaimed seasonal gacha skins will carry over to next seasonal gacha, and so are the tickets (which means they can be pre-farmed). Ranking rewards are different each season.`,
        tags: [dtag.OJ]
    },
    {
        id: '00309',
        question: `What are the other battery sinks besides facilities?`,
        answer: `${List.unordered(
            'Slaving Kalina (CR/SCR)',
            'Making an animal kingdom (3 of each purchasable pets in Rescue Station)',
            'Raising FSTs',
            'Event PVs (Cafe)',
            'Getting Gsh-18 (Cafe 4-koma)')}`,
        tags: [dtag.ITEM, dtag.BATTERY]
    },
    {
        id: '00310',
        question: `What does the Download Data button in the settings do?`,
        answer: `${link('Basically fairy and equipment texture, and dorm-related stuff.', 'https://old.reddit.com/r/girlsfrontline/comments/gziv26/weekly_commanders_lounge_june_09_2020/fut4man/')}`,
        tags: [dtag.MISC]
    },
    {
        id: '00311',
        question: `It's the last day of Theater. Do I still have to vote?`,
        answer: `Yes.`,
        tags: [dtag.THEATER]
    },
    {
        id: '00312',
        question: `Can I change my Sunborn Account's attached e-mail?`,
        answer: `Apparently no.`,
        tags: [dtag.ACCT]
    },
    {
        id: '00313',
        question: `Can the Sniper Fairy pierce shields?`,
        answer: `No.`,
        tags: [dtag.FAIRY, dtag.SKILL]
    },
    {
        id: '00314',
        question: `How do I complete Command Mission: Map Completion: Griffin Elite in Career Quests?`,
        answer: `${spoilerSummary('Elite Griffin Combat Medals', img(IMG_ASSET+"GriffinEliteMedal.png", 'Taken from GFLDB'))} are acquired during the major story events on their original run.`,
        tags: [dtag.MAJOR, dtag.QUEST]
    },
    {
        id: '00315',
        question: `I'm using coalition units but I can't raise my final score enough. What do I need to do?`,
        answer: `Use Griffin echelons. All coalition units give lower score for rankings.`,
        tags: [dtag.COALITION, dtag.THEATER]
    },
    {
        id: '00316',
        question: `What are Challenger Medals for?`,
        answer: `Flex.`,
        tags: [dtag.MISC]
    },
    {
        id: '00317',
        question: `What are the arching thread lines for?`,
        answer: `For coalition units, it's to see who are affected by their support chips.<br>
        For FSTs, it's for ally units under fire support.`,
        tags: [dtag.MAP, dtag.COALITION, dtag.FST]
    },
    {
        id: '00318',
        question: `Is it worth to wait for a veteran callback?`,
        answer: `Negligible I say. Returning rewards can be farmed by just playing. And there could be many events before a major/collab event.`,
        tags: [dtag.MISC]
    },
    {
        id: '00319',
        question: `Are HP shields affected by armor, flash shells, and damage reduction?`,
        answer: `Yes. They're more or less extensions of HP.`,
        tags: [dtag.SKILL]
    },
    {
        id: '00320',
        question: `I'm stuck in EXP Sim. Losing or withdrawing gives me an "Illegal Action Detected". What should I do?`,
        answer: `Since restarting won't help, contact support.`,
        tags: [dtag.SIMS, dtag.TECH]
    },
    {
        id: '00321',
        question: `How do I unlock the farming stages in the event?`,
        answer: `It should be a pair of nodes separate from the rest of the nodes.`,
        tags: [dtag.MAJOR, dtag.COLLAB, dtag.SEASON, dtag.CAMPAIGN]
    },
    {
        id: '00322',
        question: `There is a spinning pinwheel, a diamond, and an almost complete gauge-like icon beside the map names. What do they mean?`,
        answer: `Spinning pinwheel: Node split.<br>
        Diamond: Story node.<br>
        Gauge-like icon: Combat node.`,
        tags: [dtag.MAJOR, dtag.SEASON, dtag.COLLAB, dtag.CAMPAIGN]
    },
    {
        id: '00323',
        question: `I can't do an auto-battle even though I met the required CE. What's happening?`,
        answer: `Is it a night map? If it is, refer to night CE. If it still doesn't let you, increase CE, some required CE are listed wrong.`,
        tags: [dtag.AUTO]
    },
    {
        id: '00324',
        question: `Will the seasonal coalition units return to they're base/original form?`,
        answer: `That's already their actual form, as seen with their skills being completely different from the original's.`,
        tags: [dtag.COALITION]
    },
    {
        id: '00325',
        question: `I saw that commander costumes have skills. How do I level it up?`,
        answer: `Get another costume set with the same skill to upgrade it.`,
        tags: [dtag.CMDR, dtag.SKIN, dtag.SKILL]
    },
    {
        id: 326,
        question: `Story progress ounter says I still have maps to do. How do I know which ones are those?`,
        answer: `${figure(image(IMG_ASSET+"StoryProgress.png", "Progress dropdown."), "Tap the encircled counter to see the remaining maps")}`,
        tags: [dtag.MAJOR, dtag.CAMPAIGN, dtag.COLLAB]
    },
    {
        id: '00327',
        question: `Are there welfare units in this game? And if so, are they permanently missable?`,
        answer: `There is no such thing as a welfare unit. All event units are farmable. If you missed them, better luck next time.`,
        tags: [dtag.TDOLL, dtag.GET, dtag.NEWB]
    },
    {
        id: '00328',
        question: `Can I set the damaged art as default for dolls?`,
        answer: `Only on the main screen as an adjutant, unless you want them critically damaged forever.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00329',
        question: `The speech bubble hearts, SKK. What do they mean?`,
        answer: `Dorm? Tap them to gain ¼ of an affection.<br>
        Echelon portrait? They're at 90 affection pts. and above.`,
        tags: [dtag.TDOLL, dtag.LOVE]
    },
    {
        id: '00330',
        question: `Do I need to level up my duplicates in order to use them as dummy-links?`,
        answer: `Nope. They're merely DPS and health multiplier basically. Pretty much used as the equivalent of limit-break fodders in other gachas.`,
        tags: [dtag.TDOLL, dtag.LEVEL]
    },
    {
        id: '00331',
        question: `What is duping and how do I dupe?`,
        answer: `Duping is the art of keeping a duplicate of the same unit instead of turning them into dummy cores.<br>
        The only dupeable dolls are farmables, craftables, and capturables.<br>
        For Griffin T-Dolls, this only comes in rankings. For Coalition Units, this is, at the very least, expected.`,
        tags: [dtag.TDOLL, dtag.COALITION]
    },
    {
        id: '00332',
        question: `I can't see my dolls MOD in the Neural Upgrade tab. Where are they?`,
        answer: `Maybe because it's not yet released on whatever server you're in right now?`,
        tags: [dtag.TDOLL, dtag.MOD]
    },
    {
        id: '00333',
        question: `If I mod my doll, would I still be able to use other skins?`,
        answer: `Yes, considering that costumes are this game's main revenue.`,
        tags: [dtag.TDOLL, dtag.MOD, dtag.SKIN]
    },
    {
        id: '00334',
        question: `I just got an Old Letter. WhoWhenWhereWhatWhyHow?`,
        answer: `KSVK. After Modding her to 3. Mail. Connected to Mod Story. More story and immersion. Mica mail.`,
        tags: [dtag.MOD]
    },
    {
        id: '00335',
        question: `What if I don't have the doll I have costume for?`,
        answer: `Make Kalina wear it and she gives it when the owner comes home.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00336',
        question: `Where can I get furniture for my dorms?`,
        answer: `Collateral of skin pulling, aka Resupply. Or Expedition shop. Or crates from major events. Or shop during seasonal.`,
        tags: [dtag.FURN, dtag.DORM, dtag.RESUPPLY, dtag.SHOP, dtag.MAJOR, dtag.SEASON]
    },
    {
        id: '00337',
        question: `I want to clean my furniture inventory. How do I do that?`,
        answer: `${img(IMG_ASSET+"FurnitureTrash.png", 'Trash Icon')}`,
        tags: [dtag.FURN]
    },
    {
        id: '00338',
        question: `I won't be using the costume. How can I scrap it?`,
        answer: `I bring this news with a heavy heart that it is impossible. Deal with it.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00339',
        question: `What's the difference between L2D and Simplified L2D?`,
        answer: `${List.description({
            'Live2D' : [
                'Sometimes called Reactive Live2Ds.',
                'Can follow your touch with their eyes/head.',
                'Can only be acquired through Resupply. Except maybe Hanyang 88.',
                "Only AR Team and 404 have L2D Mod3 art."
            ],
            'Simplified Live2D' : [
                'Also known as Animations.',
                'Plays on loop, except their mouth when they talk.'
            ]
        })}`,
        tags: [dtag.TDOLL, dtag.SKIN, dtag.MOD]
    },
    {
        id: '00340',
        question: `Do Gem Package skins go to Black Card Exchange?`,
        answer: `Some do, some don't. What's for sure is that collab skins don't. Obviously.`,
        tags: [dtag.TDOLL, dtag.SKIN, dtag.GEMS]
    },
    {
        id: '00341',
        question: `Is there any checklist for the base bonus?`,
        answer: `${link("u/headphone_question's doll index checklist.", 'https://redd.it/xqtpd9')}`,
        tags: [dtag.TDOLL]
    },
    {
        id: '00342',
        question: `Can I get SPEQs/Limited dolls from auto-battles?`,
        answer: `Yes we can.`,
        tags: [dtag.AUTO, dtag.GET, dtag.SPEQ, dtag.TDOLL]
    },
    {
        id: '00343',
        question: `Do auto-battle card bonus stack with combat exp bonus?`,
        answer: `${img(IMG_ASSET+"XPUpAuto.png", 'Note that Monthly Auto-Battle Card is active, and 100% bonus is from XP up event')}`,
        tags: [dtag.LEVEL, dtag.AUTO]
    },  //@Source
    {
        id: '00344',
        question: `What can fairies do during auto-battles?`,
        answer: `Raise your CE to help you get the required amount.`,
        tags: [dtag.FAIRY, dtag.AUTO]
    },
    {
        id: '00345',
        question: `Is the monthly autobattle card worth it?`,
        answer: `Well, considering exp shown in autobattle window is the total undistributed exp, one team basically gets 2x exp than no monthly card. And you can also do it for one more echelon.`,
        tags: [dtag.AUTO]
    },
    {
        id: '00346',
        question: `Where to get kernels?`,
        answer: `Supernova = 2-3${STAR}. Dark Star = 1${STAR}.`,
        tags: [dtag.PA, dtag.ITEM]
    },
    {
        id: '00347',
        question: `What is Peak Value Analysis?`,
        answer: `Dummy-linking basically. But dupes are required. For ringleaders, the duplicates are automatically consumed.`,
        tags: [dtag.PA, dtag.COALITION, dtag.LEVEL]
    },
    {
        id: '00348',
        question: `If I fail to capture a coalition unit, will I lose them?`,
        answer: `Rather than that, they're recycled back into the pool.`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00349',
        question: `What does size imply in regards to PA units?`,
        answer: `Stats. Bigger is better. Also subject to RNG, by impulse, svarog capture, or kernel shop.`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00350',
        question: `Is it a good idea to get duplicate Ringleaders and Manticores (aka one-link units) for linking/PVA?`,
        answer: `Good? Yes. Necessary? For RLs, not really, since they would be powerful enough already. For mooks though, they'd need it.`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00301',
        question: `When do I get to unlock the whole FST grid/matrix/board?`,
        answer: `At full promotion. The yellow ★★★★★ one.`,
        tags: [dtag.HOC, dtag.FST]
    },
    {
        id: '00351',
        question: `How do FST HOC skills work?`,
        answer: `Depends. Either by timer or by number of shots fired. And all skills are active, meaning no need to choose which one you'll use.`,
        tags: [dtag.HOC, dtag.FST, dtag.SKILL]
    },
    {
        id: '00352',
        question: `Can HOCs reduce armor just like they do with force shields?`,
        answer: `No. Armor is a stat, not a gauge. Unless it's part of their skill.`,
        tags: [dtag.HOC, dtag.FST]
    },
    {
        id: '00353',
        question: `What's the rate for HOC rate-up?`,
        answer: `No exact numbers, but note that it only increases the chance of getting a particular HOC's Central Data. Rate for Data as a whole remains unchanged.`,
        tags: [dtag.HOC]
    },
    {
        id: '00354',
        question: `After a banner ends, would the extra impulses and aid commissions expire?`,
        answer: `They're basically the equivalent of gacha currency, so it wouldn't make sense for them to expire.`,
        tags: [dtag.PA, dtag.ITEM]
    },
    {
        id: '00355',
        question: `What are Petri Dishes for?`,
        answer: `Raising Coalition units' rarity.`,
        tags: [dtag.PA, dtag.COALITION, dtag.ITEM]
    },
    {
        id: '00356',
        question: `What are the fonts used in the game?`,
        answer: `${List.description({
            'Noto sans' : ['Story dialogue', 'Unit/Skill descriptions']
        })}`,
        tags: [dtag.MISC]
    },
    {
        id: '00357',
        question: `What's the enemy targeting priority?`,
        answer: `By default, the most forward unit. Note that due to asymmetrical angle, the top row is a smidge forward than the middle and the bottom is backward.`,
        tags: [dtag.ENEMY, dtag.BATTLE]
    },
    {
        id: '00358',
        question: `Can the basecamp not give expedition loots?`,
        answer: `Only if you didn't do one. If you did and no visible loot, restart app.`,
        tags: [dtag.EXPED, dtag.TECH]
    },
    {
        id: '00359',
        question: `Is the Rescue Fairy's skill actually good?`,
        answer: `For core farming purposes, ${spoilerSummary('very noticeable', Embed.google(["GFL 10-4E Rescue Core Rate Stats", "https://docs.google.com/spreadsheets/d/1DSYyTdC3Yk7JV4YGuj8zFMZqbPcH2zpNShtAFpR2Qmw"]))}.<br>
        Note that it only works on dolls, not equipments.`,
        tags: [dtag.FAIRY, dtag.SKILL]
    },
    {
        id: '00360',
        question: `Which expedition duration should I do to maximize efficiency?`,
        answer: `8 hours. More chances to get into hidden areas.`,
        tags: [dtag.EXPED]
    },
    {
        id: '00361',
        question: `I can't log-in with my third party account. Is there any way to get back?`,
        answer: `Might be because the third party is down. Contacting ${TextStyle.style('support@sunborngame.com', TextStyle.BOLD)} to change to Sunborn account might help. Having account details, particularly UID and username, may help.`,
        tags: [dtag.ACCT, dtag.TECH]
    },
    {
        id: '00362',
        question: `Will the *insert ranking reward here* be available in the future?`,
        answer: `Only if they rerun ranking maps. AW and DD maps are slated to be reworked.`,
        tags: [dtag.GET, dtag.FAIRY, dtag.SPEQ, dtag.MAJOR, dtag.RANK]
    },
    {
        id: '00363',
        question: `How valueable are Black Cards?`,
        answer: `Very.`,
        tags: [dtag.TDOLL, dtag.SKIN, dtag.ITEM]
    },
    {
        id: '00364',
        question: `What's the optimal way of clearing ${TextStyle.style('Bingo', TextStyle.STRIKE)} Key Card Events?`,
        answer: `Using the Targeted Draws to fully clear the board in one go.`,
        tags: [dtag.MINI]
    },
    {
        id: '00365',
        question: `What do the numbers mean when talking about tile positioning?`,
        answer: `${table(null,
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3])}`,
        tags: [dtag.ECH, dtag.NEWB]
    },
    {
        id: '00366',
        question: `When will the current event end?`,
        answer: `If major event or collab, 4 weeks after start. If minor or mini events, 3 weeks after start. If reruns, 2 weeks.`,
        tags: [dtag.MAJOR, dtag.COLLAB, dtag.SEASON, dtag.MINI]
    },
    {
        id: '00367',
        question: `How to unlock the Additional Supplies/Blue Weekly Quest?`,
        answer: `By paying for the current battlepass.`,
        tags: [dtag.QUEST, dtag.BP]
    },  //@Visual
    {
        id: '00368',
        question: `I've been getting dupes about 3 days when the Key Card Event started. What gives?`,
        answer: `First, "Coupon Collector's Problem". Second, ${link('it actually kinda seems rigged to some extent', 'https://www.reddit.com/r/girlsfrontline/comments/o5hpk4/weekly_commanders_lounge_june_22_2021/h2pa27f/')}.`,
        tags: [dtag.MINI]
    },
    {
        id: '00369',
        question: `How many Parachute Fairies would I need?`,
        answer: `${List.description({
            'Casual' : ['1 - 2'],
            'Competetive' : ['3 - 5'],
            'Top Ranker' : ['6 - 10'],
            'Memer' : ['14+']
        })}`,
        tags: [dtag.FAIRY]
    },
    {
        id: '00370',
        question: `Can Support Fairy Skills (i.e. Construction) work on Coalition units?`,
        answer: `${link('Yes.', 'https://old.reddit.com/r/girlsfrontline/comments/q1rscp/weekly_commanders_lounge_october_05_2021/hg4vntx/')}`,
        tags: [dtag.FAIRY, dtag.COALITION, dtag.BATTLE]
    },
    {
        id: '00371',
        question: `If I plan to buy the BP, do I have to do it at the start?`,
        answer: `You can do it whenever. Whataver level you are at as F2P, that's also the level when you buy it.`,
        tags: [dtag.MISC]
    },
    {
        id: '00372',
        question: `Where do I get Transfer Catalysts?`,
        answer: `Daily gifts, failed captures, PA store.`,
        tags: [dtag.PA, dtag.ITEM]
    },
    {
        id: '00373',
        question: `How do I get my daily resources from quests?`,
        answer: `Do any of the dailies until it has 6 icons, then a blue gift box with obtainable will appear, and finally tap on it to claim it.`,
        tags: [dtag.QUEST, dtag.MARP, dtag.ITEM]
    },  //@Visual
    {
        id: '00374',
        question: `I want a specific unit. How will I be able to pull for them in this banner?`,
        answer: `${List.description({
            'Pulses' : [
                'Only works for the three units on the field at that time.',
                'Once an attempt is made, captured or not, they will be replaced with another unit from the pool.'
            ],
            'Svarog' : ['Pulls from the entire pool, but chances depend on how many are left in the pool.']
        })}`,
        tags: [dtag.PA, dtag.COALITION, dtag.GET]
    },
    {
        id: '00375',
        question: `What are the possible dailies and weeklies for the 3.0 quests?`,
        answer: `${figure(Embed.google(["GFL 3.010 Daily/Weekly System", "https://docs.google.com/spreadsheets/d/1gyn-6r_XBriYonFpj-RPkoQnCK36StTWJ0E5_yTU048"]), "Can also count as a brief overview of the system")}`,
        tags: [dtag.QUEST]
    },
    {
        id: '00376',
        question: `Is there any way to rewatch the PA tutorial?`,
        answer: `${MBD.youtube('tD7JgQcIQHM')}<br>
        ${MBD.youtube('_s9ZY5wDLYE')}`,
        tags: [dtag.PA, dtag.LORE]
    },
    {
        id: '00377',
        question: `What are Original and Pure Samples?`,
        answer: `Used in the Intelligence Center to craft for FST chips and central data.`,
        tags: [dtag.HOC, dtag.ITEM]
    },
    {
        id: '00378',
        question: `Can I increase the ringleader's 25% capture rate?`,
        answer: `Drop the pool until you have 3/100 then use Svarog tickets.`,
        tags: [dtag.PA]
    },
    {
        id: '00380',
        question: `Do I need Dummy Cores for upgrading Coalition Units?`,
        answer: `No. They have their own resources.`,
        tags: [dtag.COALITION, dtag.LEVEL, dtag.ITEM, dtag.CORE]
    },
    {
        id: '00381',
        question: `How long do ringleader banners last?`,
        answer: `28 days. Anniversary banners last for 1 week.`,
        tags: [dtag.PA]
    },
    {
        id: '00382',
        question: `Can I change the command type (Defend/Charge/Destroy) automatically?`,
        answer: `No can do for now.`,
        tags: [dtag.COALITION, dtag.BATTLE]
    },
    {
        id: '00383',
        question: `I have one copy of a ringleader. Can I scrap them?`,
        answer: `Why would you? How could you? Can you even anyway?`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00384',
        question: `How are the Striker's ROF calculated?`,
        answer: `${link('u/UnironicWeeaboo testing.', 'https://www.reddit.com/r/girlsfrontline/comments/qkzc9s/comment/hjecs3p/')}`,
        tags: [dtag.ENEMY, dtag.COALITION]
    },
    {
        id: '00385',
        question: `How do I stop my dolls from retreating on critical damage?`,
        answer: `Heavy Damage Protection off in Game Settings or in Combat Pause Settings.`,
        tags: [dtag.BATTLE]
    },  //@Visual
    {
        id: '00386',
        question: `Can I zoom out during combat?`,
        answer: `You'd have to zoom in first. If you mean zooming well outside the doll's shooting range, then no.`,
        tags: [dtag.BATTLE]
    },
    {
        id: '00387',
        question: `What are these nameless mails with resources?`,
        answer: `Battlepass overfill or dailies reward.`,
        tags: [dtag.QUEST, dtag.ITEM]
    },
    {
        id: '00388',
        question: `How can I start reading Griffin Memories?`,
        answer: `Get all the dolls involved in the story. Tap a story and fill the bar at the top to progress. You can fill it up by doing the missions at the right side of the bar.`,
        tags: [dtag.SIDE]
    },
    {
        id: '00389',
        question: `Do debuffs stick if I retreat my dolls?`,
        answer: `Rudimentary testing says no. Mainly applies to enemy side on-screen effects like molotovs, smoke, grenade, stun, etc.`,
        tags: [dtag.SKILL, dtag.BATTLE, dtag.SYSMECH]
    },
    {
        id: '00390',
        question: `What happens to the Resupply Exchange Tickets after the banner ends? How do I get Black Cards?`,
        answer: `${image(IMG_ASSET+"ResupplyMechanics.png", "Resupply help window.")}`,
        tags: [dtag.RESUPPLY, dtag.ITEM, dtag.GET]
    },
    {
        id: '00391',
        question: `When all dolls' DPS contribution is equal, who becomes the MVP?`,
        answer: `By acquire sequence starting from latest, including collab units. MODding affects nothing.`,
        tags: [dtag.TDOLL, dtag.BATTLE, dtag.LEVEL]
    },
    {
        id: '00392',
        question: `Can I change which dolls get targeted by the enemy?`,
        answer: `${link('By echelon positioning.', 'https://www.reddit.com/r/girlsfrontline/comments/g11mag/weekly_commanders_lounge_april_14_2020/fny91zz/')}<br>
        ${spoilerSummary('In-depth study on positioning, targeting, and some peculiar requirements involving acquire dates.', Embed.google(["Enemy Targeting Guide", "https://docs.google.com/document/d/1LPqpSCNWiu1HJOnK1FOB1o30FSwTQRQvcK-tAjO4SSI"]))}`,
        tags: [dtag.BATTLE]
    },  //acquire dates to echelon formation position
    {
        id: '00281',
        question: `How are the limited bonus gems for the monthly card applied?`,
        answer: `Only within the time the event is ongoing, which is for a week. Note that it immediately becomes active as long as a monthly gem is active, old or new purchase.`,
        tags: [dtag.GEMS]
    },
    {
        id: '00045',
        question: `If I bought the battlepass in the middle/end, will I still able to get the previous level rewards?`,
        answer: `Yes.`,
        tags: [dtag.QUEST, dtag.BP]
    },
    {
        id: '00379',
        question: `Where can I use Calibration Tickets?`,
        answer: `Equipment Calibration, Fairy Talent Calibration, HOC Chip Rotation, More Anticipation...`,
        tags: [dtag.ITEM]
    },
    {
        id: '00393',
        question: `Do first purchase gem bonus reset?`,
        answer: `Only on server anniversary which, on Global, is on May.`,
        tags: [dtag.GEMS]
    },
    {
        id: '00394',
        question: `If I buy multiple Monthly Gem Packages, will it stack?`,
        answer: `As in more than 30 a day? No. It being a 2 month distribution? Yes.`,
        tags: [dtag.GEMS]
    },
    {
        id: '00395',
        question: `How rare are Quick Repair Tickets?`,
        answer: `As rare as water on a beach.`,
        tags: [dtag.ITEM]
    },
    {
        id: '00396',
        question: `Which should I prioritize in the Data Room, Combat Reports or Special Combat Reports?`,
        answer: `SCRs primarily because you can just corpse drag, and auto-battle the dolls, and also because basecamp sells far more CR than SCR. Note that you'd need 5000 SCRs to fully level a fresh HOC.`,
        tags: [dtag.ITEM, dtag.LEVEL]
    },
    {
        id: '00397',
        question: `I've seen players have around 500 T-doll contracts. How did they have that much?`,
        answer: `Logistics and doing production for daily quests. The last one basically applies to long-time players though.`,
        tags: [dtag.ITEM]
    },
    {
        id: '00398',
        question: `How do I unlock mortars and anti-tanks?`,
        answer: `FSTs can only be unlocked by their respective ${getID("Central Data", "00061")}.`,
        tags: [dtag.HOC, dtag.FST, dtag.GET]
    },
    {
        id: '00399',
        question: `When do we get discounted tokens?`,
        answer: `Around x-mas, cny, anni, April 16 week, and the likes.`,
        tags: [dtag.RESUPPLY, dtag.ITEM]
    },
    {
        id: '00400',
        question: `If I bought a Monthly Gem Card, do I get them immediately every day or do I have to log-in?`,
        answer: `Sent as mail, procured as mail, expires as mail. One week expiration.`,
        tags: [dtag.GEMS, dtag.GET]
    },
    {
        id: '00401',
        question: `Do debuffs stack i.e. smoke, stat downs?`,
        answer: `Unless stated otherwise, yes.`,
        tags: [dtag.SKILL]
    },
    {
        id: '00402',
        question: `How many combat reports should I have ideally?`,
        answer: `660 CRs to raise a doll from Lv.1 to Lv.90.<br>
        As for how much is the recommended stock, if your main source of raising dolls is map leveling/corpse dragging, you'll get a truck load of them before you know it.`,
        tags: [dtag.TDOLL, dtag.LEVEL]
    },
    {
        id: '00403',
        question: `Anyone knows what resources and how much do we get for a failed PA capture?`,
        answer: `${figure(image(IMG_ASSET+"CaptureFail.png", "Failed PA capture compensations."), 'Slashes for probability')}`,
        tags: [dtag.ITEM, dtag.PA]
    },
    {
        id: '00404',
        question: `How often do Electronic Impulses replenish?`,
        answer: `With a maxed-out Impulse Reactor, 2 a day.`,
        tags: [dtag.PA, dtag.ITEM]
    },
    {
        id: '00405',
        question: `Why are the gem package names incorrect/confusing?`,
        answer: `${link('Explanation 1.', 'https://www.reddit.com/r/girlsfrontline/comments/q1rscp/weekly_commanders_lounge_october_05_2021/hg3xpyr/')}<br>
        ${link('Explanation 2.', 'https://www.reddit.com/r/girlsfrontline/comments/mzjdl5/weekly_commanders_lounge_april_27_2021/gwrie7y/')}`,
        tags: [dtag.GEMS, dtag.SHOP]
    },
    {
        id: '00406',
        question: `How do dorms work?`,
        answer: `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/what-happens-in-the-dorms-stays-in-the-dorms')}`,
        tags: [dtag.DORM]
    },
    {
        id: '00407',
        question: `I see posters of certain dolls on some of my friends' dorm walls. How do I get them?`,
        answer: `It's either from a skin where you give it to a doll, mail reward, or a campaign poster that can bought in the cafe.`,
        tags: [dtag.DORM, dtag.FURN]
    },
    {
        id: '00408',
        question: `How many hours do visitors stay in the dorm?`,
        answer: `8.`,
        tags: [dtag.DORM]
    },
    {
        id: '00409',
        question: `How do I change my commander's gender so I can change their dirty clothes?`,
        answer: `Change gender in the commander's wardrobe, which can be visited by tapping the arrow below then tapping WARDROBE, or tapping your commander name then tapping on the "???" speech bubble.`,
        tags: [dtag.CMDR, dtag.SKIN]
    },  //@Visual
    {
        id: '00410',
        question: `What are spare dorms and what are they for?`,
        answer: `They're dorm rooms that act as presets by saving dorm configuration with 6 free slots. They can also be used to swap dorm order. Also, they don't contribute to battery generation.`,
        tags: [dtag.DORM]
    },
    {
        id: '00411',
        question: `Which dolls appear in which dorms?`,
        answer: `Echelon position corresponds to dorm positions i.e. Echelon 1 in Dorm 1, Echelon 2 in Dorm 2, etc.`,
        tags: [dtag.DORM]
    },
    {
        id: '00021',
        question: `What is the priority for each currency?`,
        answer: `${List.description({
            "Toy Block": ["Furnitures", "Batteries if really strapped"],
            "Buttstock": ["Fire Control Cores", "CR/SCR if needed"],
            "Acorns": ["SPEQs"],
            "Bottle": ["Cores", "Effects for posterity"]
        })}`,
        tags: [dtag.BM]
    },
    {
        id: '00412',
        question: `What is a deathstack?`,
        answer: `${List.unordered(
            "Strong enemies that can cover each others weaknesses.",
            "Large amount of enemies in a single formation.",
            "Even with superior kiting and armory, taking critical damage is inevitable."
        )}`,
        tags: [dtag.ENEMY]
    },
    {
        id: '00022',
        question: `What T-doll effects are available in the older servers?`,
        answer: `Global already has everything they have.`,
        tags: [dtag.TDOLL, dtag.BM]
    },
    {
        id: '00413',
        question: `Can I use the same unit in different echelons?`,
        answer: `The exact same? No. But this game allows the use of duplicates, in other words ${getID("duping", "00331")}. This would still cost resources to raise the dupe.`,
        tags: [dtag.TDOLL, dtag.COALITION, dtag.ECH]
    },
    {
        id: '00414',
        question: `Does the Black Market shop ever refresh its stock?`,
        answer: `The ITEM section, yes. Every turn of a new month.`,
        tags: [dtag.BM]
    },
    {
        id: '00415',
        question: `How do I unlock new HOCs?`,
        answer: `From chip analyzer or from their status page (accessible through garage or echelon formation).`,
        tags: [dtag.HOC, dtag.FST, dtag.GET]
    },  //@Visual
    {
        id: '00416',
        question: `I missed some event furniture that can be acquired from crates. Will I ever have a chance to get them again?`,
        answer: `Yes. Wait for them in the Black Market Exchange.`,
        tags: [dtag.FURN, dtag.MAJOR, dtag.BM]
    },
    {
        id: '00417',
        question: `How do I establish a supply route?`,
        answer: `${img("https://i.ibb.co/N3MVNnd/IMG-20230314-093923.jpg", "Capturing all nodes along the blue line will create one (from u/WhistleOfDeath)")}`,
        tags: [dtag.MAP, dtag.SYSMECH]
    },
    {
        id: '00418',
        question: `What is an additive buff?`,
        answer: `Buffs that are added after all modifiers, making this useful for countering/mitigating debuffs.`,
        tags: [dtag.SKILL]
    },
    {
        id: '00419',
        question: `How can I obtain the wedding/oath skins for some T-dolls?`,
        answer: `Oath skins? Watchu smoking? There's no oath skins, only gacha/free/paid skins.`,
        tags: [dtag.TDOLL, dtag.SKIN]
    },
    {
        id: '00422',
        question: `Is there any damage sim? Or at least a DPS calculator?`,
        answer: `${figure(Embed.google(["DPS Calculator", "https://docs.google.com/spreadsheets/d/1HgLM886cjnlGeoff7sE5QkTN4KPbT-52"]), "by u/corbsieboy")}`,
        tags: [dtag['3P']]
    },
    {
        id: '00423',
        question: `Where can I get Memory Fragments?`,
        answer: `${List.ordered(
            "Combat Simulations - Neural Corridor",
            "Kalina's Shop",
            "Cafe MOD Stories",
            "Campaign/Event Rewards",
            "Lufberry Gacha",
            "Expedition Loots"
        )}`,
        tags: [dtag.MOD, dtag.ITEM, dtag.GET]
    },
    {
        id: '00424',
        question: `I'm overflowing with units/gears/fairies/PA units. Where can I dump/scrap/recycle/retire them off?`,
        answer: `${img(IMG_ASSET+"Disassembly.png", "Found in the Factory Tab")}<br>
        ${List.description({
            "T-DOLL": [
                "The final stage of core farming.",
                `Cores received is equal to each scrapped doll's rarity, all other stats be damned. Collab dolls count as 5${STAR}.`
            ],
            "EQUIP": [
                "Pretty much only useful if Equipment Enhancement is still locked or if there's no equipment to enhance."
            ],
            "FAIRY": [],
            "COALITION FORCES": [
                "The only way to get Supernova and Dark Nova Crystals."
            ]
        })}`,
        tags: [dtag.SYSMECH, dtag.TDOLL, dtag.EQUIP, dtag.FAIRY, dtag.COALITION, dtag.ITEM]
    },
    {
        id: '00425',
        question: `Did the battlepass skins have a rerun yet?`,
        answer: `None yet. But even if they do, they'll mostly likely have the same cost without the bonuses.`,
        tags: [dtag.BP]
    },
    {
        id: '00426',
        question: `What/where can I get Supply Crates?`,
        answer: `Event-limited items that can only be bought during the its runtime. Gives resources and dolls.`,
        tags: [dtag.ITEM, dtag.MAJOR]
    },
    {
        id: '00427',
        question: `When do pets in the Rescue Station change?`,
        answer: `3 days without buying them, arguably the next day if you do.`,
        tags: [dtag.PET]
    },
    {
        id: '00428',
        question: `How do I deal with each enemy?`,
        answer: `${Embed.google(["Enemy Analytics v0.50 (EN) by GFC", "https://docs.google.com/spreadsheets/d/1TjHC4Vaed8dFqSkagM6teNlmBjFGPiUbTRnTnvxnnu4"])}`,
        tags: [dtag.ENEMY]
    },  //slightly outdated
    {
        id: '00429',
        question: `When will a zone get a support bonus?`,
        answer: `When that zone has the lowest total score.<br>
        ${img("https://cdn.discordapp.com/attachments/640157367056728133/1077929307139231754/unknown.png", "Score threshold per stage (From u/Mich997)")}`,
        tags: [dtag.THEATER]
    },
    {
        id: '00430',
        question: `Where is Bookshelf of Memories?`,
        answer: `${img(IMG_ASSET+"GriffinMemories.png", "Bookshelf of Memories found in the Data Room")}<br>
        Sidestories for the featured dolls (Griffin Memories). Rewards ${getID("Friend Gossips", "00060")} or ${getID("Unity Skills", "00442")}.`,
        tags: [dtag.SIDE]
    },
    {
        id: '00060',
        question: `What are Friend Gossips?`,
        answer: `Unique dialogues when two paired dolls are in the double adjutant.<br>
        ${List.description({
            'Becoming a Star' : [
                'P38 + HK45',
                'P38 + SpectreM4',
                'P38 + Desert Eagle',
                'HK45 + SpectreM4',
                'HK45 + Desert Eagle',
                'Stechkin + Desert Eagle']
        })}`,
        tags: [dtag.SIDE, dtag.ADJUNCT]
    },
    {
        id: '00431',
        question: `Which map is the fastest for the killing armored units?`,
        answer: `8-1N is easy enough and has numerous Tarantulas.`,
        tags: [dtag.ENEMY]
    },
    {
        id: '00432',
        question: `"Your session has expired." What does that even mean?`,
        answer: `Too many user inputs during log-in. Just chill out and let it cook.`,
        tags: [dtag.TECH]
    },
    {
        id: '00434',
        question: `What does the "house, +, wrench" node do?`,
        answer: `One-time repair and one-time resupply.`,
        tags: [dtag.MAP]
    },  //@Visual
    {
        id: '00435',
        question: `What's the distribution for Coalition Unit sizes?`,
        answer: `${link("u/BigStupidJellyfish_'s findings.", "https://old.reddit.com/r/girlsfrontline/comments/135epds/weekly_commanders_lounge_may_02_2023/jiyruin/")}`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00436',
        question: `Where can I get commander costumes?`,
        answer: `Shop, Ranking, Special Log-ins, Black Market, Luffberry, Bookshelf of Memories, Shattered Connexions.`,
        tags: [dtag.CMDR, dtag.SKIN]
    },
    {
        id: '00437',
        question: `Where can I get T-doll contracts?`,
        answer: `Logistics, dailies.`,
        tags: [dtag.ITEM, dtag.GET]
    },
    {
        id: '00438',
        question: `I saw giant coalition units in my dorm, and they walk/sit backwards. How did this happen?`,
        answer: `Friend visit with a coalition unit adjutant`,
        tags: [dtag.DORM, dtag.COALITION]
    },
    {
        id: '00439',
        question: `Why are my XS units getting auto-locked?`,
        answer: `Because tutorial said so? Only applies to first XS and XL copy of a particular unit.`,
        tags: [dtag.PA, dtag.COALITION]
    },  //@Visual
    {
        id: '00440',
        question: `How do I run Data Simulations?`,
        answer: `${link("BigStupidJellyfish's guide.", "https://big-stupid-jellyfish.github.io/GFMath/pages/datasim")}`,
        tags: [dtag.SIMS]
    },
    {
        id: '00441',
        question: `What type of faction node do Theater stages have?`,
        answer: `Non-allied. Occupied or otherwise. Also applicable to all combat sims with no overworld map.`,
        tags: [dtag.THEATER, dtag.SIMS]
    },
    {
        id: '00442',
        question: `What are Unity Skills?`,
        answer: `Additional skill when the paired dolls are in the same echelon.<br>
        ${List.description({
            'Operation Starchaser' : ['Grizzly + PzB29', 'AK-Alfa + M82'],
            'Her Smile' : ['G36 + Springfield'],
            'Default' : ['MPK + MPL', "SCAR-H + SCAR-L"]
        })}`,
        tags: [dtag.TDOLL, dtag.SKILL]
    },
    {
        id: '00443',
        question: `After winning a combat mission with my Coalition team, I noticed that they have no ammo and rations in them. Where did my resources go?`,
        answer: `Back to the pool.`,
        tags: [dtag.COALITION]
    },
    {
        id: '00445',
        question: `What do I do with unused Keycards during the bingo event?`,
        answer: `${figure(image(IMG_ASSET+"KeyCardRules.png", "Keycard bingo rules."), "Rule #7: 1 Key Card = 5 Calibration Tickets")}`,
        tags: [dtag.MINI]
    },
    {
        id: '00057',
        question: `Where can I see rankings?`,
        answer: `Tap the bottom-right arrow at the main screen.`,
        tags: [dtag.MISC]
    },  //@Visual
    {
        id: '00446',
        question: `How do Total Score and Final Battle ranking work?`,
        answer: `${List.description({
            "Total Score": [
                "Cumulative score gained throughout Theater.",
                "Score includes investigations, battles, and construction."
            ],
            "Final Battle": [
                "Highest score of people who cleared Core 8.",
                "Only the score gained in battle is used."
            ]
        })}`,
        tags: [dtag.THEATER]
    },
    {
        id: '00447',
        question: `What does "No fewer than 4 dolls present at the time of victory" mean?`,
        answer: `No fewer than 4 dolls present: 4 dolls or more remaining.<br>
        At the time of victory: Win the battle.
        <br>
        Win the battle with 4 dolls or more remaining (at the field).`,
        tags: [dtag.THEATER]
    },
    {
        id: '00448',
        question: `How do I use Construction Fairy effectively?`,
        answer: `${List.ordered(
            "Deploy on a node next to an enemy.",
            "Go to that node.",
            "Take a defensive stance."
        )}`,
        tags: [dtag.FAIRY, dtag.SKILL]
    },
    {
        id: '00449',
        question: `Which skills are able to get critical hits?`,
        answer: `Rule of thumb: Unless otherwise stated, all skillshots, grenades, and molotovs don't get critical hits.`,
        tags: [dtag.SKILL, dtag.SYSMECH]
    },
    {
        id: '00450',
        question: `My Samsung/Pixel phone can't open up the game. Is there any fix for this?`,
        answer: `${List.unordered(
            link("u/Le_Trudos' Android 12 fix", "https://www.reddit.com/r/girlsfrontline/comments/tsmwen/possible_solution_to_android_12_updates_making/"),
            link("Droidwin Android 12 fix", "https://droidwin.com/games-and-apps-crashing-not-working-on-android-12-how-to-fix/"),
            link("u/tommykuah's Android 12 fix", "https://www.reddit.com/r/girlsfrontline/comments/tdsmjh/regarding_android_12_app_crashfreeze_issue_and/i0mjpop/"),
            `${link("u/Gawdzilla27's Android 14 fix", "https://old.reddit.com/r/girlsfrontline/comments/18wk6dz/weekly_commanders_lounge_january_02_2024/kgi8p2j/")} ${link(TextStyle.style("0", TextStyle.SUPER), "https://old.reddit.com/r/girlsfrontline/comments/18rdlor/gfl_crash_on_launch/kf2dde4/")}`,
            "Downgrading Android 12/14 to Android 11/13.", //https://old.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i1y59kl/
            "Switch battery usage to unrestricted.", // https://old.reddit.com/r/girlsfrontline/comments/18ggxcs/weekly_commanders_lounge_december_12_2023/kdz3dxq/
        )}`,
        tags: [dtag.TECH, dtag.ANDROID]
    },  // What if Android 13/14? https://old.reddit.com/r/girlsfrontline/comments/18r36mw/weekly_commanders_lounge_december_26_2023/kf0884y/
    {
        id: '00451',
        question: `When a major event gets added to campaign mode, do I still need to do it again from the start?`,
        answer: `All progress from its original run is kept, special circumstances notwithstanding.`,
        tags: [dtag.MAJOR, dtag.CAMPAIGN]
    },
    {
        id: '00452',
        question: `Is there a way to extract images fromt the game?`,
        answer: `${link("GFAlarm route.", "https://www.reddit.com/r/girlsfrontline/comments/152s1st/weekly_commanders_lounge_july_18_2023/jtafnpx/")}`,
        tags: [dtag.MISC]
    },
    {
        id: '00453',
        question: `How do I strengthen fairies?`,
        answer: `${List.unordered(
            "Leveling up, primarily by CRs",
            "Good talents, usually Fervor/Damage 2",
            "Enhancements, by feeding duplicate/extra fairies"
        )}`,
        tags: [dtag.FAIRY, dtag.LEVEL]
    },
    {
        id: '00454',
        question: `Which furnitures have associated BGM with them?`,
        answer: `${link("Comment link.", "https://www.reddit.com/r/girlsfrontline/comments/152s1st/weekly_commanders_lounge_july_18_2023/jsopd26/")}`,
        tags: [dtag.DORM, dtag.FURN]
    },
    {
        id: '00455',
        question: `What are the changes for each client update?`,
        answer: `${link("3.0", "https://gamepress.gg/girlsfrontline/v301-client-update-new-features-2022")}`,
        tags: [dtag.MISC]
    },
    {
        id: '00456',
        question: `Where can I get this particular fairy?`,
        answer: `${table(
            ["Fairies", "Where to get"],
            ["Warrior Fairy", "Fairy Production"],
            ["Fury Fairy", "Fairy Production"],
            ["Armor Fairy", "Fairy Production"],
            ["Shield Fairy", "Fairy Production"],
            ["Defense Fairy", "Fairy Production"],
            ["Taunt Fairy", "Fairy Production"],
            ["Sniper Fairy", "Fairy Production"],
            ["Artillery Fairy", "Fairy Production"],
            ["Airstrike Fairy", "Fairy Production"],
            ["Reinforcement Fairy", "Fairy Production"],
            ["Parachute Fairy", "Fairy Production"],
            ["Landmine Fairy", "Fairy Production"],
            ["Rocket Fairy", "Fairy Production"],
            ["Construction Fairy", "Fairy Production"],
            ["Command Fairy", "Fairy Production"],
            ["Rescue Fairy", "Fairy Production"],
            ["Illumination Fairy", "Fairy Production"],
            ["Golden Fairy", "Deep Dive Ranking"],
            ["Cooking Fairy", "Singularity Ranking"],
            ["Fireworks Fairy", "Continuum Turbulence Ranking"],
            ["Zodiac Fairy", "Isomer Ranking"],
            ["Beach Fairy", "Shattered Connexions Ranking"],
            ["Combo Fairy", "Fairy Production"],
            ["Barrier Fairy", "Fairy Production"],
            ["Twin Fairy", "Fairy Production"],
            ["Prototype Fairy", "Event Rewards/Shop"],
            ["Auspicious Fairy", "Polarized Light Ranking"],
            ["Sand Dancer Fairy", "Dual Randomness Ranking"],
            ["Cheerleader Fairy", "Mirror Stage Ranking"],
            ["Witch Fairy", "Poincare Recurrence Ranking"],
            ["Trap Fairy", "Fixed Point Ranking"],
            ["Peace Fairy", "Longitudinal Strain Ranking"],
        )}<br>
        For ranking reward fairies, they will only be available again once their corresponding ranking map reruns.`,
        tags: [dtag.FAIRY, dtag.GET]
    },
    {
        id: '00457',
        question: `Should I save my T-Doll Contracts?`,
        answer: `Yes, due to the existence of ${getID("rate-ups", "00032")}. But if you're very new, pull some dolls to solidify your armory.`,
        tags: [dtag.ITEM, dtag.TDOLL, dtag.PROD]
    },
    {
        id: '00458',
        question: `What doew the Frontline Protocol battlepass give?`,
        answer: `${List.unordered(
            "Battlepass Skin",
            "Animated Icon Frame",
            "Resources",
            "Extra Weekly Quest"
        )}`,
        tags: [dtag.BP, dtag.TDOLL, dtag.SKIN, dtag.ITEM, dtag.QUEST]
    },
    {
        id: '00459',
        question: `Where can I get special equipments?`,
        answer: `${link("Linked in the compilations page.", "https://xxx-yyy-xxx.github.io/GFL/docs")}`,
        tags: [dtag.EQUIP, dtag.SPEQ, dtag.GET]
    },
    {
        id: '00460',
        question: `Should I level up my dolls' skills to 10?`,
        answer: `Yes? Why would you not?<br>
        If you're talking about NEED, depends on where you plan to use said doll. Some of them don't NEED them as much as the others.<br>
        ${link("BigStupidJellyfish analysis.", "https://big-stupid-jellyfish.github.io/GFMath/pages/skill-levels")}`,
        tags: [dtag.TDOLL, dtag.SKILL]
    },
    {
        id: '00461',
        question: `Where can I get echoes in Exploration/Expedition/Forward Basecamp?`,
        answer: `Touch the large monitor where you can see dolls running/moving.`,
        tags: [dtag.QUEST, dtag.EXPED]
    },  //@Visual
    {
        id: '00128',
        question: `How do I stop my Kord/CMS/Dorothy from cycling through their skills?`,
        answer: `Go to their Armory status page, tap the Forced Manual at the top-right of their skill to on/orange. Enjoy.<br>
        ${link("Other dolls recommended to be put on force manual.", "https://gamepress.gg/girlsfrontline/list-forced-manual-dolls")}`,
        tags: [dtag.TDOLL, dtag.SKILL]
    },  //@Visual
    {
        id: '00462',
        question: `How do I unlock Chapter 4 of Continuum Turbulence?`,
        answer: `By completing all nodes and paths, including bad ends.`,
        tags: [dtag.CAMPAIGN]
    },
    {
        id: '00463',
        question: `Which equipment goes to which slot?`,
        answer: `${List.description({
            "Accessory": [
                "Sniper Optics",
                "Red Dot",
                "Holosight",
                "RMR",
                "Suppressor",
                "NV Laser - Reduces user's night vision penalty",
                "Tactical Light"
            ],
            "Ammunition": [
                "High-Velocity",
                "Hollow Point",
                "Flare",
                "Armor-Piercing",
                "Sniper Ammo",
                "SLAP",
                "Slug",
                "Buckshot",
                "Flash",
                "Birdshot"
            ],
            "Body": [
                "T-Exo",
                "X-Exo",
                "#2 Chip",
                "Focus Chip",
                "Cape",
                "Rangefinder",
                "Ammo Box",
                "Bipod",
                "Body Armor"
            ]
        })}`,
        tags: [dtag.EQUIP, dtag.NEWB]
    },
    {
        id: '00187',
        question: `Is there a rerun for special equipments?`,
        answer: `For login SPEQs, wait for them in the Gray Zone. For ranking SPEQS, wait for ranking reruns/permanent rankings.`,
        tags: [dtag.EQUIP, dtag.SPEQ, dtag.GET, dtag.RANK]
    },
    {
        id: '00496',
        question: `Do Echelon Limits, Doll Storage, and the likes have dicounts?`,
        answer: `First purchase only.`,
        tags: [dtag.SHOP, dtag.GEMS]
    },
    {
        id: '00465',
        question: `How to read the story again? It's not available in the story playback in Index.`,
        answer: `Settings>Game>Story Playback then play the stage again. Or just Youtube it. Or cutscene interpreter. This also applies to nodes with story/cutscene snippets.`,
        tags: [dtag.LORE]
    },  //@ Visual
    {
        id: '00466',
        question: `Where can I get oath certificates?`,
        answer: `Newbie career quest (1), battlepass (?), shop.`,
        tags: [dtag.OATH, dtag.ITEM, dtag.GET, dtag.QUEST, dtag.BP, dtag.SHOP]
    },
    {
        id: '00467',
        question: `Why can't I read the Griffin Stories/Bookshelf of Memories?`,
        answer: `2 things. Either you haven't redeemed your points from the STAR tab, or you lack one of the dolls.`,
        tags: [dtag.LORE, dtag.SIDE]
    },
    {
        id: '00468',
        question: `What's the blurb for the Listening Post?`,
        answer: `${link("u/UnironicWeeaboo's reply.", "https://www.reddit.com/r/girlsfrontline/comments/t42t86/weekly_commanders_lounge_march_01_2022/hz2dti3/")}`,
        tags: [dtag.MISC]
    },
    {
        id: '00469',
        question: `Can I get the ringleader after the banner changes?`,
        answer: `By reruns or by PA shop.`,
        tags: [dtag.PA, dtag.COALITION]
    },
    {
        id: '00470',
        question: `Are units with Flare skill and the like useful?`,
        answer: `${link("BigStupidJellyfish's write-up.", "https://big-stupid-jellyfish.github.io/GFMath/pages/rf-nvg")}`,
        tags: [dtag.TDOLL, dtag.SKILL]
    },
    {
        id: '00471',
        question: `How to tank/mech/mobile armor?`,
        answer: `${link("UnironicWeeaboo response.", "https://www.reddit.com/r/girlsfrontline/comments/17f7kla/weekly_commanders_lounge_october_24_2023/k6e6ja1/")}<br>
        Very WIP and will prioritize EN guides once this drops.`,
        tags: [dtag.MISC]
    },
    {
        id: '00472',
        question: `How do I reset my dorm message?`,
        answer: `Type ${TextStyle.style("<>", TextStyle.CODE)}.`, //https://www.reddit.com/r/girlsfrontline/comments/17f7kla/weekly_commanders_lounge_october_24_2023/k6elqov/
        tags: [dtag.DORM]
    },
    {
        id: '00473',
        question: `How do I use the Landmine Fairy?`,
        answer: `Stand on a node. Lay it down on an adjacent empty node. It activates the moment an enemy steps on it. Don't retreat the mine layer or you'll lose the mine.`,
        tags: [dtag.FAIRY, dtag.SKILL]
    },
    {
        id: '00474',
        question: `Why are the guns' names excluding their manufacturer names?`,
        answer: `${MBD.twitter("GirlsFrontlineE", "1001058278728548354")}`,
        tags: [dtag.MISC]
    },
    {
        id: '00475',
        question: `Where can I get the limited drop/equipment in a particular map?`,
        answer: `${img("../assets/images/query/CombatSummary.png", "Tap on the Combat Summary button")}<br>
        ${img("../assets/images/query/MapRewards.png", "Rewards tab then tap on your desired drop")}<br>
        ${img("../assets/images/query/RewardLocations.png", "Look for glowing enemies and defeat them")}<br>
        You can also S Rank the map for an additional chance.`,
        tags: [dtag.BATTLE, dtag.GET, dtag.TDOLL, dtag.EQUIP]
    },
    {
        id: '00476',
        question: `What's the best way to farm a map drop doll/equipment?`,
        answer: `${List.description({
            "Resource efficiency": ["What formation and least amount of dolls that would be able to minimize damage while being able to clear fights."],
            "Time efficiency": ["Routes that take the least amount of turns. If S-ranking the map requires effort, then don't."],
            "Drop efficiency": ["All fights should be able to drop the farmable doll as much as possible. Take as little non-drop fights or as many drop chances per run."]
        })}<br>
        Note that these are just base guidelines and not a rule. Or just copy from others.`,
        tags: [dtag.GET, dtag.BATTLE, dtag.TDOLL, dtag.EQUIP]
    },
    {
        id: '00478',
        question: `I can't hit the enemies in night missions. What do I do?`,
        answer: `Your accuracy is multiplied by 0.1 so a 100 accuracy which may or may not have a scope equipped will turn to 10. And this is before all skills and buffs are taken into account. Equipe PEQs, or if they can't, use skills with night penalty reduction or flat accuracy boosts.`,
        tags: [dtag.BATTLE]
    },
    {
        id: '00479',
        question: `Where can I repair my damaged dolls?`,
        answer: `Repair button at the main menu. You can also repair them on helipads pre and post-deployment.<br>
        ${TextStyle.style("Do note though that repairing post-deployment cost twice the resources and locks you out of S rank (gold) medals.", TextStyle.BOLD)}`,
        tags: [dtag.SYSMECH]
    },  //@ Visual
    {
        id: '00480',
        question: `How can I get my rewards from participating in community events?`,
        answer: `On Reddit, once the community manager replied to your entry, reply with your IGN and UID.`,  //https://old.reddit.com/r/girlsfrontline/comments/180bxy6/weekly_commanders_lounge_november_21_2023/kaydjpt/
        tags: [dtag.MISC]
    },
    {
        id: '00151',
        question: `Is there a limit to using Friend Echelons?`,
        answer: `20.<br>
        ${img("https://i.imgur.com/7VHlmlN.png", "Counter for supports used, courtesy of u/BigStupidJellyfish_")}<br>
        The counter rises whenever you deploy a support echelon, win or lose, griffin or friend.`,
        tags: [dtag.FRIEND, dtag.ECH]
    },
    {
        id: '00481',
        question: `Is a doll worth farming?`,
        answer: `Worth it if they can only be acquired by running the maps, otherwise just do construction. But hey, you do you.`,
        tags: [dtag.TDOLL, dtag.GET]
    },
    {
        id: '00482',
        question: `My game crashed during Defense Drill and when I try to terminate it after opening the game, it doesn't let me. What do I do?`,
        answer: `Costumer support or wait for maintenance to forcefully boot you out.`,   //https://old.reddit.com/r/girlsfrontline/comments/180bxy6/weekly_commanders_lounge_november_21_2023/kaydu4y/
        tags: [dtag.TECH, dtag.SIMS, dtag.BATTLE]
    },
    {
        id: '00483',
        question: `How do I "share" to get my weekly gems?`,
        answer: `Home screen > commander name at the top left > top right button.<br>
        You don't need to actually share it.`,
        tags: [dtag.GEMS]
    },  //@Visual
    {
        id: '00484',
        question: `Are the push notifications busted?`,
        answer: `Yes. Will only work when the app is running. Will work when the first part of the queue finishes.`,   //https://old.reddit.com/r/girlsfrontline/comments/180bxy6/weekly_commanders_lounge_november_21_2023/ka988nh/
        tags: [dtag.SYSMECH, dtag.ANDROID]
    },
    {
        id: '00485',
        question: `How do I successfully occupy a buff node in Gray Zone?`,
        answer: `After selecting a buff, tap the yellow "Select" button beside it.`,
        tags: [dtag.GZ]
    },  //@Visual
    {
        id: '00486',
        question: `What are Dusty Blueprints for?`,
        answer: `For Mobile Armors${TM}. `,
        tags: [dtag.GZ]
    },
    {
        id: '00487',
        question: `Can I get limited event dolls during rescue events using autobattles?`,
        answer: `"These T-Dolls are obtainable through Auto-Battles as well." Hmm... I wonder. Note however that 1 auto-battle is equivalent to 1 roll for the doll.`,
        tags: [dtag.TDOLL, dtag.AUTO, dtag.GET]
    },  //@Visual
    {
        id: '00488',
        question: `How do I see a detailed version of a doll's stat?`,
        answer: `Formation>Show Equip. The stats are above the equip boxes.`,
        tags: [dtag.TDOLL]
    },  //@Visual
    {
        id: '00489',
        question: `Will the coalition team I set up as a support echelon (with Night Vision equipped) have 2-node vision range when my friends use it?`,
        answer: `No.`,    //https://old.reddit.com/r/girlsfrontline/comments/185qw10/weekly_commanders_lounge_november_28_2023/kbozp93/
        tags: [dtag.COALITION, dtag.EQUIP, dtag.FRIEND, dtag.ECH]
    },
    {
        id: '00490',
        question: `What does total exp in the auto-battle completion mean?`,
        answer: `${link("Reddit reply.", "https://www.reddit.com/r/girlsfrontline/comments/hzark0/weekly_commanders_lounge_july_28_2020/g082rwn/")}`,
        tags: [dtag.LEVEL, dtag.AUTO]
    },
    {
        id: '00491',
        question: `Is there a repository of all dolls currently in the game?`,
        answer: `${List.unordered(
            link("CN Wiki", "http://www.gfwiki.org/w/%E9%A6%96%E9%A1%B5"),
            link("EN Wiki", "https://iopwiki.com/wiki/"),
            link("KR Wiki", "https://gfl.zzzzz.kr/dolls.php?lang=en")
        )}`,
        tags: [dtag.TDOLL]
    },
    {
        id: '00492',
        question: `Are there any event clear guides for this game?`,
        answer: `${link("Serzha's Youtube", "https://www.youtube.com/@Serzha")}<br>
        ${link("Matsuda guide.", "https://gfl.matsuda.tips/blog/")}`,   //https://old.reddit.com/r/girlsfrontline/comments/18b74sm/weekly_commanders_lounge_december_05_2023/kcbkiv9/
        tags: [dtag.MISC]
    },
    {
        id: 493,
        question: `What's the best strategy for Gray Zone?`,
        answer: `${List.unordered(
            "Picking the hardest difficulty you can deal.",
            "Beelining to the boss for points per time."
        )}`,
        tags: [dtag.GZ]
    },
    {
        id: '00494',
        question: `How do I know if a SPEQ gives additional skills?`,
        answer: `If the equipment has an "Enhances Skill" as a stat or if it can only be equipped by a Neurally Upgraded doll.`,
        tags: [dtag.EQUIP, dtag.SPEQ, dtag.GZ, dtag.MOD]
    },
    {
        id: '00495',
        question: `How do you set L2Ds for adjutants?`,
        answer: `Does her costume have one? Is she strictly on a single adjutant slot? Is the L2D toggle in settings on? Is the L2D toggle in adjutant postioning on?`,
        tags: [dtag.SKIN, dtag.ADJUNCT, dtag.TDOLL]
    },
    {
        id: '00497',
        question: `What is corpse dragging?`,
        answer: `${link("Gamepress guide", "https://gamepress.gg/girlsfrontline/corpse-dragging-how-optimize-leveling")}`,
        tags: [dtag.LEVEL, dtag.IMPT]
    },
    {
        id: '00498',
        question: `Do I still need to supply ammo and rations to the echelon with Frugal Mobilization equipped?`,
        answer: `Yes.`,
        tags: [dtag.BATTLE, dtag.COALITION, dtag.EQUIP]
    },
    {
        id: '00499',
        question: `How is the commander evaluation star calculated?`,
        answer: `${figure(Embed.google(["GFL - Commander Skill Evaluation Calculations", "https://docs.google.com/spreadsheets/d/1HYLAx1NDnXIJqloBL9pD1cvuLLiXBD-8kE3aXwaMol8"]), "by u/UnironicWeeaboo")}`,
        tags: [dtag.CMDR]
    },
    {
        id: '00500',
        question: `Is there a way to inventorize my dolls?`,
        answer: `${Embed.google(["GFL Armory Manager Advanced", "https://docs.google.com/spreadsheets/d/1X-ZnlXabFQSk6_nTd94pu6Ww3KqWCc1ABt-gTkJy99s"])}`,    //@Owner
        tags: [dtag['3P'], dtag.TDOLL]
    },
    {
        id: '00501',
        question: `What's the highest commander level?`,
        answer: `370.`,   // https://old.reddit.com/r/girlsfrontline/comments/18lwouj/weekly_commanders_lounge_december_19_2023/kex2o7k/
        tags: [dtag.CMDR]
    },
    {
        id: '00502',
        question: `Which dolls should I get for the newbie anchored construction?`,
        answer: `${List.unordered(
            "Carcano M91/38 for her disgusting multiplier.",
            "Suomi for her busted Neural Upgrade."  // https://old.reddit.com/r/girlsfrontline/comments/18lwouj/weekly_commanders_lounge_december_19_2023/ke5rt4z/
        )}`,
        tags: [dtag.PROD, dtag.TDOLL, dtag.NEWB]
    },
    {
        id: 265,
        question: `What's the best comp for ASVAL MOD?`,
        answer: `For starters, Python for constant damage buff, Nagant Revolver MOD or Fervor Talent for 0th second damage buff, STAR for night self-buff crit, UMP45 for tiles, and whoever else.<br>
        ${figure(Embed.google(["As Val Mod Skill Coverage", "https://docs.google.com/spreadsheets/d/1N6nSGRSXCWSM_x8tipzg80E327VDIlFLgC1dVrwvLXk"]), "AS-VAL MOD skill uptime")}`,  //@Owner
        tags: [dtag.TDOLL, dtag.ECH]
    },  // https://www.gflanalysis.com/w/images/thumb/1/1d/Uptime.jpg/1788px-Uptime.jpg
    {
        id: 503,
        question: `Why are some of the allid echelons getting a "Depleted Rations/Ammo" warning?`,
        answer: `There are three types of allied/support echelons:
        ${List.ordered(
            "Friend/Support echelons that has three modes.",
            "Allied echelons with unlimited supplies.",
            "Allied echelons with limited supplies."
        )}`,
        tags: [dtag.ECH, dtag.MAP]
    },
    {
        id: 504,
        question: `How do I use Google as a payment service?`,
        answer: `${link("u/headphone_question's write-up.", "https://old.reddit.com/r/girlsfrontline/comments/15f5xi4/weekly_commanders_lounge_august_01_2023/juk1l3n/")}`,
        tags: [dtag.ANDROID]
    },
    {
        id: 505,
        question: `How can I make GFL have a taller interface so I can see more dolls on-screen in the armory?`,
        answer: `By changing screen resolution/aspect ratio.`,
        tags: [dtag.MISC]
    },
    {
        id: 506,
        question: `What's the data for the Luffberry gacha?`,
        answer: `${link("u/UnironicWeeaboo's report.", "https://old.reddit.com/r/girlsfrontline/comments/x74mpx/weekly_commanders_lounge_september_06_2022/ingul31/")}`,
        tags: [dtag.OJ]
    },
    {
        id: 507,
        question: `What happens to the SPEQs from the previous Gray Zone season?`,
        answer: `Retained.`,
        tags: [dtag.SPEQ, dtag.GZ]
    },
    {
        id: 508,
        question: `Where can I see the items' descriptions/blurbs?`,
        answer: `${link("randomqwerty's github repository.", "https://github.com/randomqwerty/GFLData/find/main")}`,
        tags: [dtag.MISC]
    },
    {
        id: 509,
        question: `Game is not available in my Play Store. How can I play this game?`,
        answer: `QooApp or Apkpure.`,
        tags: [dtag.MISC]
    },
    // {
    //     id: 0,
    //     question: ``,
    //     answer: ``,
    //     tags: []
    // },
];

for (const CARD of CARDS.filter(x => typeof x.id === "string")) CARD.id = Number(CARD.id)
window.cards = CARDS

// (function() {
//     const INDICES = Object.keys(cardData).map(Number);
//     /** @type {Set<number>} */ const DUPLICATES = new Set();

//     for (const ID of cardData.map(({id}) => Number(id)))
//         if (!INDICES.remove(ID))
//             DUPLICATES.add(ID)

//     console.log("Skipped:", INDICES);
//     console.log("Duplicate:", Array.from(DUPLICATES));
// })()

// https://old.reddit.com/r/girlsfrontline/comments/uc7eet/weekly_commanders_lounge_april_26_2022/i6mqo74/
// https://old.reddit.com/r/girlsfrontline/comments/1929lxq/weekly_commanders_lounge_january_09_2024/khy62ha/
// https://old.reddit.com/r/girlsfrontline/comments/1929lxq/weekly_commanders_lounge_january_09_2024/khmieoe/
// https://old.reddit.com/r/girlsfrontline/comments/18r4oht/slow_shock_event_megathread/kgfv3bn/
// https://old.reddit.com/r/girlsfrontline/comments/18r4oht/slow_shock_event_megathread/kgpxdz7/

// https://old.reddit.com/r/girlsfrontline/comments/1ak4q03/weekly_commanders_lounge_february_06_2024/
// https://old.reddit.com/r/girlsfrontline/comments/1apobjn/weekly_commanders_lounge_february_13_2024/