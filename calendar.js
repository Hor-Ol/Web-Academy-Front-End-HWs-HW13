let currentMonthYearEl = document.querySelector('.calendar-month-head-name');
let currentDayMonthYearEl = document.querySelector('.calendar-day-head-date');
let getNumOfSlotsInCalendarMonth = document.querySelectorAll(
  '.calendar-month-body-table-dates'
);
let getFirstSlotInCalendarMonth = document.querySelector(
  '.calendar-month-body-table-dates'
);

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentDayOfWeek = currentDate.getDay();
let currentMonth = currentDate.getMonth();
let currentFullYear = currentDate.getUTCFullYear();
let currentMonthFirstDay = new Date(currentDate);
currentMonthFirstDay.setDate(1);
let currentMonthFirstDayOfWeek = currentMonthFirstDay.getDay();
let currentMonthLastDay = new Date(currentFullYear, currentMonth + 1, 0);
let currentMonthLastDayOfWeek = currentMonthLastDay.getDay();
let firstDayOnTheCalendarDate;
let firstDayOnTheCalendarFull;
let firstDayOnTheCalendarFullMs;
let dateMonth;

// FUCTION FOR CHANGING THE MONTH
function changeDate(currentDate) {
  currentDay = new Date(currentDate).getDate();
  currentDayOfWeek = new Date(currentDate).getDay();
  currentMonth = new Date(currentDate).getMonth();
  currentFullYear = new Date(currentDate).getUTCFullYear();
  currentMonthFirstDay = new Date(currentDate);
  currentMonthFirstDay.setDate(1);
  currentMonthFirstDayOfWeek = currentMonthFirstDay.getDay();
  currentMonthLastDay = new Date(currentFullYear, currentMonth + 1, 0);
  currentMonthLastDayOfWeek = currentMonthLastDay.getDay();
}

const calendarPrev = document.querySelector('.chevron-back-outline');
const calendarNext = document.querySelector('.chevron-forward-outline');

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function changeHeaders() {
  currentDayMonthYearEl.innerHTML = `${currentDay} ${month[currentMonth]} ${currentFullYear}`;
  currentMonthYearEl.innerHTML = `${month[currentMonth]} ${currentFullYear}`;
}

changeHeaders();

function emptyCalendar() {
  for (let i = 0; i < getNumOfSlotsInCalendarMonth.length; i++) {
    getNumOfSlotsInCalendarMonth[i].innerHTML = '';
    getNumOfSlotsInCalendarMonth[i].classList.remove('other-month');
    getNumOfSlotsInCalendarMonth[i].classList.remove('today');
  }
}

emptyCalendar();

function getFirstDayOnTheCalendar() {
  firstDayOnTheCalendarFullMs =
    currentMonthFirstDay -
    (7 - (7 - currentMonthFirstDayOfWeek + 1)) * 24 * 60 * 60 * 1000;

  firstDayOnTheCalendarFull = new Date(
    currentMonthFirstDay -
      (7 - (7 - currentMonthFirstDayOfWeek + 1)) * 24 * 60 * 60 * 1000
  );

  if (currentMonthFirstDayOfWeek === 0) {
    firstDayOnTheCalendarFullMs =
      currentMonthFirstDay - (7 - (7 - 6)) * 24 * 60 * 60 * 1000;

    firstDayOnTheCalendarFull = new Date(
      currentMonthFirstDay - (7 - (7 - 6)) * 24 * 60 * 60 * 1000
    );
  }

  firstDayOnTheCalendarDate = firstDayOnTheCalendarFull.getDate();
}

getFirstDayOnTheCalendar();

function renderCalendar() {
  for (let j = 0; j < getNumOfSlotsInCalendarMonth.length; j++) {
    getNumOfSlotsInCalendarMonth[j].innerHTML = new Date(
      firstDayOnTheCalendarFullMs + j * 24 * 60 * 60 * 1000
    ).getDate();

    dateMonth = new Date(
      firstDayOnTheCalendarFullMs + j * 24 * 60 * 60 * 1000
    ).getMonth();

    if (dateMonth !== currentMonth)
      getNumOfSlotsInCalendarMonth[j].classList.add('other-month');
  }

  let month = new Date();

  for (let k = 0; k < getNumOfSlotsInCalendarMonth.length; k++) {
    if (
      parseInt(getNumOfSlotsInCalendarMonth[k].innerHTML) === currentDay &&
      currentMonth === month.getMonth()
    ) {
      getNumOfSlotsInCalendarMonth[k].classList.add('today');
    }
  }
}

renderCalendar();

// CHANGING VIEW FOR THE NEXT MONTH
calendarNext.addEventListener('click', function () {
  currentDate = new Date(currentDate).getTime() + 2629800000;
  changeDate(currentDate);
  changeHeaders(currentDate);
  emptyCalendar();
  getFirstDayOnTheCalendar();
  renderCalendar();
  console.dir(new Date(currentDate));
  console.dir(currentDate);
  console.dir(currentMonth);
});

// CHANGING VIEW FOR THE PREVIOUS MONTH
calendarPrev.addEventListener('click', function () {
  currentDate = new Date(currentDate).getTime() - 2629800000;
  changeDate(currentDate);
  changeHeaders(currentDate);
  emptyCalendar();
  getFirstDayOnTheCalendar();
  renderCalendar();
  console.dir(new Date(currentDate));
  console.dir(currentDate);
  console.dir(currentMonth);
});
