export default class Embed {
    /** Create an innerHTML text for Youtube embeds.
     * @param {string} videoID Youtube video or playlist ID*/
    static youtube(videoID) {
        var temp = {
            11 : videoID,
            34 : `videoseries?list=${videoID}`
        }[videoID.length];
        return `<iframe src="https://www.youtube.com/embed/${temp}" loading="lazy" allowfullscreen></iframe>`;
    }

    /** Create an innerHTML text for Streamable embeds.
     * @param {string} videoID */
    static streamable(videoID) {
        return `<iframe src="https://streamable.com/e/${videoID}" loading="lazy" allowfullscreen></iframe>`;
    }

    /** Create an innerHTML text for Twitter embeds.
     * @param {string} handle
     * @param {string} tweetID */
    static twitter(handle, tweetID) {
        return `<blockquote class="twitter-tweet">
            <a href="https://twitter.com/${handle}/status/${tweetID}?ref_src=twsrc%5Etfw">Source Tweet</a>
        </blockquote>`;
    }
}

/** @param permalink ...comments/${permalink}/?...*
function redditEmbed(permalink) {                                       //needs more fix, how to check support
    return `<a href="https://www.reddit.com/r/girlsfrontline/comments/${permalink}/">For load fail purposes.</a><br>
    <iframe id="reddit-embed" src="https://www.redditmedia.com/r/girlsfrontline/comments/${permalink}/?depth=1&amp;showmore=false&amp;embed=true&amp;showmedia=false&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="278" width="640" scrolling="no"></iframe>`
}*/