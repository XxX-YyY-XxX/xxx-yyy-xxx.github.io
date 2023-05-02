import {timer} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';

timer(document.getElementById('event'), "May 22, 2023 23:59 UTC-0800",
    "https://preview.redd.it/m4cvgxusrkva1.jpg?width=1920&format=pjpg&auto=webp&v=enabled&s=f83f33261004dcf03b1eabb447e5542cdb363926");

const nextPass = timer.bind(null, document.getElementById('battlepass'), "",
    "");
timer(document.getElementById('battlepass'), "May 28, 2023 23:59 UTC-0800",
    "https://preview.redd.it/hlmeolxkdsua1.jpg?width=1920&format=pjpg&auto=webp&v=enabled&s=45047a83105b6a0d0a9e3a1cbb9f72df2d6e30ff", {onEnd: nextPass});

const nextUnit = timer.bind(null, document.getElementById("coalition"), "May 29, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/odja9iezxew81.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=e187ca26f4368c052af065601aba9ce60c16604f")
timer(document.getElementById("coalition"), "May 01, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/jajjlqo4cvq81.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=a2f9a3e65cad03508714bb81aa834ad16f87b843", {onEnd: nextUnit});

const nextBanner = timer.bind(null, document.getElementById('skin-banner'), "Jun 05, 2023 23:59 UTC-0800",
    "doublebanner.png");
timer(document.getElementById('skin-banner'), "May 01, 2023 23:59 UTC-0800",
    "https://iopwiki.com/images/3/37/Wonderful_Dating_Guide_Login_Wallpaper.png", {onEnd: nextBanner});

//timer(document.getElementById('mini-event'), "May 28, 2023, 23:59 UTC-0800",
//    "");