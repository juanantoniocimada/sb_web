import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTE_PATHS } from '../../helpers/routes.helper';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  linksUrl = ROUTE_PATHS.links();
}
