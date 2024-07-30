import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Aug 06, 2024 00:00 UTC-0800",
   "./assets/images/timer/rpg29.webp",
   {onEnd: timer.bind(
        null, document.getElementById("event"),
        "",
        ""
    )}
);

timer(
    document.getElementById("battlepass"),
    "Aug 26, 2024 00:00 UTC-0800",
    "./assets/images/timer/j1kat1xvnlcd1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "", ""
    )}
);

timer(
    document.getElementById("coalition"),
    "Aug 20, 2024 00:00 UTC-0800",
    "./assets/images/coalition/19Cerberus.webp",
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        ""
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Aug 06, 2024 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/3/31/HK433_costume1_D.png/600px-HK433_costume1_D.png",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "Jul 30, 2024 00:00 UTC-0800",
   "./assets/images/timer/aisex5vcc9ad1.webp"
);