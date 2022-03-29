const tags = {
    EMPTY : 'Others',
    SF : 'SangvisFerri',
    ACCT : 'AccountManagement'
};
Object.freeze(tags)

function image(link, onHover = '', onLoadFail = 'Image cannot be loaded.') {
    if (onHover) {
        return `<img src="${link}" alt="${onLoadFail}" title="${onHover}" />`        
    } else {
        return `<img src="${link}" alt="${onLoadFail}" />`
    }
}

const data = [
    {
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `${image('/GFL/assets/images/SFEnemy.png')}
        <p>Note that Jupiter Cannons count as unarmored machine type.</p>`,
        tags : [tags.SF]
    },
    {
        questions : `Will there be problems with switching between multiple devices regularly?`,
        answers : `Only if you think that manually logging in every switch is a problem.`,
        tags : [tags.ACCT]
    },
    {
        "questions" : "c",
        "answers" : "3",
        "tags" : ["y", "f"]
    },
    {
        "questions" : "d",
        "answers" : "4",
        "tags" : ["w"]
    },
    {
        "questions" : "e",
        "answers" : "5",
        "tags" : []
    }
]
Object.freeze(data);

/* questions : ``,
answers : `<p></p>`,
tags : [] */