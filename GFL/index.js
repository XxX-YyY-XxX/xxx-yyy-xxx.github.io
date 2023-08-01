import {timer} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';

timer(
    document.getElementById("event"),
    "Jul 31, 2023 23:59 UTC-0800",
    "https://iopwiki.com/images/c/c1/Event_Logo_The_Waves_Wrangler.png",
    {onEnd: timer.bind(
        null, document.getElementById("event"),
        "Aug 28, 2023 23:59 UTC-0800",
        "https://www.iopwiki.com/images/9/9d/Longitudinal_Strain_Login_Wallpaper.jpg"
    )}
);

timer(
    document.getElementById('battlepass'),
    "Aug 06, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/FznK2EmXoAENbqH?format=jpg&name=large",
    {onEnd: timer.bind(
        null, document.getElementById('battlepass'),
        "Sep 10, 2023 23:59 UTC-0800",
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
        "https://preview.redd.it/t59sszz3hoeb1.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=1635f6809bb91092b4b22cee2f68263f389d0efb"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Jul 31, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/F0MKr92aAAIajnt?format=jpg&name=large",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "Aug 28, 2023 23:59 UTC-0800",
        "https://iopwiki.com/images/e/e2/Black_Sails_on_Cerulean_Seas_Login_Wallpaper.jpg"
    )}
);

//timer(document.getElementById('mini-event'), "",
//    "");

//timer(document.getElementById('extra'), "",
//    "");