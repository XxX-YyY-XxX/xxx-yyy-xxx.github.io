import {tableSort, brJoin, nestElements} from '../../univasset/scripts/htmlgenerator/htmlgenerator.js';
import {setattr} from "../../univasset/scripts/basefunctions/index.js";
import {Async} from "../../univasset/scripts/externaljavascript.js";

tableSort(
    document.querySelector("#main_content div"),
    [["Doll Name", "Reference", "Fragments"], ...(await Async.getJSON("../units.json")).slice(0, -1).map(x => [x.name, x.reference, x.fragments])],
    [
        x => x,
        x => brJoin(Object.entries(x).filter(([name, link]) => name).map(([name, link]) => setattr(document.createElement("a"), {textContent: name, href: link}))),
        x => brJoin(x)
    ],
    {frzcol: true, frzhdr: true}
);
