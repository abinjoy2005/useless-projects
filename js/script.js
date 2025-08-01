let currentTime = new Date();
let isTimeTraveling = false;
let travelInterval;
let totalSecondsReversed = 0;

const animals = [
  "🦧 Orangutan", "🐺 Wolf", "🦉 Owl", "🐢 Turtle",
  "🐒 Monkey", "🦁 Lion", "🐍 Snake", "🦌 Deer",
  "🦘 Kangaroo", "🐘 Elephant", "🦊 Fox"
];

function updateClock() {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds / 10;
  const hourDeg = (hours % 12) * 30 + minutes / 2;

  document.getElementById("second-hand").style.transform = `rotate(${secondDeg}deg) scaleX(-1)`;
  document.getElementById("minute-hand").style.transform = `rotate(${minuteDeg}deg) scaleX(-1)`;
  document.getElementById("hour-hand").style.transform = `rotate(${hourDeg}deg) scaleX(-1)`;

  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  document.getElementById("digital-clock").textContent = `${h}:${m}:${s}`;
}

// Initial backward ticking
updateClock();
travelInterval = setInterval(() => {
  currentTime.setSeconds(currentTime.getSeconds() - 1);
  totalSecondsReversed += 1;
  updateClock();
}, 1000);

function toggleTimeTravel() {
  isTimeTraveling = !isTimeTraveling;
  const status = document.getElementById("status");
  const body = document.body;

  clearInterval(travelInterval);

  if (isTimeTraveling) {
    status.textContent = "🚀 Time Travel Engaged!";
    body.classList.add("time-traveling");

    travelInterval = setInterval(() => {
      currentTime.setSeconds(currentTime.getSeconds() - 10);
      totalSecondsReversed += 10;
      updateClock();
    }, 300);

    const hairs = Math.floor(Math.random() * 500) + 100;
    const stache = Math.floor(Math.random() * 200) + 20;
    const animal = animals[Math.floor(Math.random() * animals.length)];

    document.getElementById("beard-info").textContent =
      `🧔 You have approximately ${hairs} beard hairs and ${stache} mustache hairs.`;
    document.getElementById("animal-info").textContent =
      `🔮 In a past life, you were a ${animal}!`;
  } else {
    status.textContent = "⏹️ Time Travel Stopped.";
    body.classList.remove("time-traveling");

    travelInterval = setInterval(() => {
      currentTime.setSeconds(currentTime.getSeconds() - 1);
      totalSecondsReversed += 1;
      updateClock();
    }, 1000);
  }
}

// Webcam Access
const video = document.getElementById("webcam");
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(() => {
    console.log("Webcam blocked or not available");
    video.style.display = "none";
  });

// Inverted Fake Cursor (Fixed)
const fakeCursor = document.getElementById("fake-cursor");

function updateFakeCursor(e) {
  const realX = e.clientX;
  const realY = e.clientY;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const mirroredX = centerX - (realX - centerX);
  const mirroredY = centerY - (realY - centerY);

  const clampedX = Math.max(0, Math.min(window.innerWidth - 16, mirroredX));
  const clampedY = Math.max(0, Math.min(window.innerHeight - 16, mirroredY));

  fakeCursor.style.left = `${clampedX}px`;
  fakeCursor.style.top = `${clampedY}px`;
}

document.addEventListener("mousemove", updateFakeCursor);

// Show cursor on load
window.addEventListener("load", () => {
  const initEvent = new MouseEvent("mousemove", {
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2
  });
  document.dispatchEvent(initEvent);
});

// 🎵 Random Animal Sound on Click
const animalSounds = [
  "sounds/cat.mp3",
  "sounds/dog.mp3",
  "sounds/chicken.mp3",
  "sounds/cow.mp3",
  "sounds/goat.mp3"
];

document.addEventListener("click", () => {
  const soundFile = animalSounds[Math.floor(Math.random() * animalSounds.length)];
  const sound = new Audio(soundFile);
  sound.play();
});
