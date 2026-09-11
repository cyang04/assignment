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

  createFlashcard(): void {
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
        console.error(`Failed to create flashcard`, error);
      }
    });
  }

  startEdit(flashcard: Flashcard): void {
    this.editingId = flashcard.id;

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
    this.flashcardService.deleteFlashcard(id).subscribe({
      next: () => {
        this.flashcards.update(list => list.filter(f => f.id !== id));
      },
      error: (error) => {
        console.error('delete error:', error);
      }
    });
  }
}
