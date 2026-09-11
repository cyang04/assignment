import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CategoryReviewComponent } from './component/category-review/category-review.component';
import { ManageComponent } from './component/manage/manage.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: CategoryReviewComponent },
  { path: 'manage', component: ManageComponent },
  { path: '**', redirectTo: '' },
];
