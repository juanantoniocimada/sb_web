import { Component, OnInit, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ProhibitedRoutesService } from '../../services/prohibited-routes.service';
import { TownService } from '../../services/town.service';
import { take } from 'rxjs/internal/operators/take';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-links',
  templateUrl: 'links.page.html',
  styleUrls: ['links.page.scss'],
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
export class LinksPage implements OnInit {

  /*
    injects
  */
  private _townService = inject(TownService);

  public browserLang: string | undefined = '';
  public combinations: any[] = [];

  /*
    indicators
  */
  public loading: boolean = false;
  public error = false;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {

    this.loading = true;

    this._townService.getCombinations().pipe(take(1)).subscribe({
      next: (combinations: any[]) => {
        this.loading = false;
        

        this.combinations = combinations; 
        console.log(combinations);
                

        // this.loadConfig(towns);
      },
      error: (error) => {
        this.loading = false;
        this.error = true;
      },
    });
  }


}
