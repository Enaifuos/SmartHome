import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrusionIncidentComponent } from './intrusion-incident.component';

describe('IntrusionIncidentComponent', () => {
  let component: IntrusionIncidentComponent;
  let fixture: ComponentFixture<IntrusionIncidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrusionIncidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusionIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
