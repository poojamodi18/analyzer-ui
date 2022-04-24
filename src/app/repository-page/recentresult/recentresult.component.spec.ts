import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentresultComponent } from './recentresult.component';

describe('RecentresultComponent', () => {
  let component: RecentresultComponent;
  let fixture: ComponentFixture<RecentresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
