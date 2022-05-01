for (const include of document.getElementsByTagName('include')) {
    fetch(include.getAttribute('src'))
        .then(response => {
            return response.text()
        })
        .then(data => {
            include.outerHTML = data;
        });                
}

/* <div w3-include-html="/univasset/styleheader.html"></div> */

/*             function includeHTML() {
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

            includeHTML(); */