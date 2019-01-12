import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsSectionsComponent } from './incidents-sections.component';

describe('IncidentsSectionsComponent', () => {
  let component: IncidentsSectionsComponent;
  let fixture: ComponentFixture<IncidentsSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentsSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
