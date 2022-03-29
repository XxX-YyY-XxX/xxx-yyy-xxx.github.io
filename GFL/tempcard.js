const tags = {
    EMPTY : 'Others',
    SF : 'SangvisFerri',
    ACCT : 'AccountManagement',
    TECH : 'Troubleshooting',
    '3P' : 'ThirdParty',
    SIMS : 'CombatSimulations',
    RSC : 'Resources/Currency'
};
Object.freeze(tags)

function image(link, onHover = '', onLoadFail = 'Image cannot be loaded.') {
    if (onHover) {
        return `<img src="${link}" alt="${onLoadFail}" title="${onHover}" />`        
    } else {
        return `<img src="${link}" alt="${onLoadFail}" />`
    }
}

function link(linkText, link) {
    return `<a href="${link}">${linkText}</a>`;
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
        questions : `Which Simulation is better to focus on?`,
        answers : `Data. Always data.`,
        tags : [tags.SIMS, tags.RSC]
    },
    {
        questions : ``,
        answers : ``,
        tags : []
    },
    {
        questions : ``,
        answers : `<p></p>`,
        tags : []
    },
    {
        questions : ``,
        answers : ``,
        tags : []
    },
]
Object.freeze(data);