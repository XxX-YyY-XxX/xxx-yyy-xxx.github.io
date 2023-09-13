import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
    document.getElementById("event"),
    "Sep 18, 2023 23:59 UTC-0800",
    "./assets/images/timer/ujmrjucqfsib1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("event"),
        "",
        ""
    )}
);

timer(
    document.getElementById("battlepass"),
    "Oct 15, 2023 23:59 UTC-0800",
    "./assets/images/timer/frontline-protocol-cloud-borne-wild-crane-preview-v0-pn0xk98rp5mb1.webp",
    {onEnd: timer.bind(
        null, document.getElementById("battlepass"),
        "",
        ""
    )}
);

timer(
    document.getElementById("coalition"),
    "Sep 18, 2023 23:59 UTC-0800",
    "./assets/images/coalition/01Scarecrow.webp", 
    {onEnd: timer.bind(
        null, document.getElementById("coalition"),
        "Oct 16, 2023 23:59 UTC-0800",
        "./assets/images/coalition/02Executioner.webp"
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Sep 25, 2023 23:59 UTC-0800",
    "./assets/images/timer/a7bhcugaxlib1.webp",
    {onEnd: timer.bind(
        null, document.getElementById('skin-banner'),
        "",
        "./assets/images/timer/.webp"
    )}
);

timer(
    document.getElementById('mini-event'),
    "Sep 18, 2023 23:59 UTC-0800",
    "./assets/images/timer/9btufbjh4tjb1.webp"
);

//timer(document.getElementById('extra'), "",
//    "");