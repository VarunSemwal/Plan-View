import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedTimesheetComponent } from './submitted-timesheet.component';

describe('SubmittedTimesheetComponent', () => {
  let component: SubmittedTimesheetComponent;
  let fixture: ComponentFixture<SubmittedTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
