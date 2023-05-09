import {tableSort, initializeHTML, brJoin, radioGroup} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async} from "../univasset/scripts/externaljavascript.js";

const statelem = document.querySelector("#stats"), dataelem = document.querySelector("#data");
radioGroup(document.querySelector("#button"), "tables",
    [initializeHTML("h2", {textContent: "Stats"}), "stat", function(x) {statelem.style.display = x.checked ? "block" : "none"}],
    [initializeHTML("h2", {textContent: "Others"}), "data", function(x) {dataelem.style.display = x.checked ? "block" : "none"}]
);

/** @type {Array} */ const units = (await Async.getJSON('./unitstats.json')).slice(0, -1);

/** @param {HTMLTableCellElement} x @param {string | number} y */
const str = (x, y) => {x.textContent = y};
/** @param {HTMLTableCellElement} x @param {number} y */
const per = (x, y) => {x.textContent = `${y}%`};
/** @param {HTMLTableCellElement} x @param {string[]} y */
const arr = (x, y) => {x.appendChild(brJoin(y))};
/** @param {HTMLTableCellElement} x @param {{[s: string]: string}} y */
const ref = (x, y) => {x.appendChild(brJoin(Object.entries(y).map(([name, link]) => initializeHTML("a", {textContent: name, href: link}))))};

tableSort(document.querySelector("#stats > div"),
    units.map(({name, hp, atk, hash, pdef, odef, aspd, crate, cdmg, ppen, open, dodge, regen, cdr, res, backlash, dmgamp, dmgreduc, healamp}) => 
        [name, hp, atk, hash, pdef, odef, aspd, crate, cdmg, ppen, open, dodge, regen, cdr, res, backlash, dmgamp, dmgreduc, healamp]),
    [str, str, str, str, str, str, str, per, per, str, str, per, str, per, str, per, per, per, per],
    {frzcol: true, frzhdr: true}
);

tableSort(document.querySelector("#data > div"),
    units.map(x => [x.name, x.class, x.reference, x.fragments]),
    [str, str, ref, arr],
    {frzcol: true, frzhdr: true}
);