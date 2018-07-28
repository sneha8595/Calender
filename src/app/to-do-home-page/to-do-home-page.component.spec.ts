import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoHomePageComponent } from './to-do-home.component';

describe('ToDoHomePageComponent', () => {
  let component: ToDoHomePageComponent;
  let fixture: ComponentFixture<ToDoHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
