import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Jan 14, 2025 00:00 UTC-0800",
   "./assets/images/timer/81tle0fx5r8e1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Feb 17, 2025 00:00 UTC-0800",
    "./assets/images/timer/6jfxcrsw5rae1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "",
        "",
    )}
);

timer(
    document.getElementById("coalition"),
    "Feb 04, 2025 00:00 UTC-0800",
    "./assets/images/coalition/02Executioner.webp",
    {onEnd: timer.bind(null,
        document.getElementById("coalition"),
        "Mar 04, 2025 00:00 UTC-0800",
        "./assets/images/coalition/01Scarecrow.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Jan 29, 2025 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/2/20/SCAR-H_costume1_D.png/600px-SCAR-H_costume1_D.png",
    {onEnd: timer.bind(null,
        document.getElementById('skin-banner'),
        "Feb 25, 2025 00:00 UTC-0800",
        "https://iopwiki.com/images/thumb/1/17/QBZ-191_costume4_D.png/600px-QBZ-191_costume4_D.png"
    )}
);

timer(
   document.getElementById('mini-event'),
   "Feb 18, 2025 00:00 UTC-0800",
   "./assets/images/timer/4e1djfsvg3ee1.webp"
);