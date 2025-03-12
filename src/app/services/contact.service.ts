import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { environment } from '../enviroment';
import { ContactForm } from '../models/contact-form.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = environment.apiUrl;

  constructor(public httpClient: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.apiUrl}/contacts/list`);
  }

  getFavouriteContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.apiUrl}/contacts/list-favourites`);
  }

  getContactDetail(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(`${this.apiUrl}/contacts/${id}/details`);
  }

  createContact(contactForm: ContactForm) {
    return this.httpClient.post(`${this.apiUrl}/contacts/add`, contactForm);
  }

  addFavourite(id: string): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/contacts/add-favourite/${id}`, {});
  }

  removeFavourite(id: string): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/contacts/remove-favourite/${id}`, {});
  }

  editContact(id: string, contact: ContactForm): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/contacts/edit/${id}`, contact);
  }

  deleteContact(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/contacts/delete/${id}`);
  }
}
