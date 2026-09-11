import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardService } from '../../service/flashcard.service';
import { CategoryCardComponent } from '../category-card/category-card.component';

// A small rotating set of accent colors so category cards don't look identical.
// Purely presentational - cycles via array index, no backend change needed.
const ACCENTS = ['bg-indigo-50 text-indigo-600', 'bg-sky-50 text-sky-600', 'bg-violet-50 text-violet-600', 'bg-rose-50 text-rose-600'];

@Component({
  selector: 'app-home',
  standalone: true,
  // Feature: component hierarchy - Home renders CategoryCard as a child component
  // (App -> Home -> CategoryCard), communicating via @Input/@Output rather than
  // CategoryCard reaching into services/router itself.
  imports: [CategoryCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  categories = signal<string[]>([]);
  loading = signal(true);
  error = signal(false);

  constructor(private flashcardService: FlashcardService, private router: Router) {}

  ngOnInit(): void {
    // Feature: HTTPClient GET via service, subscribed asynchronously (RxJS Observable)
    this.flashcardService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      },
    });
  }

  accentFor(index: number): string {
    return ACCENTS[index % ACCENTS.length];
  }

  openCategory(name: string): void {
    // Feature: programmatic navigation + route parameter + query parameter.
    // 'from' is passed as a query param so the destination component can tell
    // it was reached from the home deck list (vs. e.g. deep link or manage page).
    this.router.navigate(['/category', name], { queryParams: { from: 'home' } });
  }

  goToManage(): void {
    this.router.navigate(['/manage']);
  }
}
