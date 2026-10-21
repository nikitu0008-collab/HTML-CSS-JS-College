const btn = document.querySelector("button");
const btnChangeColor = document.getElementById('btnChangeColor');
const result = document.getElementById('result');

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

btn.onclick = function() {
    const rndCol =
        "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
    document.body.style.backgroundColor = rndCol;
};

function changeColor() {
    const rndCol =
        "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
    document.body.style.backgroundColor = rndCol;
}
btnChangeColor.addEventListener('click', () => {
    const rndCol =
        "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
    document.body.style.backgroundColor = rndCol;
});

window.addEventListener("keydown", logKey);

function logKey(e) {
    result.textContent += ` ${e.code}`;
    console.log(` ${e.code}`);
}
result.addEventListener("mouseenter", (e) => {
    result.style.border = "5px dotted orange";
    result.textContent = "курсор пришел на элемент";
});

result.addEventListener("mouseleave", (e) => {
    result.style.border = "1px solid #333";
    result.textContent = "курсор ПОКИНУЛ элемент";
});

window.addEventListener('mousemove', (e) => {

    result.textContent = 'Курсор по Х: ' + e.clientX + ' Курсор по Y: ' + e.clientY;
});