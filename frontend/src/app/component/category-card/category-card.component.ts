import { Component, Input, Output, EventEmitter } from '@angular/core';

// Feature: @Input/@Output - this is a grandchild component (App -> Home -> CategoryCard).
// It receives display data from its parent (Home) via @Input, and reports
// user interaction back up to the parent via @Output, instead of handling
// navigation itself.
@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  @Input() name = '';
  @Input() accentClass = '';

  @Output() select = new EventEmitter<string>();

  onClick(): void {
    // Feature: @Output - notify the parent which category was picked,
    // parent decides what navigation/logic happens next.
    this.select.emit(this.name);
  }
}
