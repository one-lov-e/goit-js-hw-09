const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyElement = document.querySelector('body');

startButton.addEventListener('click', onClickStartButton);
stopButton.addEventListener('click', onClickStopButton);

let timerId = null;
stopButton.setAttribute('disabled', true);

function onClickStartButton() {
  timerId = setInterval(() => {
    bodyElement.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
}

function onClickStopButton() {
  clearInterval(timerId);
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
