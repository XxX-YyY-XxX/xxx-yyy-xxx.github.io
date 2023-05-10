import {timer} from '../univasset/scripts/htmlgenerator/htmlgenerator.js';

timer(document.getElementById('event'), "May 29, 2023 23:59 UTC-0800",
    "https://preview.redd.it/wxk1k0mnzrya1.jpg?width=1600&format=pjpg&auto=webp&v=enabled&s=7682417d94804d0c83b65391b60637615f828b58");

const nextPass = timer.bind(null, document.getElementById('battlepass'), "",
    "");
timer(document.getElementById('battlepass'), "May 28, 2023 23:59 UTC-0800",
    "https://preview.redd.it/hlmeolxkdsua1.jpg?width=1920&format=pjpg&auto=webp&v=enabled&s=45047a83105b6a0d0a9e3a1cbb9f72df2d6e30ff", {onEnd: nextPass});

const nextUnit = timer.bind(null, document.getElementById("coalition"), "",
    "");
timer(document.getElementById("coalition"), "May 29, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/odja9iezxew81.jpg?width=1400&format=pjpg&auto=webp&v=enabled&s=e187ca26f4368c052af065601aba9ce60c16604f", {onEnd: nextUnit});

const nextBanner = timer.bind(null, document.getElementById('skin-banner'), "",
    "");
timer(document.getElementById('skin-banner'), "Jun 05, 2023 23:59 UTC-0800",
    "doublebanner.png", {onEnd: nextBanner});

timer(document.getElementById('mini-event'), "May 28, 2023, 23:59 UTC-0800",
    "https://preview.redd.it/c4hg3pmcwyxa1.jpg?width=1080&format=pjpg&auto=webp&v=enabled&s=fae34b9272ad4d3f0e037b4261431b5a27ddfbf3");