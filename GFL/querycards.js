import {spoilerSummary, image, table, link} from '../univasset/scripts/htmlfunctions/htmlfunctions.js';
import TextStyle from '../univasset/scripts/htmlfunctions/textstyle.js';
import Embed from '../univasset/scripts/htmlfunctions/linkembed.js';
import List from '../univasset/scripts/htmlfunctions/lists.js'

//#region Special Characters
const lessEqual = '≤';
const star = '★';
const tm = '™️';
//🍰
//#endregion

/** @param {string} text 
 * @param {string[]} ID */
function getID(text, ...ID) {
    return `<a href="https://xxx-yyy-xxx.github.io/GFL/?id=${ID.join('+')}">${text}</a>`
}

export const dTag = {
    //#region Combat Tabs
        //STORY : 'StoryEvents',          //For questions that apply to Major, Collab, and Seasonal Events.
            MAJOR : {name: 'MajorEvents', description: 'Main story. Added to Campaign after a while.'},
            SEASON : {name: 'SeasonalEvents', description: 'Happens every New Year, X-mas, Halloween, etc.'},
            COLLAB : {name: 'Collaboration', description: 'Reason: "He liked it."'},
        MAIN : {name: 'CombatMissions', description: 'Main missions aka Chapters 0-13.'},
            AUTO : {name: 'AutoBattles', description: 'Lazy farming.'},
        LOGI : {name: 'Logistics', description: 'Main source of MARP and tickets.'},
        SIMS : {name: 'CombatSimulations', description: 'Place to get upgrade materials.'},
        CAMPAIGN : {name: 'CampaignMissions', description: 'Permanent Major Events.'},
        THEATER : {name: 'Theater', description: 'Backstab central.'},
    //#endregion
    //#region Armory Tabs
        TDOLL : {name: 'TacticalDolls', description: 'Anything T-Doll related. Use as secondary tag.'},
            LEDOLL : {name: 'CycleDropDolls', description: 'Reward dolls that now wander the rerun hell.'},
        COALITION : {name: 'CoalitionUnits', description: 'PA counterpart of Tactical Dolls.'},
        EQUIP : {name: 'Equipments', description: 'Gun attachments, FST chips, PA chips.'},
            SPEQ : {name: 'SpecialEquipments', description: 'Equipments specific to a doll.'},
        ITEM : {name: 'ConsumableItems', description: 'Tickets, cores, gems, batteries, shop items...'},
            TCM : {name: 'TrueCoreMask', description: `Used to redeem 5${star} prod dolls.`},
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
    GEMS : {name: 'Gems', description: 'Kalina demands you spend these on her.'},
    ADJUNCT : {name: 'Adjutants', description: 'T-Doll secretary.'},
    MINI : {name: 'MiniEvents', description: 'Keycard Events, Point Events, etc.'},
    BP : {name: 'Battlepass', description: 'Frontline Protocol.'},
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
    LORE : {name: 'Story/Lore', description: 'Main meat of the series.'},
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
    LEVEL : {name: 'Leveling', description: 'Mostly Corpse Drag.'},
    PET : {name: 'Pets', description: 'Little critters.'},
    OJ : {name: 'LuffberryChess', description: 'PVP sidegame.'},
    CE : {name: 'CombatEffectiveness', description: 'Clutch metric.'},
    KALINA : {name: 'Kalina', description: 'Overworked logistics officer.'},
};

export const cardData = [
    //#region Topic Primers
    {
        id : '00000',
        questions : `I can't access/press/see things, what do I do?`,
        answers : `Have you tried restarting your application? This should be the default response to everything.`,
        tags : [dTag.TECH, dTag.PRIME, dTag.IMPT]
    },
    {
        id : '00001',
        questions : `How do I level my girls?`,
        answers : `First is grinding them on leveling maps, mainly through ${spoilerSummary('corpse dragging', 
            `Also called Poor Run or Beggar Run, it is a method of leveling dolls (and fairy) using minimal resources. This is done by only supplying a single doll echelon then placing them in a non-supplied echelon composed of dolls you want to level.<br>
            ${getID('Draggable stages.', '00026')}`)}.<br>
        Second is using ${spoilerSummary('Combat Reports (CR)', List.unordered(
            'Acquired through Forward Basecamp, Data Room, the shop during events, EXP Sim, or as a reward.',
            `Can be gifted by going to the ${spoilerSummary('Dorm Gifts screen', image('./assets/images/SkinLocation.png', 'Dorms > Warehouse > Gifts'))} or going to your owned doll's profile and tapping the + button by the EXP bar.`,
            'Gives 3000 fixed EXP per report, unaffected by dummy link EXP multiplier.',
            'Gives 6000 fixed EXP per report only when used on oathed+modded dolls.'))}.<br>
        Third is by running them through Auto-Battles.`,
        tags : [dTag.TDOLL, dTag.LEVEL, dTag.PRIME, dTag.NEWB]
    },  //Privated - vqvPpO1vKqw, @Visual
    {
        id : '00002',
        questions : `What is Combat Effectiveness?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/ce')}<br>
        ${link("u/elgatoroid's CE calculation.", 'https://old.reddit.com/r/girlsfrontline/comments/kqtpcv/weekly_commanders_lounge_january_05_2021/gifxq8v/')}`,
        tags : [dTag.CE, dTag.PRIME]
    },
    {
        id : '00003',
        questions : `What is Expedition/Forward Basecamp?`,
        answers : `${link('Gamepress Detailed Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-basecamp-and-exploration')}<br>
        ${link('GFC Primer.', 'https://www.gflcorner.com/expedition-system-mini-guide/')}<br>
        ${link('ATM Guide.', 'https://gfl.matsuda.tips/post/weareabsolutenotlostiswear')}<br>
        Important note is that FB unlocks at Commander Lv. 20.`,
        tags : [dTag.EXPED, dTag.PRIME, dTag.NEWB]
    },
    {
        id : '00004',
        questions : `Are there any general guides for Protocol Assimilation/Coalition Units/SF Capture Operation?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/ironbloodedairconditioning')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Protocol_Assimilation')}<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-first-impressions-revamped')}<br>
        ${spoilerSummary("Cleista's basic Twitter guide.", Embed.twitter('CleistaCeleste', '1409824210571214849'))}`,
        tags : [dTag.PA, dTag.PRIME]
    },
    {
        id : '00005',
        questions : `How do Neural Upgrades/MODs work?`,
        answers : `The only way to raise dolls beyond Lv. 100.<br>
        ${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-neural-upgrade')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/modding')}<br>
        ${link('GFC guide.', 'https://www.gflcorner.com/neural')}`,
        tags : [dTag.MOD, dTag.PRIME]
    },
    {
        id : '00006',
        questions : `What are Fairies?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/fairies')}<br>
        ${link('IOPWiki guide.', 'https://iopwiki.com/wiki/Technical_Fairies')} Unupdated rework skills.<br>
        ${link('GFC guide Part 1.', 'https://www.gflcorner.com/fairy/')} Fairies up to CT only.<br>
        ${spoilerSummary('GFC guide Part 2.', Embed.google(Embed.G_EXCEL, '1x6_YysDi0h89jKE9vEW2_fbxi7gG7XV5jjJqX8O41rw'))} Unupdated fairy list.<br>
        ${spoilerSummary('Jesse #6406 doc.', Embed.google(Embed.G_WORD, '1dXZkOmAR0SWqL7UKCxmTP2hUPjpoRhskbJHn1ZlpNWc'))}`,
        tags : [dTag.FAIRY, dTag.PRIME]
    },
    {
        id : '00007',
        questions : `How to HOC?`,
        answers : `${link('Gamepress Guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-hoc-combat-basics')}<br>
        ${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Heavy_Ordnance_Corps')}<br>
        ${link('Matsuda Guide.', 'https://gfl.matsuda.tips/post/hocs')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/hoc-guide-by-gfc/')}<br>
        ${link("u/Xealiouth's Guide.", 'https://redd.it/95nrou')}`,
        tags : [dTag.HOC, dTag.PRIME]
    },  //Privated - rsFyXRDAi6I
    {
        id : '00008',
        questions : `How to do Theater/Theatre?`,
        answers : `${link('IOPWiki Guide.', 'https://iopwiki.com/wiki/Theater_Mode')}<br>
        ${link('GFC Guide.', 'https://www.gflcorner.com/theater-system-introduction-by-gfc/')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/rng_backstabbing')}<br>
        ${link('Gamepress Guide Part 1.', 'https://gamepress.gg/girlsfrontline/theater-8-overhaul-guide-new-mechanics-new-enemies-same-pain')} The latest theater version.<br>
        ${link('Gamepress Guide Part 2.', 'https://gamepress.gg/girlsfrontline/theater-8-combat-guide')}<br>
        ${spoilerSummary('Theater for dummies.', image('https://cdn.discordapp.com/attachments/372235987520323596/881427651070410792/theaterguide.png'))}<br>
        TLDR is 5-6 Defense Drills in a row, twice per day, with differing battle effects. Do scouting bets where you pick one zone. Dump points on construction for easier battles.<br>
        Echelon formations are now 1 team + backups.`,
        tags : [dTag.THEATER, dTag.PRIME]
    },
    {
        id : '00009',
        questions : `What's a True Core Mask and how do I use it?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/true-core-mask-revamped-who-get')}`,
        tags : [dTag.TCM, dTag.PRIME]
    },
    {
        id : '00010',
        questions : `Are there any sort of guides on how and when to roll for skins?`,
        answers : `${link('BigStupidJellyfish guide.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/gacha')}`,
        tags : [dTag.RESUPPLY, dTag.TDOLL, dTag.SKIN, dTag.PRIME]
    },
    {
        id : '00011',
        questions : `What are auto-battles for?`,
        answers : `Saves your sanity from painful-AF-to-grind-for-drops maps for starters. Useful for getting the map limited dolls you want.`,
        tags : [dTag.AUTO, dTag.PRIME]
    },
    {
        id : '00012',
        questions : `What does Affection do?`,
        answers : `${List.description({
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
        tags : [dTag.LOVE, dTag.PRIME, dTag.OATH, dTag.TDOLL, dTag.COALITION, dTag.KALINA]
    },  //@Clarify - https://old.reddit.com/r/girlsfrontline/comments/w2n556/weekly_commanders_lounge_july_19_2022/igti9c1/
    {
        id : '00098',
        questions : `How does the Rescue Station work?`,
        answers : `${link('DMesse guide.', 'http://dmesse.egloos.com/m/3588696')}`,
        tags : [dTag.PET, dTag.PRIME]
    },
    {
        id : '00013',
        questions : `What is Luffberry Chess?`,
        answers : `GFL version of 100% Orange Juice, I guess?<br>
        And it's called "chess" only because boardgame.<br>
        ${link("u/fortis_99's tips.", 'https://redd.it/rz4uye')}<br>
        ${spoilerSummary("u/StarBase10's doc guide.", Embed.google(Embed.G_WORD, '1BHZ36zTKdQ9gd81a-RAHEzbs9OEgJraSRp5LQv8CB_A'))}`,
        tags : [dTag.OJ, dTag.PRIME]
    },
    //#endregion
    //#region Tier Lists
    {
        id : '00014',
        questions : `Is XXX doll good and is it safe to retire them?`,
        answers : `Tier lists in general are a matter of countering enemies. And since the meta of this game varies wildly from event to event, most people would point to analysis links instead.<br>
        ${link('Matsuda Quips.', 'https://gfl.matsuda.tips/dolls/')}<br>
        ${link('Gamepress Overview.', 'https://gamepress.gg/girlsfrontline/t-dolls-list')}<br>
        ${link('KR Wiki.', 'https://namu.wiki/w/%EC%86%8C%EB%85%80%EC%A0%84%EC%84%A0/%EC%9D%B8%ED%98%95%EB%8F%84%EA%B0%90')}<br>
        ${link("Fatalchapter's bilibili guide.", 'https://www.bilibili.com/read/readlist/rl100361')} Updated up to Jashin dolls.<br>
        ${link("Sijun's list.", 'https://www.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i1rph1l/')} Translated by u/ConductorBichir.<br>
        ${spoilerSummary("u/LuckyTenth's spreadsheet.", Embed.google(Embed.G_EXCEL, '1w2qEbnNluSc6C4U73yyAnYE_zmXdARvDu3GZmMO7hl4'))}<br>
        ${spoilerSummary('BigStupidJellyfish analyses.', List.unordered(
            link('Vallhalla girls.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/valhalla'),
            link('AK-15.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/ak15')))}`,
        tags : [dTag.TDOLL, dTag.TIER]
    },
    {
        id : '00015',
        questions : `Is there a tier list for good PA units?`,
        answers : `${link("u/CheneyQWER's tier list.", 'https://redd.it/uirvxz')}<br>
        ${link('Gamepress units guide.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units')} Use the search bar if a certain PA unit is unavailable in the page.`,
        tags : [dTag.PA, dTag.COALITION, dTag.TIER]
    },
    {
        id : '00016',
        questions : `Who should I prioritize to MOD first?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/neural-upgrade-priority-guide')}<br>
        ${spoilerSummary('CN MOD list.', image('./assets/images/CNMODTier.png'))}`,
        tags : [dTag.MOD, dTag.TIER]
    },
    {
        id : '00017',
        questions : `Is there a tier list for fairies and equipment?`,
        answers : `${image('https://i.imgur.com/2nh8xHs.jpeg', "Sijun's list")}<br>
        For the equipments, top number is the recommended quantity, bottom number is the reserve quantity.<br>
        ${spoilerSummary(`u/UnironicWeeaboo's fairy stat calculator.`, Embed.google(Embed.G_EXCEL, '1RORciafqtspkxy3fqBrFdKIxVfanV2-fLl9FlvY3QtM'))}<br>
        ${spoilerSummary('u/BigStupidJellyfish_ reviews.', List.unordered(
            link('General reviews.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/fairy-reviews'),
            link('Sniper review.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/sniper-rework')
        ))}`,
        tags : [dTag.FAIRY, dTag.EQUIP, dTag.TIER]
    },
    {
        id : '00018',
        questions : `Anyone have a nice infographic for equipment priority and how many to have ideally?`,
        answers : `${image('https://cdn.discordapp.com/attachments/951085201658871820/1063837601351610389/eq_prior_notheater.png', 'Taken from Discord')}`,
        tags : [dTag.EQUIP, dTag.TDOLL, dTag.TIER]
    },  //$eqpriority
    {
        id : '00019',
        questions : `Which HOC FSTs should I raise first?`,
        answers : `${image('https://cdn.discordapp.com/attachments/444348972035866634/971135326150090842/HOC_Priority.png', 'Taken from Discord')}`,
        tags : [dTag.HOC, dTag.FST, dTag.TIER]
    },  //$hocpriority
    {
        id : '00020',
        questions : `Which doll should I get with True Core Masks?`,
        answers : `${image('./assets/images/VeryReliableTCMGuide.png')}<br>
        ${image('./assets/images/SeriousTCMGuide.png')}`,
        tags : [dTag.TCM, dTag.TIER]
    },
    //#endregion
    //#region Compilations
    {
        id : '00021',
        questions : `T-Doll Costumes available now?`,
        answers : `u/ConductorBichir spreadsheets.<br>
        ${spoilerSummary('Costume Banners.', Embed.google(Embed.G_EXCEL, '10ceReDBnWKelZhSN0ztsK6EA2_14Ll8ktcXBHMMs9gQ'))} Includes furniture set and its complete set special effect.<br>
        ${spoilerSummary("Tactical Doll Skins.", Embed.google(Embed.G_EXCEL, '1fEnzlpQk5Jvja5PwzlpDn2ypqP3BHcGftqWWOLnK17E'))} Contains censor comparison for each unit.`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.RESUPPLY, dTag.REF]
    },
    {
        id : '00297',
        questions : `Is there a good place where I can find a spreadsheet on detailed doll stats?`,
        answers : `${link("u/UnironicWeeaboo's repository.", 'https://randomqwerty.github.io/?server=ch&file=gun')}<br>
        ${link('GFLDB.', 'https://gfl.zzzzz.kr/dolls.php?lang=en')}<br>
        ${link('GFWiki CN.', 'https://gfwiki.org/w/%E6%88%98%E6%9C%AF%E4%BA%BA%E5%BD%A2%E5%9B%BE%E9%89%B4')}`,
        tags : [dTag.TDOLL, dTag.REF]
    },  //Wait for additional repo.
    {
        id : '00022',
        questions : `Which dolls have a MOD in the older servers?`,
        answers : `u/ConductorBichir's list. Includes all Special Equipments.<br>
        ${Embed.google(Embed.G_EXCEL, '1u2sXat4FD7jFLdjMLrq5zIiDrGJMEVaGvB2z2JysxLI')}`,
        tags : [dTag.MOD, dTag.SPEQ, dTag.REF]
    },
    {
        id : '00023',
        questions : `Where can I read the MOD, costume, event stories, and all that?`,
        answers : `${List.description({
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
            'Main Story' : [link("u/RhythmLunatic's GFL Cutscene Interpreter (including collabs)", 'https://gfl.amaryllisworks.pw/'),
                link("Shoul's Story Scenes Playlists", 'https://www.youtube.com/channel/UC_JmwXOfYqOKpGGtc5gcVmw'),
                link("Girls' Frontline Full Story Comprehension Playlist Translated up to Isomer", 'https://youtube.com/playlist?list=PL9y52Flm1yM-tJJoom2zfrWTpaO1mTw8M'),
                link("u/DoctuhD's Girls' Frontline Summary", 'https://docs.google.com/document/d/1oA07O2HGwvmoBqm-UKTTuSdxjLnSIbRHd5b2FuYOph0')]
        })}`,
        tags : [dTag.LORE, dTag.MAJOR, dTag.COLLAB, dTag.REF]
    },  //DoctuhD - https://docs.google.com/document/d/1yn0sjoktIb2f-KC6bxn3R0qpCUChBPpIQuERcLmBHbg
    //#endregion
    //#region Important Details
    {
        id : '00024',
        questions : `Where and how can I get my favorite gun/doll/unit/character?`,
        answers : `${List.description({
            'Factory Production' : [spoilerSummary('Gamepress infographic for resource efficient recipes.', image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/2020-01/rateup-crafting-infographic.jpg'))],
            'Rescue Drops' : [
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
                link(`Farmable dolls in campaign maps, both 3${star} monthly reward dolls and those that debuted on this event.`, 'https://big-stupid-jellyfish.github.io/GFMath/pages/campaign-rewards'),
                `During collabs, major events, side events, and ${spoilerSummary('Rescue Events', `Also known as Boss Bully, where you get to farm for 4-5${star} event reward dolls in the story chapters 1-6.`)}, event rewards become temporarily available for farming.`,
                'Obtainable from random nodes, however unlikely.',
                'For units that can also be crafted, their drop rates are less than 1%.'],
            'Event Rewards' : [
                link("BigStupidJellyfish's Event/Clear Reward dolls list.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/limited-dolls'),
                'These dolls will become unavailable from major story clear rewards after being added to the campaign tab.'
            ],
            'Shop' : [
                'Applicable to collab dolls using event currency.',
                `5${star} dolls available in Production are the only ones elegible for True Core Masks, bar spaghetti.`
            ],
            'Achievements' : [
                "Type 97s and the AR Team, which are the only ones that can't be bought.",
                'All dolls come preleveled.'
            ]
        })}<br>
        ${spoilerSummary('Dolls EN are missing.', image('https://cdn.discordapp.com/attachments/951085201658871820/1033732620384751636/en_missing_dolls_varz_asked_edition.png'))}`,
        tags : [dTag.TDOLL, dTag.IMPT, dTag.GET, dTag.SPEQ, dTag.PROD]
    },
    {
        id : '00025',
        questions : `How do I strengthen T-Dolls?`,
        answers : `${List.description({
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
        tags : [dTag.TDOLL, dTag.ECH, dTag.LEVEL, dTag.IMPT]
    },
    {
        id : '00026',
        questions : `What are the leveling stages I can corpse drag and how do I run them?`,
        answers : `${List.description({
            'General' : [
                link('Matsuda guide per leveling map.', 'https://gfl.matsuda.tips/post/leveling_guide'),
                link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/optimizing-leveling-introduction'),
                link('GFLCorner guide.', 'https://www.gflcorner.com/efficient-leveling-guide/'),
                link('DMesse guide.', 'http://dmesse.egloos.com/m/3567918')
            ],
            '0-2' : [
                spoilerSummary("Ceia's 0-2 drag guide.", Embed.google(Embed.G_WORD, '1PkxJ7ObdGW_cS_qbzAxQ_hoC1SFse3HNYWlnywZfPuo'))
            ],
            '8-1N' : [
                spoilerSummary('Zas drag.', Embed.google(Embed.G_EXCEL, '1VT52c-_m4zTx-OFRPcxE9iFmmJY_AMC7CyJT1B7FLt8'))
            ],
            '13-4' : [
                link('tempkaridc calculator for Vector.', 'https://tempkaridc.github.io/gf/vec'),
                link('xVarz spreadsheet for different draggers.', 'https://docs.google.com/spreadsheets/d/1cuZPF-r1e6TyE4Rj2DNkSEova7Tc-Cczs7RaoAK2vII'),
                spoilerSummary('Infographic.', image('https://cdn.discordapp.com/attachments/564028599682727937/929724568258629642/134.png'))
            ],
            'SC 3-1 EX' : [
                'Good for dragging coalition units.',
                spoilerSummary("Ceia's SC 3-1Ex guide.", Embed.youtube('UdmOZqypu_c')),
                spoilerSummary("Aqua's SC 3-1Ex.", Embed.streamable('0dpjje')),
                spoilerSummary("BigStupidJellyfish's SC 3-1Ex auto-pathing.", image('./assets/images/SC%20Auto-path.png'))
            ],
        })}`,
        tags : [dTag.TDOLL, dTag.COALITION, dTag.LEVEL, dTag.IMPT]
    },
    {
        id : '00027',
        questions : `When should I begin trying to produce fairies/do Heavy Equipment Constructions (HEC)?`,
        answers : `When you have sufficient income for 4 resources and cores. Ideally ASAP since raising one to 5${star} takes a considerable amount of time.`,
        tags : [dTag.FAIRY, dTag.PROD, dTag.IMPT]
    },
    {
        id : '00028',
        questions : `Is there a guide on how to build echelons/team compositions?`,
        answers : `${List.description({
            'Mixed' : [spoilerSummary("CheneyQWER's infographic.", image('./assets/images/EchelonComps.png'))],
            'Coalition Echelons' : [
                link('Reddit flowchart post.', 'https://redd.it/rkvisq'),
                link('Gamepress list of units and build suggestions.', 'https://gamepress.gg/girlsfrontline/protocol-assimilation-units'),
                link('BigStupidJellyfish guide.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/ringleader-echelon')
            ],
            'Tactical Doll Echelons' : [link("u/BigStupidJellyfish_'s Imgur compilation of basic comps.", 'https://imgur.com/a/SHhVaBv')]
        })}<br>
        Shouldn't be a gospel but a good starting point nonetheless.<br>
        ${link('u/UnironicWeeaboo tips.', 'https://old.reddit.com/r/girlsfrontline/comments/vmhs0x/weekly_commanders_lounge_june_28_2022/ie3bw95/')}`,
        tags : [dTag.ECH, dTag.COALITION, dTag.TDOLL, dTag.IMPT]
    },
    {
        id : '00029',
        questions : `What is kiting?`,
        answers : `Kiting, in general, is the method of moving your tanks rightwards to make the enemy aim at them then moving leftwards to make the enemy walk towards you, while your DPS constantly shoots them. This is effective because most enemies have aim time where they do nothing, and range where you have to be in their sights to start aiming. Therefore, lengthening the lifespans of your dolls, especially the tanks.<br>
        This is the reason why putting your whole team at the back of the grid is preferable.<br>
        Sometimes called wiggling which in this context means moving your DPS to retarget.<br>
        ${link('GFC guide','https://www.gflcorner.com/battle-controls/')}<br>
        ${spoilerSummary('Mitsu video guide', Embed.youtube('ITUtRuF4TLY'))}<br>
        ${link("u/Reikyu09's reddit post", 'https://redd.it/8o18an')}`,
        tags : [dTag.BATTLE, dTag.IMPT]
    },
    {
        id : '00030',
        questions : `What are Main Tanks and Off Tanks?`,
        answers : `${List.description({'Main Tanks' : ['Guns that have survivability skills (i.e. smoke, eva boost, stun etc.).', 'Generally situated at the middle of the pack.'],
        'Off Tanks' : ['Guns that generally have damage skills (i.e. molotov, grenade, damage boost etc.) and/or a secondary damage soaker in some instances.', 'Situated at either middle-top or middle-bottom.']})}<br>
        All of these usually refer to SMGs.`,
        tags : [dTag.ECH, dTag.IMPT]
    },
    {
        id : '00031',
        questions : `Is fairy leveling for increasing rarity only?`,
        answers : `Mainly yes, but there is a gradual aura boost where a Lv.20 is better than Lv.1 even at 1${star}. And increasing rarity is very important, from increasing the aura stat cap, to making the talent proc more consistently. Not to mention that you can cap them to Lv.100 even as a 1${star} so there's no hurry to raise their rarity.`,
        tags : [dTag.FAIRY, dTag.LEVEL, dTag.IMPT]
    },
    {
        id : '00032',
        questions : `Is there a rate up in this game? If so, how do they work?`,
        answers : `${List.description({
            'Anchored Construction' : [link(`Available for new players ${TextStyle.style('and for veterans not bothering with it', TextStyle.STRIKE)}.`, 'https://gamepress.gg/girlsfrontline/209-client-update-new-features#topic-230681'),
                link('Available on Saturdays and Sundays whenever a new batch of production dolls are released.', 'https://redd.it/szdua2') + ` Recommended anchors are 4${star} due to TCM existing, especially for shotguns.`, 
                "Access it through the doll production screen. If it doesn't appear, try restarting app. It happens when you log-in earlier than the rate up."],
            'Targeted Rate Up' : ['Available when a new skin banner is released.',
                'Rate up dolls are those who are present in the banner.'],
            'General Rate Up' : ['January, May, September.']
        })}<br>
        ${link('Gamepress overview.', 'https://www.gamepress.gg/girlsfrontline/gfl-explained-rate-up')}`,
        tags : [dTag.PROD, dTag.IMPT, dTag.TECH]
    },
    {
        id : '00033',
        questions : `Why are the doll skills not activating?`,
        answers : `Is the auto skill button on? Is it on forced manual? Is it a flare skill?<br>
        Active skills cannot activate when they cannot shoot, i.e. reloading, dolls moving, no enemy in range, no ammo/ration<!--, in-between shot cooldowns-->.<br>
        Passive skills on the other hand will not activate only if they have no ammo or ration. This includes Slug's 3x damage and Flash's -3 damage. Though that there are a handful of exceptions.`,
        tags : [dTag.TDOLL, dTag.SKILL, dTag.IMPT]
    },  //@Visual
    {
        id : '00034',
        questions : `How do I strengthen FSTs?`,
        answers : `${List.unordered(
            'Leveling up mostly by SCR',
            `Raising ${star}s using their central data or general data`,
            'Iterations by data patches (only available at LV100 and 5★)',
            'Enhancements using pills',
            'Skill levels',
            'Tetrimino chips')}`,
        tags : [dTag.FST, dTag.LEVEL, dTag.IMPT]
    },
    //#endregion
    {
        id : '00035',
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `${image('./assets/images/SFEnemy.png', 'Jupiter Cannons count as unarmored machine type')}`,
        tags : [dTag.ENEMY]
    },
    {
        id : '00036',
        questions : `Will there be problems with switching between multiple devices regularly?`,
        answers : `Only if you think that manually logging in every switch is a problem.`,
        tags : [dTag.ACCT]
    },
    {
        id : '00037',
        questions : `Where to go for tech support?`,
        answers : `FB and Twitter is said to be responsive enough. Or you can use ${link('this', 'https://forms.gle/bZNnQeh5sJaD3pim8')} for reporting.`,
        tags : [dTag.TECH, dTag["3P"]]
    },
    {
        id : '00038',
        questions : `Which combat sim is better to focus on?`,
        answers : `Data. Always data.`,
        tags : [dTag.SIMS, dTag.ITEM, dTag.NEWB]
    },
    {
        id : '00039',
        questions : `How do I get more Quick Training Contracts?`,
        answers : `End of daily log-ins, Keycard Event, gem shop.`,
        tags : [dTag.ITEM, dTag.MINI, dTag.SHOP, dTag.GET]
    },
    {
        id : '00040',
        questions : `How do I unlock the next chapter?`,
        answers : `Beat X-6 Normal of the last unlocked chapter again. If it still doesn't appear after that, restart client.`,
        tags : [dTag.MAIN, dTag.TECH]
    },
    {
        id : '00041',
        questions : `Which emulators are good for GFL?`,
        answers : `${List.ordered('Mumu.', 'Memu.', 'LDPlayer.', 'Nox.', 'Bluestacks.')}`,
        tags : [dTag.EMU]
    },
    {
        id : '00042',
        questions : `How can I play GFL if Apple Store doesn't have it?`,
        answers : `Use Android, use emulator, use VPN, use jailbreak.`,
        tags : [dTag.APPLE]
    },
    {
        id : '00043',
        questions : `When is the anniversary?`,
        answers : `May 8 for EN server.`,
        tags : [dTag.ANNIV]
    },
    {
        id : '00044',
        questions : `How do I unlock Chapter 0?`,
        answers : `Beat Chapter 4 Emergency Map 4.`,
        tags : [dTag.MAIN]
    },
    {
        id : '00046',
        questions : `Is there a list of which logistics to do if I want to prioritize certain resources?`,
        answers : `${link('GFC GDoc.', 'https://docs.google.com/spreadsheets/d/1ah2JO6ggWuVaBho9yxgDMC-ucEKA8C42SBkjIlnIcWk')} Up to Chapter 11.<br>
        ${link("u/elgatoroid's calculator.", 'https://gfl-logistics.neko.gg/')} Up to Chapter 11.<br>
        ${link('GFGFork site.', 'https://gfgfork.github.io/gf/main')} Up to Chapter 12.<br>
        ${link('Tempkaridc calculator.', 'https://tempkaridc.github.io/gf/')} Up to Chapter 13.<br>
        ${link("u/tehcavy's spreadsheet.", 'https://docs.google.com/spreadsheets/d/1N-PvxbrZJqg-upImk5uwEmB9GcCrNqjmVgdY00cdvS8')} Up to Chapter 13.`,
        tags : [dTag.LOGI, dTag.MARP, dTag.ITEM]
    },
    {
        id : '00047',
        questions : `Do I still need to use advantaged dolls for Theater?`,
        answers : `Not as much as before. They no longer make or break the CE, though they do get stat boosts, even outside strongholds.<br>
        HG = 20% CDR, SMG/SG = 15% Arm, 50% EVA, AR/RF/MG = 20% FP, 20% ACC.<br>
        The endgame now goes to MODs and oaths.<br>
        The CE you see on each doll when toggling the Boss CE button is the adjusted number, with the advantaged dolls having 20% bonus CE accounted for.`,
        tags : [dTag.TDOLL, dTag.THEATER]
    },
    {
        id : '00048',
        questions : `For limited-time bonuses (i.e. auto-battles, logistics), when are the rewards calculated?`,
        answers : `${List.description({
           'If the runs can be cancelled without penalty, rewards are calculated at the end.' : [
                'The "Use Battery" bingo mission when exp-training HOCs.',
                'Auto-Battles.'],
           "If they can't be cancelled, or is cancellable with a penalty or cost (ie quick tickets), calculated at the start." : [
                'Expedition rewards.',
                'Productions.']
        })}`,
        tags : [dTag.SYSMECH, dTag.MINI, dTag.EXPED, dTag.PROD, dTag.AUTO]
    },
    {
        id : '00049',
        questions : `How does Armor Penetration work?`,
        answers : `${link('Matsuda explanation.', 'https://gfl.matsuda.tips/post/armour')}`,
        tags : [dTag.BATTLE, dTag.SYSMECH]
    },
    {
        id : '00050',
        questions : `Is there a penalty for using HOC charges and Fairy points in Theater battles?`,
        answers : `Nope. Joins boss battle regardless of charges and has no bearing on final score. Go ham.<br>
        Except if you used them and lost that battle, they won't be refunded, even in Electronic Warfare.`,
        tags : [dTag.THEATER, dTag.HOC, dTag.FAIRY]
    },
    {
        id : '00051',
        questions : `Will the current event currency carry over to the next event?`,
        answers : `No can do. Dissolves into nothingness one week after its corresponding event is finished.`,
        tags : [dTag.ITEM, dTag.SEASON, dTag.COLLAB]
    },
    {
        id : '00052',
        questions : `I've heard of GFAlarm. Is it safe to use?`,
        answers : `${link('Gamepress breakdown.', 'https://gamepress.gg/girlsfrontline/how-use-gfalarm-girls-frontline-alarm')} Also useful for getting data of HOc Chips.`,
        tags : [dTag["3P"]]
    },
    {
        id : '00053',
        questions : `Is there any way to reset my battles so I can get a win?`,
        answers : `Turn off WiFi during battle. You can still finish the fight with no connection. Though be wary of connection timeouts so do it near the end.<br>
        If you don't like the result or you lost, exit client, turn on WiFi, re-enter client, take the fight again.<br>
        If satisfied ${TextStyle.style('or saving your sanity', TextStyle.STRIKE)}, turn on WiFi after the battle finished.`,
        tags : [dTag.BATTLE]
    },
    {
        id : '00054',
        questions : `Is there a way to know the map layout and its spawnable enemy units?`,
        answers : `${link('Pengu GFLMaps site.', 'https://pengupengupengu.github.io/gflmaps/')}`,
        tags : [dTag["3P"], dTag.MAP, dTag.ENEMY]
    },
    {
        id : '00055',
        questions : `How can I save the enemy composition for later practice?`,
        answers : `${List.description({
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
        id : '00056',
        questions : `How do I connect to GFAlarm with an emulator?`,
        answers : `Enter the GFAlarm proxy address to ProxyDroid or Drony.<br>
        ${link("u/Signal_Abroad1427's google-fu for Bluestacks.", 'https://www.reddit.com/r/girlsfrontline/comments/umdikk/weekly_commanders_lounge_may_10_2022/i8hj47h/')}`,
        tags : [dTag["3P"], dTag.EMU]
    },
    {
        id : '00057',
        questions : `Is there a list of voodoo recipes and their crafting rates for *insert pennies here*?`,
        answers : `${link('GFDB Github Database.', 'https://gf-db.github.io/')} Freedom of information, just add internet connection.`,
        tags : [dTag.PROD]
    },
    {
        id : '00058',
        questions : `Is there a way for my game to feel smoother?`,
        answers : `${link('Gamepress article.', 'https://gamepress.gg/girlsfrontline/fixing-gfl-client-lag-possible-workarounds')}<br>
        ${link('Decompressed obb.', 'https://www.mediafire.com/file/rxuj9ke35he81lr/main.407.com.sunborn.girlsfrontline.en.obb/file')}<br>
        ${link('DIY decompression.', 'https://www.reddit.com/r/girlsfrontline/comments/lvwwtv/weekly_commanders_lounge_march_02_2021/gpugenl/')}`,
        tags : [dTag.MISC]
    },
    {
        id : '00059',
        questions : `What's the Fire Control Component (FCC) used for and where can I get them?`,
        answers : `Upgrading 5${star} dolls to 6${star} through modding.<br>
        Obtainable through Black Market (2 monthly), major events/campaigns, special log-ins, shop packages<!--battlepass-->`,
        tags : [dTag.ITEM, dTag.MOD, dTag.GET]
    },
    {
        id : '00060',
        questions : `What is Bookshelf of Memories?`,
        answers : `Sidestories for the featured dolls. Rewards ${spoilerSummary('Friend Gossips',
            'Unique dialogues when two paired dolls are in the double adjutant.' +
            List.description({
                'Becoming a Star' : [
                    'P38 + HK45',
                    'P38 + SpectreM4',
                    'P38 + Desert Eagle',
                    'HK45 + SpectreM4',
                    'HK45 + Desert Eagle',
                    'Stechkin + Desert Eagle']})
            )} or ${spoilerSummary('Unity Skills',
            'Additional skill when the paired dolls are in the same echelon.' +
            List.description({
                'Operation Starchaser' : ['Grizzly + PzB29', 'AK-Alfa + M82'],
                'Her Smile' : ['G36 + Springfield'],
                'Default' : ['MPK + MPL']})
            )}. Found in the Data Room.`,
        tags : [dTag.SIDE, dTag.SKILL]
    },
    {
        id : '00061',
        questions : `What is Central Data for?`,
        answers : `Unlocking the corresponding FST, promoting said FST, and used as a Data Patch if 5${star}.`,
        tags : [dTag.ITEM, dTag.HOC, dTag.FST]
    },
    {
        id : '00062',
        questions : `When should I do T-Doll Heavy Production/craft shotguns?`,
        answers : `Preferably during rate ups due to its high costs. Low priority otherwise since it's use at this stage of the game is for getting non-5${star} SGs and them not being widely used.`,
        tags : [dTag.TDOLL, dTag.PROD]
    },
    {
        id : '00063',
        questions : `How do I fill up/unlock enemies in the Enemy Index?`,
        answers : `Just fight them. Win or lose, we get them.`,
        tags : [dTag.ENEMY]
    },
    {
        id : '00064',
        questions : `What best-in-slot (BiS) equipments should I use on my dolls?`,
        answers : `${spoilerSummary('General equipments.', link(image('https://i.imgur.com/tl4MGI8.jpeg'), 'https://big-stupid-jellyfish.github.io/GFMath/pages/newquip'))}<br>
        ${spoilerSummary('#2 Chip equipment.', List.unordered(
            spoilerSummary('BigStupidJellyfish_ doc.', Embed.google(Embed.G_EXCEL, '14xV50MSMBFGgN75E-Gy10WtzACb_KZdpxRKCYQ6FDQA')),
            spoilerSummary('BigStupidJellyfish_ infograph.', link(image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/chips/infographic.png'), 'https://big-stupid-jellyfish.github.io/GFMath/pages/chips')),
            spoilerSummary('mis doc.', Embed.google(Embed.G_EXCEL, '1c0JhaSX9WyL3EB-7RCDE4NrfzR1YuWdYWidQ_06-PrQ'))))}<br>
        ${spoilerSummary('AP thresholds.', image('https://big-stupid-jellyfish.github.io/GFMath/pages/images/newquip/armor-reference.png'))}<br>
        ${link('3.0 equips.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/newerquip')}`,
        tags : [dTag.TDOLL, dTag.EQUIP, dTag.ENEMY]
    },
    {
        id : '00065',
        questions : `How do I maximize the efficiency of my echelon's ROF?`,
        answers : `${link("u/BigStupidJellyfish_'s ROF calc.", 'https://big-stupid-jellyfish.github.io/GFMath/pages/rof-calc')}<br>
        ${spoilerSummary('GFC Spreadsheet.', Embed.google(Embed.G_EXCEL, '1k74SCGGMHtwbl8gmTaETLsa8t12A7dWdj0V1tjdMD4Y'))}`,
        tags : [dTag.TDOLL, dTag.BATTLE, dTag.SYSMECH]
    },
    {
        id : '00066',
        questions : `How do I get some Extra Potential Energy for Coalition Drills?`,
        answers : `Shop.`,
        tags : [dTag.ITEM, dTag.PA, dTag.SIMS, dTag.SHOP, dTag.GET]
    },
    {
        id : '00067',
        questions : `Which dolls should I dupe/duplicate?`,
        answers : `${link('Matsuda notes.', 'https://gfl.matsuda.tips/post/worthwhiledupes')}<br>
        ${link('Gamepress suggestions.', 'https://gamepress.gg/girlsfrontline/t-doll-duping-guide')} Some details may not be applicable.<br>
        ${spoilerSummary('Discord recommendations.', image('https://cdn.discordapp.com/attachments/640157367056728133/1048531902065287188/dupe_gameing_pt3.png'))}`,
        tags : [dTag.TDOLL]
    },  //Jesse, Varz, etc.
    {
        id : '00068',
        questions : `How high is fairy rate up?`,
        answers : `${Embed.google(Embed.G_EXCEL, '1CSC17pKJ8BDDm9YYNB8pFqT8k0Np_jWDeu_1X-qJ7yI')}`,
        tags : [dTag.FAIRY, dTag.PROD]
    },  //Redditor u/ConductorBichir's list IIRC
    {
        id : '00069',
        questions : `What's the drop rate for farmable dolls?`,
        answers : `Limited dolls on Combat Missions aproximately have 0.8% drop rate on normal and 1% on emergency, with 5${star} seemingly have rates way below 1%. Their droprates Chapter 10 onwards are reported to have higher rates. If you do plan to farm a 5${star} doll, just do Productions. You'll get more chances there.<br>
        Event farms have around 1%, which also carries over to their respective campaign missions.<br>
        As for SPEQs, probably 1% too.`,
        tags : [dTag.TDOLL, dTag.MAIN, dTag.SPEQ, dTag.MAJOR, dTag.CAMPAIGN, dTag.SEASON, dTag.COLLAB]
    },
    {
        id : '00070',
        questions : `Do events get a rerun? And if so, when?`,
        answers : `Major events get a permanent rerun called Campaign Missions 6 months minimum after their initial release.<br>
        Seasonal events get one when it's their time.<br>
        Collabs are subject to their holders whims.`,
        tags : [dTag.MAJOR, dTag.CAMPAIGN, dTag.SEASON, dTag.COLLAB]
    },
    {
        id : '00071',
        questions : `How do I remove HOCs from Target Practice?`,
        answers : `Unselect them like how you selected them.`,
        tags : [dTag.SIMS, dTag.HOC]
    },
    {
        id : '00072',
        questions : `How can I save my own voodoo recipe?`,
        answers : `${List.ordered(
            'Craft from production using your own recipe.',
            'Take the item.',
            'Wait for 10 minutes for the voodoo list to refresh.',
            'Look for it.')}`,
        tags : [dTag.PROD]
    },
    {
        id : '00073',
        questions : `How can I resupply a single doll and not the whole echelon?`,
        answers : `${image('./assets/images/OneDollEchelon.png', 'Single-Doll Echelon')}`,
        tags : [dTag.TDOLL, dTag.MAP, dTag.ECH]
    },
    {
        id : '00074',
        questions : `If I MOD my T-Doll, is Level 100 still considered max level?`,
        answers : `Thankfully, this is where common sense wins. In short, ${TextStyle.style('NO', TextStyle.BOLD)}.`,
        tags : [dTag.MOD, dTag.LEVEL]
    },
    {
        id : '00075',
        questions : `I can't get the gold (S Rank) and silver medals in maps because the enemies keep running all over me. How do I get them?`,
        answers : `Not now. Blaze through chapters until 7-6 first to get your account running, then come back to it later when you have at least 2 strong (Lv. 90, 5 links) echelons.`,
        tags : [dTag.NEWB, dTag.MAIN]
    },  // You can get this quickly through Newbie Career Quests. And you can complete the quests faster if you use friend/support echelons.
    {
        id : '00076',
        questions : `Can I transfer my Google Account to a Sunborn one?`,
        answers : `It's a one-way street from there.`,
        tags : [dTag.ACCT]
    },
    {
        id : '00077',
        questions : `Does anyone know how to CE stack using GFAlarm?`,
        answers : `${List.ordered(
            'GFAlarm.',
            'File Save under Settings tab.',
            'Check "Save Theater Optimize Team".',
            'Open GFL under GFAlarm proxy (up to main screen).',
            'Go to the GFAlarm folder.',
            'Info folder.',
            '{Username}_{UID}__theater_optimize_team.csv for current armory.',
            'Use predicted damage instead of combat effectiveness.')}<br>
        This sheet already takes into account advantaged doll bonuses.`,
        tags : [dTag["3P"], dTag.THEATER, dTag.CE]
    },
    {
        id : '00078',
        questions : `How are people just rolling in 5${star} fairies?`,
        answers : `<p>${TextStyle.style('Even dust, when piled up, can become a mountain.', TextStyle.ITALIC)}</p>
        Good logistics upkeep and rolling HECs everyday. Just think of crafting them a side thing that doesn't take a lot of attention.<br>
        For perspective on how long to raise one:<br>
        ${image('./assets/images/FairyRaising.png', 'From u/UnironicWeeaboo')}`,
        tags : [dTag.FAIRY, dTag.PROD]
    },
    {
        id : '00079',
        questions : `How high is a certain doll's pull rate during rate ups?`,
        answers : `Something like Anchored > Targeted > General >>> Normal.`,
        tags : [dTag.TDOLL, dTag.PROD]
    },
    {
        id : '00080',
        questions : `What are the resources I can get from Kalina's Daily Gift?`,
        answers : `${image('./assets/images/DailyGift.png')}<br>
        Gift amount apparently scales with her affection.`,
        tags : [dTag.MARP, dTag.ITEM, dTag.KALINA]
    },
    {
        id : '00081',
        questions : `What is Corpse Whipping?`,
        answers : `The act of overkilling a dummy link by a huge amount. Especially egregious if 2 RFs hit an enemy on its deathbed. This is generally the reason why ROF-based guns are favored against low link-HP enemies.`,
        tags : [dTag.BATTLE]
    },
    {
        id : '00082',
        questions : `What's the gacha rate for costumes?`,
        answers : `${table(['Item',                                                             'Rate'],
        [link('Costumes', 'https://big-stupid-jellyfish.github.io/GFMath/pages/gacha-rates'),   '02.00%'],
        [`5${star} furniture`,                                                                  '08.00%'],
        [`4${star} furniture`,                                                                  '34.20%'],
        [`4${star} gifts/cakes`,                                                                '01.80%'],
        [`3${star} furniture`,                                                                  '54.00%'])}`,
        tags : [dTag.RESUPPLY, dTag.TDOLL, dTag.SKIN, dTag.FURN]
    },
    {
        id : '00083',
        questions : `Why is the PA notification in the home screen always lit up?`,
        answers : `There are available pulls left to burn, particularly Svarog EMPs it seems.`,
        tags : [dTag.PA]
    },
    {
        id : '00084',
        questions : `What are Black Beans/Red Beans?`,
        answers : `Golyat and Golyat+, respectively.`,
        tags : [dTag.ENEMY]
    },
    {
        id : '00085',
        questions : `What is Combat Effectiveness Stacking?`,
        answers : `The process of stacking the useless number as high as possible, battle performance be damned.<br>
        ARSMG = 80k+, RFHG = 40-90k, MGSG = 100k+ average max CE, including maxed dolls, maxed fairies, equips, mods, oaths, and formation bonuses.<br>
        It's main purpose is for Theater Bosses and being on top of the Friend List.`,
        tags : [dTag.CE]
    },
    {
        id : '00086',
        questions : `What does the PA chip Pilfer do?`,
        answers : `Allows players to have a ${spoilerSummary('chance', image('./assets/images/PIlferRNG.png', 'Pilfer subject to RNG'))} of getting ${spoilerSummary('S-Rank drops', Embed.youtube('t6Vu72cajO0') + TextStyle.style('Context: Coalition Medals require S-Rank battles.', TextStyle.QUOTE))} from adjacent enemies without fighting. This uses one bar of ration and ammo.<br> 
        Combine this with the ability to fight on one ammo bar to get two chances on one enemy.`,
        tags : [dTag.COALITION, dTag.EQUIP]
    },
    {
        id : '00087',
        questions : `What does oathing a doll do?`,
        answers : `Additional adjutant line after oath, higher affection cap, double EXP gain (map EXP, auto-battles, CRs) on MODs, complete repair and resupply (one-time only), stat bonuses for damage/evasion/accuracy (because higher affection cap).`,
        tags : [dTag.TDOLL, dTag.OATH, dTag.MOD, dTag.LEVEL, dTag.LOVE]
    },
    {
        id : '00088',
        questions : `How do I get more support echelons?`,
        answers : `Add friends. Post your UID on a GFL community board and someone would ${TextStyle.style('surely', TextStyle.STRIKE)}probably add you.`,
        tags : [dTag.FRIEND, dTag.ECH]
    },
    {
        id : '00089',
        questions : `Which map is best for auto-battles, or just leveling in general?`,
        answers : `Includes EXP per fight and level threshold to EXP penalty.<br>
        ${Embed.google(Embed.G_EXCEL, '1e_1oAa9Qm_tmWqbgFQca8ohzo29qcjctIwyIU9Mc1H0')}`,
        tags : [dTag.AUTO, dTag.TDOLL, dTag.LEVEL]
    },
    {
        id : '00090',
        questions : `Where can I fight Goliath Factories?`,
        answers : `In your dreams. Or maybe a custom enemy ID. Thing is, it's for PA purposes only.`,
        tags : [dTag.ENEMY]
    },
    {
        id : '00091',
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
        id : '00092',
        questions : `I can't beat the current stage. Is this it for me?`,
        answers : `For the triple stages, just fall back to the last boss node you can handle. These nodes can mitigate the "Cleared Stage" penalty so it's worth more than non-boss higher node.<br>
        For Core stage, highest node clearable.`,
        tags : [dTag.THEATER]
    },
    {
        id : '00093',
        questions : `Which facilities/base upgrades should I prioritize for battery expenditures?`,
        answers : `${List.ordered(
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
        tags : [dTag.NEWB, dTag.EXPED, dTag.PA, dTag.HOC, dTag.FAIRY, dTag.PET]
    },  //@Upgrade priority per facility
    {
        id : '00094',
        questions : `Do the purchaseable items in the Expedition Black Market ever change?`,
        answers : `No.`,
        tags : [dTag.EXPED, dTag.SHOP]
    },
    {
        id : '00095',
        questions : `Which dolls should I use for expedition?`,
        answers : `${image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-advantaged-dolls_0.jpg', 'Taken from Gamepress')}<br>
        Dummy links and skill levels are not taken into account.`,
        tags : [dTag.EXPED, dTag.TDOLL]
    },
    {
        id : '00096',
        questions : `Where to use gems?`,
        answers : `${List.ordered(
            'Echelon slots up to 6 minimum, 8 for actually constant (ranking not included) logistics.',
            '5 dorms for batteries, enough to upgrade important facilities. More than that is your call.',
            "Storage slots especially if you're a collector. Or whenever you're getting annoyed with the pop-up.",
            'Your Mileage May Vary (YMMV).')}`,
        tags : [dTag.NEWB, dTag.GEMS]
    },
    {
        id : '00097',
        questions : `Which HOC chips should I use?`,
        answers : `${link('Reddit guide for desktop calc.', 'https://redd.it/fnh1ey')}<br>
        ${spoilerSummary('Google Docs guide.', Embed.google(Embed.G_WORD, '1pR6g-mgsy22_MhRPASL9c1wDoCuxfUwr-DCCMYmb7Ss'))}<br>
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
        id : '00099',
        questions : `Do autobattles give affection?`,
        answers : `A tiny bit.`,
        tags : [dTag.AUTO, dTag.LOVE]
    },
    {
        id : '00100',
        questions : `Do support echelons use equipment?`,
        answers : `Equipments used, formation, and apparently costumes too are saved instances.<br>
        Doll levels, equipment levels, skill levels, and chibis aren't. Meaning supports can be saved then leveled afterwards.`,
        tags : [dTag.FRIEND, dTag.ECH, dTag.EQUIP]
    },
    {
        id : '00101',
        questions : `I wasn't able to clear the event during it's initial runtime. Will I still get the clear rewards when they get added to Campaign?`,
        answers : `${List.unordered(
            'Gutted rewards compared to original.',
            'No True Core Masks (TCM).',
            link('Reward and crate dolls get shuffled to farming lottery.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/limited-dolls')
        )}<br>
        Free shit is free shit though. So skip the current major event's story if you have to and reap the rewards.`,
        tags : [dTag.MARP, dTag.ITEM, dTag.CAMPAIGN, dTag.MAJOR, dTag.LEDOLL, dTag.TCM]
    },
    {
        id : '00102',
        questions : `How do tilescan skills work?`,
        answers : `Real-time scanning of dolls on own tiles when activating their skills. Meaning setup formation can have them with no dolls on top of their tiles and when they activate their skills in battle, whoever are on top of their bufftiles will get the effects of their skill. Note that their bufftiles basically move with them.`,
        tags : [dTag.TDOLL, dTag.SKILL, dTag.IMPT]
    },
    {
        id : '00103',
        questions : `My resources (Manpower, Ammunitions, Rations, Parts) are uncomfortably low? Where can I get some?`,
        answers : `Most efficient and consistent is logistics. Though you can get them through the shop, quest and event/crate rewards, campaign/major story node clears, and random nodes.`,
        tags : [dTag.MARP, dTag.LOGI, dTag.NEWB, dTag.GET]
    },
    {
        id : '00104',
        questions : `How do I get Platinum and Nova Medals?`,
        answers : `From whatever Major/Seasonal/Collab Event running right now. Platinum are for 5${star} dolls and Nova are for dolls 4${star} and below.`,
        tags : [dTag.ITEM, dTag.TDOLL, dTag.MAJOR, dTag.SEASON, dTag.COLLAB, dTag.GET]
    },
    {
        id : '00105',
        questions : `How do I get a higher success rate for logistics?`,
        answers : `${TextStyle.style('floor(mean of doll levels in echelon) * 0.45 + 15', TextStyle.CODE)} for normal logistics and<br>
        ${TextStyle.style('floor(mean of doll levels in echelon) * 0.60 + 30', TextStyle.CODE)} for rate up logistics.`,
        tags : [dTag.LOGI]
    },
    {
        id : '00106',
        questions : `What do they mean by bamboo?`,
        answers : `Bamboos are, in general, rifles with skills like Locked Shot, Steady Shot, Interdiction Shot, and the likes, wherein off cooldown, they have a charge gauge that dictates how powerful the skillshot is on activation. They're usually used to deal massive damage to a target, especially if coupled with FP buffers.`,
        tags : [dTag.TDOLL, dTag.SKILL, dTag.IMPT]
    },
    {
        id : '00107',
        questions : `What are the resources that has a defined max capacity and how much can they store?`,
        answers : `${image('https://cdn.discordapp.com/attachments/410790982116966400/905090370675830884/image0.jpg', 'Train Coin = Training Data | Furniture Coin = Tokens | Memory Pieces = Neural Fragments<br>' + link('Source', 'https://randomqwerty.github.io/?server=en&file=item'))}<br>
        Even then, all resources can be obtained without regards to max capacity through daily gifts, mission rewards, and whaling.<br>
        And no, the four resources will stay at 300k.`,
        tags : [dTag.MARP, dTag.ITEM]
    },
    {
        id : '00108',
        questions : `Is there a way to buy a missed day for daily log-ins?`,
        answers : `No chance.`,
        tags : [dTag.MISC]
    },
    {
        id : '00109',
        questions : `I'm trying to clear the newbie career quests but I haven't gotten the rewards yet. Did I miss something?`,
        answers : `Those quests are not retroactive and should be cleared in sequence. Try clearing them from the top.`,
        tags : [dTag.NEWB]
    },
    {
        id : '00110',
        questions : `What does the Aid Commissions do and how do I get more of them?`,
        answers : `Also known as Svarog/High Altitude EMP Bombing, it pulls from the entire pool where the entire pool is the X in the X/100 units.<br>
        Recommended to pull one at a time since 10-pull is literally 10 1-pulls.<br>
        Acquired from the daily quest's final node, daily log-in, major events, shop (whenever a new banner starts).`,
        tags : [dTag.ITEM, dTag.PA, dTag.GET]
    },
    {
        id : '00111',
        questions : `Recipe for Parachute/Paradrop Fairy?`,
        answers : `${link('The official recipe.', 'https://gf-db.github.io/gfdb/gfdb.html?type=fairy&id=11&epoch.fairy=29.0')}`,
        tags : [dTag.FAIRY, dTag.PROD]
    },
    {
        id : '00112',
        questions : `What does equipment calibration and enhancement do?`,
        answers : `${image('./assets/images/EquipCalibEnhance.png', 'Calibration and enhancement are independent of each other')}
        ${List.description({
            'Equipment Calibration' : [
                "Raises the equipment's base stat.",
                'RNG dictates how many calibration tickets are wasted before maxing.',
                `When it's on its highest calibration, ${image('./assets/images/BlueMAXBox.png', 'inline')} appears on said equipment.`
            ],
            'Equipment Enhancement' : [
                'Multiplies the base stat up to Lv. 10.',
                "Doesn't matter if Equip Enhancement Pills or fodder equips are used, it's merely a matter of resource cost per point raised.",
                'As of 3.0, gets more enhancement points from enhanced fodders.'
            ]
        })}`,
        tags : [dTag.EQUIP, dTag.LEVEL, dTag.NEWB]
    },
    {
        id : '00113',
        questions : `How viable is 2AR2SMG1HG?`,
        answers : `${link('BigStupidJellyfish analysis vs. 3AR2SMG.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/2v3ar')}<br>
        Depends on if there is no good AR-buffing AR for position 4. If there is one, 3AR1SMG1HG is a thing, specially for night maps.`,
        tags : [dTag.TDOLL, dTag.ECH]
    },
    {
        id : '00114',
        questions : `What are all the available pets right now?`,
        answers : `${image('./assets/images/PetSale.png', 'From u/UnironicWeeaboo')}<br>
        If you see a pet that is not on this list, it's a Cafe Story reward, collab pet, or event reward that haven't been added yet to the station.`,
        tags : [dTag.PET]
    },
    {
        id : '00115',
        questions : `How do friend batteries work?`,
        answers : `${List.unordered(
            'Friend batteries recharge at 3am and 3pm UTC-8.',
            'The amount of charges/batteries depend on the number of dorms your friend has.',
            'Use Netlify if you want to know when it resets.',
            'A set number of people can claim one once per cycle.',
            "As the name suggests, it only appears on your friend's dorms, not on any strangers (especially on a Random Visit)."
        )}`,
        tags : [dTag.FRIEND, dTag.ITEM]
    },  //@Clarify
    {
        id : '00116',
        questions : `Is there an optimal recipe guide I could use for my production?`,
        answers : `${link('Applicable Reddit Post.', 'https://redd.it/gfmelo')}<br>
        For the new equips, 150/151/50/50 (with armor), 150/151/10/50 (without armor).`,
        tags : [dTag.PROD]
    },
    {
        id : '00117',
        questions : `Whats the best way of farming affection?`,
        answers : `Being in the leader slot in a battle echelon, being the MVP of a battle echelon, collecting daily hearts in dorms, cakes/lollipops/icecreams, passive regen by being in a dorm, gifting skins.<br>
        ${link('Write-up on what affects affection.', 'https://www.reddit.com/r/girlsfrontline/comments/cgpt7y/weekly_commanders_lounge_july_23_2019/ev0gw64/')}<br>
        ${link('Additional info on dorm affection.', 'https://www.reddit.com/r/girlsfrontline/comments/tjxvpw/weekly_commanders_lounge_march_22_2022/i29h382/')}`,
        tags : [dTag.LOVE]
    },
    {
        id : '00118',
        questions : `As a beginner, is it worth to use batteries for combat reports?`,
        answers : `Probably if surplus EXP is maxed out, otherwise doubt it.`,
        tags : [dTag.NEWB, dTag.ITEM]
    },
    {
        id : '00119',
        questions : `How does Symmetric Infusion work exactly?`,
        answers : `${List.description({
            'Cognitive Infusion' : ['Basically, swaps sizes. Technically, swaps all stats aside from size. If both sides are upgraded, say Lv. 31 and Lv. 23, they become 23 and 31, not 1 and 31+.'], 
            'Golden Infusion' : ['Swaps the golden status between the two units, nothing more, nothing less.']
        })}`,
        tags : [dTag.PA]
    },  //@Visual
    {
        id : '00120',
        questions : `Is the package in the shop worth it?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/energy-packages')}<br>
        For the 7 day new account package: Day 4 to jumpstart skill leveling (saves around 80 days of datasims on a normal day), Day 5 is the most efficient oath package so far, and Day 7 is a really good value for tokens.`,
        tags : [dTag.ITEM, dTag.OATH, dTag.SHOP]
    },
    {
        id : '00121',
        questions : `Can I put 2 L2D skins in the double adjutant slot?`,
        answers : `${TextStyle.style('L2D mode', TextStyle.QUOTE)}<br>
        ${TextStyle.style('Double Adjutant', TextStyle.QUOTE)}<br>
        Pick one.`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.ADJUNCT]
    },
    {
        id : '00122',
        questions : `How do I unlock special effects on commanders like flame auras etc.?`,
        answers : `${List.ordered(
            "Get a complete 5-slot from a set. Doesn't matter if male only or female only.",
            'Get their rare color variants.',
            '???',
            'Profit.'
        )}`,
        tags : [dTag.CMDR, dTag.SKIN]
    },
    {
        id : '00123',
        questions : `Is there a list of doll farming routes for each map?`,
        answers : `${spoilerSummary('Compilation of all farm routes for limited dolls and equipments on both campaign and main story.', Embed.google(Embed.G_WORD, '1GUcA1ZHYVKBhTspdRYPIkECVZRoLFvqDnLrgrFb6VcU'))}<br>
        ${link('Farming routes by RevenantXIII (with Pilfer strats), focusing on events and ranking-relevant campaign dolls.', 'https://rosedrake.github.io/GFL.html')}<br>
        ${spoilerSummary('416 SPEQ Pilfer route.', Embed.youtube('5v6gEqydGm4'))}`,
        tags : [dTag.TDOLL, dTag.GET, dTag.MAIN, dTag.CAMPAIGN, dTag.SPEQ]
    },  //GDoc by u/rcpz93 most likely
    {
        id : '00124',
        questions : `What's the chronological order for the story?`,
        answers : `u/pointblanksniper's observations.<br>
        ${link('Overall.', 'https://www.reddit.com/r/girlsfrontline/comments/sm75vk/where_can_i_see_mirror_stage_story_line/hvvpppk/')}<br>
        ${link('Night Chapters.', 'https://www.reddit.com/r/girlsfrontline/comments/scouvz/questions_regarding_404/hu995o6/')}`,
        tags : [dTag.LORE]
    },  //@Fix, https://www.reddit.com/r/girlsfrontline/comments/sc8jed/weekly_commanders_lounge_january_25_2022/hupfxsr/
    {
        id : '00125',
        questions : `Is it possible to earn previously missed hidden achievements in Campaign Missions?`,
        answers : `Yes.`,
        tags : [dTag.CAMPAIGN]
    },
    {
        id : '00126',
        questions : `If I delete my unused speqs, will I be able to recover them?`,
        answers : `As of 2.09, dismantled/disassembled SPEQs can now be ${spoilerSummary('recovered/retrieved', image('./assets/images/SPEQRecover.png', 'From u/UnironicWeeaboo'))}. Collab SPEQs can be found under the Limited tab.`,
        tags : [dTag.EQUIP, dTag.SPEQ, dTag.COLLAB]
    },
    {
        id : '00127',
        questions : `Is there a way to expand the armory, or am I stuck with 100 doll slots forever?`,
        answers : `${List.unordered( 'Shop>Items>Infrastructure>T-Doll slots +10.', 'Tap the locked echelon button.')}`,
        tags : [dTag.SHOP]
    },
    {
        id : '00128',
        questions : `Should I dummy link my dolls when corpse dragging?`,
        answers : `Recommended. Each link gives an additional 0.5x multiplier.`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        id : '00129',
        questions : `I want to F2PBTW. How do I do that?`,
        answers : `${List.description({
            'Gems' : ['Daily log-ins (300 monthly).', 
                'Sharing in FB/Twitter (30 weekly). You can cancel it at the last minute.',
                'S-Ranking Normal (10) and Emergency (30) Chapters.',
                'Achievements.',
                'Mini-Events, mainly, Keycard Events (Bingo).',
                'Ranking participation.'],
            'Tokens' : ['Dailies (5 x 8) and weeklies (50 x 3/4) (40 for 250 points).',
                'Expedition.',
                'Logistics (~19 weekly).',
                'Achievements.',
                'Mini-Events: Point Event (70), Keycard Event.',
                'Major Event crate rewards.',
                'Shop. Especially when there is a seasonal/collab going on. Packages are also good.',
                'Maintenance (10 weekly) and Apolotokens.']
        })}`,
        tags : [dTag.ITEM, dTag.RESUPPLY, dTag.GET, dTag.GEMS]
    },  //Site down - https://dmesse.egloos.com/m/3594243
    {
        id : '00130',
        questions : `Why aren't my dorm batteries appearing?`,
        answers : `If it's not within 11:00-14:00, 17:00-20:00, and 22:00-01:00 UTC-8, restart app.<br>
        You'll know that it's collection time if the dorm button has a number on top of it (for the facility shortcuts) or Dorm No.1 flashes pink/purple in the BASE button.`,
        tags : [dTag.DORM, dTag.ITEM, dTag.TECH]
    },
    {
        id : '00131',
        questions : `What are Extra Impulses and where can I get them?`,
        answers : `Stockable versions of Electronic Impulses.<br>
        You can get them through daily log-ins, weekly quests, achievements, and events.`,
        tags : [dTag.PA, dTag.ITEM, dTag.GET]
    },
    {
        id : '00132',
        questions : `Read a guide that said to use a team of 2${star} & 3${star} dolls until I get enough cores to spend. Is it still worth doing it now?`,
        answers : `With the advent of Expeditions and Newbie Career Quests, you get enough dummy cores right off the bat. Don't overspend still.`,
        tags : [dTag.ITEM]
    },
    {
        id : '00133',
        questions : `What's the rate up increment for Anchored Construction?`,
        answers : `${table(['Target', 'Estimated Increment'],
        ['4' + star,  '0.396%'],
        ['5' + star,  '0.083%'],
        ['Starter',   '0.19%'])}
        ${link('Base rate shown per doll is more or less their true rates.','https://www.reddit.com/r/girlsfrontline/comments/s6s9xj/weekly_commanders_lounge_january_18_2022/htmbjuc/')}`,
        tags : [dTag.PROD]
    },
    {
        id : '00134',
        questions : `I got an "Illegal Action Detected" warning. What happened?`,
        answers : `Mostly desyncs and having "invalid" inputs. Just restart it.`,
        tags : [dTag.TECH]
    },
    {
        id : '00135',
        questions : `I can't deploy a friend echelon. What do I do?`,
        answers : `${image('./assets/images/InitialDeploySupports.png')}<br>
        Either after operation start, a client restart, or a no due to limit.`,
        tags : [dTag.FRIEND, dTag.ECH, dTag.TECH]
    },
    {
        id : '00136',
        questions : `How do I find Ouroburos in Operation Cube 1-4?`,
        answers : `${link('Oreo Finder.', 'https://kyouko.moe/urouro/#')}`,
        tags : [dTag.CAMPAIGN, dTag.ENEMY, dTag["3P"]]
    },
    {
        id : '00137',
        questions : `Which HOC can destroy buildings?`,
        answers : `All of them. Building damage uses the Pierce stat, which is also used for destroying Force Shields.<br>
        As for which class is best for the job, ATWs.`,
        tags : [dTag.HOC]
    },
    {
        id : '00138',
        questions : `What does "Rescue 5 T-Dolls" mean?`,
        answers : `Getting them as drops.`,
        tags : [dTag.MISC]
    },
    {
        id : '00139',
        questions : `Where can I see doll voicelines?`,
        answers : `Doll Index Page>Top left as speaker. If it's missing, check if you downloaded the voice pack yet. Or just go to IOPWiki. Though some do not have voices yet.`,
        tags : [dTag.TDOLL]
    },  //@Visual
    {
        id : '00140',
        questions : `Is a particular doll already available in the EN server?`,
        answers : `Check Index.`,
        tags : [dTag.TDOLL]
    },
    {
        id : '00141',
        questions : `I'm trying to contact support and one of the infos they need is Account ID. Where can I see it?`,
        answers : `UID that is present in your commander screen or intro card.`,
        tags : [dTag.TECH]
    },
    {
        id : '00142',
        questions : `Where can I get doll/fairy costume art?`,
        answers : `${link('36base Github Repository.', 'https://github.com/36base/girlsfrontline-resources')}`,
        tags : [dTag.MISC]
    },
    {
        id : '00143',
        questions : `Which oath packages are better?`,
        answers : `2.09 Week 1 Package > Double Oath Package (Valentine's, White Day, <!-- Qixi/Tanabata,  -->Christmas), New Year's Package`,
        tags : [dTag.OATH]
    },
    {
        id : '00144',
        questions : `What does "Event" mean on the left side of the mission select screen?`,
        answers : `${List.description({
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
        tags : [dTag.MAIN, dTag.CAMPAIGN, dTag.LOGI, dTag.SIMS]
    },
    {
        id : '00145',
        questions : `Can someone tell me what the difference is between Charge, Destroy, and Defend commands for coalition units?`,
        answers : `Lets melee units ${TextStyle.style('Charge', TextStyle.BOLD)} down the lane.<br>
        Lets melee units approach and ${TextStyle.style('Destroy', TextStyle.BOLD)} the nearest enemy.<br>
        Return and ${TextStyle.style('Defend', TextStyle.BOLD)} their grid position.`,
        tags : [dTag.COALITION, dTag.BATTLE]
    },
    {
        id : '00146',
        questions : `How many Tactical Doll slots can I have?`,
        answers : `Up to 1200 it seems.`,
        tags : [dTag.MISC]
    },  //Condolensces to u/headphone_question's wallet. Previously 1000.
    {
        id : '00147',
        questions : `Why do people use M16 as tank for 0-2 corpse dragging?`,
        answers : `Can use Armor/SPEQ to reduce damage taken to 1, and T-Exo for reducing the number of hits taken.`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        id : '00148',
        questions : `How does a StrawberryPython team work?`,
        answers : `${Embed.google(Embed.G_WORD, '105DXX2AlMB_wX0JpKGjPGsJ_zjsKOz_0bbd5ZshUx_o')}`,
        tags : [dTag.ECH, dTag.TDOLL]
    },
    {
        id : '00149',
        questions : `The client in the Play Store is in a language I can't understand. Is there a way to download other server clients?`,
        answers : `CN - China (Bilibili and DigitalSky)<br>
        TW - Taiwan, Malaysia, Singapore<br>
        JP - Japan<br>
        KR - Korea<br>
        EN - Everywhere else<br>
        As for how to download it, check the sidebar of ${link('this', 'https://www.reddit.com/r/girlsfrontline/')} link under Downloads.`,
        tags : [dTag.MISC]
    },  //@Totally gonna fix
    {
        id : '00150',
        questions : `How do general rate ups work?`,
        answers : `There are 2 sets of rate ups per general rate up.<br>
        First is the HOC rate up, where every 2 days is a specific FST's day for rate up. Note that only that FST's rate is increased within the Central Data pool. The core data rate remains the same.<br>
        Second is the tried amd tested Production rate up. Goes from Normal Doll, Normal Equip, Heavy Doll, Heavy Equip. Pulling chance for all 4${star} and 5${star} are increased. IOP equipment crafts are also affected.`,
        tags : [dTag.PROD, dTag.HOC, dTag.FST, dTag.TDOLL, dTag.EQUIP]
    },  //@Check for errors
    {
        id : '00151',
        questions : `How do I scrap/retire coalition units? I'm lost.`,
        answers : `Factory > Retirement (Disassemble) > Fourth + symbol.`,
        tags : [dTag.COALITION]
    },
    {
        id : '00152',
        questions : `What do advantaged dolls in combat map mean?`,
        answers : `20% FP boost for AR, RF, MG. 20% EVA boost for SMG, HG, SG.`,
        tags : [dTag.MAP, dTag.TDOLL]
    },
    {
        id : '00153',
        questions : `How many Quick Autobattle Tickets does it cost per stage?`,
        answers : `${lessEqual} 1 hour: 1 ticket per run.<br>
        1-2 hours: 2 tickets per run.<br>
        2+ hours: 3 tickets per run.`,
        tags : [dTag.AUTO, dTag.ITEM]
    },
    {
        id : '00154',
        questions : `What happens to the reshuffle/refresh timer when the banner changes?`,
        answers : `Restarts from the top. Meaning refreshing just hours before Ringleader change has the same effect as refreshing 2 days ago.<br>
        Pool refresh doesn't start on banner change until after opening the bombing screen.`,
        tags : [dTag.PA]
    },  //@Test - Check refresh timer after hours of banner change
    {
        id : '00155',
        questions : `Do links matter regarding the amount of resources a coalition unit would take on resupply?`,
        answers : `From a single-link Dinergate to an entire gunner stack, they all take 360 Ammo/Ration.`,
        tags : [dTag.COALITION, dTag.MAP]
    },
    {
        id : '00156',
        questions : `Anyone know what type of equipment "Medals" is?`,
        answers : `For now, placeholder. No equipment of its type exists yet.`,
        tags : [dTag.EQUIP]
    },
    {
        id : '00157',
        questions : `Where can I see the stat previews for PA units?`,
        answers : `${Embed.google(Embed.G_EXCEL, '1TYKbdjuOdOMsvaaIduWW_8FF0tm27BjwKbC4uggl1wE')}`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00158',
        questions : `I haven't seen this icon/card BG before. Where can I get some of it?`,
        answers : `Most likely a Cafe Costume Side Story reward.`,
        tags : [dTag.MISC, dTag.GET]
    },
    {
        id : '00159',
        questions : `I'm in dummy core hell. How do I get some more?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/its_still_not_enough_fuck')}<br>
        ${link('BigStupidJellyfish write-up.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/core-rates')}<br>
        ${link("u/UnironicWeeaboo's easier 11-6.", 'https://www.reddit.com/r/girlsfrontline/comments/u1tr33/weekly_commanders_lounge_april_12_2022/i5178cy/')}<br>
        Run any daytime leveling maps for combined core and exp farming. You can also farm during core rate up by using the handgun recipe.`,
        tags : [dTag.ITEM, dTag.GET]
    },
    {
        id : '00160',
        questions : `Any way to increase commander level really quickly?`,
        answers : `Leveling dolls through leveling maps.`,
        tags : [dTag.CMDR, dTag.LEVEL]
    },  //@Test - exact values per doll leveling
    {
        id : '00161',
        questions : `How do I switch accounts?`,
        answers : `Settings>Manage Accounts>Log out, then on the log-in screen, switch accounts.`,
        tags : [dTag.ACCT]
    },
    {
        id : '00162',
        questions : `What's the use case for 5HGs?`,
        answers : `Good single target burst damage. Quick movespeed. Consumes minimal resources.`,
        tags : [dTag.ECH, dTag.TDOLL]
    },
    {
        id : '00163',
        questions : `What're the rewards for the Defense Drill?`,
        answers : `Unlocks after clearing 2-4N.<br>
        ${link('Matsuda Guide and Line-up, circa 2.08.', 'https://gfl.matsuda.tips/post/defdrill')}<br>
        ${TextStyle.style('2.09 waves', TextStyle.BOLD)}:<br>
        ${spoilerSummary('Discord Leaderboard Comps.', `${image('https://cdn.discordapp.com/attachments/453784246515925003/988812408929804328/unknown.png')}<br>
            ${image('./assets/images/DiscordDefenseDrill.png')}`)}<br>
        ${spoilerSummary('General BLT vid.', Embed.youtube('P-GLrBNvFVs'))}<br>
        ${spoilerSummary('Ceia vid.', Embed.youtube('qgbF2eiIzps'))}<br>
        ${spoilerSummary("CosmicArcher's comfy clear.", Embed.youtube('avKEYzKSp0U'))}`,
        tags : [dTag.SIMS]
    },  //Proper guide under construction
    {
        id : '00164',
        questions : `What would I need when building night ARSMGs?`,
        answers : `AR: Any.<br>
        SMG: Direct-fire SMGs are hard to sell because of low base ACC and night ACC penalty, so molotovs or grenades.<br>
        HG: Used for expanding vision 1 node away. Stacks with Illumination Fairy.<br>
        PEQ: Mainly used by ARs since SMGs are mostly either tank or AoE. 4${star} is a good stopgap.`,
        tags : [dTag.ECH, dTag.TDOLL]
    },
    {
        id : '00165',
        questions : `Which T-Doll would be better to anchor for the rate up?`,
        answers : `On one hand, 4${star} can't be TCM'd. On the other hand, 5${star} have low construction rates. And it also depends on the skills of said dolls.`,
        tags : [dTag.PROD, dTag.TDOLL, dTag.TCM]
    },
    {
        id : '00166',
        questions : `What does each gun class do?`,
        answers : `${table(['Class', 'Roles', 'Target Priority', 'Caveat'],
        ['Assualt Rifle (AR)', 'Anti-Swarm<br>Anti-Boss', 'Frontline', 'Weak to armored enemies'],
        ['Submachine Gun (SMG)', 'Evasion Tank<br>Anti-Swarm', 'Frontline', 'Accuracy is non-existent'],
        ['Rifle (RF)', 'Anti-Armor', 'Backline', 'Weak to swarms<br>Affected by night penalty'],
        ['Handgun (HG)', 'Buffer<br>Debuffer', '???', 'Cannot facetank'],
        ['Machine Gun (MG)', 'Opening Volley', 'Random', 'Reloads/Stops shooting at around 6s<br>Weak to high evasion'],
        ['Shotgun (SG)', 'Armor Tank', 'Frontline', 'Poor evasion'])}`,
        tags : [dTag.TDOLL, dTag.BATTLE, dTag.NEWB]
    },
    {
        id : '00167',
        questions : `What's the time frame for modding dolls?`,
        answers : `From their release until EOS.`,
        tags : [dTag.MOD]
    },
    {
        id : '00168',
        questions : `Will I get the rewards after adding a returning commander as friend for the callback event?`,
        answers : `${image('./assets/images/CallbackSupporter.png')}<br>
        ${image('./assets/images/CallbackReturner.png')}`,
        tags : [dTag.FRIEND, dTag.ITEM, dTag.MARP]
    },
    {
        id : '00169',
        questions : `Are the previous monthly Special Equipments obtainable in some way?`,
        answers : `No word as of now.`,
        tags : [dTag.SPEQ]
    },
    {
        id : '00170',
        questions : `Is there an efficient way of raising a Parachute Fairy?`,
        answers : `${link("markhydroxyl's github notes.", 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_raising_paras.md')}<br>
        ${link('Logistics for HEC crafting.', 'https://github.com/markhydroxyl/GFL-notes/blob/main/tls/nga_hec_logis.md')}<br>
        ${spoilerSummary('Fairy Development Calculator.', Embed.google(Embed.G_EXCEL, '1Zcz6Yp3sduhUXY9jo2HCX4pOdiIQioZcS8v6xMK01Pk'))}`,
        tags : [dTag.FAIRY, dTag.LEVEL]
    },
    {
        id : '00171',
        questions : `Which HOC/FSTs have L2Ds?`,
        answers : `AT4, BGM-71, AGS-30`,
        tags : [dTag.FST]
    },
    {
        id : '00172',
        questions : `Where are the skins? I can't find them.`,
        answers : `${image('./assets/images/SkinLocation.png', 'Dorms > Warehouse > Gifts')}<br>
        You get black cards here by gifting it.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00173',
        questions : `What should I do during a collab?`,
        answers : `Farm event specific currencies (NOT Platinum or Nova medals), get all collab characters, their Special Equipments, and the fairy, grind for the dolls you don't have yet. Combat reports and affection boosters are low on the shop priority list.`,
        tags : [dTag.COLLAB]
    },
    {
        id : '00174',
        questions : `I can't update/download the game properly/stuck at X%. What should I do?`,
        answers : `Wait a minute, trudge through, change WiFi connection, change to data, use VPN, restart client, delete cache, ${link('do a manual patch', 'https://github.com/lloyddunamis/gfl_manualpatch/blob/main/FullResource_readme')}, ${link('delete some files', 'https://twitter.com/Synexcu/status/1310117595094216709?s=19')}, reinstall (with minimum data first), phone restart, or a combination of any of the above coupled with sheer determination to do it for days on end.`,
        tags : [dTag.TECH]
    },
    {
        id : '00175',
        questions : `What are these General Data I keep getting?`,
        answers : `Used for FSTs that are not yet 5${star}.<br>
        ${TextStyle.style('Limitations:', TextStyle.BOLD)}<br>
        ${List.unordered(
            'Only usable to FSTs in the gacha pool (added after a Theater for a new FST is run).',
            "Cannot be used for iteration."
        )}
        If you plan to big brain with this, churn your FST-specific central data to patches first, because they're the priority data to use before general data.`,
        tags : [dTag.HOC, dTag.FST, dTag.ITEM]
    },
    {
        id : '00176',
        questions : `Just noticed that the Black Market Shop in the Forward Basecamp has a Costumes tab. Anyone know what that's about?`,
        answers : `Shop for previous event only cosmetics.<br>
        ${image('./assets/images/BlackMarketCostumes.png', 'From u/UnironicWeeaboo')}<br>
        Currently released items in the older servers.`,
        tags : [dTag.EXPED, dTag.SHOP]
    },
    {
        id : '00177',
        questions : `Should I try getting all ringleaders or should I just save for who I want?`,
        answers : `Ideally, yes. Statistically, getting all ringleaders on their first run is through luck or money. As an F2P, you could probably get a Ringleader every other month.`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00178',
        questions : `I'm getting a "resource full" warning. What would that item be?`,
        answers : `Or "Items have reached the max capacity, unable to receive."<br>
        ${image('https://gamepress.gg/girlsfrontline/sites/girlsfrontline/files/inline-images/expedition-loot-rack.jpg', 'Taken from Gamepress')}<br>
        If the Mid Rewards rack is not empty, look at your armory.<br>
        If it's the End Rewards, check your Black Market currencies.<br>
        Or maybe just pasta, try restarting.`,
        tags : [dTag.EXPED, dTag.ITEM, dTag.TECH]
    },
    {
        id : '00179',
        questions : `I'm trying to S-Rank the stage and I got the kill requirements but I can't get the gold medal. What gives?`,
        answers : `Allied/support/friend echelons do not count. There's a counter on the bottom-left and the white number is what's being counted.`,
        tags : [dTag.MAP]
    },
    {
        id : '00180',
        questions : `Is it worth it to reset the pool once I got the Ringleader?`,
        answers : `Depends on if you want the remaining units.`,
        tags : [dTag.PA]
    },
    {
        id : '00181',
        questions : `Does cooldown reduction also reduce initial cooldown?`,
        answers : `Yes.`,
        tags : [dTag.SYSMECH, dTag.TDOLL, dTag.SKILL]
    },
    {
        id : '00182',
        questions : `What's the uncensor recipe?`,
        answers : `522/320/404/137 for EN, 666/666/666/666 everywhere else... probably.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00183',
        questions : `When will the costumes go to the Black Card Exchange?`,
        answers : `After around 2 banners. Banners with "4 skins, no L2D" will also go to Radiant Collections.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00184',
        questions : `Just bought a gem pack/monthly card but I didn't get it yet. What do I do?`,
        answers : `Go through the process again then back out at the payment screen. If it fails, contact support first if you're planning a refund.`,
        tags : [dTag.TECH, dTag.GEMS]
    },
    {
        id : '00185',
        questions : `If I scrapped/retired my only copy of a doll, can I recover/get them back?`,
        answers : `First of all, how dare you?<br>
        Second of all, yes you can. Can also work on ${spoilerSummary('collab units', image('./assets/images/CollabScrap.png', 'From u/Angelic_Force'))} and the AR Team.<br>
        Can only work once a week, costs however much is needed for a x1 dummy-link, and scrapped dupes are poof.`,
        tags : [dTag.TDOLL, dTag.COLLAB, dTag.SYSMECH]
    },
    {
        id : '00186',
        questions : `Does AA-12's SPEQ count as a slug?`,
        answers : `No, apparently due to lacking x3 damage.`,
        tags : [dTag.SPEQ]
    },
    {
        id : '00187',
        questions : `When are True Core Masks given out?`,
        answers : `One every major event and anniversary.`,
        tags : [dTag.TCM, dTag.MAJOR, dTag.ANNIV]
    },
    {
        id : '00188',
        questions : `For Coalition Units, should I skip raising units that are below XL size?`,
        answers : `I say skip raising if you're satisfied with the units you have. Otherwise raise a unit regardless of size if you need them. Symmetric Infusion can cover the size problem.`,
        tags : [dTag.COALITION]
    },
    {
        id : '00189',
        questions : `Where can I see the costumes I have acquired?`,
        answers : `${List.unordered(
            'Commander Stat Card > Adjutants > Filter > Unlocked. Works for doll you have in inventory.',
            'Index > Furniture > Posters. Works for costumes that have been gifted/given.')}`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00190',
        questions : `Does Luffberry Chess have any exclusive rewards?`,
        answers : `${link('Icons, furnitures, and as of 2.09, skins.', 'https://www.reddit.com/r/girlsfrontline/comments/uhb3jo/weekly_commanders_lounge_may_03_2022/i7kg6bu/')}`,
        tags : [dTag.OJ, dTag.FURN, dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00191',
        questions : `General tips on defeating deathstacks?`,
        answers : `For the most part, you don't. But if you really want to, this is the epitome of "CE is useless", "what dolls, formation, fairy to use depend on what you're going against", and "learn kiting". Just don't expect to come out of it unscathed.<br>
        ${List.description({
            'Swarm deathstacks' : ['Usually AoE pierce such as Kord, Type 88, KSVK with HOC support and tank/delay fairies.',
                'Kill them all before they kill you.'],
            'Golyat+ deathstacks' : ['Either stun+smoke or forceshields.']
        })}`,
        tags : [dTag.ENEMY]
    },
    {
        id : '00192',
        questions : `Can fairies be recovered from Index?`,
        answers : `No, unfortunately.`,
        tags : [dTag.FAIRY]
    },
    {
        id : '00193',
        questions : `Is there anything similar to the True Core Mask but for Coalition units?`,
        answers : `PA shop. 800 supernovas.`,
        tags : [dTag.PA, dTag.ITEM, dTag.COALITION, dTag.TCM, dTag.SHOP]
    },
    {
        id : '00194',
        questions : `Can I get gold tier fairy talents through calibration?`,
        answers : `Pretty much the main way of getting it.`,
        tags : [dTag.FAIRY]
    },
    {
        id : '00195',
        questions : `What are Prototype Fairies used for?`,
        answers : `A Prototype Fairy is used to enhance other fairies. They act like dupes in a sense that they give 100 enhancement EXP a pop, or 150 with matching talents. Recommended to use on expensive craft fairies.`,
        tags : [dTag.FAIRY, dTag.LEVEL]
    },
    {
        id : '00196',
        questions : `Where can I redeem the event boxes?`,
        answers : `Main Screen > Event > Time-Limited Event Tab > Supply Boxes.`,
        tags : [dTag.ANNIV]
    },  //@Visual
    {
        id : '00197',
        questions : `Will the TCM icons become available in the Friend Shop?`,
        answers : `Yes, otherwise SOON${tm}.`,
        tags : [dTag.TCM]
    },
    {
        id : '00198',
        questions : `Do I keep the drops if I terminate/restart?`,
        answers : `"Recently acquired" option in the armory says yes.`,
        tags : [dTag.TDOLL, dTag.MAP]
    },
    {
        id : '00199',
        questions : `Found out that there are seasonal lines for some dolls. How do I trigger them?`,
        answers : `Set them as your adjutant wearing the appropriate costume for the occasion.`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.ADJUNCT]
    },  //@Clarify
    {
        id : '00200',
        questions : `Is there a compilation of anniversary adjutant lines?`,
        answers : `${Embed.youtube('PLoDB_FcnOA5zXkZ9XmQMTog1F7uIRZ_Qa')}`,
        tags : [dTag.LORE, dTag.ANNIV, dTag.ADJUNCT]
    },  //PL4Z0akElhimzHHiVMCozfUn1B6tYKjwPR playlist by redditor u/paperrabbit. New by u/ConductorBichir. 1W5JzUGaC_fL5itce05WnkHcu7wX_sEn2vQlbgQNeKAk down,
    {
        id : '00201',
        questions : `My team says Ammo/Ration depleted. How do I fill it up?`,
        answers : `${List.ordered(
            'Stand on a captured Command Center, captured open Heliport, captured open Heavy Heliport, or Cache Box.',
            'Double-tap the echelon standing on it.',
            'Yellow Resupply button on the bottom-right.')}<br>
        If you have auto-resupply on, they will be automatically supplied at the start of your turn if they stand on nodes that can resupply them.<br>
        Note that the act of resupplying in and of itself costs you only rations and ammo. AP will not be consumed.`,
        tags : [dTag.TDOLL, dTag.MAP, dTag.NEWB, dTag.IMPT]
    },  //@Visual
    {
        id : '00202',
        questions : `What does the ${link('glitter/sparkle', './assets/images/ShinyIndicator.png')} in my coalition unit's portrait mean? Their sprites also has a golden aura/glow around it.`,
        answers : `A shiny ${TextStyle.style('pokemon', TextStyle.STRIKE)} coalition unit. And the very reason Golden Infusion is a thing.<br>
        If put on a Lv.100, XL unit, something special may happen.`,
        tags : [dTag.COALITION]
    },
    {
        id : '00203',
        questions : `My audio is gone when I exit the app and return to it. What's happening?`,
        answers : `Just iOS things. One way to get around it is client restart.`,
        tags : [dTag.APPLE, dTag.TECH]
    },
    {
        id : '00204',
        questions : `How do I throw/get Abandonded Goliaths/interact with consoles?`,
        answers : `There should be panels on thhe left side of the screen. If they don't appear, restart app.`,
        tags : [dTag.MAP, dTag.TECH]
    },  //@Visual
    {
        id : '00205',
        questions : `When should I start doing night chapters?`,
        answers : `Anytime. Unlock them by completing the next chapter's last emergency map (i.e. 11-4e unlocks 10-1n). Remember to equip PEQs to negate the accuracy penalty and bring HGs for map vision. ARSMG should be fine for the first few night maps.<br>
        ${link("BigStupidJellyfish_ requirements breakdown.", 'https://www.reddit.com/r/girlsfrontline/comments/pf1dsb/weekly_commanders_lounge_august_31_2021/hb4b257/')}`,
        tags : [dTag.MAIN]
    },
    {
        id : '00206',
        questions : `Why is this game downloading game files when I open it?`,
        answers : `Either you're just booting it up at the most opportune of times or you closed the Bluestacks emulator directly before closing the GFL app.`,
        tags : [dTag.EMU]
    },
    {
        id : '00207',
        questions : `I can't log-in with Facebook. What are my options?`,
        answers : `One solution is through the FB app.`,
        tags : [dTag.TECH]
    },
    {
        id : '00208',
        questions : `I don't know how to change the AI behaviour of my support/friend echelon, anyone can help me?`,
        answers : `${image('./assets/images/FriendEchelonCommand.png', 'Double-tap the Friend Echelon to show options')}`,
        tags : [dTag.FRIEND, dTag.ECH, dTag.MAP]
    },
    {
        id : '00209',
        questions : `When will dorm battery, daily gift, friend battery reset?`,
        answers : `${link('Netlify timer.', 'https://gftimers.netlify.app')} Note that ranking updates one hour after Kalina's Daily Gift.`,
        tags : [dTag.DORM, dTag.FRIEND, dTag["3P"]]
    },
    {
        id : '00210',
        questions : `Visited a random dorm and they had a different audio playing, what caused that?`,
        answers : `Specific furniture with a specific doll or a complete furniture set.`,
        tags : [dTag.DORM, dTag.FURN]
    },
    {
        id : '00211',
        questions : `I didn't get *insert reward here*. I checked my inventory but they're not there. How do I get them?`,
        answers : `Have you checked the quests?<br>
        What about the mail? Stage clear rewards are sent there.<br>
        If you did and they're still not there, either restart or wait for a few days.`,
        tags : [dTag.TECH, dTag.GET]
    },
    {
        id : '00212',
        questions : `What are the chances on getting a specific fairy talent?`,
        answers : `${link('u/BigStupidJellyfish_ analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/talent-data')}`,
        tags : [dTag.FAIRY]
    },
    {
        id : '00213',
        questions : `Why is the event map still here? It should've ended, right?`,
        answers : `Happens if you didn't close the app throughout maintenance. Can still be played and drop limited dolls.<!-- u/BigStupidJellyfish_ -->`,
        tags : [dTag.MAJOR, dTag.SEASON, dTag.COLLAB]
    },
    {
        id : '00214',
        questions : `Is there a list of game terms and their abbreviations? And is there any for dolls' nicknames?`,
        answers : `${link('u/BigStupidJellyfish_.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/terms')} Includes in-game and community terms.<br>
        ${link('u/Kipdid.', 'https://www.reddit.com/r/girlsfrontline/comments/urhg1y/weekly_commanders_lounge_may_17_2022/i9fmiwm/')}<br>
        ${link('u/totestemp.', 'https://www.reddit.com/r/girlsfrontline/comments/urhg1y/weekly_commanders_lounge_may_17_2022/i972mqd/')}`,
        tags : [dTag.MISC]
    },
    {
        id : '00215',
        questions : `How do I oath Ringleaders?`,
        answers : `Through the Formations route or the Armory route, with 100 Affection in hand, just like the Dolls. Going through the Protocol Control Center route is reported to be bugged.`,
        tags : [dTag.PA, dTag.COALITION, dTag.OATH, dTag.TECH]
    },
    {
        id : '00216',
        questions : `Do HP shields stack?`,
        answers : `TLDR: Yes.<br>
        ${image('./assets/images/HPShield.png', 'From u/UnironicWeeaboo')}`,
        tags : [dTag.BATTLE, dTag.SKILL]
    },  //@Trim Image
    {
        id : '00217',
        questions : `What should I prioritize buying from the black market?`,
        answers : `${List.ordered(
            'Fire Control Cores',
            'Dummy Cores',
            'Standard Combat Reports',
            'Special Combat Reports',
            'Doll Enhancement Pills',
            'Equipment Enhancement Pills')}`,
        tags : [dTag.EXPED, dTag.ITEM, dTag.SHOP]
    },  //@Visual
    {
        id : '00218',
        questions : `Is Radiant Collection worth it?`,
        answers : `Not in the slightest. For early game furnishing, the Black Market is better since you can get a 5${star} bonus.<br>
        Rates being 2% divided by the number of costumes in the radiant is the chance of pulling a specific skin. Aside from the fact that no exchange tickets and no L2D.<br>`,
        tags : [dTag.RESUPPLY, dTag.FURN, dTag.EXPED, dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00219',
        questions : `What are pets used for?`,
        answers : `Extra comfort for dorms and raises chance to go to a specific expedition biome.`,
        tags : [dTag.PET, dTag.DORM, dTag.EXPED]
    },
    {
        id : '00220',
        questions : `Are keybinds bannable?`,
        answers : `${link('Highly recommended against using keybinds.', 'https://www.reddit.com/r/girlsfrontline/comments/grht76/monthly_qa/fs239z8/')}<br>
        A lot of emulator players still use them, especially for ${link('kiting', 'https://www.reddit.com/r/girlsfrontline/comments/hmqhw8/weekly_commanders_lounge_july_07_2020/fxgu8g8/')}, so if you're willing to take the risk, go for it. Macros ARE a bannable offense, full stop.`,
        tags : [dTag.EMU]
    },
    {
        id : '00221',
        questions : `Why do I get the "Ammo/Ration depleted" warning and sometimes not?`,
        answers : `You'll get the warning when you lack either of them, when you can see the enemy, and when you engage them first in battle.`,
        tags : [dTag.MAP]
    },
    {
        id : '00222',
        questions : `What are the best deals for RL money?`,
        answers : `${List.unordered(
            'Monthly gems card')}`,
        tags : [dTag.MISC]
    },
    {
        id : '00223',
        questions : `What's the release order for PA banners?`,
        answers : `${spoilerSummary('Google Doc.', Embed.google(Embed.G_EXCEL, '1nwlyZxoYaC44idP8SnAjk1OgQX4ND0lIzG3_Fs1We_0'))}<br>
        ${spoilerSummary('Image.', image('https://cdn.discordapp.com/attachments/564028599682727937/1003511535387283556/Proass_order.png'))}`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00224',
        questions : `Should I keep equipping capes to RFs?`,
        answers : `${link('Yes.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/myths#capes')}`,
        tags : [dTag.TDOLL, dTag.EQUIP]
    },
    {
        id : '00225',
        questions : `Where can I get calibration tickets?`,
        answers : `Defense Drill, expeditions, shop, mini-events, log-in.`,
        tags : [dTag.ITEM, dTag.SIMS, dTag.EXPED, dTag.MINI, dTag.SHOP, dTag.GET]
    },
    {
        id : '00226',
        questions : `How do I get duplicate ringleaders?`,
        answers : `If you successfully captured the RL, there is a "Reset Pool" button beside the Svarog button. This allows you to refresh the pool back to 100 for another round of RL pulling. Dupe RLs are autofed to your first copy. Any more pulls of the same RL with full petal is an autoscrap.`,
        tags : [dTag.COALITION, dTag.PA]
    },
    {
        id : '00227',
        questions : `How many ways can I terminate the current mission?`,
        answers : `${List.unordered(
            'Terminate mission button on the top-left of the field map.',
            "Combat Missions/Campaign/Event Map > the mission you're currently doing > Terminate.")}`,
        tags : [dTag.MAIN, dTag.CAMPAIGN, dTag.MAJOR, dTag.SEASON, dTag.COLLAB]
    },
    {
        id : '00228',
        questions : `I keep fat-fingering my kiting. Any help?`,
        answers : `To move a doll, you would have to drag their feet, not on their body.`,
        tags : [dTag.BATTLE]
    },
    {
        id : '00229',
        questions : `When will the ringleader capture special animation start playing?`,
        answers : `When they get captured with Svarog's airstrikes.`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00230',
        questions : `Is there any particular reason why not to overextend on crafting for dailies?`,
        answers : `Rate ups. They exist. They take our contracts and quick prods.`,
        tags : [dTag.PROD]
    },
    {
        id : '00231',
        questions : `Can I farm for the equipment/doll without clearing the map first?`,
        answers : `Yes, but better to clear it to remove the objectives pop-up.`,
        tags : [dTag.SPEQ, dTag.TDOLL]
    },
    {
        id : '00232',
        questions : `Is there any Live2D viewer for GFL?`,
        answers : `${link('Pengu.', 'https://pengupengupengu.github.io/live2d-viewer-web/')} Don't know how this works.<br>
        Or try IOPWiki.`,
        tags : [dTag['3P']]
    },
    {
        id : '00233',
        questions : `How long would visitors stay in my dormitory?`,
        answers : `${link('u/BigStupidJellyfish_ says 8 hours.', 'https://old.reddit.com/r/girlsfrontline/comments/v6pt9o/weekly_commanders_lounge_june_07_2022/ibyvjnm/')}`,
        tags : [dTag.DORM]
    },
    {
        id : '00234',
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
        id : '00235',
        questions : `Does getting S rank in a mission increase the chance of getting the map specific doll in story and events?`,
        answers : `Yes.`,
        tags : [dTag.TDOLL]
    },
    {
        id : '00236',
        questions : `What is "ranking" that people are talking about?`,
        answers : `${link("u/pointblanksniper's essay.", 'https://old.reddit.com/r/girlsfrontline/comments/vbydlq/weekly_commanders_lounge_june_14_2022/id4n4dr/')}`,
        tags : [dTag.MAJOR]
    },
    {
        id : '00237',
        questions : `What are Specified Equipment Contracts for and how do I use them?`,
        answers : `Extra IOP Special Orders. Gets used when Equipment Production Special Order's 20 free charges are used up.`,
        tags : [dTag.ITEM, dTag.EQUIP, dTag.PROD]
    },  //@Visual
    {
        id : '00238',
        questions : `Where is the in-game chip calculator and is it better than GFCalc?`,
        answers : `Under that specific FST's chip page.<br>
        IMO no, since it can't maximize strengths, though it is useful for temporary set-ups.<br>
        To use it properly, enable Preview Max-level Chip Stats.`,
        tags : [dTag.HOC, dTag.FST, dTag.EQUIP, dTag["3P"]]
    },
    {
        id : '00239',
        questions : `How do I change my assistant/adjutant?`,
        answers : `Commander Level > Base Management (bottom-left).<br>
        You can also change each one's background.`,
        tags : [dTag.ADJUNCT]
    },  //@Visual
    {
        id : '00240',
        questions : `How do I edit my Friend Card?`,
        answers : `Friend > ID Card Tab`,
        tags : [dTag.MISC]
    },  //@Visual
    {
        id : '00241',
        questions : `How do I dye my commander's clothes?`,
        answers : `Use an Infinite Surprise Dye or a Colorful Dye on a costume piece. Note that not every piece is dyeable, dirty and basic costumes in particular.`,
        tags : [dTag.CMDR, dTag.SKIN]
    },
    {
        id : '00242',
        questions : `Where can I get a dyeable and free commander costume?`,
        answers : `Shattered Connexions.`,
        tags : [dTag.CMDR, dTag.SKIN, dTag.GET]
    },
    {
        id : '00243',
        questions : `Why does the iOS version crash a lot?`,
        answers : `Grapevine: Mix iOS RAM overload prevention and GFL memory leak, and you have a totally definitely good time.<br>
        iPhone 7 and above should work really well though.`,
        tags : [dTag.TECH, dTag.APPLE]
    },
    {
        id : '00244',
        questions : `How do I do EXP Sim?`,
        answers : `Deploy at least one echelon that can clear the whole map. Rewards 96 CRs on Advanced.`,
        tags : [dTag.SIMS]
    },  //@Check. Add SCR gain.
    {
        id : '00245',
        questions : `What are Data Patches for and how do I get them?`,
        answers : `Used for iterating FSTs beyond yellow 5${star} (the red ${star}). Can also be used across all FSTs.<br>
        You can get them by getting a 5${star}'d FST's Central Data or by Code Refactoring in the Garage.`,
        tags : [dTag.HOC, dTag.FST, dTag.LEVEL, dTag.ITEM, dTag.GET]
    },
    {
        id : '00246',
        questions : `Can I get Black Cards if I have a dupe of Luffberry skin?`,
        answers : `7000 Friend Points, take it or leave it.`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.OJ, dTag.ITEM]
    },
    {
        id : '00247',
        questions : `How exactly does the Devastation Card work?`,
        answers : `Boosts all out-of-combat damage.`,
        tags : [dTag.OJ]
    },
    {
        id : '00248',
        questions : `How does Enhancement work in Luffberry Chess?`,
        answers : `Gives permanent buffs to a doll.`,
        tags : [dTag.OJ]
    },
    {
        id : '00249',
        questions : `How can I get T-Doll skins?`,
        answers : `${List.description({
            'Shop' : ['Dedicated gem-bought shop.', 'Event shop during seasonal events.'],
            'Resupply' : ['Banners and Reruns.', 'Black Card Exchange.'],
            'Mini-events' : ['Mini-events.'],
            'Ranking Rewards' : ['Arctic Warfare only.'],
            'Battlepass' : ['Called in-game as Frontline Protocol.', '10$ at minimum.'],
            'New Player Rewards' : ["UMP45's Valentine's Skin, which is also available as gacha."]
        })}`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.GET, dTag.BP]
    },
    {
        id : '00250',
        questions : `How do I know which dolls are in the Targeted rate up?`,
        answers : `Scrolling banner at the bottom-left of the home screen.`,
        tags : [dTag.PROD, dTag.TDOLL]
    },
    {
        id : '00251',
        questions : `How do I get Friend ID icons?`,
        answers : `Resupply gacha (10 pulls), shop or clear reward during events, or Friend Shop.`,
        tags : [dTag.GET]
    },
    {
        id : '00252',
        questions : `How do I know the final value of the doll stats? And what are the caps for each stat?`,
        answers : `${link('Matsuda Formula.', 'https://gfl.matsuda.tips/post/basicformula')}<br>
        99999 for final damage. FOR ROF, it's listed on the formation screen, but in reality, it's by 5, so max for 120 is 116, i.e. 116-120 ROF has no difference. Crit Rate is 100% as per common sense.`,
        tags : [dTag.SYSMECH, dTag.TDOLL]
    },
    {
        id : '00253',
        questions : `How good are AR-15 and SOP's SPEQs?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/star-buffs')}`,
        tags : [dTag.SPEQ]
    },
    {
        id : '00254',
        questions : `What are Dream Astralites and where do I get it?`,
        answers : `Milestone currency for Bookshelf of Memories.`,
        tags : [dTag.ITEM, dTag.SIDE, dTag.GET]
    },
    {
        id : '00255',
        questions : `Is there a way to quickly unequip dolls?`,
        answers : `Armory > Equipment > Remove All at bottom-right.`,
        tags : [dTag.EQUIP]
    },  //@Visual
    {
        id : '00256',
        questions : `Is there a chibi viewer for each doll?`,
        answers : `${link('IOPWiki', 'https://iopwiki.com/wiki/Category:T-Dolls')}<br>
        ${link('GFWiki', 'http://www.gfwiki.org/w/%E6%88%98%E6%9C%AF%E4%BA%BA%E5%BD%A2%E5%9B%BE%E9%89%B4')}`,
        tags : [dTag.TDOLL, dTag.MISC]
    },
    {
        id : '00257',
        questions : `I'm moving overseas. Will there be problems for playing the same account?`,
        answers : `Each client is tied to their specific server.`,
        tags : [dTag.ACCT]
    },
    {
        id : '00258',
        questions : `I see people have their Tdolls as their avatar in other people's dorms. How do you do that?`,
        answers : `In dorm, bottom-left, top-right, uncheck third checkbox.`,
        tags : [dTag.DORM]
    },  //@Visual
    {
        id : '00259',
        questions : `Why does the current event not have auto-battles?`,
        answers : `All currently running "limited" events have no auto-battles, only main chapters and campaign map have those. Why? Engagement, probably.`,
        tags : [dTag.AUTO, dTag.MAJOR, dTag.SEASON, dTag.COLLAB]
    },
    {
        id : '00260',
        questions : `Which of the enemies count as an elite?`,
        answers : `${link('Powered by randomqwerty.', './elites')}`,
        tags : [dTag.ENEMY]
    },
    {
        id : '00261',
        questions : `Can I unbind my Sunborn Account?`,
        answers : `AFAIK, can't.`,
        tags : [dTag.ACCT]
    },
    {
        id : '00262',
        questions : `Is it fine to use green equips?`,
        answers : `Advised to use if lacking gold equips. Do calibration only on gold ones for calibration ticket efficiency. Otherwise, fine to level them up.`,
        tags : [dTag.TDOLL, dTag.EQUIP]
    },
    {
        id : '00263',
        questions : `How do I get the gold medals in maps?`,
        answers : `${List.unordered(
            'Read the Gold Medal description in the combat summary.',
            'Never retreat your team from the field map either by losing skirmishes (losses) or manual retreating (withdrawing).',
            "Never repair fielded teams (red warning at the bottom left tells you this, don't miss it).",
            'Retreating a doll from the battle phase/skirmish is fine. Really, anything that you SHOULD DO/ SHOULD NOT DO are already listed.',
            'Retreating Support Echelons does not prevent you from gold medals, nor does support kills (shown in green +#) count towards.')}`,
        tags : [dTag.MAP]
    },  //@Visual + Fix + Clarify
    {
        id : '00264',
        questions : `What level is a good stopping point for raising dolls?`,
        answers : `Lv. 90 is the last level to get a power spike, before MODs, due to the 5th link.`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        id : '00265',
        questions : `Which T-Doll skill's quirks should I be aware of?`,
        answers : `${List.description({
            'General Liu' : [link('Clones can get stat buffs, albeit with restrictions.', 'https://iopwiki.com/wiki/General_Liu#Trivia')],
            'C-93' : ["Passive can trigger in response to other dolls' self-debuffs."],
            'Hanyang Type 88' : [link('Can still miss on certain positions.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/hanyangle-2')],
            'FX05' : [link('Does not activate skill on max ROF.', 'https://old.reddit.com/r/girlsfrontline/comments/vx5s4p/weekly_commanders_lounge_july_12_2022/ig4n5sr/')],
            'Supernova' : ['Additive crit rate.'],
            'K2' : ["ROF around 90 to maximize the ICD up to 100 if there's a run-up to auto her skill."]
        })}`,
        tags : [dTag.TDOLL, dTag.SKILL]
    },
    {
        id : '00266',
        questions : `Why do some attacks ignore my doll's armor/gets orange hits?`,
        answers : `Enemy has higher AP or they hit with explosive attacks.`,
        tags : [dTag.ENEMY, dTag.BATTLE]
    },
    {
        id : '00267',
        questions : `Is there a limit to how many people I can blacklist?`,
        answers : `50.`,
        tags : [dTag.MISC]
    },
    {
        id : '00268',
        questions : `Can I use duplicates to raise my doll's MOD level?`,
        answers : `Yes, unless you're modding 2★ dolls. First, go to factory then dismantle all dupes. When you get enough cores, you can use them to raise MOD levels.`,
        tags : [dTag.MOD]
    },
    {
        id : '00269',
        questions : `How do I bind my account?`,
        answers : `${link('Settings>Manage Account>Bind to your preferred account.', 'https://old.reddit.com/r/girlsfrontline/comments/h9zoat/weekly_commanders_lounge_june_16_2020/fvpm1q8/')} To see your account password, check the spam section of your bound email address.<br>
        You can then change devices provided that you use the same account.`,
        tags : [dTag.ACCT]
    },  //@Visual
    {
        id : '00270',
        questions : `Why do I sometimes get 1 defense die in battle?`,
        answers : `Opponent piece landed on top of your own, signified by a die breaking.`,
        tags : [dTag.OJ]
    },  //@In-game manual
    {
        id : '00271',
        questions : `Do SMGs and HGs need to bother with PEQs?`,
        answers : `Direct-fire guns do.`,
        tags : [dTag.TDOLL, dTag.EQUIP]
    },
    {
        id : '00272',
        questions : `What's a T-Doll Memoir?`,
        answers : `MOD stories.`,
        tags : [dTag.SIDE, dTag.MOD]
    },  //@Clarify
    {
        id : '00273',
        questions : `Will I lose the tile buffs if my dolls retreated/moved/lose link/die?`,
        answers : `${spoilerSummary('No', Embed.youtube('tQRqcTDmAKE'))}. On that note, retreating dolls who had their buffs activate will not remove said buff. Also, tile buffs don't degrade even if your dummy count does.`,
        tags : [dTag.TDOLL, dTag.SKILL, dTag.BATTLE]
    },
    {
        id : '00274',
        questions : `I'm planning to use a max level oathed MOD doll to farm surplus exp. Is that a good idea?`,
        answers : `As good an idea as running an unmodded max level doll.`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        id : '00275',
        questions : `How long does it take to max out Kalina's affection?`,
        answers : `A very long time.<br>
        ${Embed.google(Embed.G_EXCEL, '1rshL9qGZfmuacCzjs7GdLN4qNs_ZWRoJNn-1vTwr6hc')}<br>
        You can increase it by collecting an affection point from her at the shop or by buying things from the shop.`,
        tags : [dTag.KALINA, dTag.LOVE]
    },
    {
        id : '00276',
        questions : `I think I drove myself into a wall by not doing things efficiently. Do I have to restart my account to progress better?`,
        answers : `Nah. You'll be just fine continuing. Just do things better from now on.`,
        tags : [dTag.NEWB]
    },
    {
        id : '00277',
        questions : `Do spare dorms contribute to comfort/battery generation?`,
        answers : `No. The comfort values shown in it is for when they're actually used.`,
        tags : [dTag.DORM]
    },
    {
        id : '00278',
        questions : `Is there a way to change the skill icon order in battle?`,
        answers : `${link('Explanation and manipulation.', 'https://old.reddit.com/r/girlsfrontline/comments/oeqgwt/weekly_commanders_lounge_july_06_2021/h48qu1v/')}`,
        tags : [dTag.BATTLE, dTag.SKILL]
    },
    {
        id : '00279',
        questions : `Is there an easy way to get Luffberry tickets?`,
        answers : `${List.ordered(
            'Create private lobby.',
            'Start match with bots.',
            'Recover game every 5 minutes or buy cards during shop phase.',
            'Quit match after 20 minutes.')}`,
        tags : [dTag.OJ]
    },
    {
        id : '00280',
        questions : `How does one change their dormitory representative/avatar/visitor?`,
        answers : `${image('./assets/images/VisitorAvatar.png', 'Visit > Setting > Dorm Visit')}<br>
        Checked uses your commander avatar, unchecked and it uses your first adjutant.`,
        tags : [dTag.DORM]
    },
    {
        id : '00282',
        questions : `I bought the L2D background but I saw nothing move. Is this really L2D?`,
        answers : `If you won't move then it wouldn't. Yes, panoramic${TextStyle.style('sorta L2D', TextStyle.SUPER)}.`,
        tags : [dTag.MISC]
    },
    {
        id : '00283',
        questions : `How do I bypass enemy defenses?`,
        answers : `${table(['Defense', 'Counter'],
            ['Health Bar', 'Just shoot them'],
            ['Evasion', 'High accuracy<br>Evasion debuff<br>Surehits like skillshots or explosives'],
            ['Armor', 'High firepower<br>AP bullets<br>Explosives'],
            ['HP Shields', 'Basic shooting<br>Strippers like LTLX or De Lisle<br>Shield bypass like DEagle or NTW'],
            ['Force Shields', 'HOCs'],
            ['Damage Reduction', 'Shoot harder<br>Buff strippers'])}`,
        tags : [dTag.BATTLE, dTag.NEWB]
    },
    {
        id : '00284',
        questions : `How do I know when my registration date was?`,
        answers : `user_info.json from GFAlarm > reg_time value > convert to gregorian ("reg_time" unix time) with ${link('this', 'https://www.wolframalpha.com/')}.`,
        tags : [dTag.ACCT]
    },
    {
        id : '00285',
        questions : `How do fairy talents work?`,
        answers : `Activates at the start of battle but activates after the echelon's fairy skll. As for it's effects, aside from Fervor (which boosts at 0s, 8s, 16s mark), exactly what it says (i.e. unlimited if no limit was stated).`,
        tags : [dTag.FAIRY, dTag.BATTLE]
    },
    {
        id : '00286',
        questions : `If a ringleader equips a support buff/debuff chip, does it apply on themselves as well?`,
        answers : `Yes.`,
        tags : [dTag.COALITION, dTag.EQUIP]
    },
    {
        id : '00287',
        questions : `Can I deploy two or three of the same pets in expedition?`,
        answers : `Actually, that is the method used by min-maxers regarding advantaged pets.`,
        tags : [dTag.EXPED, dTag.PET]
    },
    {
        id : '00288',
        questions : `Does the flare equipment's accuracy boost stack?`,
        answers : `Yes.`,
        tags : [dTag.TDOLL, dTag.EQUIP]
    },
    {
        id : '00289',
        questions : `How can Alina get black marks/Adeline get white marks?`,
        answers : `Have them support each other as HOCs.`,
        tags : [dTag.COALITION, dTag.BATTLE]
    },
    {
        id : '00290',
        questions : `How do I complete the quest for taking on drill targets?`,
        answers : `Drill target = permanent preset of enemies. You know, the ones already available.`,
        tags : [dTag.MISC]
    },
    {
        id : '00291',
        questions : `Can I change the censored sprites to uncensored/rejected ones?`,
        answers : `Apparently no since it'll revert back to its default file., And you might get in trouble.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00292',
        questions : `How can I unlock the Fairy Room?`,
        answers : `Clear 60 different maps, then get your first fairy using Heavy Equipment Production.`,
        tags : [dTag.FAIRY]
    },
    {
        id : '00293',
        questions : `Which PA unit has explosion attacks?`,
        answers : `Manticores, Goliaths, Jaguars`,
        tags : [dTag.COALITION]
    },
    {
        id : '00294',
        questions : `Which fairy talent should I get?`,
        answers : `${link('BigStupidJellyfish analysis.', 'https://big-stupid-jellyfish.github.io/GFMath/pages/fairy-talents')}`,
        tags : [dTag.FAIRY]
    },
    {
        id : '00295',
        questions : `Can I farm ranking maps for the cumulative points?`,
        answers : `Yes.`,
        tags : [dTag.MAJOR]
    },
    {
        id : '00296',
        questions : `Where did my Ringleader duplicates go?`,
        answers : `As petals or as kernels. There can never be a dupe of the same Ringleader (literally same, alters are different).`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00298',
        questions : `Guides show more echelons deployed than regular heliports in the map. What am I missing?`,
        answers : `Heavy Heliports > Top Tab > Choose Echelon`,
        tags : [dTag.MAP]
    },
    {
        id : '00299',
        questions : `What is vulnerability?`,
        answers : `A debuff that amplifies all damage recieved from all sources after armor calculation.`,
        tags : [dTag.SKILL]
    },
    {
        id : '00300',
        questions : `Is there something like an account/inventory/roster spreadsheet for this game?`,
        answers : `${link('Make a copy for personal use.', 'https://old.reddit.com/r/girlsfrontline/comments/wpoce9/weekly_commanders_lounge_august_16_2022/ikyqyb1/')}`,
        tags : [dTag.MISC]
    },
    {
        id : '00302',
        questions : `How do I place dolls in dorms?`,
        answers : `Having a doll in an echelon. Dorm 1 corresponds to Echelon 1, Dorm 2 to Echelon 2, etc.`,
        tags : [dTag.DORM]
    },
    {
        id : '00303',
        questions : `Do I get Friend Points if someone likes my dorm?`,
        answers : `No<!--KookyInspection-->, but you get FP when you like theirs.`,
        tags : [dTag.FRIEND]
    },
    {
        id : '00304',
        questions : `Do auto-battles count for "Defeat Enemies"?`,
        answers : `No.`,
        tags : [dTag.AUTO]
    },  //See [question in sys mech]
    {
        id : '00305',
        questions : `Where can I see my event ranking map placement?`,
        answers : `Homescreen > Rank > Event Rank Tab`,
        tags : [dTag.MAJOR]
    },
    {
        id : '00306',
        questions : `I haven't used my starter anchor. Do I have to use it to see the new doll anchors?`,
        answers : `You can swipe between them. If you can't, restart app.`,
        tags : [dTag.PROD, dTag.TECH]
    },
    {
        id : '00307',
        questions : `Can I change my name?`,
        answers : `Using Name Change Card, which only appears during certain packages.`,
        tags : [dTag.MISC]
    },
    {
        id : '00308',
        questions : `What happens when a Luffberry Chess season is over?`,
        answers : `Unclaimed seasonal gacha skins will carry over to next seasonal gacha, and so are the tickets. Ranking rewards are different each season.`,
        tags : [dTag.OJ]
    },
    {
        id : '00309',
        questions : `What are the other battery sinks besides facilities?`,
        answers : `${List.unordered(
            'Slaving Kalina (CR/SCR)',
            'Making an animal kingdom (3 of each purchasable pets in Rescue Station)',
            'Raising FSTs',
            'Event PVs (Cafe)',
            'Getting Gsh-18 (Cafe 4-koma)')}`,
        tags : [dTag.ITEM]
    },
    {
        id : '00310',
        questions : `What does the Download Data button in the settings do?`,
        answers : `${link('Basically fairy and equipment texture, and dorm-related stuff.', 'https://old.reddit.com/r/girlsfrontline/comments/gziv26/weekly_commanders_lounge_june_09_2020/fut4man/')}`,
        tags : [dTag.MISC]
    },
    {
        id : '00311',
        questions : `It's the last day of Theater. Do I still have to vote?`,
        answers : `Yes.`,
        tags : [dTag.THEATER]
    },
    {
        id : '00312',
        questions : `Can I change my Sunborn Account's attached e-mail?`,
        answers : `Apparently no.`,
        tags : [dTag.ACCT]
    },
    {
        id : '00313',
        questions : `Can the Sniper Fairy pierce shields?`,
        answers : `No.`,
        tags : [dTag.FAIRY, dTag.SKILL]
    },
    {
        id : '00314',
        questions : `How do I complete Command Mission: Map Completion: Griffin Elite in Career Quests?`,
        answers : `${spoilerSummary('Elite Griffin Combat Medals', image('./assets/images/GriffinEliteMedal.png', 'Taken from GFLDB'))} are acquired during the major story events on their original run.`,
        tags : [dTag.MAJOR, dTag.QUEST]
    },
    {
        id : '00315',
        questions : `I'm using coalition units but I can't raise my final score enough. What do I need to do?`,
        answers : `Use Griffin echelons. All coalition units give lower score for rankings.`,
        tags : [dTag.COALITION, dTag.THEATER]
    },
    {
        id : '00316',
        questions : `What are Challenger Medals for?`,
        answers : `Flex.`,
        tags : [dTag.MISC]
    },
    {
        id : '00317',
        questions : `What are the arching thread lines for?`,
        answers : `For coalition units, it's to see who are affected by their support chips.<br>
        For FSTs, it's for ally units under fire support.`,
        tags : [dTag.MAP, dTag.COALITION, dTag.FST]
    },
    {
        id : '00318',
        questions : `Is it worth to wait for a veteran callback?`,
        answers : `Negligible I say. Returning rewards can be farmed by just playing. And there could be many events before a major/collab event.`,
        tags : [dTag.MISC]
    },
    {
        id : '00319',
        questions : `Are HP shields affected by armor, flash shells, and damage reduction?`,
        answers : `Yes. They're more or less extensions of HP.`,
        tags : [dTag.SKILL]
    },
    {
        id : '00320',
        questions : `I'm stuck in EXP Sim. Losing or withdrawing gives me an "Illegal Action Detected". What should I do?`,
        answers : `Since restarting won't help, contact support.`,
        tags : [dTag.SIMS, dTag.TECH]
    },
    {
        id : '00321',
        questions : `How do I unlock the farming stages in the event?`,
        answers : `It should be a pair of nodes separate from the rest of the nodes.`,
        tags : [dTag.MAJOR, dTag.COLLAB, dTag.SEASON, dTag.CAMPAIGN]
    },
    {
        id : '00322',
        questions : `There is a spinning pinwheel, a diamond, and an almost complete gauge-like icon beside the map names. What do they mean?`,
        answers : `Spinning pinwheel: Node split.<br>
        Diamond: Story node.<br>
        Gauge-like icon: Combat node.`,
        tags : [dTag.MAJOR, dTag.SEASON, dTag.COLLAB, dTag.CAMPAIGN]
    },
    {
        id : '00323',
        questions : `I can't do an auto-battle even though I met the required CE. What's happening?`,
        answers : `Is it a night map? If it is, refer to night CE. If it still doesn't let you, increase CE, some required CE are listed wrong.`,
        tags : [dTag.AUTO]
    },
    {
        id : '00324',
        questions : `Will the seasonal coalition units return to they're base/original form?`,
        answers : `That's already their actual form, as seen with their skills being completely different from the original's.`,
        tags : [dTag.COALITION]
    },
    {
        id : '00325',
        questions : `I saw that commander costumes have skills. How do I level it up?`,
        answers : `Get another costume set with the same skill to upgrade it.`,
        tags : [dTag.CMDR, dTag.SKIN, dTag.SKILL]
    },
    {
        id : '00326',
        questions : `Counter says I still have maps to do. How do I know which ones are those?`,
        answers : `${image('./assets/images/StoryProgress.png', 'Tap the encircled counter to see the remaining maps')}`,
        tags : [dTag.MAJOR, dTag.CAMPAIGN, dTag.COLLAB]
    },
    {
        id : '00327',
        questions : `Are there welfare units in this game? And if so, are they permanently missable?`,
        answers : `Yes. No.`,
        tags : [dTag.TDOLL, dTag.GET, dTag.NEWB]
    },
    {
        id : '00328',
        questions : `Can I set the damaged art as default for dolls?`,
        answers : `Only on the main screen as an adjutant, unless you want them critically damaged forever.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00329',
        questions : `The speech bubble hearts, SKK. What do they mean?`,
        answers : `Dorm? Tap them to gain ¼ of an affection.<br>
        Echelon portrait? They're at 90 affection pts. and above.`,
        tags : [dTag.TDOLL, dTag.LOVE]
    },
    {
        id : '00330',
        questions : `Do I need to level up my duplicates in order to use them as dummy-links?`,
        answers : `Nope. They're merely DPS and health multiplier basically. Pretty much used as the equivalent of limit-break fodders in other gachas.`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        id : '00331',
        questions : `What is duping and how do I dupe?`,
        answers : `Duping is the art of keeping a duplicate of the same unit instead of turning them into dummy cores.<br>
        The only dupeable dolls are farmables, craftables, and capturables.<br>
        For Griffin T-Dolls, this only comes in rankings. For Coalition Units, this is, at the very least, expected.`,
        tags : [dTag.TDOLL, dTag.COALITION]
    },
    {
        id : '00332',
        questions : `I can't see my dolls MOD in the Neural Upgrade tab. Where are they?`,
        answers : `Maybe because it's not yet released on whatever server you're in right now?`,
        tags : [dTag.TDOLL, dTag.MOD]
    },
    {
        id : '00333',
        questions : `If I mod my doll, would I still be able to use other skins?`,
        answers : `Yes, considering that costumes are this game's main revenue.`,
        tags : [dTag.TDOLL, dTag.MOD, dTag.SKIN]
    },
    {
        id : '00334',
        questions : `I just got an Old Letter. WhoWhenWhereWhatWhyHow?`,
        answers : `KSVK. After Modding her to 3. Mail. Connected to Mod Story. More story and immersion. Mica mail.`,
        tags : [dTag.MOD]
    },
    {
        id : '00335',
        questions : `What if I don't have the doll I have costume for?`,
        answers : `Make Kalina wear it and she gives it when the owner comes home.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00336',
        questions : `Where can I get furniture for my dorms?`,
        answers : `Collateral of skin pulling, aka Resupply. Or Expedition shop. Or crates from major events. Or shop during seasonal.`,
        tags : [dTag.FURN, dTag.DORM, dTag.RESUPPLY, dTag.SHOP, dTag.MAJOR, dTag.SEASON]
    },
    {
        id : '00337',
        questions : `I want to clean my furniture inventory. How do I do that?`,
        answers : `${image('./assets/images/FurnitureTrash.png', 'Trash Icon')}`,
        tags : [dTag.FURN]
    },
    {
        id : '00338',
        questions : `I won't be using the costume. How can I scrap it?`,
        answers : `I bring this news with a heavy heart that it is impossible. Deal with it.`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00339',
        questions : `What's the difference between L2D and Simplified L2D?`,
        answers : `${List.description({
            'Live2D' : [
                'Sometimes called Reactive Live2Ds.',
                'Can follow your touch with their eyes/head.',
                'Can only be acquired through Resupply. Except maybe Hanyang 88.'
            ],
            'Simplified Live2D' : [
                'Also known as Animations.',
                'Plays on loop, except when they talk.'
            ]
        })}`,
        tags : [dTag.TDOLL, dTag.SKIN]
    },
    {
        id : '00340',
        questions : `Do Gem Package skins go to Black Card Exchange?`,
        answers : `Some do, some don't. What's for sure is that collab skins don't. Obviously.`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.GEMS]
    },
    {
        id : '00341',
        questions : `Is there any checklist for the base bonus?`,
        answers : `${link("u/headphone_question's doll index checklist.", 'https://redd.it/xqtpd9')}`,
        tags : [dTag.TDOLL]
    },
    {
        id : '00342',
        questions : `Can I get SPEQs/Limited dolls from auto-battles?`,
        answers : `Yes we can.`,
        tags : [dTag.AUTO, dTag.GET, dTag.SPEQ, dTag.TDOLL]
    },
    {
        id : '00343',
        questions : `Do auto-battle card bonus stack with combat exp bonus?`,
        answers : `${image('./assets/images/XPUpAuto.png', 'Note that Monthly Auto-Battle Card is active, and 100% bonus is from XP up event')}`,
        tags : [dTag.LEVEL, dTag.AUTO]
    },
    {
        id : '00344',
        questions : `What can fairies do during auto-battles?`,
        answers : `Raise your CE to help you get the required amount.`,
        tags : [dTag.FAIRY, dTag.AUTO]
    },
    {
        id : '00345',
        questions : `Is the monthly autobattle card worth it?`,
        answers : `Well, considering exp shown in autobattle window is the total undistributed exp, one team basically gets 2x exp than no monthly card. And you can also do it for one more echelon.`,
        tags : [dTag.AUTO]
    },
    {
        id : '00346',
        questions : `Where to get kernels?`,
        answers : `Supernova = 2-3${star}. Dark Star = 1${star}.`,
        tags : [dTag.PA, dTag.ITEM]
    },
    {
        id : '00347',
        questions : `What is Peak Value Analysis?`,
        answers : `Dummy-linking basically. But dupes are required.`,
        tags : [dTag.PA, dTag.COALITION, dTag.LEVEL]
    },
    {
        id : '00348',
        questions : `If I fail to capture a coalition unit, will I lose them?`,
        answers : `Rather than that, they're recycled back into the pool.`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00349',
        questions : `What does size imply in regards to PA units?`,
        answers : `Stats. Bigger is better. Also subject to RNG, by impulse, svarog capture, or kernel shop.`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00350',
        questions : `Is it a good idea to get duplicate Ringleaders and Manticores (aka one-link units) for linking/PVA?`,
        answers : `Good? Yes. Necessary? For RLs, not really, since they be powerful enough already. For mooks though...`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00301',
        questions : `When do I get to unlock the whole FST grid/matrix/board?`,
        answers : `At full promotion. The yellow ★★★★★ one.`,
        tags : [dTag.HOC, dTag.FST]
    },
    {
        id : '00351',
        questions : `How do FST HOC skills work?`,
        answers : `Depends. Either by timer or by number of shots fired. And all skills are active, meaning no need to choose which one you'll use.`,
        tags : [dTag.HOC, dTag.FST, dTag.SKILL]
    },
    {
        id : '00352',
        questions : `Can HOCs reduce armor just like they do with force shields?`,
        answers : `No. Armor is a stat, not a gauge. Unless it's part of their skill.`,
        tags : [dTag.HOC, dTag.FST]
    },
    {
        id : '00353',
        questions : `What's the rate for HOC rate-up?`,
        answers : `No exact numbers, but note that it only increases the chance of getting a particular HOC's Central Data. Rate for Data as a whole remains unchanged.`,
        tags : [dTag.HOC]
    },
    {
        id : '00354',
        questions : `After a banner ends, would the extra impulses and aid commissions expire?`,
        answers : `They're basically the equivalent of gacha currency, so it wouldn't make sense for them to expire.`,
        tags : [dTag.PA, dTag.ITEM]
    },
    {
        id : '00355',
        questions : `What are Petri Dishes for?`,
        answers : `Raising Coalition units' rarity.`,
        tags : [dTag.PA, dTag.COALITION, dTag.ITEM]
    },
    {
        id : '00356',
        questions : `What are the fonts used in the game?`,
        answers : `${List.description({
            'Noto sans' : ['Story dialogue', 'Unit/Skill descriptions']
        })}`,
        tags : [dTag.MISC]
    },
    {
        id : '00357',
        questions : `What's the enemy targeting priority?`,
        answers : `By default, the most forward unit. Note that due to asymmetrical angle, the top row is a smidge forward than the middle and the bottom is backward.`,
        tags : [dTag.ENEMY, dTag.BATTLE]
    },
    {
        id : '00358',
        questions : `Can the basecamp not give expedition loots?`,
        answers : `Only if you didn't do one. If you did and no visible loot, restart app.`,
        tags : [dTag.EXPED, dTag.TECH]
    },
    {
        id : '00359',
        questions : `Is the Rescue Fairy's skill actually good?`,
        answers : `For core farming purposes, ${spoilerSummary('very noticeable', Embed.google(Embed.G_EXCEL, '1DSYyTdC3Yk7JV4YGuj8zFMZqbPcH2zpNShtAFpR2Qmw'))}.<br>
        Note that it only works on dolls, not equipments.`,
        tags : [dTag.FAIRY, dTag.SKILL]
    },
    {
        id : '00360',
        questions : `Which expedition duration should I do to maximize efficiency?`,
        answers : `8 hours. More chances to get into hidden areas.`,
        tags : [dTag.EXPED]
    },
    {
        id : '00361',
        questions : `I can't log-in with my third party account. Is there any way to get back?`,
        answers : `Might be because the third party is down. Contacting ${TextStyle.style('support@sunborngame.com', TextStyle.BOLD)} to change to Sunborn account might help. Having account details, particularly UID and username, may help.`,
        tags : [dTag.ACCT, dTag.TECH]
    },
    {
        id : '00362',
        questions : `Will the *insert ranking reward here* be available in the future?`,
        answers : `Only if they rerun ranking maps. AW and DD maps are slated to be reworked.`,
        tags : [dTag.GET, dTag.FAIRY, dTag.SPEQ, dTag.MAJOR]
    },
    {
        id : '00363',
        questions : `How valueable are Black Cards?`,
        answers : `Very.`,
        tags : [dTag.TDOLL, dTag.SKIN, dTag.ITEM]
    },
    {
        id : '00364',
        questions : `What's the optimal way of clearing ${TextStyle.style('Bingo', TextStyle.STRIKE)} Key Card Events?`,
        answers : `Using the Targeted Draws to fully clear the board in one go.`,
        tags : [dTag.MINI]
    },
    {
        id : '00365',
        questions : `What do the numbers mean when talking about tile positioning?`,
        answers : `${table(null,
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3])}`,
        tags : [dTag.ECH, dTag.NEWB]
    },
    {
        id : '00366',
        questions : `When will the current event end?`,
        answers : `If major event or collab, 4 weeks after start. If minor or mini events, 3 weeks after start.`,
        tags : [dTag.MAJOR, dTag.COLLAB, dTag.SEASON, dTag.MINI]
    },
    {
        id : '00367',
        questions : `How do we unlock the Additional Supplies/Blue Weekly Quest?`,
        answers : `By paying for the current battlepass.`,
        tags : [dTag.QUEST, dTag.BP]
    },
    {
        id : '00368',
        questions : `I've been getting dupes about 3 days when the Key Card Event started. What gives?`,
        answers : `First, "Coupon Collector's Problem". Second, ${link('it actually kinda seems rigged to some extent', 'https://www.reddit.com/r/girlsfrontline/comments/o5hpk4/weekly_commanders_lounge_june_22_2021/h2pa27f/')}.`,
        tags : [dTag.MINI]
    },
    {
        id : '00369',
        questions : `How many Parachute Fairies would I need?`,
        answers : `${List.description({
            'Casual' : ['1 - 2'],
            'Competetive' : ['3 - 5'],
            'Top Ranker' : ['6 - 10'],
            'Memer' : ['14+']
        })}`,
        tags : [dTag.FAIRY]
    },
    {
        id : '00370',
        questions : `Can Support Fairy Skills (i.e. Construction) work on Coalition units?`,
        answers : `${link('Yes.', 'https://old.reddit.com/r/girlsfrontline/comments/q1rscp/weekly_commanders_lounge_october_05_2021/hg4vntx/')}`,
        tags : [dTag.FAIRY, dTag.COALITION, dTag.BATTLE]
    },
    {
        id : '00371',
        questions : `If I plan to buy the BP, do I have to do it at the start?`,
        answers : `You can do it whenever. Whataver level you are at as F2P, that's also the level when you buy it.`,
        tags : [dTag.MISC]
    },
    {
        id : '00372',
        questions : `Where do I get Transfer Catalysts?`,
        answers : `Daily gifts, failed captures, PA store.`,
        tags : [dTag.PA, dTag.ITEM]
    },
    {
        id : '00373',
        questions : `How do I get my daily resources from quests?`,
        answers : `Do any of the dailies until it has 6 icons, then a blue gift box with obtainable will appear, and finally tap on it to claim it.`,
        tags : [dTag.QUEST, dTag.MARP, dTag.ITEM]
    },  //@Visual
    {
        id : '00374',
        questions : `I want a specific unit. How will I be able to pull for them in this banner?`,
        answers : `${List.description({
            'Pulses' : [
                'Only works for the three units on the field at that time.',
                'Once an attempt is made, captured or not, they will be replaced with another unit from the pool.'
            ],
            'Svarog' : ['Pulls from the entire pool, but chances depend on how many are left in the pool.']
        })}`,
        tags : [dTag.PA, dTag.COALITION, dTag.GET]
    },
    {
        id : '00375',
        questions : `What are the possible dailies and weeklies for the 3.0 quests?`,
        answers : `${Embed.google(Embed.G_EXCEL,  '1gyn-6r_XBriYonFpj-RPkoQnCK36StTWJ0E5_yTU048')}<br>
        This also counts as a brief overview of the system.`,
        tags : [dTag.QUEST]
    },
    {
        id : '00376',
        questions : `Is there any way to rewatch the PA tutorial?`,
        answers : `${Embed.youtube('tD7JgQcIQHM')}<br>
        ${Embed.youtube('_s9ZY5wDLYE')}`,
        tags : [dTag.PA, dTag.LORE]
    },
    {
        id : '00377',
        questions : `What are Original and Pure Samples?`,
        answers : `Used in the Intelligence Center to craft for FST chips and central data.`,
        tags : [dTag.HOC, dTag.ITEM]
    },
    {
        id : '00378',
        questions : `Can I increase the ringleader's 25% capture rate?`,
        answers : `Drop the pool until you have 3/100 then use Svarog tickets.`,
        tags : [dTag.PA]
    },
    {
        id : '00380',
        questions : `Do I need Dummy Cores for upgrading Coalition Units?`,
        answers : `No. They have their own resources.`,
        tags : [dTag.COALITION, dTag.LEVEL, dTag.ITEM]
    },
    {
        id : '00381',
        questions : `How long do ringleader banners last?`,
        answers : `28 days. Anniversary banners last for 1 week.`,
        tags : [dTag.PA]
    },
    {
        id : '00382',
        questions : `Can I change the command type (Defend/Charge/Destroy) automatically?`,
        answers : `No can do for now.`,
        tags : [dTag.COALITION, dTag.BATTLE]
    },
    {
        id : '00383',
        questions : `I have one copy of a ringleader. Can I scrap them?`,
        answers : `Why would you? How could you? Can you even anyway?`,
        tags : [dTag.PA, dTag.COALITION]
    },
    {
        id : '00384',
        questions : `How are the Striker's ROF calculated?`,
        answers : `${link('u/UnironicWeeaboo testing.', 'https://www.reddit.com/r/girlsfrontline/comments/qkzc9s/comment/hjecs3p/')}`,
        tags : [dTag.ENEMY, dTag.COALITION]
    },
    {
        id : '00385',
        questions : `How do I stop my dolls from retreating on critical damage?`,
        answers : `Heavy Damage Protection off in Game Settings or in Combat Pause Settings.`,
        tags : [dTag.BATTLE]
    },  //@Visual
    {
        id : '00386',
        questions : `Can I zoom out during combat?`,
        answers : `You'd have to zoom in first. If you mean zooming well outside the doll's shooting range, then no.`,
        tags : [dTag.BATTLE]
    },
    {
        id : '00387',
        questions : `What are these nameless mails with resources?`,
        answers : `Battlepass overfill or dailies reward.`,
        tags : [dTag.QUEST, dTag.ITEM]
    },
    {
        id : '00388',
        questions : `How can I start reading Griffin Memories?`,
        answers : `Get all the dolls involved in the story. Tap a story and fill the bar at the top to progress. You can fill it up by doing the missions at the right side of the bar.`,
        tags : [dTag.SIDE]
    },
    {
        id : '00389',
        questions : `Do debuffs stick if I retreat my dolls?`,
        answers : `Rudimentary testing says no. Mainly applies to enemy side on-screen effects like molotovs, smoke, grenade, stun, etc.`,
        tags : [dTag.SKILL, dTag.BATTLE, dTag.SYSMECH]
    },
    {
        id : '00390',
        questions : `What happens to the Resupply Exchange Tickets after the banner ends? How do I get Black Cards?`,
        answers : `${image('./assets/images/ResupplyMechanics.png')}`,
        tags : [dTag.RESUPPLY, dTag.ITEM, dTag.GET]
    },
    {
        id : '00391',
        questions : `When all dolls' DPS contribution is equal, who becomes the MVP?`,
        answers : `By acquire sequence starting from latest, including collab units. MODding affects nothing.`,
        tags : [dTag.TDOLL, dTag.BATTLE, dTag.LEVEL]
    },
    {
        id : '00392',
        questions : `Can I change which dolls get targeted by the enemy?`,
        answers : `${link('By echelon positioning.', 'https://www.reddit.com/r/girlsfrontline/comments/g11mag/weekly_commanders_lounge_april_14_2020/fny91zz/')}<br>
        ${spoilerSummary('In-depth study on positioning, targeting, and some peculiar requirements involving acquire dates.', Embed.google(Embed.G_WORD, '1LPqpSCNWiu1HJOnK1FOB1o30FSwTQRQvcK-tAjO4SSI'))}`,
        tags : [dTag.BATTLE]
    },
    {
        id : '00281',
        questions : `How are the limited bonus gems for the monrhly card applied?`,
        answers : `Only within the time the event is ongoing, which is for a week. Note that it immediately becomes active as long as a monthly gem is active, old or new purchase.`,
        tags : [dTag.GEMS]
    },
    {
        id : '00045',
        questions : `If I bought the battlepass in the middle/end, will I still able to get the previous level rewards?`,
        answers : `Yes.`,
        tags : [dTag.QUEST, dTag.BP]
    },
    {
        id : '00379',
        questions : `Where can I use Calibration Tickets?`,
        answers : `Equipment Calibration, Fairy Talent Calibration, HOC Chip Rotation, More Anticipation...`,
        tags : [dTag.ITEM]
    },
    {
        id : '00393',
        questions : `Do first purchase gem bonus reset?`,
        answers : `Only on server anniversary which, on Global, is on May.`,
        tags : [dTag.GEMS]
    },
    {
        id : '00394',
        questions : `If I buy multiple Monthly Gem Packages, will it stack?`,
        answers : `As in more than 30 a day? No. It being a 2 month distribution? Yes.`,
        tags : [dTag.GEMS]
    },
    {
        id : '00395',
        questions : `How rare are Quick Repair Tickets?`,
        answers : `As rare as water on a beach.`,
        tags : [dTag.ITEM]
    },
    {
        id : '00396',
        questions : `Which should I prioritize in the Data Room, Combat Reports or Special Combat Reports?`,
        answers : `SCRs primarily because you can just corpse drag, and auto-battle the dolls, and also because basecamp sells far more CR than SCR. Note that you'd need 5000 SCRs to fully level a fresh HOC.`,
        tags : [dTag.ITEM, dTag.LEVEL]
    },
    {
        id : '00397',
        questions : `I've seen players have around 500 T-doll contracts. How did they have that much?`,
        answers : `Logistics and doing production for daily quests. The last one basically applies to long-time players though.`,
        tags : [dTag.ITEM]
    },
    {
        id : '00398',
        questions : `How do I unlock mortars and anti-tanks?`,
        answers : `FSTs can only be unlocked by their respective Central Data. These can be acquired from their Theater runs or at the Intelligence Analysis gacha pool.`,
        tags : [dTag.HOC, dTag.FST, dTag.GET]
    },
    {
        id : '00399',
        questions : `When do we get discounted tokens?`,
        answers : `Around x-mas, cny, anni, April 16 week, and the likes.`,
        tags : [dTag.RESUPPLY, dTag.ITEM]
    },
    {
        id : '00400',
        questions : `If I bought a Monthly Gem Card, do I get them immediately every day or do I have to log-in?`,
        answers : `Sent as mail, procured as mail, expires as mail.`,
        tags : [dTag.GEMS]
    },
    {
        id : '00401',
        questions : `Do debuffs stack i.e. smoke, stat downs?`,
        answers : `Unless stated otherwise, yes.`,
        tags : [dTag.SKILL]
    },
    {
        id : '00402',
        questions : `How many combat reports should I have ideally?`,
        answers : `660 CRs to raise a doll from Lv.1 to Lv.90.<br>
        As for how much is the recommended stock, if your main source of raising dolls is map leveling/corpse dragging, you'll get a truck load of them before you know it.`,
        tags : [dTag.TDOLL, dTag.LEVEL]
    },
    {
        id : '00403',
        questions : `Anyone knows what resources and how much do we get for a failed PA capture?`,
        answers : `${image('./assets/images/CaptureFail.png', 'Slashes are because probability')}`,
        tags : [dTag.ITEM, dTag.PA]
    },
    {
        id : '00404',
        questions : `How often do Electronic Impulses replenish?`,
        answers : `With a maxed-out Impulse Reactor, 2 a day.`,
        tags : [dTag.PA, dTag.ITEM]
    },
    {
        id : '00405',
        questions : `Why are the gem package names incorrect/confusing?`,
        answers : `${link('Explanation 1.', 'https://www.reddit.com/r/girlsfrontline/comments/q1rscp/weekly_commanders_lounge_october_05_2021/hg3xpyr/')}<br>
        ${link('Explanation 2.', 'https://www.reddit.com/r/girlsfrontline/comments/mzjdl5/weekly_commanders_lounge_april_27_2021/gwrie7y/')}`,
        tags : [dTag.GEMS]
    },
    {
        id : '00406',
        questions : `How do dorms work?`,
        answers : `${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/what-happens-in-the-dorms-stays-in-the-dorms')}`,
        tags : [dTag.DORM]
    },
    {
        id : '00407',
        questions : `I see posters of certain dolls on some of my friends' dorm walls. How do I get them?`,
        answers : `It's either from a skin where you give it to a doll, mail reward, or a campaign poster that can bought in the cafe.`,
        tags : [dTag.DORM, dTag.FURN]
    },
    {
        id : '00000',
        questions : ``,
        answers : ``,
        tags : []
    },
];

export const newCards = [];