import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';
import { Contact } from '../../models/contact.model';


@Component({
  selector: 'app-contact-editing',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-editing.component.html',
  styleUrl: './contact-editing.component.css'
})
export class ContactEditingComponent implements OnInit {
  public contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cellPhone: new FormControl('', [Validators.maxLength(11), Validators.minLength(11)]),
    telephone: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)])
  });
  public hasSubmitted = false;
  public isLoadingEdit = false;
  public isLoadingDetails = false;
  public phoneAlreadyExists = false;
  public emailAlreadyExists = false;
  public contactId = localStorage.getItem('contactId');

  constructor(public contactService: ContactService, public router: Router) { }

  ngOnInit() {
    this.isLoadingDetails = true;

    if (!this.contactId) {
      this.router.navigate(['/home']);

      return;
    }

    this.contactService.getContactDetail(this.contactId).subscribe((contact: Contact) => {
      this.contactForm.setValue({
        name: contact.name,
        email: contact.email,
        cellPhone: contact.cellPhone,
        telephone: contact.telephone
      });

      this.isLoadingDetails = false;
    });
  }

  public onSubmit() {
    this.hasSubmitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.isLoadingEdit = true;

    this.contactService.editContact(this.contactId!, this.contactForm.value as ContactForm).subscribe({
      next: () => {
        this.isLoadingEdit = true;
        this.router.navigate(['/home']);
      }, error: ({ error }) => {
        if (error === 'Celular já utilizado') {
          this.phoneAlreadyExists = true;
        }

        this.isLoadingEdit = false;
      }
    });
  }

  public cancelRegistration() {
    this.router.navigate(['/home']);
  }
}
