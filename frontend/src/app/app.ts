import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Flashcard } from './model/flashcard';
import { FlashcardService } from './service/flashcard.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  flashcards = signal<Flashcard[]>([]);
  newFlashcard: Partial<Flashcard> = {
    question: '',
    answer: '',
    category: '',
  }

  editingId: number | null = null;
  editFlashcard: Partial<Flashcard> = {
    question: '',
    answer: '',
    category: ''
  };

  createError = '';
  editError = '';

  showConfirm = false;
  confirmTitle = '';
  confirmMessage = '';
  confirmAction: (() => void) | null = null;

  openConfirm(
    title: string,
    message: string,
    action: () => void
  ): void {
    this.confirmTitle = title;
    this.confirmMessage = message;
    this.confirmAction = action;
    this.showConfirm = true;
  }

  confirm(): void {
    if (this.confirmAction) {
      this.confirmAction();
    }

    this.closeConfirm();
  }

  closeConfirm(): void {
    this.showConfirm = false;
    this.confirmAction = null;
  }

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    this.flashcardService.getFlashcards().subscribe({
      next: (data) => {
        this.flashcards.set(data);
      },
      error: (error) => {
        console.error('Failed to load flashcards', error);
      }
    });
  }

  confirmCreateFlashcard(): void {
    if (
      !this.newFlashcard.question?.trim() ||
      !this.newFlashcard.answer?.trim() ||
      !this.newFlashcard.category?.trim()
    ) {
      this.createError = 'Please fill in all fields.';
      return;
    }

    this.createError = '';

    this.openConfirm(
      'Create Flashcard',
      'Are you sure you want to create this flashcard?',
      () => this.createFlashcard()
    );
  }

  createFlashcard(): void {
    if (
      !this.newFlashcard.question?.trim() ||
      !this.newFlashcard.answer?.trim() ||
      !this.newFlashcard.category?.trim()
    ) {
      this.createError = 'Please fill in all fields.';
      return;
    }

    this.createError = '';

    this.flashcardService.createFlashcard(this.newFlashcard).subscribe({
      next: (created) => {
        this.flashcards.update(list => [...list, created]);

        this.newFlashcard = {
          question: '',
          answer: '',
          category: '',
        };
      },
      error: (error) => {
        console.error('Failed to create flashcard', error);
      }
    });
  }

  confirmSaveEdit(): void {
    if (this.editingId === null) {
      return;
    }

    if (
      !this.editFlashcard.question?.trim() ||
      !this.editFlashcard.answer?.trim() ||
      !this.editFlashcard.category?.trim()
    ) {
      this.editError = 'Please fill in all fields.';
      return;
    }

    this.editError = '';

    this.openConfirm(
      'Update Flashcard',
      'Are you sure you want to save these changes?',
      () => this.saveEdit()
    );
  }

  startEdit(flashcard: Flashcard): void {
    this.editingId = flashcard.id;
    this.editError = '';

    this.editFlashcard = {
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category
    };
  }

  saveEdit(): void {
    if (this.editingId === null) {
      return;
    }

    if (
      !this.editFlashcard.question?.trim() ||
      !this.editFlashcard.answer?.trim() ||
      !this.editFlashcard.category?.trim()
    ) {
      this.editError = 'Please fill in all fields.';
      return;
    }

    this.editError = '';

    this.flashcardService
      .updateFlashcard(this.editingId, this.editFlashcard)
      .subscribe({
        next: (updated) => {
          this.flashcards.update(list =>
            list.map(f =>
              f.id === updated.id ? updated : f
            )
          );

          this.editingId = null;
          this.editFlashcard = {
            question: '',
            answer: '',
            category: ''
          };
        },
        error: (error) => {
          console.error('Failed to update flashcard', error);
        }
      });
  }

  deleteFlashcard(id: number): void {
    this.openConfirm(
      'Delete Flashcard',
      'Are you sure you want to delete this flashcard?',
      () => {
        this.flashcardService.deleteFlashcard(id).subscribe({
          next: () => {
            this.flashcards.update(
              list => list.filter(f => f.id !== id)
            );
          },
          error: (error) => {
            console.error('delete error:', error);
          }
        });
      }
    );
  }
}
