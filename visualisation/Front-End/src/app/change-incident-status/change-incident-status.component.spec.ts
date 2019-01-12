import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIncidentStatusComponent } from './change-incident-status.component';

describe('ChangeIncidentStatusComponent', () => {
  let component: ChangeIncidentStatusComponent;
  let fixture: ComponentFixture<ChangeIncidentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeIncidentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeIncidentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
