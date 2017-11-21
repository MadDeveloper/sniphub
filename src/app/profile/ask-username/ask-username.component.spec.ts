import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskUsernameComponent } from './ask-username.component';

describe('AskUsernameComponent', () => {
  let component: AskUsernameComponent;
  let fixture: ComponentFixture<AskUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
