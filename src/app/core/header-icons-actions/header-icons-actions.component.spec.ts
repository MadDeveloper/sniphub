import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIconsActionsComponent } from './header-icons-actions.component';

describe('HeaderIconsActionsComponent', () => {
  let component: HeaderIconsActionsComponent;
  let fixture: ComponentFixture<HeaderIconsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderIconsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderIconsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
