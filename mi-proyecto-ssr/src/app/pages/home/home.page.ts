import { Component, OnInit, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ProhibitedRoutesService } from '../../services/prohibited-routes.service';
import { TownService } from '../../services/town.service';
import { take } from 'rxjs/internal/operators/take';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslateModule,
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
    labels
  */
  public originLabel = '';
  public destinationLabel = '';
  

  /*
    injects
  */
  private _townService = inject(TownService);

  /*
    indicators
  */
  public loading: boolean = false;
  public error = false;

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
}
