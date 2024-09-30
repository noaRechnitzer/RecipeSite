import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';
import { AppBarComponent } from './pages/app-bar/app-bar.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipesListComponent,AppBarComponent,LoginFormComponent,SearchResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-side';
}
