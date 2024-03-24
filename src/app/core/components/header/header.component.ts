import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { SmallButtonComponent } from '../../../shared/components/small-button/small-button.component';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'rm-header',
  standalone: true,
  imports: [CommonModule, SmallButtonComponent, SearchInputComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isFixed: boolean = false;

  constructor(private filterService: FilterService) {}

  public handleSearchInput(value: string) {
    this.filterService.setName(value);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollTop > 240) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  }
}
