import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Jul 23, 2024 00:00 UTC-0800",
   "./assets/images/timer/ga1j03n5wg8d1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Jul 21, 2024 00:00 UTC-0800",
    "./assets/images/timer/p85gqwtp826d1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        ""
    )}
);

timer(
    document.getElementById("coalition"),
    "Jul 23, 2024 00:00 UTC-0800",
    "./assets/images/coalition/15ArchitectNVWModel.webp",
    "./assets/images/coalition/11Judge.webp",
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        ""
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Jul 09, 2024 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/2/21/G11_costume10_D.png/600px-G11_costume10_D.png",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "Aug 06, 2024 00:00 UTC-0800",
        "https://iopwiki.com/images/thumb/3/31/HK433_costume1_D.png/600px-HK433_costume1_D.png"
    )}
);

timer(
   document.getElementById('mini-event'),
   "Jul 30, 2024 00:00 UTC-0800",
   "./assets/images/timer/aisex5vcc9ad1.webp"
);