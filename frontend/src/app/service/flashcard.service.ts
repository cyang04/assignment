import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flashcard } from '../model/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private apiUrl = 'http://localhost:8080/api/flashcard';

  constructor(private http: HttpClient) {}

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.apiUrl);
  }

  createFlashcard(flashcard: Partial<Flashcard>): Observable<Flashcard> {
    return this.http.post<Flashcard>(this.apiUrl, flashcard);
  }

  updateFlashcard(id: number, flashcard: Partial<Flashcard>): Observable<Flashcard> {
    return this.http.put<Flashcard>(`${this.apiUrl}/${id}`, flashcard);
  }

  deleteFlashcard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
