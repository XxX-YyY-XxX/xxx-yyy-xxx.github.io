//importScripts('/univasset/scripts/externaljavascript.js')

function nestedInclude() {
    //Add "include inside of include"/ Nested includes
}

function getParams() {
    /*         params = include.getAttribute('params');
        if (params) {
            paramsList = params.split(',')
        }
 */
}

function includeFile() {
    for (const include of Array.from(document.getElementsByTagName('include'))) {
        //params attribute
        fetch(include.getAttribute('src'))
            .then(response => response.text())
            .then(data => {
                //Check for nested include and params
                include.outerHTML = data;
            });
    }
}

includeFile();



//var a = new DOMParser()
//a.parseFromString()

//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}