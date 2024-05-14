import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Jun 04, 2024 00:00 UTC-0800",
   "./assets/images/timer/assets__resources__dabao__avgtexture__2023sac_jailphoto.png"
);

timer(
    document.getElementById("battlepass"),
    "Jun 17, 2024 00:00 UTC-0800",
    "./assets/images/timer/95type_30015__pic__pic_95type_30015_d__cn.png",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        ""
    )}
);

timer(
    document.getElementById("coalition"),
    "Jun 11, 2024 00:00 UTC-0800",
    "./assets/images/coalition/24Sana.webp",
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "",
        "./assets/images/coalition/.webp"
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