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
    "Jun 25, 2024 00:00 UTC-0800",
    "./assets/images/coalition/11Judge.webp",
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "Jul 23, 2024 00:00 UTC-0800",
        "./assets/images/coalition/15ArchitectNVWModel.webp",
        )}
);

timer(
    document.getElementById('skin-banner'),
    "Jul 09, 2024 00:00 UTC-0800",
    "https://iopwiki.com/images/thumb/2/21/G11_costume10_D.png/600px-G11_costume10_D.png",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "Jun 25, 2024 00:00 UTC-0800",
   "./assets/images/timer/zo607mrrno3d1.webp",
//    {onEnd: timer.bind(
//         null, document.getElementById('mini-event'),
//         "",
//         "./assets/images/timer/.webp"
//    )}
);

//timer(document.getElementById('extra'), "",
//    "");