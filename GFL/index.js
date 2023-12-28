import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Jan 22, 2024 23:59 UTC-0800",
   "https://iopwiki.com/images/3/35/Login_Slow_Shock.jpg"
);

timer(
    document.getElementById("battlepass"),
    "Jan 28, 2024 23:59 UTC-0800",
    "./assets/images/timer/8fawb6hfle8c1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        "./assets/images/timer/.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Jan 08, 2024 23:59 UTC-0800",
    "./assets/images/coalition/17DestroyerDashingReindeer.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "Jan 22, 2024 23:59 UTC-0800",
        "./assets/images/coalition/22Tareus.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Jan 15, 2024 23:59 UTC-0800",
    "https://iopwiki.com/images/c/c8/Dreams_By_The_Fireplace_Login_Wallpaper.png",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "Jan 08, 2024 23:59 UTC-0800",
   "./assets/images/timer/yblyicqyc76c1.webp"
);

//timer(document.getElementById('extra'), "",
//    "");