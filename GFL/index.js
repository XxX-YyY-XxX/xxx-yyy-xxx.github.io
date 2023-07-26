import {timer} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';

timer(
    document.getElementById("event"),
    "Jul 31, 2023 23:59 UTC-0800",
    "https://iopwiki.com/images/c/c1/Event_Logo_The_Waves_Wrangler.png"
);

timer(
    document.getElementById('battlepass'),
    "Aug 06, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/FznK2EmXoAENbqH?format=jpg&name=large",
    {onEnd: timer.bind(
        null, document.getElementById('battlepass'),
        "",
        ""
    )}
);

timer(
    document.getElementById("coalition"),
    "Jul 24, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/gpcqmircib791.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=e759a38a125f49b7aefff4a520347e72835ba14d", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "Aug 21, 2023, 23:59 UTC-0800",
        "https://preview.redd.it/f0eaevu2d2d91.jpg?width=1601&format=pjpg&auto=webp&v=enabled&s=d9cf80afd332b98cdf250334076983d90355ccb6"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Jul 31, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/F0MKr92aAAIajnt?format=jpg&name=large",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

//timer(document.getElementById('mini-event'), "",
//    "");

//timer(document.getElementById('extra'), "",
//    "");