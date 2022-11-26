import {reloadIFrame} from '/univasset/scripts/externaljavascript.js';

export default class Embed {
    /** @param {string} docType @param {string} id */
    static google(docType, docID) {
        return `<figure>
            <iframe src="${docLink}/preview?pli=1" loading="lazy"></iframe>
            <figcaption><a onclick="refreshDoc(this)">Reload Frame</a> \| <a href="${docLink}">Source Link</a></figcaption>
        </figure>`;
    }

    /** @param {string} videoID Youtube video or playlist ID*/
    static youtube(videoID) {
        var temp;
        switch (videoID.length) {
            case 11:
                temp = videoID;
                break;
            case 99:
                /* Needs check */
                temp = `videoseries?list=${videoID}`;
                break;
            default:
                console.log('Youtube ID:', videoID.length)
                return '';
        }
        return `<iframe src="https://www.youtube.com/embed/${videoID.length == 11 ? videoID : `videoseries?list=${videoID}`}" loading="lazy" allowfullscreen></iframe>`;
    }

    /** @param {string} videoID */
    static streamable(videoID) {
        return `<iframe src="https://streamable.com/e/${videoID}" loading="lazy" allowfullscreen></iframe>`;
    }

    /** Create an innerHTML text for Twitter embeds.
     * @param {string} handle
     * @param {string} id */
    static twitter(handle, id) {
        return `<blockquote class="twitter-tweet">
            <a href="https://twitter.com/${handle}/status/${id}?ref_src=twsrc%5Etfw">Source Tweet</a>
        </blockquote>`;
    }
}

/** @param {HTMLElement} element */
/* window.refreshDoc = function(element) {
    reloadIFrame(element.parentElement.previousElementSibling);
} */

/** @param permalink ...comments/${permalink}/?...*
function redditEmbed(permalink) {                                       //needs more fix, how to check support
    return `<a href="https://www.reddit.com/r/girlsfrontline/comments/${permalink}/">For load fail purposes.</a><br>
    <iframe id="reddit-embed" src="https://www.redditmedia.com/r/girlsfrontline/comments/${permalink}/?depth=1&amp;showmore=false&amp;embed=true&amp;showmedia=false&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="278" width="640" scrolling="no"></iframe>`
}*/
