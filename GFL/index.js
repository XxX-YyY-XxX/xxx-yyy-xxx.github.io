import {timer} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';

timer(
    document.getElementById("event"),
    "Aug 28, 2023 23:59 UTC-0800",
    "https://www.iopwiki.com/images/9/9d/Longitudinal_Strain_Login_Wallpaper.jpg",
    {onEnd: timer.bind(
        null, document.getElementById("event"),
        "",
        ""
    )}
);

timer(
    document.getElementById('battlepass'),
    "Aug 06, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/FznK2EmXoAENbqH?format=jpg&name=large",
    {onEnd: timer.bind(
        null, document.getElementById('battlepass'),
        "Sep 10, 2023 23:59 UTC-0800",
        "https://pbs.twimg.com/media/F2gi8PsaQAUVfgH?format=jpg&name=large"
    )}
);

timer(
    document.getElementById("coalition"),
    "Aug 21, 2023, 23:59 UTC-0800",
    "./assets/images/coalition/AlinaMosasaurRider.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        ""
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Aug 28, 2023 23:59 UTC-0800",
    "https://iopwiki.com/images/e/e2/Black_Sails_on_Cerulean_Seas_Login_Wallpaper.jpg",
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