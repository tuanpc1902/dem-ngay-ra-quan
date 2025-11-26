const zone_name = 'Asia/Ho_Chi_Minh';
moment.locale('vi');

let ngayRaQuanDatePicker = document.getElementById('ngayRaQuanDatePicker');
let ngayRaQuan = document.getElementById('ngayRaQuan');
let storageValue = localStorage.getItem('ngayRaQuanDatePicker');
console.log ('storageValue', storageValue)

let ngayRaQuanDateVal = moment(storageValue ?? '2026-01-28').format('YYYY-MM-DD') // default to today

ngayRaQuanDatePicker.value  =  moment(storageValue ?? '2026-01-28').format('YYYY-MM-DD')

ngayRaQuanDatePicker.addEventListener('change',(e)=>{
  ngayRaQuanDateVal = e.target.value
  ngayRaQuan.innerText = ngayRaQuanDateVal;
  localStorage.setItem('ngayRaQuanDatePicker', ngayRaQuanDateVal)
  console.log(ngayRaQuanDateVal);
  reloadCounts()
})

function reloadCounts() {
  ngayRaQuan.innerText =
    moment(ngayRaQuanDateVal).format('LL');

  document.querySelector('.timeZone').innerText = `Múi giờ: ${zone_name}`;

  document.getElementById('days-count').innerText =
    moment(ngayRaQuanDateVal).diff(moment(), 'days') + ' ngày';

  document.getElementById('weeks-count').innerText =
    moment(ngayRaQuanDateVal).diff(moment(), 'weeks') + ' tuần';

  document.getElementById('months-count').innerText =
    moment(ngayRaQuanDateVal).diff(moment(), 'months') + ' tháng';
}
reloadCounts()



