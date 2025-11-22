import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  @Output() changeHeader = new EventEmitter<void>();
  @Input() page: string = '';
  @Input() text: string = '';

  currentLang: string = 'ES';


}
