import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrepositoryComponent } from './addrepository.component';

describe('AddrepositoryComponent', () => {
  let component: AddrepositoryComponent;
  let fixture: ComponentFixture<AddrepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
