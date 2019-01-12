import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeioComponent } from './homeio.component';

describe('HomeioComponent', () => {
  let component: HomeioComponent;
  let fixture: ComponentFixture<HomeioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
