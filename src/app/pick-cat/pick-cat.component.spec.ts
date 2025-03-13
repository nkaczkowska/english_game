import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickCatComponent } from './pick-cat.component';

describe('PickCatComponent', () => {
  let component: PickCatComponent;
  let fixture: ComponentFixture<PickCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
