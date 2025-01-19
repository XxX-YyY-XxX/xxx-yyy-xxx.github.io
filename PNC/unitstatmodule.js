const SPIRIT_SAVE = new (class {
    #KEY = "spirit";
    
    /** @type {{[SpiritName: string]: [[string, string, string], [string, string, string], [string, string, string]]?}} */
    #DATA = JSON.parse(localStorage.getItem(this.#KEY) ?? "{}");

    // /** @type {{[UnitName: string]: (keyof ALGO_SETS["Offense"] | keyof ALGO_SETS["Stability"] | keyof ALGO_SETS["Special"])[][]}} */
    // #SETS = (() => {this.#DATA})();

    constructor() {}

    init() {

    }

    /** @param {string} name */
    get(name) {
        return this.#DATA[name] ?? [[], [], []];
    }

    /** @param {string} name @param {0 | 1 | 2} set @param {[string, string, string]} skills */
    set(name, set, skills) {
        if (this.#DATA[name])
            this.#DATA[name][set] = skills;
        else {
            const NEW = [["", "", ""], ["", "", ""], ["", "", ""]];
            NEW[set] = skills;
            this.#DATA[name] = NEW;
        }
    }

    /** @param {string} name */
    del(name) {
        delete this.#DATA[name];
    }

    save() {
        localStorage.setItem(this.#KEY, JSON.stringify(this.#DATA))
    }
})();
