import { Component, OnInit } from '@angular/core';
import { Flashcard } from './model/flashcard';
import { FlashcardService } from './service/flashcard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  flashcards: Flashcard[] = [];

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.flashcardService.getFlashcards().subscribe({
      next: (data) => {
        this.flashcards = data;
      },
      error: (error) => {
        console.error('Failed to load flashcards', error);
      }
    });
  }
}
