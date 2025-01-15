import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Jan 14, 2025 00:00 UTC-0800",
   "./assets/images/timer/81tle0fx5r8e1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Jan 13, 2025 00:00 UTC-0800",
    "./assets/images/timer/npocbwze3r4e1.webp",
    {onEnd: timer.bind(null,
        document.getElementById("battlepass"),
        "Feb 17, 2025 00:00 UTC-0800",
        "./assets/images/timer/6jfxcrsw5rae1.webp",
    )}
);

timer(
    document.getElementById("coalition"),
    "Feb 04, 2025 00:00 UTC-0800",
    "./assets/images/coalition/02Executioner.webp"
);

timer(
    document.getElementById('skin-banner'),
    "Jan 21, 2025 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/b/be/M26-MASS_costume1_D.png/600px-M26-MASS_costume1_D.png",
    {onEnd: timer.bind(null,
        document.getElementById('skin-banner'),
        "Jan 29, 2025 00:00 UTC-0800",
        "https://iopwiki.com/images/thumb/2/20/SCAR-H_costume1_D.png/600px-SCAR-H_costume1_D.png"
    )}
);

timer(
   document.getElementById('mini-event'),
   "Jan 07, 2025 00:00 UTC-0800",
   "./assets/images/timer/gz50aj5bvx5e1.webp"
);