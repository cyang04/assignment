import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../model/flashcard.model';
import { FlashcardService } from '../../service/flashcard.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manage.component.html',
})
export class ManageComponent implements OnInit {
  flashcards = signal<Flashcard[]>([]);

  categories = signal<string[]>([]);
  selectedCategory = signal('all');

  // ngModel needs a plain mutable object to bind into - keep this one as-is,
  // it's local form state, not something the template reads reactively elsewhere.
  // Feature: two-way data binding target ([(ngModel)]) for the create form
  newFlashcard: Partial<Flashcard> = {
    question: '',
    answer: '',
    category: '',
  };

  editingId = signal<number | null>(null);
  // Feature: two-way data binding target ([(ngModel)]) for the inline edit form
  editFlashcard: Partial<Flashcard> = {
    question: '',
    answer: '',
    category: '',
  };

  createError = signal('');
  editError = signal('');

  showConfirm = signal(false);
  confirmTitle = signal('');
  confirmMessage = signal('');
  confirmAction: (() => void) | null = null;

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    // Feature: HTTPClient GET, subscribed asynchronously (RxJS Observable)
    this.flashcardService.getFlashcards().subscribe({
      next: (data) => this.flashcards.set(data),
      error: (error) => console.error('Failed to load flashcards', error),
    });

    this.flashcardService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (error) => console.error('Failed to load categories', error),
    });
  }

  loadCategories(): void {
    this.flashcardService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (error) => console.error('Failed to load categories', error),
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);

    if (category === 'all') {
      this.loadFlashcards();
      return;
    }

    // Feature: HTTPClient GET with a path parameter (category)
    this.flashcardService.getByCategory(category).subscribe({
      next: (data) => this.flashcards.set(data),
      error: (error) => console.error('Failed to load category', error),
    });
  }

  openConfirm(title: string, message: string, action: () => void): void {
    this.confirmTitle.set(title);
    this.confirmMessage.set(message);
    this.confirmAction = action;
    this.showConfirm.set(true);
  }

  confirm(): void {
    if (this.confirmAction) {
      this.confirmAction();
    }
    this.closeConfirm();
  }

  closeConfirm(): void {
    this.showConfirm.set(false);
    this.confirmAction = null;
  }

  confirmCreateFlashcard(): void {
    // Feature: form control validation - reject submission and show an error
    // message when required fields are blank
    if (
      !this.newFlashcard.question?.trim() ||
      !this.newFlashcard.answer?.trim() ||
      !this.newFlashcard.category?.trim()
    ) {
      this.createError.set('Please fill in all fields.');
      return;
    }

    this.createError.set('');

    this.openConfirm('Create flashcard', 'Are you sure you want to create this flashcard?', () =>
      this.createFlashcard()
    );
  }

  createFlashcard(): void {
    // Feature: HTTPClient POST
    this.flashcardService.createFlashcard(this.newFlashcard).subscribe({
      next: (created) => {
        this.flashcards.update((list) => [...list, created]);
        this.newFlashcard = {
          question: '',
          answer: '',
          category: ''
        };

        this.loadCategories();
      }
    });
  }

  startEdit(flashcard: Flashcard): void {
    this.editingId.set(flashcard.id);
    this.editError.set('');
    this.editFlashcard = {
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category,
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editError.set('');
  }

  confirmSaveEdit(): void {
    if (this.editingId() === null) return;

    // Feature: form control validation on the edit form as well
    if (
      !this.editFlashcard.question?.trim() ||
      !this.editFlashcard.answer?.trim() ||
      !this.editFlashcard.category?.trim()
    ) {
      this.editError.set('Please fill in all fields.');
      return;
    }

    this.editError.set('');

    this.openConfirm('Update flashcard', 'Are you sure you want to save these changes?', () =>
      this.saveEdit()
    );
  }

  saveEdit(): void {
    const id = this.editingId();
    if (id === null) return;

    // Feature: HTTPClient PUT
    this.flashcardService.updateFlashcard(id, this.editFlashcard).subscribe({
      next: (updated) => {
        this.flashcards.update((list) => list.map((f) => (f.id === updated.id ? updated : f)));
        this.editingId.set(null);
        this.editFlashcard = { question: '', answer: '', category: '' };

        this.loadCategories();
      },
      error: (error) => console.error('Failed to update flashcard', error),
    });
  }

  deleteFlashcard(id: number): void {
    this.openConfirm('Delete flashcard', 'Are you sure you want to delete this flashcard?', () => {
      // Feature: HTTPClient DELETE
      this.flashcardService.deleteFlashcard(id).subscribe({
        next: () => {
          this.flashcards.update((list) =>
            list.filter((f) => f.id !== id)
          );

          this.loadCategories();
        },
        error: (error) => console.error('delete error:', error),
      });
    });
  }
}
