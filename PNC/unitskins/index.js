import {Async} from "../../univasset/scripts/externaljavascript";

/** @type {Promise<BannerData[]>} */ const BANNERS_PROMISE = Async.getJSON("./banners.json");
/** @type {Promise<SkinData[]>} */ const SKINS_PROMISE = Async.getJSON("./skins.json");
/** @type {Promise<UnitObject[]>} */ const UNITS_PROMISE = Async.getJSON("../units.json");












class Skin {
    /** @param {SkinData} skin_object */
    constructor(skin_object) {
        this.name = skin_object.name;
        this.unit = skin_object.unit;
        this.banner = skin_object.banner;
        this.cost = skin_object.cost;
        this.tags = skin_object.tags;
    }
}

function matrix(title, header, leader, data, key, headkey = x => x, leadkey = x => x) {
    const base_array = [[title, ...header]];

    const x_len = header.length;
    for (const item of leader) base_array.push([item, ...Array(x_len).fill('')]);

    const head_copy = header.map(headkey);
    const lead_copy = leader.map(leadkey);
    for (const item of data) {
        const [x_axis, y_axis] = key(item);
        base_array[lead_copy.indexOf(y_axis) + 1][head_copy.indexOf(x_axis) + 1] = item;
    }

    return base_array;
}


















const BANNERS = await BANNERS_PROMISE;

for (const iterator of ["Agent", "Amount", "Status", ...BANNERS.map(x => x.name)]) {
    
}