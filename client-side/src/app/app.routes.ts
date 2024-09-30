import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { authGuard } from './shared/guards/auth.guard';
  
export const routes: Routes = [
    //{ path: '', loadComponent: () => import('./pages/login-form/login-form.component').then(f => f.LoginFormComponent)   },
    //{ path: '**', loadComponent: () => import('./pages/login-form/login-form.component').then(f => f.LoginFormComponent)  },
    { path: 'login', loadComponent: () => import('./pages/login-form/login-form.component').then(f => f.LoginFormComponent) },
    { path: 'personal-area', loadComponent: () => import('./pages/personal-area/personal-area.component').then(f => f.PersonalAreaComponent) , canActivate: [authGuard]},
    // { path: 'recipes', loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(f => f.RecipesListComponent) , children: [
    //     { path: 'll',component:LoginFormComponent },

    // ]},
    { path: 'search', loadComponent: () => import('./pages/search-results/search-results.component').then(f => f.SearchResultsComponent) },
    { path: 'recipes', loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(f => f.RecipesListComponent) },
    { path: 'recipes/category/:name', loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(f => f.RecipesListComponent) },

    { path: 'recipes/:id', component: RecipeDetailsComponent },
    {
        path: 'signUp', loadComponent: () => import('./pages/sign-up/sign-up.component').then(f => f.SignUpComponent)
    },
    {
        path: 'addRecipe', loadComponent: () => import('./pages/add-recipe-form/add-recipe-form.component').then(f => f.AddRecipeFormComponent)
        // path: 'addRecipe', loadComponent: () => import('./pages/add-recipe-form/add-recipe-form.component').then(f => f.AddRecipeFormComponent), canActivate: [authGuard]
    },
];
