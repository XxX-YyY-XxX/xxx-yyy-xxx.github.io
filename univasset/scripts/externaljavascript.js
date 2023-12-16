export {cmp as compare, setattr as setAttr} from "./basefunctions/index.js";

//#region Constants
/** Close to zero value. */
const epsilon = 10 ** -10;
/** URL of current page. */
export const pageURL = window.location.origin + window.location.pathname;
//#endregion

//#region Class
/** @template T */
export class Cycle {
    #items = [];
    #index = 0;
    #length = 0;

    /** @param {Iterable<T>} items */
    constructor(items) {
        this.#items = Array.from(items);
        this.#length = items.length;
    } 

    /** @returns {T} */
    next() {
        const output = this.#items[this.#index];
        this.#index = (this.#index + 1) % this.#length
        return output;
    }

    /** @returns {T} */
    prev() {
        const output = this.#items[this.#index];
        this.#index = (this.#index || this.#length) - 1;
        return output;
    }

    /** @returns {T} */
    reset() {
        const output = this.#items[this.#index];
        this.#index = 0;
        return output;
    }
}

export class Check {
    /** @param {string} url */
    static isImage(url) {
        /* const img = new Image();
        img.onerror = function() {globalVariable = false};
        img.onload = function() {globalVariable = true};
        img.onerror = () => {console.log(url, 'failed.')};
        img.onload = () => {console.log(url, 'success.')};

        try {
            img.src = url;
        } catch {
            console.log(url, 'is epic lol.');
        }
        return globalVariable; */

        /* return new Promise(function (resolve, reject) {
            var timeout = 5000;
            var timer, img = new Image();
            img.onerror = img.onabort = function () {
                clearTimeout(timer);
                reject("error");
            };
            img.onload = function () {
                clearTimeout(timer);
                resolve("success");
            };
            timer = setTimeout(function () {
                // reset .src to invalid URL so it stops previous
                // loading, but doesn't trigger new load
                img.src = "//!!!!/test.jpg";
                reject("timeout");
            }, timeout);
            img.src = url;
        }); */

        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
}

/** Returns Promise. */
export class Async {
    /** @param {RequestInfo | URL} jsonFile @returns JSON object. */
    static async getJSON(jsonFile) {
        return fetch(jsonFile).then(response => response.json());
    }
}

/** Class for countdown timers. */
export class Timer {
    #months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    #endtime;

    /** @param {string} date Apr 03, 2023 23:59 UTC-0800 */
    constructor(date) {
        const [mo, ...rest] = date.replace(/,|(UTC)|(GMT)/g, "").replace(":", " ").split(" ");
        const [day, yr, hr, min, off] = rest.map(Number);
        const [hroff, minoff] = Math.intdiv(off, 100);
        this.#endtime = Date.UTC(yr, this.#months.indexOf(mo), day, hr - hroff, min - minoff);
    }

    get done() {return this.#endtime < Date.now()}

    /** @returns Time remaining in milliseconds. */
    get remaining() {return this.#endtime - Date.now()}
}
//#endregion

//#region Functions
/** @param {string} htmlString */
export function removeHTMLTag(htmlString) {
    return htmlString.replace(/<[^>]+>/ig, "");
}

/** @param {number} min Inclusive @param {number} max Exclusive */
export function randInt(min, max) {
    //Math.random() = [0...1)
    return Math.floor(Math.random() * (max - min)) + min;
}

/** @param {HTMLIFrameElement} iframeElement*/
export function reloadIFrame(iframeElement) {
    const temp = iframeElement.src;
    iframeElement.src = '';
    iframeElement.src = temp;
}

/** @param {string} path @returns {[string, string]} basename, extension */
export function splitExt(path) {
    //remove base url to prevent false positive
    //(new URL(path)).pathname
    
    //lastIndexOf+slice > split+replace
    var index = path.lastIndexOf('.');
    return [path.slice(0, index), path.slice(index)]
}

/**
 * @param {number} milliseconds
 * @returns {[number, number, number, number, number]} days, hours, minutes, seconds, milliseconds */
export function splitTime(milliseconds) {
    var [sec, milli] = Math.intdiv(milliseconds, 1000);
    var [min, sec] = Math.intdiv(sec, 60);
    var [hr, min] = Math.intdiv(min, 60);
    return [...Math.intdiv(hr, 24), min, sec, milli];
}
//#endregion

//#region Trial
/** Creates a two-dimensional array.
 * @param {Object} title Occupies index (0, 0) of the table.
 * @param {Array} header Ordered from left to right.
 * @param {Array} leader Ordered from top to bottom.
 * @param {Array} data Objects to populate the matrix.
 * @param {function(Object): [Object, Object]} key Return [x_key(same as in headers), y_key(same as in leaders)].
 * @param {function(Object): Object} headkey Return object that would be used for population reference.
 * @param {function(Object): Object} leadkey Return object that would be used for population reference. */
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

/** Adds memoization to function.
 * @template {function} T
 * @param {T} func
 * @returns {T} */
function memoize(func) {
    const bank = new Map();
    return function(...args) {
        if (!bank.has(args)) bank.set(args, func(...args));
        return bank.get(args);
    }
}
//#endregion

/*const oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
oXHR.onreadystatechange = function() {
    if (oXHR.readyState === 4 && oXHR.status == 200)
        questionCards = JSON.parse(this.responseText);
};
oXHR.overrideMimeType("application/json");
oXHR.open("GET", "/GFL/cards.json", true);          // true = ASYNCHRONOUS REQUEST (DESIRABLE), false = SYNCHRONOUS REQUEST.
oXHR.send(); */

//sessionStorage.outputCards = typeof(Storage) !== null ? boxes : "Sorry, your browser does not support web storage...";
//iframe.contentWindow.location.reload();

//<th rowspan="3" colspan="2">Algorithm Stats</th>
//<td colspan="2" align="center">2 Slot</td>

/* function loadImage (url, timeoutOrCallback, maybeCallback) {
    let timeout;
    let callback;

    switch (typeof timeoutOrCallback) {
        case "number":
            timeout = timeoutOrCallback;
            if (typeof maybeCallback === 'function') callback = maybeCallback;
            break;
        case "function":
            callback = timeoutOrCallback;
            break;
    }

    const promise = callback
        ? undefined
        : new Promise(resolve => void (callback = resolve));
    
    const onlyRunOnce = {once: true};
    let timerId = 0;
    let done = false;
    
    if (typeof timeout === 'number') {
        timerId = setTimeout(() => {
        done = true;
        callback(false);
        }, timeout);
    }
    
    const img = new Image();
    
    img.addEventListener('load', () => {
        if (done) return;
        clearTimeout(timerId);
        done = true;
        callback(true);
    }, onlyRunOnce);
} */

/* function imageExists(url) {
    return new Promise(resolve => {
        var img = new Image()
        img.addEventListener('load', () => resolve(true))
        img.addEventListener('error', () => resolve(false))
        img.src = url
    })
    }
    
    const url = 'http://www.google.com/images/srpr/nav_logo14.png'
    imageExists(url)
    .then(ok => console.log(`RESULT: exists=${ok}`))
    //                    => RESULT: exists=true */

/* Success
    Algorithm.name                          Algorithm       string
    Algorithm.prototype.constructor.name    Algorithm       string
    a.constructor                           <class repr>    function
    a.constructor.name                      Algorithm       string
    Object.getPrototypeOf(a)                <class>         object
    Object.getPrototypeOf(a).constructor,   <class repr>    function

    prototype:  Basically an instance representation.

*/

/* Failed
    a.constructor.toString().match(/function\s*(\w+)/)                  null
    Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]    Object
    Object.getPrototypeOf(a).prototype                                  undefined
    this.prototype                                                      undefined
*/

// cache images
// function databaseCreate() {
//     // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
//     // https://javascript.info/indexeddb
    
//     // ask user permission
//     const DB_REQUEST = indexedDB.open("Algorithms", 1);
//     DB_REQUEST.addEventListener("error", function(event) {
//         console.log("Database error.")
//     });

//     /** @type {IDBDatabase?} */ var database = null;
//     DB_REQUEST.addEventListener("success", function(event) {
//         console.log("Database success.")
//         database = this.result
//         database.addEventListener("error", function(db_event) {
//             console.warn("Database error:", this.errorCode)
//         });

//         // // This event is only implemented in recent browsers
//         // request.onupgradeneeded = (event) => {
//         //     // Save the IDBDatabase interface
//         //     const db = event.target.result;
        
//         //     // Create an objectStore for this database
//         //     const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
//         // };

//         // request.onupgradeneeded = (event) => {
//         //     const db = event.target.result;
          
//         //     // Create an objectStore to hold information about our customers. We're
//         //     // going to use "ssn" as our key path because it's guaranteed to be
//         //     // unique - or at least that's what I was told during the kickoff meeting.
//         //     const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
          
//         //     // Create an index to search customers by name. We may have duplicates
//         //     // so we can't use a unique index.
//         //     objectStore.createIndex("name", "name", { unique: false });
          
//         //     // Create an index to search customers by email. We want to ensure that
//         //     // no two customers have the same email, so use a unique index.
//         //     objectStore.createIndex("email", "email", { unique: true });
          
//         //     // Use transaction oncomplete to make sure the objectStore creation is
//         //     // finished before adding data into it.
//         //     objectStore.transaction.oncomplete = (event) => {
//         //       // Store values in the newly created objectStore.
//         //       const customerObjectStore = db
//         //         .transaction("customers", "readwrite")
//         //         .objectStore("customers");
//         //       customerData.forEach((customer) => {
//         //         customerObjectStore.add(customer);
//         //       });
//         //     };
//         //   };
//     });
    
// }

// /**
//  * @template T
//  * @param {T} object 
//  * @returns {Readonly<T>}
//  */
// function deepFreeze(object) {
//     // Retrieve the property names defined on object
//     const propNames = Reflect.ownKeys(object);
  
//     // Freeze properties before freezing self
//     for (const name of propNames) {
//       const value = object[name];
  
//       if ((value && typeof value === "object") || typeof value === "function") {
//         deepFreeze(value);
//       }
//     }
  
//     return Object.freeze(object);
//   }

// function deepFreeze(o,promises,oldestParent){
//     promises = promises || [];
//     oldestParent = oldestParent || o;
//     promises.push(
//         Promise.resolve().then(function(){
//             Object.values(Object.freeze(o)).forEach(function(d,i){
//                 typeof d === "object" && deepFreeze(d,promises,oldestParent);
//             });
//             return oldestParent;
//         })
//     );
//     return Promise.all(promises).then((a)=>a[0]);
// }