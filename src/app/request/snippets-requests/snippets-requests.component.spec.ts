import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetsRequestsComponent } from './snippets-requests.component';

describe('SnippetsRequestsComponent', () => {
  let component: SnippetsRequestsComponent;
  let fixture: ComponentFixture<SnippetsRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetsRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
