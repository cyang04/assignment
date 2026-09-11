import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flashcard } from '../../model/flashcard.model';
import { FlashcardService } from '../../service/flashcard.service';

@Component({
  selector: 'app-category-review',
  standalone: true,
  imports: [],
  templateUrl: './category-review.component.html',
  styleUrl: './category-review.component.css',
})
export class CategoryReviewComponent implements OnInit {
  category = '';
  source = '';
  cards = signal<Flashcard[]>([]);
  index = signal(0);
  flipped = signal(false);
  loading = signal(true);
  error = signal(false);

  currentCard = computed<Flashcard | undefined>(() => this.cards()[this.index()]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService
  ) {}

  ngOnInit(): void {
    // Feature: reading a route parameter
    this.category = this.route.snapshot.paramMap.get('category') ?? '';

    // Feature: reading a query parameter, separate from the route parameter above.
    // Lets this component know how it was reached (e.g. from the home deck list)
    // without that being part of the route path itself.
    this.source = this.route.snapshot.queryParamMap.get('from') ?? '';

    // Feature: HTTPClient GET via service, subscribed asynchronously (RxJS Observable)
    this.flashcardService.getByCategory(this.category).subscribe({
      next: (data) => {
        this.cards.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      },
    });
  }

  flip(): void {
    this.flipped.update((f) => !f);
  }

  next(): void {
    if (this.index() < this.cards().length - 1) {
      this.index.update((i) => i + 1);
      this.flipped.set(false);
    }
  }

  prev(): void {
    if (this.index() > 0) {
      this.index.update((i) => i - 1);
      this.flipped.set(false);
    }
  }

  backToCategories(): void {
    // Feature: programmatic navigation
    this.router.navigate(['/']);
  }
}
