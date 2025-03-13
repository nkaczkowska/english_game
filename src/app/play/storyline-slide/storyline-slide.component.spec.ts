import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorylineSlideComponent } from './storyline-slide.component';

describe('StorylineSlideComponent', () => {
  let component: StorylineSlideComponent;
  let fixture: ComponentFixture<StorylineSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorylineSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorylineSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
