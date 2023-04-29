import {tableSort, initializeHTML, brJoin, radioGroup} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {Async} from "../univasset/scripts/externaljavascript.js";

/** @type {Array} */ const units = (await Async.getJSON('./unitstats.json')).slice(0, -1);

const str = x => initializeHTML("td", {textContent: x});
const per = x => initializeHTML("td", {textContent: `${x}%`});
const arr = x => initializeHTML("td", {appendChild: [brJoin(x)]});
const ref = x => initializeHTML("td", {appendChild: [brJoin(Object.entries(x).map(([name, link]) => initializeHTML("a", {textContent: name, href: link})))]});

/** @type {HTMLElement} */ const statelem = document.querySelector("#stats");
/** @type {HTMLElement} */ const dataelem = document.querySelector("#data");

radioGroup(document.querySelector("#button"), "tables",
    ["Stats", "stat", function(x) {statelem.style.display = x.checked ? "block" : "none"}],
    ["Others", "data", function(x) {dataelem.style.display = x.checked ? "block" : "none"}]
);

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