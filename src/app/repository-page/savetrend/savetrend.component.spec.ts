import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavetrendComponent } from './savetrend.component';

describe('SavetrendComponent', () => {
  let component: SavetrendComponent;
  let fixture: ComponentFixture<SavetrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavetrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavetrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
