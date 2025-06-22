import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { IndexComponent } from './pages/index/index.component';
import { ProjectRequestsComponent } from './pages/project-requests/project-requests.component';
import { NewProjectRequestComponent } from './pages/new-project-request/new-project-request.component';
import { ProcurementReviewComponent } from './pages/procurement-review/procurement-review.component';
import { RelatedDepartmentsComponent } from './pages/related-departments/related-departments.component';
import { ReviewCostModelComponent } from './pages/review-cost-model/review-cost-model.component';
import { ReviewProjectRequestComponent } from './pages/review-project-request/review-project-request.component';
import { EditReturnedRequestComponent } from './pages/edit-returned-request/edit-returned-request.component';
import { EservicesMainComponent } from './pages/eservices-main/eservices-main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: IndexComponent },
  { path: 'project-requests', component: ProjectRequestsComponent },
  { path: 'new-project-request', component: NewProjectRequestComponent },
  { path: 'procurement-review', component: ProcurementReviewComponent },
  { path: 'related-departments', component: RelatedDepartmentsComponent },
  { path: 'review-cost-model', component: ReviewCostModelComponent },
  { path: 'review-project-request', component: ReviewProjectRequestComponent },
  { path: 'edit-returned-request', component: EditReturnedRequestComponent },
  { path: 'eservices-main', component: EservicesMainComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent }
];
