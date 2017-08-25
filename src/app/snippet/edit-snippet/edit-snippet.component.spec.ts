import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSnippetComponent } from './edit-snippet.component';

describe('AddSnippetComponent', () => {
  let component: EditSnippetComponent;
  let fixture: ComponentFixture<EditSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSnippetComponent ]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
