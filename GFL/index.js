import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
    document.getElementById("event"),
    "Aug 28, 2023 23:59 UTC-0800",
    "https://www.iopwiki.com/images/9/9d/Longitudinal_Strain_Login_Wallpaper.jpg",
    {onEnd: timer.bind(
        null, document.getElementById("event"),
        "Sep 18, 2023 23:59 UTC-0800",
        "./assets/images/timer/ujmrjucqfsib1.webp"
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
        "Sep 18, 2023 23:59 UTC-0800",
        "./assets/images/coalition/Scarecrow.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Aug 28, 2023 23:59 UTC-0800",
    "./assets/images/timer/SkinBannerNow.webp",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "Sep 25, 2023 23:59 UTC-0800",
        "./assets/images/timer/a7bhcugaxlib1.webp"
    )}
);

timer(
    document.getElementById('mini-event'),
    "Sep 18, 2023 23:59 UTC-0800",
    "./assets/images/timer/9btufbjh4tjb1.webp"
);

//timer(document.getElementById('extra'), "",
//    "");