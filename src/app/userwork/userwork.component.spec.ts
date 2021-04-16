import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserworkComponent } from './userwork.component';

describe('UserworkComponent', () => {
  let component: UserworkComponent;
  let fixture: ComponentFixture<UserworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
