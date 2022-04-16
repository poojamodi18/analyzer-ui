import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueanalysisComponent } from './issueanalysis.component';

describe('IssueanalysisComponent', () => {
  let component: IssueanalysisComponent;
  let fixture: ComponentFixture<IssueanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueanalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
