//Add "include inside of include"/ Nested includes
//importScripts('/univasset/scripts/externaljavascript.js')

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
    }    
}

includeFile();

//var a = new DOMParser()
//a.parseFromString()

//<iframe src="/univasset/styleheader.html" onload="this.insertAdjacentHTML('afterend', (this.contentDocument.body||this.contentDocument).innerHTML);this.remove()"></iframe>
//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}