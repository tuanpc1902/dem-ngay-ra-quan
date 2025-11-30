moment.locale('vi');
const zone_name = 'Asia/Ho_Chi_Minh';
const defaultDate = '2026-01-28';

let ngayRaQuanDatePicker = document.getElementById('ngayRaQuanDatePicker');
let ngayRaQuan = document.getElementById('ngayRaQuan');
let localStorageValue = localStorage.getItem('ngayRaQuanDatePicker');

console.log('localStorageValue', localStorageValue);

let ngayRaQuanDateVal = moment(localStorageValue ?? defaultDate).format(
  'YYYY-MM-DD'
); // default to today

ngayRaQuanDatePicker.value = ngayRaQuanDateVal;

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
}

function formatThoiGianTheoTheThuc() {
  return moment().format('LLLL_custom');
}

function capitalizeWeekday(str) {
  if (!str) return '';

  // Lấy phần từ thứ (tính đến dấu phẩy)
  const parts = str.split(',');
  const weekday = parts[0].trim();

  // Viết hoa chữ cái đầu
  const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  // Nối lại với phần còn lại của chuỗi
  if (parts.length > 1) {
    return capitalized + ',' + parts.slice(1).join(',');
  } else {
    return capitalized;
  }
}

function startRealtimeClock() {
  const elDate = document.getElementById('date');
  const elTime = document.getElementById('time');
  const elPipe = document.getElementById('pipe');

  // Chọn locale tiếng Việt
  moment.locale('vi');

  // Hiển thị múi giờ 1 lần
  // elZone.textContent = `Múi giờ: ${zone_name}`;

  setInterval(() => {
    const now = moment();

    const dateString = now.format('dddd, DD [tháng] MM [năm] YYYY');
    const capitalizedDateString = capitalizeWeekday(dateString);
    // Ngày + thứ
    elDate.textContent = capitalizedDateString;
    elPipe.textContent = ' | ';

    // Giờ – phút – giây
    elTime.textContent = now.format('HH [giờ] mm [phút] ss [giây]');
  }, 1000);
}

startRealtimeClock();

reloadCounts();
