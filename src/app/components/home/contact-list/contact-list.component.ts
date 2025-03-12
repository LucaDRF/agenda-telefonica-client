import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './contact-list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  @Input() isFilteredByFavourite!: boolean;
  public isLoadingList = false;
  public contacts: Contact[] = [];
  @Input() value!: number;


  constructor(private contactService: ContactService, private router: Router) { }

  ngOnChanges() {
    this.listContacts();
  }

  ngOnInit(): void {
    this.isLoadingList = true;

    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.isLoadingList = false;
    });
  }

  listContacts() {
    this.isLoadingList = true;

    if (this.isFilteredByFavourite) {
      this.contactService.getFavouriteContacts().subscribe((contacts: Contact[]) => {
        this.isLoadingList = false;
        this.contacts = contacts;
      });

      return;
    }

    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.isLoadingList = false;
      this.contacts = contacts;
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
