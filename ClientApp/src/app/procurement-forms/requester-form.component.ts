import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProcurementFormService } from './procurement-form.service';

@Component({
  selector: 'app-requester-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './requester-form.component.html'
})
export class RequesterFormComponent {
  form = this.fb.group({
    projectManager: ['', Validators.required],
    department: ['', Validators.required],
    date: ['', Validators.required],
    competitionName: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private state: ProcurementFormService) {}

  next() {
    if (this.form.valid) {
      this.state.requester = this.form.value;
      this.router.navigate(['../manager-approval']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
