import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchanalysisComponent } from './branchanalysis.component';

describe('BranchanalysisComponent', () => {
  let component: BranchanalysisComponent;
  let fixture: ComponentFixture<BranchanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchanalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
