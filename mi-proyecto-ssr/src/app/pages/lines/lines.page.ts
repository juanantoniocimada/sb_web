import { LinesService } from './../../services/lines.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { HomeToLines } from 'src/app/services/home-to-lines';

import { take } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TownService } from '../../services/town.service';
import { HolidaysService } from '../../services/holidays.service';
import { extractTimeFromISO, getDayOfWeekFromISO } from '../../utils/utils';
import { SliderLinesComponent } from '../../components/slider-lines/slider-lines.component';
import { ItemComponent } from '../../components/item/item.component';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.page.html',
  styleUrls: ['./lines.page.scss'],
  standalone: true,
  providers: [TownService],
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    TranslateModule,
    ItemComponent,
    // ItemComponentCopy,
    SliderLinesComponent,
  ],
})
export class LinesPage implements OnInit {
  
  /*
    values
  */
  public titleSchedule: string = '';
  public dateTimeValue: string = '';

  public isHoliday: boolean = false;
  public hours: any[] = [];
  public hoursOriginal: any[] = [];
  public stepSelected = 1;
  public line: any | null = null;
  public lines: any = [];
  public holidayData: any = null;
  public dayName = '';
  public price = '';
  public combinedRoute: any = '';
  public combinadas: any;
  public selectedOption = 0;
  public mode = '';
  public error = false;

  /*
    injects
  */
  private _linesService = inject(LinesService);
  public _router = inject(Router);
  // private _homeToLines = inject(HomeToLines);
  private _holidaysService = inject(HolidaysService);

  public activeFilters = false;

  public iAmGoingFrom: string = ' Voy de ( puerto del Rosario ) a ( Corralejo ). ';
  // puerto del Rosario
  // Corralejo

  public destination: any = {};
  public origin: any = {};

  public loading: boolean = false;

  public browserLang: string | undefined = '';

  constructor(public translate: TranslateService) {
    this.browserLang = translate.getBrowserLang();

    if (this.browserLang) {
      translate.setDefaultLang(this.browserLang);
      translate.use(this.browserLang);
    }
  }

  ngOnInit(): void {
    // this.dateTimeValue = this._homeToLines.getDatetime();

    // this.origin = this._homeToLines.getOrigin();
    // this.destination = this._homeToLines.getDestination();

    this.iAmGoingFrom = this.translate.instant('iAmGoingFrom', { origin: this.origin.description, destination: this.destination.description });

    this.loadHolidays();
  }

  public getHours(festive: boolean) {

    this.loading = true;
    const routeIds = this.lines.map((line: any) => line.id_routes);
    

    // Formatear la hora como HH:MM:SS
    const time = extractTimeFromISO(this.dateTimeValue);
    this.dayName = getDayOfWeekFromISO(this.dateTimeValue);

    const item = {
      routeIds: routeIds,
      hourValue: '08:54:41',
      dayName: 'sunday',
      festive: festive,
    };    

    this._linesService.getHours(item).pipe(take(1)).subscribe({
      next: (data: any) => {        

        this.loading = false;

        this.hours = data;
        this.hoursOriginal = data;

      },
      error: (error: any) => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  public getLines(origin: string, destination: string) {

    this.lines = [];

    this.loading = true;

    this._linesService.getLines('87', '49').pipe(take(1)).subscribe({
      next: (data: any) => {

        this.loading = false;


        if (data.mode === 'combinedRoutes') {
          this.mode = 'combinedRoutes';

          this.combinadas = data['combined'];          

          this.selectCombined(
            this.combinadas[0].items[0],
            0
          );


        } else {
          this.mode = 'directRoute';
          this.lines = data['data'];

          this.getHours(this.isHoliday);
        }

      },
      error: (error: any) => {
        this.loading = false;
        this.error = true;

        this._router.navigate(['/home']);

      }
    });
  }

  public selectCombined(item: any, index: any) {

    this.stepSelected = index + 1;

    this.lines = item.routes;

    this.getHours(this.isHoliday);
  }

  public changeHeader() {

    [this.origin, this.destination] = [this.destination, this.origin];
    
    // this._homeToLines.setOrigin(this.origin);
    // this._homeToLines.setDestination(this.destination)
    
    this.iAmGoingFrom = this.translate.instant('iAmGoingFrom', { origin: this.origin.description, destination: this.destination.description });
    this.getLines(this.origin.id_locations, this.destination.id_locations);
  }

  public filter(event: any) {
    
    this.activeFilters = true;
    
    this.hours = this.hoursOriginal.filter((hour: any) => {
      return hour.routes_id === event.id_routes;
    });

  }

  seeAll() {
    this.hours = this.hoursOriginal;

    this.activeFilters = false;
  }

  loadHolidays(): void {

    this.loading = true;

    this._holidaysService.getHolidays().pipe(take(1)).subscribe({
      next: (holidays: any[]) => {

        this.loading = false;

        const selectedDate = new Date(this.dateTimeValue);
        const todayYear = selectedDate.getFullYear();
        const todayMonth = selectedDate.getMonth() + 1; // Months are 0-based
        const todayDate = selectedDate.getDate();

        const matchingHoliday = holidays.find(holiday => {
          const holidayDate = new Date(holiday.date);
          return (
            holidayDate.getFullYear() === todayYear &&
            holidayDate.getMonth() + 1 === todayMonth &&
            holidayDate.getDate() === todayDate
          );
        });

        this.isHoliday = !!matchingHoliday;

        if (this.isHoliday) {
          this.holidayData = matchingHoliday;
        }

        this.getLines(this.origin.id_locations, this.destination.id_locations);
        
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
