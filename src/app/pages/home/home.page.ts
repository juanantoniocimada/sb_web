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
import { Meta, Title } from '@angular/platform-browser';
import { NestJSService } from '../../services/nestjs.service';

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

  /*  
    values
  */
  public origin: any;
  public destination: any;
  
  public dateValue: string = '';
  public timeValue: string = '';

  // public dateTimeValue: string = '';

  /*
    labels
  */
  public originLabel = '';
  public destinationLabel = '';
  
  /*
    injects
  */

  public nestJs = inject(NestJSService);

  private _townService = inject(TownService);
  private _prohibitedRoutesService = inject(ProhibitedRoutesService);
  private _statisticsService = inject(StatisticsService);
  private _router = inject(Router);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /*
    indicators
  */
  public loading: boolean = false;
  public error = false;
  public isRouteProhibited = false;

  towns: any[] = [];

  constructor(public translate: TranslateService) {

    // translate.use('en');

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

    // ≈ 45 caracteres ✔
    this.titleService.setTitle('guagua fuerteventura - fuerteguagua');

    // ≈ 120 caracteres ✔
    this.metaService.updateTag({ name: 'description', 
      content: 'Consulta horarios de la guaguas de fuerteventura' });


    if (!this.dateValue) {
      const now = new Date();
      this.dateValue = now.toISOString().slice(0, 10); // 'YYYY-MM-DD'
    }
    if (!this.timeValue) {
      const now = new Date();
      this.timeValue = now.toTimeString().slice(0, 5); // 'HH:mm'
    }

    this.loadData();

    // this.pruebaNestJs();
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

  public flip(): void {
    [this.origin, this.destination] = [
      this.destination, 
      this.origin,
    ];
  }

  public setOrigin(town: any): void {
    this.origin = town;
  }

  public setDestination(town: any): void {
    this.destination = town;
  }

  public loadData(): void {

    this.loading = true;

    this.nestJs.getLocations().pipe(take(1)).subscribe({
      next: (data: any) => {

        const towns = data.data;

        this.loading = false;
        
        this.towns = towns.sort((a: { orden: number; }, b: { orden: number; }) => a.orden - b.orden);

        this.towns = towns.filter((town: any) => town.show_selector === 1);

        const origin = towns.find((town: any) =>
          town.default_home_origin === 1);
        const destination = towns.find((town: any) =>
          town.default_home_destination === 1);

        this.setDestination(destination);
        this.setOrigin(origin);
        

        // this.loadConfig(towns);
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  public find(): void {    
    this.navigateTo();
  }

  public async navigateTo(): Promise<void> {
    this.loadProhibitedRoutes();
  }

  public loadProhibitedRoutes(): void {

    this.loading = true;
    this.nestJs.getProhibitedRoutes().pipe(take(1)).subscribe({
      next: (data: any) => {

      const prohibitedRoutes = data.data;
      
      this.loading = false;

      this.isRouteProhibited = prohibitedRoutes.some((route: any) =>
        (route.origin === String(this.origin.id_locations) && route.destination === String(this.destination.id_locations)) ||
        (route.origin === String(this.destination.id_locations) && route.destination === String(this.origin.id_locations))
      );

        if (this.origin.id_locations === this.destination.id_locations) {
          this.isRouteProhibited = true;
        }

        const body = {
          origin: this.origin.description,
          destination: this.destination.description,
          // datetime_input: this.dateTimeValue,
          datetime_search: new Date().toISOString(),
          // username: localStorage.getItem('userId') || 'unknown'
        };

        this.loading = true;
        this.nestJs.addStatistics(body).subscribe({
          next: () => {

            this.loading = false;

            /*
            this._homeToLines.setData(
              this.origin,
              this.destination,
              this.dateTimeValue
            );
            */
                       
            const originSlug = this.origin.slug;
            const destinationSlug = this.destination.slug;

            const queryParams: any = {};
            if (this.dateValue) queryParams.date = this.dateValue;
            if (this.timeValue) queryParams.time = this.timeValue;

            if (!this.isRouteProhibited) {
              this._router.navigate(['/', 'es', originSlug, destinationSlug], { queryParams });
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
