import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Result } from '../../../interfaces/caracters.interfaces';

@Component({
  selector: 'rm-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() caracter!: Result;
}
