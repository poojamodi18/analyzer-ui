import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PranalysisComponent } from './pranalysis.component';

describe('PranalysisComponent', () => {
  let component: PranalysisComponent;
  let fixture: ComponentFixture<PranalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PranalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PranalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
