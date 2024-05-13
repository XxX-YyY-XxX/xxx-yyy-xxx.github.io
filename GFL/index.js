import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

// timer(
//    document.getElementById("event"),
//    "Mar 19, 2024 00:00 UTC-0800",
//    "./assets/images/timer/missionselect_2022WhiteValentine_base.png"
// );

timer(
    document.getElementById("battlepass"),
    "May 13, 2024 00:00 UTC-0800",
    "./assets/images/timer/y3whg0yup7sc1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "Jun 17, 2024 00:00 UTC-0800",
        "./assets/images/timer/.webp"   //type95
    )}
);

timer(
    document.getElementById("coalition"),
    "May 28, 2024 00:00 UTC-0800",
    "./assets/images/coalition/10Gager.webp",
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        // from may 14
        "Jun 11, 2024 00:00 UTC-0800",
        "./assets/images/coalition/24Sana.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Jun 11, 2024 00:00 UTC-0800",
    "./assets/images/timer/2pje90ny00zc1.webp",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        ""
    )}
);

timer(
   document.getElementById('mini-event'),
   "May 28, 2024 00:00 UTC-0800",
   "./assets/images/timer/ri0ajrc2nexc1.webp",
   {onEnd: timer.bind(
        null, document.getElementById('mini-event'),
        "",
        "./assets/images/timer/.webp"
   )}
);

//timer(document.getElementById('extra'), "",
//    "");