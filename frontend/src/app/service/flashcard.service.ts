import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CategorySummary, Flashcard} from '../model/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private apiUrl = 'http://localhost:8080/api/flashcard';

  constructor(private http: HttpClient) {}

  // Feature: HTTPClient GET - returns an Observable, resolved asynchronously by
  // subscribers in the components rather than blocking here.
  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.apiUrl);
  }

  // Feature: HTTPClient POST
  createFlashcard(flashcard: Partial<Flashcard>): Observable<Flashcard> {
    return this.http.post<Flashcard>(this.apiUrl, flashcard);
  }

  // Feature: HTTPClient PUT with a path parameter (id)
  updateFlashcard(id: number, flashcard: Partial<Flashcard>): Observable<Flashcard> {
    return this.http.put<Flashcard>(`${this.apiUrl}/${id}`, flashcard);
  }

  // Feature: HTTPClient DELETE with a path parameter (id)
  deleteFlashcard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getByCategory(category: string): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.apiUrl}/category/${category}`);
  }
}
