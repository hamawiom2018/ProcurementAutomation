import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html'
})
export class IndexComponent {
  requests = [
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
    { id: '#012', name: 'مشروع الأمان السيبراني', status: 'معتمد', date: '2025-05-17' }
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
