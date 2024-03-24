import { CharacterService } from './core/services/character.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Character, Info } from './core/models/caracters.interfaces';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

import { CardComponent } from './shared/components/card/card.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  info$: Observable<Info>;
  characters$: Observable<Character[]>;

  constructor(private characterService: CharacterService) {
    this.characters$ = this.characterService.characters$;

    this.info$ = this.characterService.info$;

    this.loadCharacters();
  }

  public loadCharacters(): void {
    this.characterService.getCharacters().subscribe({
      next: () => console.log('Personagens iniciais carregados com sucesso!'),
      error: (error) => console.error('Erro ao carregar personagens iniciais:', error),
    });
  }

  public loadMoreCharacters(): void {
    this.characterService.loadMoreCharacters().subscribe({
      next: () => console.log('Personagens adicionais carregados com sucesso!'),
      error: (error) => console.error('Erro ao carregar mais personagens:', error),
    });
  }
}
