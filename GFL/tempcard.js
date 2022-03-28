const tags = {
    SF : 'SangvisFerri'
};
Object.freeze(tags)

function image(link, onHover = '', onLoadFail = 'Image cannot be loaded.') {
    if (onHover) {
        return `<img src="${link}" alt="${onLoadFail}" title="${onHover}" />`        
    } else {
        return `<img src="${link}" alt="${onLoadFail}" />`
    }
}

data = [
    {
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `<p>${image('/GFL/assets/images/SFEnemy.png')}</p>
        <p>Note that Jupiter Cannons count as unarmored machine type.</p>`,
        tags : [tags.SF]
    },
    {
        "questions" : "b",
        "answers" : "2",
        "tags" : ["y"]
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

/* questions : ``,
answers : `<p></p>`,
tags : [] */