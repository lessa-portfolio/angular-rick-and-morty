import { Component, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/caracters.interfaces';

@Component({
  selector: 'rm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() caracter!: Result;
}
