document.getElementById('helpers-select').addEventListener('change', function(){
  let vals = Array.from(this.selectedOptions).map(opt => opt.text);
  document.getElementById('helper-selected').innerHTML =
    vals.length
      ? 'الموظفون المختارون: <span style="color:#217b59;font-weight:600">' + vals.join(', ') + '</span>'
      : '';
});

// إظهار حقل السبب إذا كانت خارج الخطة
document.getElementById('plan0').addEventListener('change', function(){
  document.getElementById('reason0').style.display = this.value === 'no' ? 'block' : 'none';
});
