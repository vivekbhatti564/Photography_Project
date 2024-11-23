import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoshootComponent } from './photoshoot.component';

describe('PhotoshootComponent', () => {
  let component: PhotoshootComponent;
  let fixture: ComponentFixture<PhotoshootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoshootComponent]
    });
    fixture = TestBed.createComponent(PhotoshootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
