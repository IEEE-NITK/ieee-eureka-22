let countDownEndDate = new Date('Jan 11, 2022 00:00:00').getTime();
let countDownStartDate = new Date('Jan 10, 2022 18:00:00').getTime();

let x = setInterval(function () {
  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownEndDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById(
    'cdtimer',
  ).innerHTML = `Time Left: ${days}:${hours}:${minutes}:${seconds}`;

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('cdtimer').innerHTML = 'Time Left: 00:00:00:00';
    document.getElementById('cdtimer').style.color = '#d62828';
  }
}, 1000);

if (document.getElementById('cd-site-timer')) {
  let y = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownStartDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById(
      'cd-site-timer',
    ).innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
    if (distance < 0) {
      clearInterval(y);
      location.reload();
    }
  }, 1000);
}
