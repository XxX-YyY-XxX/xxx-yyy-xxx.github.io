const tags = {
    EMPTY : 'Others',
    SF : 'SangvisFerri',
    ACCT : 'AccountManagement',
    TECH : 'Troubleshooting',
    '3P' : 'ThirdParty'
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
        answers : `<p>${image('/GFL/assets/images/SFEnemy.png')}</p>
        <p>Note that Jupiter Cannons count as unarmored machine type.</p>`,
        tags : [tags.SF]
    },
    {
        questions : `Will there be problems with switching between multiple devices regularly?`,
        answers : `<p>Only if you think that manually logging in every switch is a problem.</p>`,
        tags : [tags.ACCT]
    },
    {
        questions : `Where to go for tech support?`,
        answers : `<p>FB and Twitter is said to be responsive enough. Or you can use ${link('this', 'https://forms.gle/bZNnQeh5sJaD3pim8')} for reporting.</p>`,
        tags : [tags.TECH, tags["3P"]]
    },
    {
        questions : ``,
        answers : `<p></p>`,
        tags : []
    },
    {
        "questions" : "e",
        "answers" : "5",
        "tags" : []
    },
    {
        questions : ``,
        answers : `<p></p>`,
        tags : []
    }
]
Object.freeze(data);