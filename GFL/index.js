import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Jun 17, 2025 00:00 UTC-0800",
   "./assets/images/timer/dz94kjpln93f1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Jun 02, 2025 00:00 UTC-0800",
    "./assets/images/timer/0x9eo0abm3we1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "Jul 07, 2025 00:00 UTC-0800",
        //"./assets/images/timer/0x9eo0abm3we1.webp", M14
    )}
);

timer(
    document.getElementById("coalition"),
    "Jun 17, 2025 00:00 UTC-0800",
    "./assets/images/coalition/28Beluga.webp"
);

timer(
    document.getElementById('skin-banner'),
    "Jun 03, 2025 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/5/52/8th_Anniversary_Login_Wallpaper.jpg/600px-8th_Anniversary_Login_Wallpaper.jpg"
);

timer(
   document.getElementById('mini-event'),
   "May 29, 2025 00:00 UTC-0800",
   "./assets/images/timer/h0aec5xxr2ze1.webp"
);