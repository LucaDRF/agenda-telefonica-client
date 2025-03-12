import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  @Input()
  public isLoadingList = false;
  public contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.isLoadingList = true;

    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.isLoadingList = false;
    });
  }

  addFavorite(contact: Contact): void {
    this.contactService.addFavourite(contact.id).subscribe(() => {
      contact.favorite = true;
    });
  }

  removeFavorite(contact: Contact): void {
    this.contactService.removeFavourite(contact.id).subscribe(() => {
      contact.favorite = false;
    });
  }

  editContact(contact: Contact): void {
    localStorage.setItem('contactId', contact.id);

    this.router.navigate(['/edit']);
  }

  removeContact(idToBeDeleted: string): void {
    this.contacts = this.contacts.filter(contact => contact.id !== idToBeDeleted);

    this.contactService.deleteContact(idToBeDeleted).subscribe();
  };
}
