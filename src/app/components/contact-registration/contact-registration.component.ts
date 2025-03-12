import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ContactForm } from '../../models/contact-form.model';

@Component({
  selector: 'app-contact-registration',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-registration.component.html',
  styleUrl: './contact-registration.component.css'
})
export class ContactRegistrationComponent {
  public contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cellPhone: new FormControl('', [Validators.maxLength(11), Validators.minLength(11)]),
    telephone: new FormControl('', [Validators.maxLength(10), Validators.minLength(10)])
  });
  public hasSubmitted = false;
  public isLoadingRegistration = false;
  public phoneAlreadyExists = false;

  constructor(public contactService: ContactService, public router: Router) { }

  public onSubmit() {
    this.hasSubmitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.isLoadingRegistration = true;

    this.contactService.createContact(this.contactForm.value as ContactForm).subscribe({
      next: () => {
        this.isLoadingRegistration = true;
        this.router.navigate(['/home']);
      }, error: ({ error }) => {
        if (error === 'Celular já utilizado') {
          this.phoneAlreadyExists = true;
        }

        this.isLoadingRegistration = false;
      }
    });
  }

  public cancelRegistration() {
    this.router.navigate(['/home']);
  }
}
