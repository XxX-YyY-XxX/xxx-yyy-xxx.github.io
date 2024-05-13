import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

// timer(
//    document.getElementById("event"),
//    "Jun 04, 2024 00:00 UTC-0800",
//    "./assets/images/timer/assets__resources__dabao__avgtexture__2023sac_jailphoto.png"
// );

timer(
    document.getElementById("battlepass"),
    "May 13, 2024 00:00 UTC-0800",
    "./assets/images/timer/y3whg0yup7sc1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "Jun 17, 2024 00:00 UTC-0800",
        "./assets/images/timer/95type_30015__pic__pic_95type_30015_d__cn.png"   //type95
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