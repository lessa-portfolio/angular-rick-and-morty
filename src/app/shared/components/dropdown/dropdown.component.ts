import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'rm-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  // @Input() id: string = '';
  // @Input() name: string = '';
  // @Input() options: { value: string, label: string }[] = [];
  // @Input() selectedOption: string = '';
  // @Input() placeholder: string = 'Escolha uma opção';
  // @Input() allowUnselect: boolean = false;

  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() allowUnselect: boolean = false;

  @Output() optionSelected = new EventEmitter<string>();

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(value: string | null) {
    this.selectedOption = value ? value : '';
    this.isDropdownOpen = false;
    this.optionSelected.emit(this.selectedOption);
  }
}
