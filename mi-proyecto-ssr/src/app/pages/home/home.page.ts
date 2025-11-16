import { Component, OnInit, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ProhibitedRoutesService } from '../../services/prohibited-routes.service';
import { TownService } from '../../services/town.service';
import { take } from 'rxjs/internal/operators/take';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StatisticsService } from '../../services/statistics.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    FormsModule
  ],
  providers: [
    TownService, 
    ProhibitedRoutesService, 
    ConfigService,
  ],
})
export class HomePage implements OnInit {

  public browserLang: string | undefined = '';

  /*  
    values
  */
  public origin: any;
  public destination: any;
  public dateValue: string = '';
  public timeValue: string = '';
  public dateTimeValue: string = '';

  /*
    labels
  */
  public originLabel = '';
  public destinationLabel = '';
  
  /*
    injects
  */
  private _townService = inject(TownService);
  private _prohibitedRoutesService = inject(ProhibitedRoutesService);
  private _statisticsService = inject(StatisticsService);
  private _router = inject(Router);

  /*
    indicators
  */
  public loading: boolean = false;
  public error = false;
  public isRouteProhibited = false;


  towns: any[] = [];

  constructor(public translate: TranslateService) {
    this.browserLang = translate.getBrowserLang();

    if (this.browserLang) {
      translate.setDefaultLang(this.browserLang);
      translate.use(this.browserLang);
    }

    this.translate
      .get(['origin', 'destination', 'island'])
      .subscribe((translations: any) => {
        this.originLabel = translations.origin;
        this.destinationLabel = translations.destination;
        // this.islandLabel = translations.island;
      });

    // this.dateTimeValue = new Date().toISOString();
    // this._initializeUserId();
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  private _generateRandomId(): string {
    return 'web-user-' + Math.random().toString(36).substring(2, 15) + '-' + Math.random().toString(36).substring(2, 15);
  }

  private _initializeUserId(): void {
    const existingUserId = localStorage.getItem('userId');
    if (!existingUserId) {
      const newUserId = this._generateRandomId();
      localStorage.setItem('userId', newUserId);
    }
  }

  public loadData(): void {

    this.loading = true;

    this._townService.getTowns().pipe(take(1)).subscribe({
      next: (towns: any[]) => {
        this.loading = false;

        this.towns = towns;
        // this.loadConfig(towns);
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  public find(): void {    

    console.log(this.origin);
    console.log(this.destination);

    const queryParams: any = {};
    if (this.dateValue) queryParams.date = this.dateValue;
    if (this.timeValue) queryParams.time = this.timeValue;

    const originSlug = this.origin.slug;
    const destinationSlug = this.destination.slug;

    this._router.navigate(['/lines', originSlug, destinationSlug], { queryParams });
    
    // this.navigateTo();
  }

  public async navigateTo(): Promise<void> {
    this.loadProhibitedRoutes();
  }

  public loadProhibitedRoutes(): void {

    this.loading = true;
    this._prohibitedRoutesService.getAll().pipe(take(1)).subscribe({
      next: (prohibitedRoutes: any[]) => {

        this.loading = false;

        this.isRouteProhibited = prohibitedRoutes.some(route =>
          (route.origin === this.origin.id_locations && route.destination === this.destination.id_locations) ||
          (route.origin === this.destination.id_locations && route.destination === this.origin.id_locations)
        );

        if (this.origin.id_locations === this.destination.id_locations) {
          this.isRouteProhibited = true;
        }

        const body = {
          origin: this.origin.description,
          destination: this.destination.description,
          datetime_input: this.dateTimeValue,
          datetime_search: new Date().toISOString(),
          // username: localStorage.getItem('userId') || 'unknown'
        };

        this.loading = true;
        this._statisticsService.addStatistics(body).subscribe({
          next: () => {

            this.loading = false;

            /*
            this._homeToLines.setData(
              this.origin,
              this.destination,
              this.dateTimeValue
            );
            */
                       

            if (!this.isRouteProhibited) {
              this._router.navigate(['/lines']).finally(() => {
              
              });
            }
          },
          error: () => {
            this.loading = false;
            this.error = true;
          },
          complete: () => { }
        });
      },
      error: () => {

        this.loading = false;
        this.error = true;
      },
      complete: () => { }
    });
  }
}
