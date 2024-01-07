import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Output() searchBy = new EventEmitter<string>();

  public search = new FormControl();

  constructor() {
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => this.newSeach(value));
  }

  private newSeach(value: string): void {
    this.searchBy.emit(value);
  }
}
