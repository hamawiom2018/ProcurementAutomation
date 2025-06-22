const projectRequests = [
  { id: '#001', name: 'تطوير نظام إلكتروني', type: 'منافسة عامة', status: 'قيد المراجعة', date: '2025-05-29' },
  { id: '#002', name: 'صيانة المباني', type: 'شراء مباشر', status: 'معتمد', date: '2025-05-28' },
  { id: '#003', name: 'نظام حماية المعلومات', type: 'منافسة محدودة', status: 'جديد', date: '2025-05-27' },
  { id: '#004', name: 'تدريب الموظفين', type: 'منافسة اتفاقية إطارية', status: 'معتمد', date: '2025-05-26' },
  { id: '#005', name: 'تطوير البرمجيات', type: 'منافسة عامة', status: 'قيد المراجعة', date: '2025-05-25' },
  { id: '#006', name: 'تجهيز قاعة الاجتماعات', type: 'شراء مباشر', status: 'معتمد', date: '2025-05-24' },
  { id: '#007', name: 'خدمات النظافة', type: 'منافسة اتفاقية إطارية', status: 'جديد', date: '2025-05-23' },
  { id: '#008', name: 'تحسين شبكة الإنترنت', type: 'منافسة عامة', status: 'معتمد', date: '2025-05-22' },
  { id: '#009', name: 'النسخ الاحتياطي', type: 'شراء مباشر', status: 'جديد', date: '2025-05-21' },
  { id: '#010', name: 'استشارات مالية', type: 'منافسة محدودة', status: 'قيد المراجعة', date: '2025-05-20' },
  { id: '#011', name: 'حماية المواقع الإلكترونية', type: 'منافسة عامة', status: 'معتمد', date: '2025-05-19' },
  { id: '#012', name: 'إدارة المشاريع', type: 'شراء مباشر', status: 'جديد', date: '2025-05-18' },
];

let currentPage = 1;
const recordsPerPage = 10;

function renderRequests(page) {
  const tbody = document.getElementById('requests-body');
  tbody.innerHTML = '';

  const start = (page - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  const pageItems = projectRequests.slice(start, end);

  pageItems.forEach(req => {
    tbody.innerHTML += `
      <tr>
        <td>${req.id}</td>
        <td>${req.name}</td>
        <td>${req.type}</td>
        <td>${req.status}</td>
        <td>${req.date}</td>
      </tr>
    `;
  });

  document.getElementById('page-info').textContent = `صفحة ${currentPage} من ${Math.ceil(projectRequests.length / recordsPerPage)}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === Math.ceil(projectRequests.length / recordsPerPage);
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderRequests(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage < Math.ceil(projectRequests.length / recordsPerPage)) {
    currentPage++;
    renderRequests(currentPage);
  }
});

// عرض الصفحة الأولى عند التحميل
renderRequests(currentPage);
