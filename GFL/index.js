import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Mar 19, 2024 00:00 UTC-0800",
   "./assets/images/timer/missionselect_2022WhiteValentine_base.png"
);

timer(
    document.getElementById("battlepass"),
    "Apr 09, 2024 00:00 UTC-0800",
    "./assets/images/timer/rlmow78yk9mc1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        "./assets/images/timer/.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Apr 02, 2024 00:00 UTC-0800",
    "./assets/images/coalition/08Alchemist.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        "./assets/images/coalition/.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Apr 09, 2024 00:00 UTC-0800",
    "https://iopwiki.com/images/d/d8/Doll_Garden_Login_Wallpaper.png",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "Apr 02, 2024 00:00 UTC-0800",
   "./assets/images/timer/4ftc6rssqnnc1.webp",
   {onEnd: timer.bind(
        null, document.getElementById('mini-event'),
        "",
        "./assets/images/timer/.webp"
   )}
);

//timer(document.getElementById('extra'), "",
//    "");