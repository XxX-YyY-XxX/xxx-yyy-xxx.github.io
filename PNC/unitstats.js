import {table, tableSort, initializeHTML} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async} from "../univasset/scripts/externaljavascript.js";

/** @type {Array} */ const units = await Async.getJSON('./unitstats.json').slice(0, -1);

const str = x => initializeHTML("td", {textContent: x});
const int = x => initializeHTML("td", {textContent: x});
const per = x => initializeHTML("td", {textContent: `${x}%`});

/* table(document.querySelector('#main_content div'),
    stats,
    {sort: true, frzcol: true, frzhdr: true}); */

tableSort(document.querySelector("#main_content div"),
    units.map(({name, hp, atk, hash, pdef, odef, aspd, crate, cdmg, ppen, open, dodge, regen, cdr, res, backlash, dmgamp, dmgreduc, healamp}) => 
        [name, hp, atk, hash, pdef, odef, aspd, crate, cdmg, ppen, open, dodge, regen, cdr, res, backlash, dmgamp, dmgreduc, healamp]),
    [str, int, int, int, int, int, int, per, per, int, int, per, int, per, int, per, per, per, per],
    {frzcol: true, frzhdr: true}
)