const tags = {
    EMPTY : 'Others',
    SF : 'SangvisFerri',
    ACCT : 'AccountManagement',
    TECH : 'Troubleshooting',
    '3P' : 'ThirdParty',
    SIMS : 'CombatSimulations',
    RSC : 'Resources/Currency',
    MOD : 'NeuralUpgrade',
    NEWB : 'NewbieGuide',
    PRIME : 'TopicPrimer',
    MAIN : 'CombatMissions',
    EMU : 'Emulators',
};
Object.freeze(tags)

function image(link, onHover = '', onLoadFail = 'Image cannot be loaded.') {
    return `<img src="${link}" alt="${onLoadFail}" ${onHover ? `title="${onHover}"` : ''}>`
}

function link(linkText, link) {
    return `<a href="${link}">${linkText}</a>`;
}

function orderedList() {
    return `<ol>
    ${Array.from(arguments).map(val => `<li>${val}</li>`).join('\n')}
    </ol>`;
}

const data = [
    {
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `${image('/GFL/assets/images/SFEnemy.png')}<br>
        Note that Jupiter Cannons count as unarmored machine type.`,
        tags : [tags.SF]
    },
    {
        questions : `Will there be problems with switching between multiple devices regularly?`,
        answers : `Only if you think that manually logging in every switch is a problem.`,
        tags : [tags.ACCT]
    },
    {
        questions : `Where to go for tech support?`,
        answers : `FB and Twitter is said to be responsive enough. Or you can use ${link('this', 'https://forms.gle/bZNnQeh5sJaD3pim8')} for reporting.`,
        tags : [tags.TECH, tags["3P"]]
    },
    {
        questions : `Which combat sim is better to focus on?`,
        answers : `Data. Always data.`,
        tags : [tags.SIMS, tags.RSC]
    },
    {
        questions : `How do Neural Upgrades/MODs work?`,
        answers : `${link('Gamepress guide.', 'https://gamepress.gg/girlsfrontline/gfl-explained-neural-upgrade')}<br>
        ${link('Matsuda guide.', 'https://gfl.matsuda.tips/post/modding')}<br>
        ${link('GFC guide.', 'https://www.gflcorner.com/neural')}`,
        tags : [tags.MOD, tags.PRIME]
    },
    {
        questions : `How do I get more Quick Training Contracts?`,
        answers : `Monthlies only.`,
        tags : [tags.RSC]
    },
    {
        questions : `I can't access the new chapter even though I already cleared the prerequisite map.`,
        answers : `Beat X-6 Normal of the last chapter again. If it still doesn't appear after that, restart client.`,
        tags : [tags.MAIN, tags.TECH]
    },
    {
        questions : `Which emulators are good for GFL?`,
        answers : `${orderedList('Mumu.', 'Memu.', 'LDPlayer', 'Nox.', 'Bluestacks.')}`,
        tags : [tags.EMU]
    },
    {
        questions : ``,
        answers : ``,
        tags : []
    },
]
Object.freeze(data);