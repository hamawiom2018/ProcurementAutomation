import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProcurementFormService } from './procurement-form.service';

@Component({
  selector: 'app-manager-approval',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manager-approval.component.html'
})
export class ManagerApprovalComponent {
  constructor(public state: ProcurementFormService, private router: Router) {}

  next() {
    this.router.navigate(['../complete']);
  }
}
