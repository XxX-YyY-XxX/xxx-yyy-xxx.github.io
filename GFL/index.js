import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Dec 25, 2023 23:59 UTC-0800",
   "https://iopwiki.com/images/7/71/Event_Logo_One_Coin_Short.png"
);

timer(
    document.getElementById("battlepass"),
    "Dec 24, 2023 23:59 UTC-0800",
    "./assets/images/timer/1zqlm8vfpn0c1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "Jan 28, 2024 23:59 UTC-0800",
        "./assets/images/timer/.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Jan 08, 2024 23:59 UTC-0800",
    "./assets/images/coalition/17DestroyerDashingReindeer.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        "./assets/images/coalition/.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Dec 18, 2023 23:59 UTC-0800",
    "./assets/images/timer/2kcrg4upyo1c1.webp",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "Jan 15, 2024 23:59 UTC-0800",
        "https://iopwiki.com/images/c/c8/Dreams_By_The_Fireplace_Login_Wallpaper.png"
    )}
);

timer(
   document.getElementById('mini-event'),
   "Jan 08, 2024 23:59 UTC-0800",
   "./assets/images/timer/yblyicqyc76c1.webp"
);

//timer(document.getElementById('extra'), "",
//    "");