import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRepositoryComponent } from './show-repository.component';

describe('ShowRepositoryComponent', () => {
  let component: ShowRepositoryComponent;
  let fixture: ComponentFixture<ShowRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
