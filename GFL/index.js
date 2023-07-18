import {timer} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';

timer(
    document.getElementById('event'),
    "Jul 24, 2023 23:59 UTC-0800",
    "https://iopwiki.com/images/c/c1/Event_Logo_The_Waves_Wrangler.png"
);

const nextPass = timer.bind(
        null, document.getElementById('battlepass'),
        "",
        ""
    );
timer(
    document.getElementById('battlepass'),
    "Aug 06, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/FznK2EmXoAENbqH?format=jpg&name=large",
    {onEnd: nextPass}
);

const nextUnit = timer.bind(
        null, document.getElementById("coalition"),
        "Jul 24, 2023, 23:59 UTC-0800",
        "https://preview.redd.it/gpcqmircib791.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=e759a38a125f49b7aefff4a520347e72835ba14d"
    );
timer(
    document.getElementById("coalition"),
    "Jul 17, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/7exas1lcp36b1.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=4b3bba0fee0da111ceafe07945db36db9af39d42", 
    {onEnd: nextUnit}
);

const nextBanner = timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    );
timer(
    document.getElementById('skin-banner'),
    "Jul 31, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/F0MKr92aAAIajnt?format=jpg&name=large",
    {onEnd: nextBanner}
);

//timer(document.getElementById('mini-event'), "",
//    "");

//timer(document.getElementById('extra'), "",
//    "");