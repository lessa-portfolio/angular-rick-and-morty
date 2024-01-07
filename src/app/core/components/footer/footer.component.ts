import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SmallButtonComponent } from '../../../shared/components/small-button/small-button.component';

@Component({
  selector: 'rm-footer',
  standalone: true,
  imports: [
    CommonModule,
    SmallButtonComponent
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public buttonList = [
    {
      name: 'linkedin icon',
      url: 'https://www.linkedin.com/in/lucaslessa7/',
      icon: 'assets/icons/linkedin.svg',
    },{
      name: 'behance icon',
      url: 'https://www.behance.net/lucaslessa2',
      icon: 'assets/icons/behance.svg',
    },{
      name: 'github icon',
      url: 'https://github.com/lessa-portfolio',
      icon: 'assets/icons/github.svg',
    },{
      name: 'instagram icon',
      url: 'https://www.instagram.com/lucas.lessa14/',
      icon: 'assets/icons/instagram.svg',
    }
  ]
}
