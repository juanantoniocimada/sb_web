import { Component, OnInit, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ProhibitedRoutesService } from '../../services/prohibited-routes.service';
import { TownService } from '../../services/town.service';
import { take } from 'rxjs/internal/operators/take';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { NestJSService } from '../../services/nestjs.service';

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

  public nestJs = inject(NestJSService);
  private _townService = inject(TownService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  public browserLang: string | undefined = '';
  public combinations: any[] = [];

  public loading: boolean = false;
  public error = false;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {

    // this.loading = true;

    const titleContent = 'Rutas de Bus - fuerteguagua';
    const descriptionContent = 'combinaciones de rutas de bus disponibles con fuerteguagua.';

    this.titleService.setTitle(titleContent);

    this.metaService.updateTag({ name: 'description', 
      content: descriptionContent });

      /*
      this._townService.getCombinations().pipe(take(1)).subscribe({
      next: (combinations: any[]) => {
      this.loading = false;

      this.combinations = combinations; 
              
      },
      error: (error) => {
      this.loading = false;
      this.error = true;
      },
      });
      */



  }

  load(): void {
    this.nestJs.generateCombinations().pipe(take(1)).subscribe({
      next: (response: any) => {
        console.log('Combinations generated:', response);
        
        this.combinations = response.data;
      },
      error: (error) => {
        console.error('Error generating combinations:', error);
      }
    });

  }

}
