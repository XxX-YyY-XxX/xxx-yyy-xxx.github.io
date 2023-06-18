import {nestElements} from "./htmlgenerator/htmlgenerator";

/** @template T */
class Table {
    #datalist;
    
    /** @param {T[]} datalist */
    constructor(datalist) {
        this.#datalist = datalist.slice();
    }

    /** Returns a generic table.
     * @param {(string | Node)[]} headrow 
     * @param {(function(T): string | Node)[]} rowmap 
     * @param {{frzcol: boolean, frzhdr: boolean}}
     * @returns {HTMLTableElement} */
    normal(headrow, rowmap, {frzcol = false, frzhdr = false} = {}) {
        const [THEAD, HEADER_TR] = nestElements("thead", "tr");
        HEADER_TR.append(...headrow.map(value => {
            const TH = document.createElement("th");
            TH.append(value);
            return TH;
        }));

        const TBODY = document.createElement("tbody");
        TBODY.append(...this.#datalist.map(data => {
            const TR = document.createElement("tr");
            TR.append(...rowmap.map(func => {
                const TD = document.createElement("td");
                TD.append(func(data));
                return TD;
            }));
            return TR;
        }));

        const TABLE = document.createElement("table");
        TABLE.classList.add("func-table");
        TABLE.append(THEAD, TBODY);

        if (frzcol) TABLE.classList.add("freeze-col");
        if (frzhdr) TABLE.classList.add("freeze-row");

        return TABLE;
    }



    /** Creates a sortable table from a given set of data.
     * @param {(function(any): string | number | Node)[]} datamap
     * @param {(function(any): string | number | Node)[]} mapping
     * @param {{frzcol: boolean, frzhdr: boolean}} */
    sort(datamap, mapping, {frzcol = false, frzhdr = false} = {}) {
        /** @param {Array} data_array */
        function sortableRow(data_array) {
            const TR = document.createElement("tr");

            for (const [VALUE, FUNC] of zip(data_array, mapping)) {
                const TD = document.createElement("td");
                TD.append(FUNC(VALUE));
                TR.appendChild(TD);
            }

            return {list: data_array, row: TR};
        }

        const HEADER_ROW = tablematrix[0];                          //Almost always a string
        const DATA_ROWS = tablematrix.slice(1).map(sortableRow);

        const [THEAD, HEADER_TR] = nestElements("thead", "tr");

        const TBODY = document.createElement("tbody");
        TBODY.append(...DATA_ROWS.map(x => x.row));

        const TABLE = document.createElement("table");
        TABLE.append(THEAD, TBODY);

        /** @param {MouseEvent} event */
        function sortMethod(event) {
            /** @type {DOMStringMap} */ const DATA = this.dataset;
            switch (DATA.sort) {
                case "no":
                case "lo":
                    DATA.sort = "hi";
                    switch (DATA.type) {
                        case "string":
                            DATA_ROWS.sort(compare({key: ({list}) => list[DATA.index]}));
                            break;
                        case "number":
                            DATA_ROWS.sort(compare({key: ({list}) => list[DATA.index], reverse: true}));
                            break;
                        case "array":
                            DATA_ROWS.sort(compare({key: ({list}) => [~list[DATA.index].length, list[DATA.index]]}));
                            break;
                        case "object":
                            DATA_ROWS.sort(compare({key: ({list}) => {let y = Object.keys(list[DATA.index]); return [~y.length, y]}}));
                            break;
                        default:
                            console.log("Unregistered type:", DATA.type, DATA_ROWS[0].list[DATA.index]);
                            break;
                    }
                    break;
                case "hi":
                    DATA.sort = "lo";
                    switch (DATA.type) {
                        case "string":
                            DATA_ROWS.sort(compare({key: ({list}) => list[DATA.index], reverse: true}));
                            break;
                        case "number":
                            DATA_ROWS.sort(compare({key: ({list}) => list[DATA.index]}));
                            break;
                        case "array":
                            DATA_ROWS.sort(compare({key: ({list}) => [list[DATA.index].length, list[DATA.index]]}));
                            break;
                        case "object":
                            DATA_ROWS.sort(compare({key: ({list}) => {let y = Object.keys(list[DATA.index]); return [y.length, y]}}));
                        default:
                            console.log("Unregistered type:", DATA.type, DATA_ROWS[0].list[DATA.index]);
                            break;
                        }
                    break;
            }
            TBODY.replaceChildren(...DATA_ROWS.map(x => x.row));
        }

        for (const [INDEX, NAME, TYPE] of zip(range(), HEADER_ROW, DATA_ROWS[0].list.map(type))) {
            const TH = document.createElement("th");
            TH.textContent = NAME;
            TH.addEventListener("click", sortMethod, true);
            setAttr(TH.dataset, {sort: "no", index: INDEX, type: TYPE});
            HEADER_TR.appendChild(TH);
        }

        if (frzcol) TABLE.classList.add("freeze-col");
        if (frzhdr) TABLE.classList.add("freeze-row");

        grouper_elem.classList.add("func_table");
        grouper_elem.appendChild(TABLE);

        return;
    }

    filter() {

    }
}