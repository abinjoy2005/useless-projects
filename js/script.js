function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Backward angles
  let secondDeg = 360 - seconds * 6;
  let minuteDeg = 360 - (minutes * 6 + seconds / 10);
  let hourDeg = 360 - (hours * 30 + minutes / 2);

  // Rotate hands
  document.getElementById("second-hand").style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById("minute-hand").style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById("hour-hand").style.transform = `rotate(${hourDeg}deg)`;

  // Update digital clock (backward)
  let displayH = String(hours).padStart(2, '0');
  let displayM = String(minutes).padStart(2, '0');
  let displayS = String(seconds).padStart(2, '0');
  document.getElementById("digital-clock").textContent = `${displayH}:${displayM}:${displayS}`;
}

// Start clock
setInterval(updateClock, 1000);
updateClock(); // Initial call
