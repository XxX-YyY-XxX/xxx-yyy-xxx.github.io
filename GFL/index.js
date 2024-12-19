import {timer} from "../univasset/scripts/htmlgenerator/htmlgenerator.js";

timer(
   document.getElementById("event"),
   "Nov 19, 2024 00:00 UTC-0800",
   "./assets/images/timer/oqs5e95gpfvd1.webp"
);

timer(
    document.getElementById("battlepass"),
    "Jan 06, 2025 00:00 UTC-0800",
    "./assets/images/timer/npocbwze3r4e1.webp"
);

timer(
    document.getElementById("coalition"),
    "Dec 10, 2024 00:00 UTC-0800",
    "./assets/images/coalition/26DreamerMoonlitSentinel.webp",
    {onEnd: timer.bind(null,
        document.getElementById("coalition"),
        "Jan 07, 2025 00:00 UTC-0800",
        "./assets/images/coalition/17DestroyerDashingReindeer.webp",
    )}
);

timer(
    document.getElementById('skin-banner'),
    "Dec 24, 2024 00:00 UTC-0800",
    "./assets/images/timer/p7g40hvaa83e1.webp"
);

timer(
   document.getElementById('mini-event'),
   "Jan 07, 2025 00:00 UTC-0800",
   "./assets/images/timer/gz50aj5bvx5e1.webp"
);