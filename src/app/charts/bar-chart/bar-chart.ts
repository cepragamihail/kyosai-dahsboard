import {AfterViewInit, Component, ElementRef, HostListener, viewChild} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  template: `<figure #bar_chart></figure>`,
  styles: ``
})
export class BarChart implements AfterViewInit {
  private barLabelRotationChart: echarts.EChartsType | undefined;
  private barLabelRotationChartElement = viewChild<ElementRef>('bar_chart')


  ngAfterViewInit(): void {
    this.barLabelRotationChart = echarts.init(this.barLabelRotationChartElement()?.nativeElement, 'dark', {
      height: 500
    });
    this.barLabelRotationChart.setOption(this.getOption());
  }

  @HostListener('window:resize', ['$event'])
  onResized(): void {
    this.barLabelRotationChart?.resize();
  }

  getOption(): echarts.EChartsCoreOption {
    const chartHeight = this.barLabelRotationChart?.getHeight() || 500; // Use a default height if chart is not yet initialized
    const dynamicFontSize = Math.max(10, Math.min(16, chartHeight / 30)); // Adjust the formula as needed
    console.log(dynamicFontSize);


    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['2012', '2013', '2014', '2015', '2016']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Forest',
          type: 'bar',
          barGap: 0,
          label: {
            show: true,
            position: 'top',
            distance: 10,
            align: 'left',
            verticalAlign: 'middle',
            rotate: 90,
            formatter: '{c} {name|{a}}',
            fontSize: dynamicFontSize,
            rich: {
              name: {}
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390]
        },
      ]
    }
  };
}
