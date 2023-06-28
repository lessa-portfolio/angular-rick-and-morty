import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  public search = new FormControl();
  public $search = this.search.valueChanges.pipe(
    debounceTime(500),
    tap(value => console.log('Fluxo inicial ', value)),
  );
}
