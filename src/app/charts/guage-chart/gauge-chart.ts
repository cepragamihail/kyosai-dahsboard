import { Component, ElementRef, input, viewChild } from '@angular/core';
import { GaugeModel } from './gauge.model';
import * as d3 from 'd3';
import { GaugeLegendModel } from './gauge-legend.model';

@Component({
  selector: 'app-gauge-chart',
  imports: [],
  template: `
    <div #gauge_chart></div>
  `,
  styles: `:host {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }`
})
export class GaugeChart {

  options = input({
    width: 350,
    height: 400,
    margin: {
      top: 2,
      right: 2,
      bottom: 70,
      left: 2
    },
    colors: {
      start_section: '#8b0000',
      middle_section: '#ffdf00',
      end_section: '#006400',
      needle: {
        start: '#a40000',
        middle: '#ffef00',
        end: '#008000',
        center: '#424242',
      }
    },
    font_size: 16,
    textColor: '#fff',
    legend: {
      font_size: 12,
      textColor: '#fff',
      labelOffset: 40
    }
  });

  data = input.required<GaugeModel>();
  private chartInset = 10;
  private _chart: any;

  // @ViewChild('gauge_chart') gaugeChartRef!: ElementRef;
  gaugeChartRef = viewChild.required<ElementRef>('gauge_chart');



  // @Input() set data(gauge_data: GaugeModel) {
  //   this._data = gauge_data;
  // };

  // @Input() set options(options: any) {
  //   this._options = Object.assign(this._options, options);
  // }

  // get data(): GaugeModel {
  //   return this._data;
  // };

  // get options(): any {
  //   return this._options;
  // }

  private barWidth = this.options().width / 20;
  private radius = Math.min(this.options().width, this.options().height) / 2;

  ngOnInit(): void {
    this.radius = Math.min(this.options().width, this.options().height) / 2;
    this.barWidth = this.options().width / 20;
  }

  ngAfterViewInit(): void {
    this.createGaugeChart(this.gaugeChartRef().nativeElement, this.data(), this.options());
  }

  createGaugeChart(elementRef: any, data: GaugeModel, options: any ): void {
    const width = options.width;
    const height = options.height;
    const font_size = options.font_size;
    const margin = options.margin;

    // Create SVG element
    const svg = d3.select(elementRef)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height / 1.5 + margin.top + margin.bottom); // height/1.5 To Remove Extra Bottom Space

    // Add layer for the panel
    const chart = svg.append('g')
      .attr('transform', "translate(" + ((width + margin.left) / 2
      ) + ", " + ((height + margin.top) / 2) + ")");
    this._chart = chart;

    const degToRad = (deg: any) => {
      return deg * Math.PI / 180;
    };

    const minSectorLength = degToRad((data.sectors[1] - data.sectors[0]) * 270 / (data.sectors[3] - data.sectors[0]));
    const midSectorLength = degToRad((data.sectors[2] - data.sectors[1]) * 270 / (data.sectors[3] - data.sectors[0]));

    const start_section: any = d3.arc()
      .outerRadius(this.radius - this.chartInset)
      .innerRadius(this.radius - this.chartInset - this.barWidth)
      .startAngle(degToRad(-135))
      .endAngle(minSectorLength + degToRad(-135));
    const middle_section: any = d3.arc()
      .outerRadius(this.radius - this.chartInset)
      .innerRadius(this.radius - this.chartInset - this.barWidth)
      .startAngle(minSectorLength + degToRad(-135))
      .endAngle(minSectorLength + midSectorLength + degToRad(-135));
    const end_section: any = d3.arc()
      .outerRadius(this.radius - this.chartInset)
      .innerRadius(this.radius - this.chartInset - this.barWidth)
      .startAngle(minSectorLength + midSectorLength + degToRad(-135))
      .endAngle(degToRad(135));

    chart.append('path')
      .attr("d", start_section)
      .attr("fill", options.colors?.start_section);
    chart.append('path')
      .attr("d", middle_section)
      .attr("fill", options.colors?.middle_section);
    chart.append('path')
      .attr("d", end_section)
      .attr("fill", options.colors.end_section);



    const rad_for_min_lable = this.valueToRad(data.sectors[0], data);
    chart.append("text")
      .attr("x", -1 * this.radius * Math.cos(rad_for_min_lable))
      .attr("y", -1 * this.radius * Math.sin(rad_for_min_lable))
      .attr("text-anchor", "end")
      .text(data.sectors[0])
      .attr("fill", options.textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    const rad_for_min_mid_lable = this.valueToRad(data.sectors[1], data);
    chart.append("text")
      .attr("x", -1.1 * this.radius * Math.cos(rad_for_min_mid_lable))
      .attr("y", -1.05 * this.radius * Math.sin(rad_for_min_mid_lable))
      .attr("text-anchor", "start")
      .text(data.sectors[1])
      .attr("fill", options.textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    const rad_for_mid_max_lable = this.valueToRad(data.sectors[2], data);
    chart.append("text")
      .attr("x", -1 * this.radius * Math.cos(rad_for_mid_max_lable))
      .attr("y", -1 * this.radius * Math.sin(rad_for_mid_max_lable))
      .attr("text-anchor", "start")
      .text(data.sectors[2])
      .attr("fill", options.textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    const rad_for_max_lable = this.valueToRad(data.sectors[3], data);
    chart.append("text")
      .attr("x", -1 * this.radius * Math.cos(rad_for_max_lable))
      .attr("y", -1 * this.radius * Math.sin(rad_for_max_lable))
      .attr("text-anchor", "start")
      .text(data.sectors[3])
      .attr("fill", options.textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    // draw on start circle
    chart.append('circle')
      .attr("cx", -1 * (this.radius - this.chartInset - this.barWidth / 2) * Math.cos(this.valueToRad(data.sectors[0], data)))
      .attr("cy", -1 * (this.radius - this.chartInset - this.barWidth / 2) * Math.sin(this.valueToRad(data.sectors[0], data)))
      .attr("r", this.barWidth / 2)
      .attr("fill", options.colors?.start_section)

    // draw on end circle
    chart.append('circle')
      .attr("cx", -1 * (this.radius - this.chartInset - this.barWidth / 2) * Math.cos(this.valueToRad(data.sectors[3], data)))
      .attr("cy", -1 * (this.radius - this.chartInset - this.barWidth / 2) * Math.sin(this.valueToRad(data.sectors[3], data)))
      .attr("r", this.barWidth / 2)
      .attr("fill", options.colors?.end_section)

    // create Gauge legend
    data.legend.forEach((element, index) => {
      const step = (index * -2.2) + 4;
      const y_position = step * (this.radius / 10);
      this.create_legend(chart, y_position, this.radius, element)
    });

    this.drawPointer(data.sectors[0], data, options.colors?.start_section);
    this.needleAnimation(data);
  }

  private create_legend(chart: any, y: number, width: number, data: GaugeLegendModel) {
    const height = width / 20;
    const labelOffset = this.options().legend.labelOffset;
    const font_size = this.options().legend.font_size;
    const barWidth = width - labelOffset;

    const unitWidth = barWidth / (data.sectors[3] - data.sectors[0]);
    const minUnits = data.sectors[1] - data.sectors[0]
    const midUnits = data.sectors[2] - data.sectors[1]
    const maxUnits = data.sectors[3] - data.sectors[2]

    const minPos = (width / -2) + labelOffset
    const minMidPos = minPos + minUnits * unitWidth
    const maxPos = width / 2
    const midMaxPos = maxPos - unitWidth * maxUnits

    const labelY = 2.3 * height + y;

    const color = this.getNeedleColor(data);
    const cx = minPos + (data.value - data.sectors[0]) * unitWidth;
    const cy = height / 2 + y;

    // draw legend sections
    chart.append("rect")
      .attr("x", minPos)
      .attr("y", y)
      .attr("width", minUnits * unitWidth)
      .attr("height", height)
      .attr("fill", this.options().colors?.start_section);

    chart.append("rect")
      .attr("x", minMidPos)
      .attr("y", y)
      .attr("width", midUnits * unitWidth)
      .attr("height", height)
      .attr("fill", this.options().colors?.middle_section);

    chart.append("rect")
      .attr("x", midMaxPos)
      .attr("y", y)
      .attr("width", maxUnits * unitWidth)
      .attr("height", height)
      .attr("fill", this.options().colors?.end_section);

    chart.append("text")
      .attr("x", minPos)
      .attr("y", labelY)
      .attr("text-anchor", "middle")
      .text(data.sectors[0])
      .attr("fill", this.options().textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    chart.append("text")
      .attr("x", minMidPos)
      .attr("y", labelY)
      .attr("text-anchor", "middle")
      .text(data.sectors[1])
      .attr("fill", this.options().textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    chart.append("text")
      .attr("x", midMaxPos)
      .attr("y", labelY)
      .attr("text-anchor", "middle")
      .text(data.sectors[2])
      .attr("fill", this.options().textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    chart.append("text")
      .attr("x", maxPos)
      .attr("y", labelY)
      .attr("text-anchor", "middle")
      .text(data.sectors[3])
      .attr("fill", this.options().textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    chart.append("text")
      .attr("x", width / -1.8)
      .attr("y", y + height)
      .attr("text-anchor", "start")
      .text(`${data.shortLabel}:${data.value}${data.units}`)
      .attr("fill", this.options().textColor)
      .attr("font-family", "monospace")
      .attr("font-size", font_size)
      .attr("font-weight", "900");

    // draw round start section
    this.appendCircle(this._chart, minPos, cy, (height / 2.1), this.options().colors?.start_section);

    // draw round end section
    this.appendCircle(this._chart, (width / 2), cy, (height / 2.1), this.options().colors?.end_section);

    // Create needle circle
    this.appendCircle(this._chart, cx, cy, height, color);
    // Create needle center circle
    this.appendCircle(this._chart, cx, cy, (height / 2.5), this.options().colors?.needle?.center);
  }

  private getNeedleColor(data: any): string {
    return data.value < data.sectors[1] ? this.options().colors?.needle?.start : (
      data.value < data.sectors[2] ? this.options().colors?.needle?.middle : this.options().colors?.needle?.end)
  }

  drawPointer(value: any, data: GaugeModel, color: string, redraw: boolean = false) {
    const rad = this.valueToRad(value, data);
    const cx = -1 * (this.radius - this.chartInset - this.barWidth / 2) * Math.cos(rad);
    const cy = -1 * (this.radius - this.chartInset - this.barWidth / 2) * Math.sin(rad);
    const needle_center_color = this.options().colors?.needle?.center;

    const smallR = (this.barWidth / 2.5);
    const bigR = this.barWidth;

    if (redraw) {
      this._chart.select('.needle-prog-text').text(`${value.toFixed(2)}%`);
      this.drowCircle(this._chart, cx, cy, bigR, color, '.needle');
      this.drowCircle(this._chart, cx, cy, smallR, needle_center_color, '.needle-small');

    }
    else {
      // create needle if not exist
      this._chart.append("text")
        .attr('class', 'needle-prog-text')
        .attr("x", -35)
        .attr("y", this.radius / -2)
        .attr("text-anchor", "start")
        .text(value.toFixed(2) + '%')
        .attr("fill", this.options().textColor)
        .attr("font-family", "monospace")
        .attr("font-size", "26")
        .attr("font-weight", "900");

      this.appendCircleWithClassName(this._chart, cx, cy, bigR, 'needle', color);
      this.appendCircleWithClassName(this._chart, cx, cy, smallR, 'needle-small', needle_center_color);
    }
  }

  needleAnimation(data: GaugeModel) {
    const start_point = data.sectors[0];
    const needle_value = data.value;
    this._chart.transition().delay(300)
      .duration(1500)
      .select('.needle')
      .tween('progress', () => {
        return (progress: any) => {
          const needle_position = start_point + progress * (needle_value - start_point);
          const needle_color = this.getNeedleColor({ ...data, value: needle_position })
          this.drawPointer(needle_position, data, needle_color, true);
        };
      });
  };

  valueToRad(value: any, data: GaugeModel) {
    const gauge_len = (6 * Math.PI) / 4;
    const gaugeStart = Math.PI / 4;
    return ((value - data.sectors[0]) / (data.sectors[3] - data.sectors[0])) * gauge_len - gaugeStart;
  }

  appendCircleWithClassName(chart: any, cx: number, cy: number, radius: number, class_name: string, color: string) {
    chart.append('circle')
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", radius)
      .attr('class', class_name)
      .attr('fill', color);
  }
  drowCircle(chart: any, cx: number, cy: number, radius: number, color: string, selector_name: string = 'circle') {
    chart.select(selector_name)
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", radius)
      .attr('fill', color);
  }
  appendCircle(chart: any, cx: number, cy: number, radius: number, color: string) {
    chart.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", radius)
      .attr("fill", color);
  }
}
