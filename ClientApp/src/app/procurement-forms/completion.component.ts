import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-procurement-completion',
  standalone: true,
  imports: [RouterLink],
  template: `<h2>تم إرسال الطلب بنجاح!</h2>
             <a routerLink="/">العودة للصفحة الرئيسية</a>`
})
export class CompletionComponent {}
