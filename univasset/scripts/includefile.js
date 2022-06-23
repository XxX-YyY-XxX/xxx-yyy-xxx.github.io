//importScripts('/univasset/scripts/externaljavascript.js')

function nestedInclude() {
    //Add "include inside of include"/ Nested includes
    return
}

function includeFile() {
    for (const include of Array.from(document.getElementsByTagName('include'))) {
        fetch(include.getAttribute('src'))
            .then(response => {
                return response.text()
            })
            .then(data => {
                //Check for nested include
                include.outerHTML = data;
            });

        //params attribute

/*         params = include.getAttribute('params');
        if (params) {
            paramsList = params.split(',')
        }
 */    }
}

includeFile();



//var a = new DOMParser()
//a.parseFromString()

//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}