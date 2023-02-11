import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');
let inputDates = null;

startBtn.addEventListener('click', onClickStartButton);
startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    inputDates = selectedDates[0];
    if (inputDates >= Date.now()) {
      startBtn.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function onClickStartButton() {
  startBtn.setAttribute('disabled', true);
  const timerId = setInterval(() => {
    const deltaTime = inputDates - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysTimer.textContent = days;
    hoursTimer.textContent = hours;
    minutesTimer.textContent = minutes;
    secondsTimer.textContent = seconds;
    if (deltaTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
  console.log();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
