import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoshootComponent } from './update-photoshoot.component';

describe('UpdatePhotoshootComponent', () => {
  let component: UpdatePhotoshootComponent;
  let fixture: ComponentFixture<UpdatePhotoshootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePhotoshootComponent]
    });
    fixture = TestBed.createComponent(UpdatePhotoshootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
