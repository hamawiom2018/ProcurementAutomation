import { Component } from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { RequesterFormComponent } from './requester-form.component';
import { ManagerApprovalComponent } from './manager-approval.component';
import { CompletionComponent } from './completion.component';

export const procurementChildRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'request' },
  { path: 'request', component: RequesterFormComponent },
  { path: 'manager-approval', component: ManagerApprovalComponent },
  { path: 'complete', component: CompletionComponent }
];

@Component({
  selector: 'app-procurement-forms',
  standalone: true,
  imports: [RouterModule.forChild(procurementChildRoutes), RouterOutlet],
  templateUrl: './procurement-forms.component.html',
  styleUrls: ['../../public/procurement/assets/main.css']
})
export class ProcurementFormsComponent {}
