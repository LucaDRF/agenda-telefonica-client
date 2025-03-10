import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteContactListComponent } from './favourite-contact-list.component';

describe('FavouriteContactListComponent', () => {
  let component: FavouriteContactListComponent;
  let fixture: ComponentFixture<FavouriteContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteContactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
