const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");
const modalBtn = document.querySelector(".open-modal");
const closeBtn = document.querySelector(".close");
const clock = document.querySelector(".time");
const lastTime = document.querySelector(".last-time");
const archiveBtn = document.querySelector(".archives-btn");
const timesList = document.querySelector(".times-list");
const modal = document.querySelector(".shadow");

let stoper = {
  play: true,
  seconds: 0,
  minutes: 0,
  interval: null,
  timeArray: [],
};

function startStoper() {
  if (stoper.play) {
    stoper.interval = setInterval(function () {
      if (stoper.seconds < 9) {
        stoper.seconds++;
        clock.textContent = `${stoper.minutes}:0${stoper.seconds}`;
      } else if (stoper.seconds >= 9 && stoper.seconds < 59) {
        stoper.seconds++;

        clock.textContent = `${stoper.minutes}:${stoper.seconds}`;
      } else {
        stoper.seconds = 0;
        stoper.minutes++;
        clock.textContent = `${stoper.minutes}:0${stoper.seconds}`;
      }
    }, 100);
    stoper.play = false;
  }
}

function pauseStoper() {
  clearInterval(stoper.interval);
  stoper.play = true;
}

function stopStoper() {
  stoper.timeArray.push(clock.textContent);
  lastTime.textContent = `Last time: ${clock.textContent}`;
  lastTime.style.cssText = "opacity:1; visibility:visible;";
  clearStuff();
}

function showArchive() {
  stoper.timeArray.forEach((time) => {
    let li = document.createElement("li");
    li.innerHTML = time;
    console.log(time.innerHTML);

    timesList.appendChild(li);
    stoper.timeArray = [];
  });
}

function resetStoper() {
  lastTime.style.cssText = "vivibility:hidden;opacity:0;";
  stoper.timeArray = [];
  clearStuff();
}

function clearStuff() {
  clearInterval(stoper.interval);
  stoper.play = true;
  clock.textContent = "0:00";
  stoper.seconds = 0;
  stoper.minutes = 0;
}

function handleModal() {
  getComputedStyle(modal);
  if (getComputedStyle(modal).display === "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

startBtn.addEventListener("click", startStoper);
pauseBtn.addEventListener("click", pauseStoper);
stopBtn.addEventListener("click", stopStoper);
archiveBtn.addEventListener("click", showArchive);
resetBtn.addEventListener("click", resetStoper);
modalBtn.addEventListener("click", handleModal);
closeBtn.addEventListener("click", handleModal);
modal.addEventListener("click", function (e) {
  if (e.target.classList.contains("shadow")) {
    modal.style.display = "none";
  }
});
