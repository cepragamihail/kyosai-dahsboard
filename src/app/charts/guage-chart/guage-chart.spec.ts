import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuageChart } from './guage-chart';

describe('GuageChart', () => {
  let component: GuageChart;
  let fixture: ComponentFixture<GuageChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuageChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuageChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
