import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsComboBoxComponent } from './persons-combo-box.component';

describe('PersonsComboBoxComponent', () => {
  let component: PersonsComboBoxComponent;
  let fixture: ComponentFixture<PersonsComboBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsComboBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
