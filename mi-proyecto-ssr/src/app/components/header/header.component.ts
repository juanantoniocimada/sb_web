import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule
  ]
})
export class HeaderComponent {

  @Input() page: string = '';
  @Input() text: string = '';

  public browserLang: string | undefined = '';

  constructor(public translate: TranslateService) {
    // translate.use(this.browserLang);    
  }

}
