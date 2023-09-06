class Algorithm {
    /** @type {{[Attribute: string]: number}}*/ EFFECT2;
    /** @type {{[Attribute: string]: number}}*/_mainstats;
    /** @type {{[Attribute: string]: number}}*/_substats;

    /** @param {string?} attribute @returns {number} */
    mainstat(attribute = null) {
        if (attribute)
            this.#mainstat = this._mainstats[attribute];
        return this.#mainstat;
    }

    substat1;
    substat2;
}

class Offense extends Algorithm {
    _mainstats = {

    }

    _substats = {

    }
}

class Stability extends Algorithm {
    _mainstats = {

    }

    _substats = {
        
    }
}

class Special extends Algorithm {
    _mainstats = {

    }    

    _substats = {
        
    }
}