import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-slider-lines',
  templateUrl: './slider-lines.component.html',
  styleUrls: ['./slider-lines.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ]
})
export class SliderLinesComponent {

  @Input() lines: any;
  @Output() filter = new EventEmitter<void>();
  
  public dateTimeValue= '';
  public dayOfWeek = '';

  constructor(public translate: TranslateService) {
      // translate.use('en');
  }

  public filterEmit(line: any): void {
    this.filter.emit(
      line
    );
  }

}
