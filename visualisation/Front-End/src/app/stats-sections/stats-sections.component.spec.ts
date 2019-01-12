import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSectionsComponent } from './stats-sections.component';

describe('StatsSectionsComponent', () => {
  let component: StatsSectionsComponent;
  let fixture: ComponentFixture<StatsSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
