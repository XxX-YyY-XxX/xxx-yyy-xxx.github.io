//Add "include inside of include"
//const external = importScripts('/univasset/scripts/externaljavascript.js')

var includes;
while (includes = Array.from(document.getElementsByTagName('include'))) {
    for (const include of includes) {
        var file = include.getAttribute('src');
        //if (file.endsWith('.html')) 
        fetch(file)
            .then(response => {
                return response.text()
            })
            .then(data => {
                include.outerHTML = data;
            });                
    }
    //includes = Array.from(document.getElementsByTagName('include'));
}

/*
function includeHTML() {
    const z = document.getElementsByTagName("*");
    for (let i = 0; i < z.length; i++) {
        const element = z[i];
        const file = element.getAttribute("w3-include-html");
        if (file) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    switch (this.status) {
                        case 200:
                            element.innerHTML = this.responseText;
                            break;
                        case 404:
                            element.innerHTML = file + " not found.";
                            break;
                        default:
                            element.innerHTML = this.status;
                            break;
                    }
                    element.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

includeHTML();
*/

//<iframe src="/univasset/styleheader.html" onload="this.insertAdjacentHTML('afterend', (this.contentDocument.body||this.contentDocument).innerHTML);this.remove()"></iframe>
//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}