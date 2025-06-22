document.querySelectorAll('.sidebar ul li a').forEach(link => {
  if (window.location.href.includes(link.getAttribute('href'))) {
    link.parentElement.classList.add('active');
  }
});
const requests = [
  { id: '#001', name: 'مشروع تطوير الويب', status: 'قيد المراجعة', date: '2025-05-29' },
  { id: '#002', name: 'نظام أمني متكامل', status: 'معتمد', date: '2025-05-27' },
  { id: '#003', name: 'تحديث الشبكات', status: 'معتمد', date: '2025-05-26' },
  { id: '#004', name: 'تطوير قواعد البيانات', status: 'قيد المراجعة', date: '2025-05-25' },
  { id: '#005', name: 'تصميم الهوية الجديدة', status: 'معتمد', date: '2025-05-24' },
  { id: '#006', name: 'مشروع الصيانة', status: 'جديد', date: '2025-05-23' },
  { id: '#007', name: 'تحديث نظام الأرشفة', status: 'قيد المراجعة', date: '2025-05-22' },
  { id: '#008', name: 'نظام الإدارة المالية', status: 'معتمد', date: '2025-05-21' },
  { id: '#009', name: 'تطوير بوابة الخدمات', status: 'جديد', date: '2025-05-20' },
  { id: '#010', name: 'تحسين الأداء', status: 'قيد المراجعة', date: '2025-05-19' },
  { id: '#011', name: 'تطوير التطبيقات', status: 'جديد', date: '2025-05-18' },
  { id: '#012', name: 'مشروع الأمان السيبراني', status: 'معتمد', date: '2025-05-17' },
];

let currentPage = 1;
const recordsPerPage = 10;

function renderTable(page) {
  const tbody = document.getElementById('requests-body');
  tbody.innerHTML = '';

  const start = (page - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  const paginatedItems = requests.slice(start, end);

  paginatedItems.forEach(req => {
    const row = `<tr>
      <td>${req.id}</td>
      <td>${req.name}</td>
      <td>${req.status}</td>
      <td>${req.date}</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  document.getElementById('page-info').textContent = `صفحة ${currentPage} من ${Math.ceil(requests.length / recordsPerPage)}`;

  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === Math.ceil(requests.length / recordsPerPage);
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage < Math.ceil(requests.length / recordsPerPage)) {
    currentPage++;
    renderTable(currentPage);
  }
});

// بداية تحميل الجدول لأول مرة
renderTable(currentPage);

