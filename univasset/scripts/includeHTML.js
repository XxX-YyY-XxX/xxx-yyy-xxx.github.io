for (const include of document.getElementsByTagName('include')) {
    fetch(include.getAttribute('src'))
        .then(response => {
            return response.text()
        })
        .then(data => {
            include.outerHTML = data;
        });                
}