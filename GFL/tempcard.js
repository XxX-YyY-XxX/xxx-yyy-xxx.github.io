const tags = {
    SF : 'SangvisFerri'
};
Object.freeze(tags)

function image(link, onHover = '', onLoadFail = '') {
 return `<img src="${link}" alt="${onLoadFail}" title="${onHover}" />`
}

data = [
    {
        questions : `Which SF units are considered dolls/machines/armored/unarmored?`,
        answers : `<p>${image('/GFL/assets/images/SFEnemy.png', 'Note that Jupiter Cannons count as unarmored machine type')}</p>`,
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



