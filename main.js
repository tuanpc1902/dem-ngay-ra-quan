moment.locale('vi');
const zone_name = 'Asia/Ho_Chi_Minh';
// const zone_offset = '+07:00';
// const zone_abbr = 'ICT';
// const now = moment().tz(zone_name);

console.log('Current time in ' + zone_name + ' is: ' + moment().format('LLLL'));

let ngayRaQuanDatePicker = document.getElementById('ngayRaQuanDatePicker');
let ngayRaQuan = document.getElementById('ngayRaQuan');
let localStorageValue = localStorage.getItem('ngayRaQuanDatePicker');

console.log('localStorageValue', localStorageValue);

let ngayRaQuanDateVal = moment(localStorageValue ?? '2026-01-28').format(
  'YYYY-MM-DD'
); // default to today

ngayRaQuanDatePicker.value = moment(localStorageValue ?? '2026-01-28').format(
  'YYYY-MM-DD'
);

ngayRaQuanDatePicker.addEventListener('change', (e) => {
  ngayRaQuanDateVal = e.target.value;
  ngayRaQuan.innerText = ngayRaQuanDateVal;
  localStorage.setItem('ngayRaQuanDatePicker', ngayRaQuanDateVal);
  console.log(ngayRaQuanDateVal);
  reloadCounts();
});

function reloadCounts() {
  ngayRaQuan.innerText = moment(ngayRaQuanDateVal).format('LL');

  document.querySelector('.timeZone').innerText = `Múi giờ: ${zone_name}`;

  document.getElementById('days-count').innerText =
    moment(ngayRaQuanDateVal).diff(moment(), 'days') + ' ngày';

  document.getElementById('weeks-count').innerText =
    moment(ngayRaQuanDateVal).diff(moment(), 'weeks') + ' tuần';

  document.getElementById('months-count').innerText =
    moment(ngayRaQuanDateVal).diff(moment(), 'months') + ' tháng';

  // document.querySelector('.today').innerText = `Hôm nay là: ${moment().format(
  //   'LLLL'
  // )} - Múi giờ: ${zone_name}`;
}

function startRealtimeClock() {
  const el = document.querySelector('.today');

  setInterval(() => {
    el.innerHTML = `Hôm nay là: ` + `<span class="clock">${moment().format('LLLL:ss')}</span> - Múi giờ: ${zone_name}`;
  }, 1000); // cập nhật mỗi 1 giây
}

startRealtimeClock();


reloadCounts();
