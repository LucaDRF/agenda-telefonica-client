import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'app-home',
  imports: [ContactListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
