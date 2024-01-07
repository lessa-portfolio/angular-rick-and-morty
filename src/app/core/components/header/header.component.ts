import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RickAndMortyService } from '../../../services/rick-and-morty.service';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { SmallButtonComponent } from '../../../shared/components/small-button/small-button.component';

@Component({
  selector: 'rm-header',
  standalone: true,
  imports: [
    CommonModule,
    SmallButtonComponent,
    SearchInputComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isFixed: boolean = false;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  public handleSearchInput(value: string) {
    this.rickAndMortyService.name = [value];
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollTop > 240) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  }
}
