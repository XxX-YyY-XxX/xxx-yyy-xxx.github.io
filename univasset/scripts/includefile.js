for (const include of Array.from(document.getElementsByTagName('include'))) {
    fetch(include.getAttribute('src'))
        .then(response => response.text())
        .then(data => data.includes('</include>') ? nestedTags(data, include.getAttribute('param')) : data)
        .then(html => {include.outerHTML = html;});
}

/** @param {string} htmlString @param {string} params */
function nestedTags(htmlString, params) {
    //console.log('Before: ', htmlString);

    //Parameter setting
    if (params != null) {
        const json = JSON.parse(params);
        const doc = new DOMParser().parseFromString(htmlString, "text/html");
        for (const include of Array.from(doc.getElementsByTagName('include'))) {
            let key, param;

            if ((key = include.getAttribute('key')) != null) {
                htmlString = htmlString.replace(include.outerHTML, json[parseInt(key)]);
            } else if ((param = include.getAttribute('param')) != null) {
                //Untested
                let tempson = JSON.parse(param);

                for (let index = 0; index < tempson.length; index++) {
                    if (Number.isInteger(tempson[index])) {
                        tempson[index] = json[tempson[index]];
                    }
                }

                let tempstr = include.outerHTML;
                include.param = JSON.stringify(tempson);
                htmlString = htmlString.replace(tempstr, include.outerHTML);
            }
        }
    }

    //console.log('During: ', htmlString);

    //Source fetching
    if (htmlString.includes('</include>')) {
        const doc = new DOMParser().parseFromString(htmlString, "text/html");

    /*for (const include of Array.from(doc.getElementsByTagName('include'))) {
        fetch(include.getAttribute('src'))
            .then(response => response.text())
            .then(data => {
                var param = JSON.parse(include.getAttribute('param'));
                if (param != null) {
                    data = getParams(data, param)
                }            
                //while (data.includes('</include>')) {
                //    data = nestedInclude(data);
                //}
                htmlString.replace(include.outerHTML, data);
            });
    } */


    //May need recursion
    }

    //console.log('After: ', htmlString);

    return htmlString;
}





//<include key="0"></include>
//<include src="/univasset/scripts/mainpagebuttons.html" param='[0, "8"]'></include>








//document.createElement('template');







//<object name="styleheader" type="text/html" data="/univasset/styleheader.html"></object>
//<embed type="text/html" src="/univasset/styleheader.html">
//<!-- #include virtual="/univasset/styleheader.html" -->
//{% include /univasset/styleheader.html %}