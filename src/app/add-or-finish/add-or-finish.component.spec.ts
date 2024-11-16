import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrFinishComponent } from './add-or-finish.component';

describe('AddOrFinishComponent', () => {
  let component: AddOrFinishComponent;
  let fixture: ComponentFixture<AddOrFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrFinishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
