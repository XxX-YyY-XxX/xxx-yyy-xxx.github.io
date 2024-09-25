import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Oct 15, 2024 00:00 UTC-0800",
   "./assets/images/timer/hf2hkoxq0dod1.webp"
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
    "Oct 15, 2024 00:00 UTC-0800",
    "./assets/images/coalition/14Alina.webp",
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        ""
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Oct 01, 2024 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/4/4f/Dancing_Heartstrings_Login_Wallpaper.jpg/600px-Dancing_Heartstrings_Login_Wallpaper.jpg",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "Sep 24, 2024 00:00 UTC-0800",
   "./assets/images/timer/b1csdrxo2dld1.webp"
);