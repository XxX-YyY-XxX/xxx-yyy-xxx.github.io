import {timer} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';

timer(document.getElementById('event'), "Jul 03, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/FyfnR_OaMAEqaYa?format=jpg&name=large");

const nextPass = timer.bind(null, document.getElementById('battlepass'), "",
    "");
timer(document.getElementById('battlepass'), "Jul 02, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/FwyLcKbaYAAsy86?format=jpg&name=large", {onEnd: nextPass});

const nextUnit = timer.bind(null, document.getElementById("coalition"), "Jul 17, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/7exas1lcp36b1.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=4b3bba0fee0da111ceafe07945db36db9af39d42");
timer(document.getElementById("coalition"), "Jun 26, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/wb3g8njbzk191.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=7c21b72bb78a1b3251153430428466a4a125d9af", {onEnd: nextUnit});

const nextBanner = timer.bind(null, document.getElementById('skin-banner'), "",
    "");
timer(document.getElementById('skin-banner'), "Jul 03, 2023 23:59 UTC-0800",
    "https://pbs.twimg.com/media/Fx8CrrnaAAE-28t?format=jpg&name=large", {onEnd: nextBanner});

//timer(document.getElementById('mini-event'), "",
//    "");