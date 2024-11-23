import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGalleryComponent } from './update-gallery.component';

describe('UpdateGalleryComponent', () => {
  let component: UpdateGalleryComponent;
  let fixture: ComponentFixture<UpdateGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGalleryComponent]
    });
    fixture = TestBed.createComponent(UpdateGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
