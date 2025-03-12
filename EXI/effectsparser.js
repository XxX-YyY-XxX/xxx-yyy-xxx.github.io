/** @type {Map<string, Effect>} */ const EFFECTS = new Map();

/** @param {string} effect*/
function* a(effect) {
    const HOLD = [effect];
    /** @type {string | undefined} */ let temp;
    while ((temp = HOLD.shift()) !== undefined) {
        HOLD.unshift(...EFFECTS.get(temp).parents);
        yield temp;
    }
}