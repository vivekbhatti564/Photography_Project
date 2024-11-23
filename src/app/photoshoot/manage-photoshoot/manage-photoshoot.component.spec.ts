import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhotoshootComponent } from './manage-photoshoot.component';

describe('ManagePhotoshootComponent', () => {
  let component: ManagePhotoshootComponent;
  let fixture: ComponentFixture<ManagePhotoshootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePhotoshootComponent]
    });
    fixture = TestBed.createComponent(ManagePhotoshootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
