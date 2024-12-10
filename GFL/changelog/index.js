import { brJoin } from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import { details } from "../../univasset/scripts/html/index.js";

/**
 * @typedef Log
 * @property {string} date Change to array?
 * @property {number[] | number} added
 * @property {number[] | number} updated
 * @property {number[]} deleted
 * @property {string[]} others
 */
/** @type {Promise<Log[]>} */ const LOG_PROMISE = fetch("./index.json").then(x => x.json());

document.querySelector("section").append(...(await LOG_PROMISE).reverse().map(({date, added, updated, deleted, others}) => {
    const LOG_ARRAY = []

    if (typeof added == "number")
        LOG_ARRAY.push(`Added ${added} cards.`);
    else if (added.length)
        LOG_ARRAY.push(`Added ID${added.length == 1 ? "" : "s"} ${added.join(", ")}.`);

    if (typeof updated == "number")
        LOG_ARRAY.push(`Updated ${updated} cards.`);
    else if (updated.length)
        LOG_ARRAY.push(`Updated ID${updated.length == 1 ? "" : "s"} ${updated.join(", ")}.`);

    if (deleted.length)
        LOG_ARRAY.push(`Deleted ID${deleted.length == 1 ? "" : "s"} ${deleted.join(", ")}.`);
    
    LOG_ARRAY.push(...others);

    return details(date, brJoin(LOG_ARRAY));
}));