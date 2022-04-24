import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentanalysisComponent } from './recentanalysis.component';

describe('RecentanalysisComponent', () => {
  let component: RecentanalysisComponent;
  let fixture: ComponentFixture<RecentanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentanalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
