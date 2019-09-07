import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStoryComponent } from './upload-story.component';

describe('UploadStoryComponent', () => {
  let component: UploadStoryComponent;
  let fixture: ComponentFixture<UploadStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
