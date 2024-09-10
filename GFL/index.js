import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Sep 24, 2024 00:00 UTC-0800",
   "./assets/images/timer/znx9lpmys0dd1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Sep 30, 2024 00:00 UTC-0800",
    "./assets/images/timer/rtsz1c3rmqjd1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        ""
    )}
);

timer(
    document.getElementById("coalition"),
    "Sep 17, 2024 00:00 UTC-0800",
    "./assets/images/coalition/25Narciss.webp",
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        ""
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Sep 03, 2024 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/e/ed/Colt_Walker_costume2_D.png/600px-Colt_Walker_costume2_D.png",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "Oct 01, 2024 00:00 UTC-0800",
        "https://iopwiki.com/images/thumb/4/4f/Dancing_Heartstrings_Login_Wallpaper.jpg/600px-Dancing_Heartstrings_Login_Wallpaper.jpg"
    )}
);

timer(
   document.getElementById('mini-event'),
   "Sep 24, 2024 00:00 UTC-0800",
   "./assets/images/timer/b1csdrxo2dld1.webp"
);