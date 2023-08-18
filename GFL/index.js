import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

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
    document.getElementById("battlepass"),
    "Sep 10, 2023 23:59 UTC-0800",
    "./assets/images/timer/BattlepassNow.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        "./assets/images/timer/BattlepassNext.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Aug 28, 2023, 23:59 UTC-0800",
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
    "./assets/images/timer/SkinBannerNow.webp",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        "./assets/images/timer/SkinBannerNext.webp"
    )}
);

//timer(document.getElementById('mini-event'), "",
//    "");

//timer(document.getElementById('extra'), "",
//    "");