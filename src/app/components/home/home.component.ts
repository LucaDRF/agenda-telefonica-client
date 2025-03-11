import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ContactListComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public isFilteredByFavourite: boolean = false;

  constructor(public router: Router) {}

  activateFilter() {
    this.isFilteredByFavourite = !this.isFilteredByFavourite;
  }

  registerContact() {
    this.router.navigate(['/register']);
  }
}
