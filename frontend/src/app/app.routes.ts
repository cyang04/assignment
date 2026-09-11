import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CategoryReviewComponent } from './component/category-review/category-review.component';
import { ManageComponent } from './component/manage/manage.component';

// Feature: route registration with a route parameter (:category) and a wildcard
// route (**) that redirects unmatched URLs back to home.
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: CategoryReviewComponent },
  { path: 'manage', component: ManageComponent },
  { path: '**', redirectTo: '' },
];
