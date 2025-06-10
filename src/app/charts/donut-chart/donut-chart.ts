import {AfterViewInit, Component, ElementRef, input, viewChild} from '@angular/core';
import {DonutChartModel} from './donut-chart.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-donut-chart',
  imports: [],
  template: `<figure #donut_chart></figure>`,
  styles: ``
})
export class DonutChart implements AfterViewInit {

  donutChartRef = viewChild.required<ElementRef>('donut_chart');

  data = input.required<DonutChartModel[]>();

  config = input<any>({
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    legendRectSize: 20,
    legendSpacing: 7,
    innerRadius: 100,
    width: 300,
    height: 300
  });

  ngAfterViewInit(): void {
    this.createSvg();
  }

  createSvg() {
    const config = this.config();
    const outerRadius = config.width / 2;

    let pie: any = d3.pie()
      .value((d: any) => d.value)
      .sort(null);

    let arc: any = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(config.innerRadius)
      .cornerRadius(3)
      .padAngle(0.005);

    let svg = d3.select(this.donutChartRef().nativeElement).append('svg')
      .attr('width', config.width)
      .attr('height', config.height)
      .append('g')
      .attr('transform', `translate(${config.width / 2},${config.height / 2})`);

    let path = svg.selectAll('path')
      .data(pie(this.data()))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => d.data.color);

    path.transition()
      .duration(1000)
      .attrTween('d', (d: any) => {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t: any) => arc(interpolate(t))
      });
    this.restOfTheData(svg, this.data(), pie, arc);
  }

  restOfTheData(svg: any, data: any, pie: any, arc: any) {
    const legendHeight = this.config().legendRectSize + this.config().legendSpacing;
    const legendTranslateY = (this.config().width /2 ) - this.config().innerRadius + this.config().legendRectSize;
    const legendTranslateX = (i: any) => {
      return (i * legendHeight) - (data.length * 13);
    }

    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append("text")
      .transition()
      .duration(200)
      .attr("transform", (d: any) => "translate(" + arc.centroid(d) + ")")
      .attr("dy", ".4em")
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.value + "%")
      .style('fill', '#fff')
      .style('font-size', '14px');

    const legend = svg.selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d: any, i: number) => `translate(-${legendTranslateY},${legendTranslateX(i)})`);

    legend.append('rect')
      .attr('width', this.config().legendRectSize)
      .attr('height', this.config().legendRectSize)
      .attr('rx', 20)
      .attr('ry', 20)
      .style('fill', (d: any) => d.color)
      .style('stroke', (d: any) => d.color);

    legend.append('text')
      .attr('x', 30)
      .attr('y', 15)
      .text((d: any) => d.name)
      .style('fill', (d: any) => d.color)
      .style('font-size', '14px');
  };
}
