const form = document.querySelector('#salary-form');
const hourlyPayInput = document.querySelector('#hourly-pay');
const hoursWeekInput = document.querySelector('#hours-week');
const weeksYearInput = document.querySelector('#weeks-year');
const resultsSection = document.querySelector('#results');

const output = {
  daily: document.querySelector('#daily-pay'),
  weekly: document.querySelector('#weekly-pay'),
  monthly: document.querySelector('#monthly-pay'),
  yearly: document.querySelector('#yearly-pay'),
  hourly: document.querySelector('#hourly-result'),
  detail: document.querySelector('#yearly-detail')
};

const errors = {
  hourlyPay: document.querySelector('#hourly-pay-error'),
  hoursWeek: document.querySelector('#hours-week-error'),
  weeksYear: document.querySelector('#weeks-year-error')
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
});

function getNumber(input) {
  return Number.parseFloat(input.value);
}

function clearErrors() {
  Object.values(errors).forEach((element) => {
    element.textContent = '';
  });
}

function validateValues(hourlyPay, hoursWeek, weeksYear) {
  clearErrors();
  let valid = true;

  if (!Number.isFinite(hourlyPay) || hourlyPay < 0) {
    errors.hourlyPay.textContent = 'Enter a valid hourly pay.';
    valid = false;
  }

  if (!Number.isFinite(hoursWeek) || hoursWeek <= 0 || hoursWeek > 168) {
    errors.hoursWeek.textContent = 'Enter 1 to 168 hours.';
    valid = false;
  }

  if (!Number.isFinite(weeksYear) || weeksYear <= 0 || weeksYear > 52) {
    errors.weeksYear.textContent = 'Enter 1 to 52 weeks.';
    valid = false;
  }

  return valid;
}

function calculateSalary(hourlyPay, hoursWeek, weeksYear) {
  const weekly = hourlyPay * hoursWeek;
  const yearly = weekly * weeksYear;
  const monthly = yearly / 12;
  const daily = weekly / 5;

  return { hourlyPay, daily, weekly, monthly, yearly };
}

function renderResults(values, hoursWeek, weeksYear) {
  output.daily.textContent = currency.format(values.daily);
  output.weekly.textContent = currency.format(values.weekly);
  output.monthly.textContent = currency.format(values.monthly);
  output.yearly.textContent = currency.format(values.yearly);
  output.hourly.textContent = currency.format(values.hourlyPay);
  output.detail.textContent = `${hoursWeek} hrs/week · ${weeksYear} weeks/year`;
}

function handleSubmit(event) {
  event.preventDefault();

  const hourlyPay = getNumber(hourlyPayInput);
  const hoursWeek = getNumber(hoursWeekInput);
  const weeksYear = getNumber(weeksYearInput);

  if (!validateValues(hourlyPay, hoursWeek, weeksYear)) {
    return;
  }

  const values = calculateSalary(hourlyPay, hoursWeek, weeksYear);
  renderResults(values, hoursWeek, weeksYear);

  if (window.matchMedia('(max-width: 900px)').matches) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

form.addEventListener('submit', handleSubmit);

[hourlyPayInput, hoursWeekInput, weeksYearInput].forEach((input) => {
  input.addEventListener('input', () => {
    const hourlyPay = getNumber(hourlyPayInput);
    const hoursWeek = getNumber(hoursWeekInput);
    const weeksYear = getNumber(weeksYearInput);

    if (validateValues(hourlyPay, hoursWeek, weeksYear)) {
      renderResults(calculateSalary(hourlyPay, hoursWeek, weeksYear), hoursWeek, weeksYear);
    }
  });
});

(() => {
  if (window.__FREE_TOOLS_WIDGET_LOADER__) return;
  window.__FREE_TOOLS_WIDGET_LOADER__ = true;
  const script = document.createElement('script');
  script.src = 'https://appointments-schedule.netlify.app/tools-widget.js';
  script.defer = true;
  document.head.append(script);
})();
