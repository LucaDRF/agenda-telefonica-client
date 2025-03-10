import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditingComponent } from './contact-editing.component';

describe('ContactEditingComponent', () => {
  let component: ContactEditingComponent;
  let fixture: ComponentFixture<ContactEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
