import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoshootComponent } from './add-photoshoot.component';

describe('AddPhotoshootComponent', () => {
  let component: AddPhotoshootComponent;
  let fixture: ComponentFixture<AddPhotoshootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPhotoshootComponent]
    });
    fixture = TestBed.createComponent(AddPhotoshootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
