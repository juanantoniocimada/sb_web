import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { HomeToLines } from 'src/app/services/home-to-lines';
import { RouteMapComponent } from '../route-map/route-map.component';


@Component({
  selector: 'app-item-copy',
  templateUrl: './item-copy.component.html',
  styleUrls: ['./item-copy.component.scss'],
  standalone: true,
  imports: [
      CommonModule,
      TranslateModule,
      RouteMapComponent
    ],
})
export class ItemComponentCopy implements OnInit, OnChanges {

  @Input() item: any = '';
  @Input() stepSelected: any = 0;
  @Input() color: string = '';
  @Input() index: number = 0;
  @Input() hour: any = {};
  @Input() dateTimeValue = "";

  /*
    injects
  */
  private _router = inject(Router);
  public translate = inject(TranslateService);
  // private _homeToLines = inject(HomeToLines);

  public myDest: any = {};
  public myCard: any = {
    card1: { hora: '', nombre: '', info: '' },
    card2: { hora: '', nombre: '', info: '' },
    card3: { hora: '', nombre: '', info: '' },
    card4: { hora: '', nombre: '', info: '' }
  };
  public routeStops: any[]  = [];
  public dayOfWeek = '';
  public browserLang: string | undefined = '';
  public destination :any = {};
  public origin :any = {};

  constructor() {
    this.browserLang = this.translate.getBrowserLang();

    if (this.browserLang) {
      this.translate.setDefaultLang(this.browserLang);
      this.translate.use(this.browserLang);
    }
  }

  ngOnChanges(changes: any): void {

    if (changes.stepSelected) {
      this.stepSelected = changes.stepSelected.currentValue;
    }

    this.getLocationByLocationsRoutesId(this.hour.id_hours_routes);    
  }

  ngOnInit(): void {
    this.getLocationByLocationsRoutesId(this.hour.id_hours_routes);    
  }

  public getCardStyles(color: any): any {
    const styles: any = {
      'background': `linear-gradient(to right, ${color} 10%, #ffffff 5%)`,
    };

    return styles;
  }

  public getLocationByLocationsRoutesId(id: string): void {

    // this.dayOfWeek = getDayOfWeekFromISO(this.dateTimeValue);    

    this.hour.detail = this.item.detail;

    this.hour.detail!.orig! = this.hour.detail?.[0] || null;

    this.hour.detail.dest = this.hour.detail?.[this.hour.detail.length - 1] || null;

    // this.origin = this._homeToLines.getOrigin();

    // this.destination = this._homeToLines.getDestination();

    this.myCard ={
      card1: {
        hora: this.hour.value,
        nombre: this.hour.detail?.orig?.description,
      },
      card4: {
        hora: '',
        nombre: this.hour.detail.dest.description
      }
    }; 

    this.routeStops = [];

    if (this.hour.detail.orig.description !== this.origin.description && this.stepSelected === 1) {
      this.myCard.card2 = {
        hora: '',
        nombre: this.origin.description,
        info: this.getInfo(this.origin.description),
      };

      this.routeStops.push({
        time: '',
        name: this.myCard?.card2?.nombre || '',
        number: 2,
        info: this.getInfo(this.origin.description)
        
      });
    }

    if (this.hour.detail.dest.description !== this.destination.description && this.stepSelected === 2) {
    
      this.myCard.card3 = {
        hora: '',
        nombre: this.destination.description,
        info: this.getInfo(this.destination.description),
        type: 'filled' ,
      };

      this.routeStops.push({
        time: '',
        name: this.myCard?.card3?.nombre || '',
        number: 3,
        info: this.getInfo(this.destination.description),
      });
      
    }

    this.routeStops.push({ 
      time: this.myCard?.card1?.hora, 
      name: this.myCard?.card1?.nombre || '', 
      number: 1
    });

    this.routeStops.push({ 
      time: '', 
      name: this.myCard?.card4?.nombre || '', 
      number: 4
    });

    this.routeStops.sort((a, b) => a.number - b.number);

      if (this.routeStops.length === 2) {
        this.routeStops = this.routeStops.map(stop => ({
          ...stop,
          type: 'filled'
        }));
      }

      if (this.routeStops.length === 3) {
        
        if(this.stepSelected === 1) {
          if (this.origin.description === this.myCard.card1.nombre) {

          this.routeStops = this.routeStops.map((stop, index) => ({
            ...stop,
            type: index < 2 ? 'filled' : 'empty'
          }));
          } else {

          this.routeStops = this.routeStops.map((stop, index) => ({
            ...stop,
            type: index >= 1 ? 'filled' : 'empty'
          }));

          }
        }

        if(this.stepSelected === 2) {
          if (this.origin.description === this.myCard.card1.nombre) {

            this.routeStops = this.routeStops.map((stop, index) => ({
              ...stop,
              type: index >= 1 ? 'filled' : 'empty'
            }));
          } else {

            this.routeStops = this.routeStops.map((stop, index) => ({
              ...stop,
              type: index < 2 ? 'filled' : 'empty'
            }));
          }
        }
      }

      if (this.routeStops.length === 4) {
        this.routeStops = this.routeStops.map((stop, index) => ({
          ...stop,
          type: index === 0 || index === 3 ? 'empty' : 'filled'
        }));
      }
    
  }

  public getInfo(location: string): string {

    let info = '';

    this.hour.detail.forEach((element: any) => {

      if(element.description === location) {
        
        if(element.show && !this.isEnabledToday(element)) {
          
          info = element.info2;
        }
      }
    });
    
    return info;
  }

  public goToDetail(item: any) {

    this._router
      .navigate(['/detail'], {
        queryParams: {
          id_hours_routes: JSON.stringify(this.hour.id_hours_routes),
          dateTimeValue: JSON.stringify(this.dateTimeValue),
          hourOrigin: JSON.stringify(this.hour.value)
        },
      })
      .finally(() => {

      });
  }

  public formatTime(hora24h: string) {
    return this.formatTimeExact(hora24h);
  }

  public formatTimeExact(hora24h: string): string {
    const [hour, minute] = hora24h.split(':');
    const date = new Date();
    date.setHours(parseInt(hour, 10));
    date.setMinutes(parseInt(minute, 10));

    const formattedHour = date.getHours();
    const formattedMinute = date.getMinutes().toString().padStart(2, '0');

    return `${formattedHour}.${formattedMinute}`;
  }

  public isEnabledToday(location: any): boolean {

    switch (this.dayOfWeek) {
      case 'sunday': return location.sunday_enabled?.toString().toLowerCase() === '1';
      case 'monday': return location.monday_enabled?.toString().toLowerCase() === '1';
      case 'tuesday': return location.tuesday_enabled?.toString().toLowerCase() === '1';
      case 'wednesday': return location.wednesday_enabled?.toString().toLowerCase() === '1';
      case 'thursday': return location.thursday_enabled?.toString().toLowerCase() === '1';
      case 'friday': return location.friday_enabled?.toString().toLowerCase() === '1';
      case 'saturday': return location.saturday_enabled?.toString().toLowerCase() === '1';
      default: return false;
    }
  }
}
