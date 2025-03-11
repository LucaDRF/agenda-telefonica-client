import { Routes } from '@angular/router';
import { ContactRegistrationComponent } from './components/contact-registration/contact-registration.component';
import { ContactEditingComponent } from './components/contact-editing/contact-editing.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: ContactEditingComponent },
  { path: 'register', component: ContactRegistrationComponent },
  {
    path: '**',
    redirectTo: 'home',
  },
];
