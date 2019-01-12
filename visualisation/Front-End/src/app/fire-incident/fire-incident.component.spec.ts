import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireIncidentComponent } from './fire-incident.component';

describe('FireIncidentComponent', () => {
  let component: FireIncidentComponent;
  let fixture: ComponentFixture<FireIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
