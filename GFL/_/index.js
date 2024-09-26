import { brJoin } from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import { details } from "../../univasset/scripts/html";

/**
 * @typedef Logs
 * @property {string} date
 * @property {number[] | number} added
 * @property {number[] | number} updated
 * @property {number[]} deleted
 * @property {string[]} others
 */

/** @type {Promise<Logs[]>} */ const LOG_PROMISE = fetch("./index.json").then(x => x.json());

const SECTION = document.querySelector("section");
for (const {date, added, updated, deleted, others} of (await LOG_PROMISE).reverse()) {
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

    SECTION.appendChild(details(date, brJoin(LOG_ARRAY)));
}
