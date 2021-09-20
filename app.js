const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.querySelector('.board');
const colors = [
    '#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71',
    '#fe4a49', '#2ab7ca', '#fed766', '#f6abb6', '#f4b6c2',
    '#011f4b', '#03396c', '#005b96', '#6497b1', '#851e3e',
    '#651e3e', '#451e3e'
];

let time = 0;
let score = 0;
let isFinished = false;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        console.log(time);
        startGame();
    }
});

board.addEventListener('click', event => {
    if (isFinished) {
        return;
    }

    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
    } else {
        Array.from(board.children).forEach(child => {
            child.remove();
        });
    }
    createRandomCircle();
});

function startGame() {
    isFinished = false;
    setInterval(decreaseTime, 1000);
    setTime(time);
    createRandomCircle();
}

function decreaseTime() {
    if (time <= 0) {
        finishGame();
    } else {
        let current = --time;
        setTime(current);
    }
}

function setTime(value) {
    if (value < 10) {
        value = `0${value}`;
    }
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
    isFinished = true;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.background = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}