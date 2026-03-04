import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

//timer(
//   document.getElementById("event"),
//   "Feb 24, 2026 00:00 UTC-0800",
//   "./assets/images/timer/y7gmkdv461hd1.webp"
//);

timer(
    document.getElementById("battlepass"),
    "Mar 09, 2026 00:00 UTC-0800",
    "./assets/images/timer/z65gm4ia3tfg1.webp",
    {onEnd: timer(null,
        document.getElementById("battlepass"),
        "Apr 13, 2026 00:00 UTC-0800",
        "./assets/images/timer/t5qp3pfp3rmg1.webp"
    )}
);

timer(
    document.getElementById("coalition"),
    "Mar 31, 2026 00:00 UTC-0800",
    "./assets/images/coalition/18HunterNightfallMoth.webp"
);

//timer(
//    document.getElementById('skin-banner'),
//    "Feb 10, 2026 00:00 UTC-0800",
//    "https://iopwiki.com/images/thumb/a/ad/Howa_Type_64_costume3_D.png/600px-Howa_Type_64_costume3_D.png"
//);

//timer(
//   document.getElementById('mini-event'),
//   "Dec 23, 2025 00:00 UTC-0800",
//   "./assets/images/timer/78bh0schsq3g1.webp"
//);