import {AfterViewInit, Component, ElementRef, HostListener, input, viewChild} from '@angular/core';
import * as echarts from 'echarts';
import {BarChartModel} from './bar-chart.model';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  template: `<figure #bar_chart></figure>`,
  styles: ``
})
export class BarChart implements AfterViewInit {
  private barLabelRotationChart: echarts.EChartsType | undefined;
  private barLabelRotationChartElement = viewChild<ElementRef>('bar_chart')

  data = input.required<BarChartModel[]>()


  ngAfterViewInit(): void {
    this.barLabelRotationChart = echarts.init(this.barLabelRotationChartElement()?.nativeElement, 'dark', {
      height: 300
    });
    this.barLabelRotationChart.setOption(this.getOption());
  }

  @HostListener('window:resize')
  onResized(): void {
    this.barLabelRotationChart?.resize();
  }

  getOption(): echarts.EChartsCoreOption {
    const chartHeight = this.barLabelRotationChart?.getHeight() || 500; // Use a default height if chart is not yet initialized
    const dynamicFontSize = Math.max(12, Math.min(16, this.data.length / 30)); // Adjust the formula as needed
    console.log(dynamicFontSize);
    console.log(chartHeight)

    return {
      dataset: {
        // source: this.data(),
        source: {
          days: this.data().map(item => item.name),
          value: this.data().map(item => item.value),
          alias: this.data().map(item => item.valueAlias)
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.data().map(item => item.name)
        }
      ],
      yAxis: [
        {
          type: 'value',
          data: this.data().map(item => item.value)
        }
      ],
      series: [
        {
          type: 'bar',
          barGap: 0,
          label: {
            show: true,
            position: 'top',
            distance: 10,
            align: 'left',
            verticalAlign: 'middle',
            rotate: 90,
            formatter: '{@alias} t',
            fontSize: dynamicFontSize,
          },
        },
      ]
    }
  };
}
