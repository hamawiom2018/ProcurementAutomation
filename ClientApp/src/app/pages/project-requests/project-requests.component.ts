import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-requests.component.html'
})
export class ProjectRequestsComponent {
  requests = [
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
    { id: '#012', name: 'إدارة المشاريع', type: 'شراء مباشر', status: 'جديد', date: '2025-05-18' }
  ];

  currentPage = 1;
  recordsPerPage = 10;

  get paginatedRequests() {
    const start = (this.currentPage - 1) * this.recordsPerPage;
    return this.requests.slice(start, start + this.recordsPerPage);
  }

  get pageInfo() {
    return `صفحة ${this.currentPage} من ${Math.ceil(this.requests.length / this.recordsPerPage)}`;
  }

  hasNextPage() {
    return this.currentPage < Math.ceil(this.requests.length / this.recordsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
    }
  }
}
