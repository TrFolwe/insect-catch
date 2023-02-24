const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const wait = ms => new Promise(r => setTimeout(r, ms));
const windowScroll = () => window.scrollTo(0, window.innerHeight);
window.onbeforeunload = () => window.scrollTo(0, 0);

const MAX_INSECT_COUNT = 25;

if (!localStorage.getItem("max_score")) localStorage.setItem("max_score", 0);

let insect;
let score = 0;
let maxScore = localStorage.getItem("max_score");
let time = 0;

document.querySelectorAll(".insect-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        window.scrollTo(0, window.innerHeight * 2)
        insect = btn.getAttribute("insect");
    })
});

const insectCount = () => {
    return Array.from(document.querySelectorAll(".insect-catch-img")).filter(i => getComputedStyle(i).scale === "1").length;

}

function timeRender(second) {
    var hours = Math.floor(second / 3600);
    var minutes = Math.floor((second - (hours * 3600)) / 60);
    var seconds = second - (hours * 3600) - (minutes * 60);

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`
}

async function catcH(e) {
    e.style.scale = 0;
    await wait(250);
    score++;
    document.querySelector("header .insect_count").innerHTML = `Insect: ${insectCount()}`
    document.querySelector("header .score").innerHTML = `Score: ${score}`;
    new Audio("./assets/bubble_sound.mp3").play();
}

function restartGame() {
    if (score > maxScore) localStorage.setItem("max_score", score);
    window.scrollTo(0, 0);
    insect = undefined;
    score = 0;
    time = 0;
    document.querySelectorAll(".insect-catch-img").forEach(iE => document.querySelector(".game-screen:nth-child(3)").removeChild(iE));
}

setInterval(() => {
    time++;
    document.querySelector("header .time").innerHTML = `Time: ${timeRender(time)}`;
    document.querySelector("header .max_score").innerHTML = `Max Score: ${maxScore}`;
}, 1000);

setInterval(() => {
    if (!insect) return;
    if (insectCount() >= MAX_INSECT_COUNT) return restartGame();
    const x = Math.floor(Math.random() * (window.innerWidth - 100));
    const y = Math.floor(Math.random() * (window.innerHeight - 100));
    document.querySelector(".game-screen:nth-child(3)").innerHTML += `<img class="insect-catch-img" onclick="catcH(this)" src="./assets/insect_images/${insect}_insect.png" style="transform: rotate(${Math.floor(Math.random() * 360)}deg); left: ${x}px; top: ${y}px">`;
    document.querySelector("header .insect_count").innerHTML = `Insect: ${insectCount()}`
}, rand(750, 1250));