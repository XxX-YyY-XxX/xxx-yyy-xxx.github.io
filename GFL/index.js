import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

// timer(
//    document.getElementById("event"),
//    "",
//    ""
// );

timer(
    document.getElementById("battlepass"),
    "Mar 04, 2024 23:59 UTC-0800",
    "./assets/images/timer/vbkwzn9f4bec1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        "./assets/images/timer/.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Feb 05, 2024 24:00 UTC-0800",
    "./assets/images/coalition/06Architect.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "Mar 05, 2024 24:00 UTC-0800",
        "./assets/images/coalition/23ScarecrowDemonicAbyss.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Feb 12, 2024 23:59 UTC-0800",
    "https://iopwiki.com/images/5/5e/Frost_of_Winter_Dreams_Login_Wallpaper.jpg",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "Feb 12, 2024 23:59 UTC-0800",
   "./assets/images/timer/pjuc8kn82xcc1.webp"
);

//timer(document.getElementById('extra'), "",
//    "");