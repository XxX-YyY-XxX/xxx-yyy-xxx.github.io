import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "May 20, 2025 00:00 UTC-0800",
   "./assets/images/timer/2z2pyq61arxe1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Jun 02, 2025 00:00 UTC-0800",
    "./assets/images/timer/0x9eo0abm3we1.webp",
    //{onEnd: timer.bind(null,
    //    document.getElementById("battlepass"),
    //    "",
    //    "",
    //)}
);

timer(
    document.getElementById("coalition"),
    "May 27, 2025 00:00 UTC-0800",
    "./assets/images/coalition/27Gray.webp"
    //{onEnd: timer.bind(null,
    //    document.getElementById("coalition"),
    //    "Mar 04, 2025 00:00 UTC-0800",
    //    "./assets/images/coalition/01Scarecrow.webp"
    //)}
);

timer(
    document.getElementById('skin-banner'),
    "May 06, 2025 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/4/4e/SPAS-15_costume4_D.png/600px-SPAS-15_costume4_D.png",
    {onEnd: timer.bind(null,
        document.getElementById('skin-banner'),
        "May 20, 2025 00:00 UTC-0800",
        "https://iopwiki.com/images/thumb/b/bf/ST_AR-15_costume8_D.png/600px-ST_AR-15_costume8_D.png",
        {onEnd: timer.bind(null,
            document.getElementById('skin-banner'),
            "Jun 03, 2025 00:00 UTC-0800",
            "https://iopwiki.com/images/thumb/5/52/8th_Anniversary_Login_Wallpaper.jpg/600px-8th_Anniversary_Login_Wallpaper.jpg"
        )}
    )}
);

//timer(
//   document.getElementById('mini-event'),
//   "May 27, 2025 00:00 UTC-0800",
//   "./assets/images/timer/ihigds1j7dse1.webp"
//);    M2HB