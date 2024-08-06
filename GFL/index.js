import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Aug 06, 2024 00:00 UTC-0800",
   "./assets/images/timer/rpg29.webp",
   {onEnd: timer.bind(
        null, document.getElementById("event"),
        "Aug 27, 2024 00:00 UTC-0800",
        "./assets/images/timer/maxresdefault.jpg"
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
        "Sep 03, 2024 00:00 UTC-0800",
        "https://iopwiki.com/images/thumb/e/ed/Colt_Walker_costume2_D.png/600px-Colt_Walker_costume2_D.png"
    )}
);

timer(
   document.getElementById('mini-event'),
   "Aug 27, 2024 00:00 UTC-0800",
   "./assets/images/timer/e1o0sy2tk7gd1.webp"
);