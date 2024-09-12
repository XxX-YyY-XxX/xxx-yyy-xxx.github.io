import { brJoin } from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import { details } from "../../univasset/scripts/html";

/**
 * @typedef Logs
 * @property {string} date
 * @property {number[] | number} added
 * @property {number[] | number} updated
 * @property {number[] | number} deleted
 * @property {string[]} others
 */

/** @type {Promise<Logs[]>} */ const LOG_PROMISE = fetch("./index.json").then(x => x.json());

const SECTION = document.querySelector("section");
for (const LOG of (await LOG_PROMISE).reverse()) {
    const LOG_ARRAY = []

    if (typeof LOG.added == "number")
        LOG_ARRAY.push(`Added ${LOG.added} cards.`);
    else if (LOG.added.length)
        LOG_ARRAY.push(`Added ID${LOG.added.length == 1 ? "" : "s"} ${LOG.added.join(", ")}.`);

    if (typeof LOG.updated == "number")
        LOG_ARRAY.push(`Updated ${LOG.updated} cards.`);
    else if (LOG.updated.length)
        LOG_ARRAY.push(`Updated ID${LOG.updated.length == 1 ? "" : "s"} ${LOG.updated.join(", ")}.`);

    if (LOG.deleted.length)
        LOG_ARRAY.push(`Deleted ID${LOG.deleted.length == 1 ? "" : "s"} ${LOG.deleted.join(", ")}.`);
    
    LOG_ARRAY.push(...LOG.others);

    SECTION.appendChild(details(LOG.date, brJoin(LOG_ARRAY)));
}
