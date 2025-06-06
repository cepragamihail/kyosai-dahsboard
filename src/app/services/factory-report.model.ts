import {GaugeModel} from '../charts/guage-chart/gauge.model';
import {BarChartModel} from '../charts/bar-chart/bar-chart.model';
import {DonutChartModel} from '../charts/donut-chart/donut-chart.model';

export interface FactoryReportModel {
  id?: string,
  title: string,
  shortTitle: string
  oee: GaugeModel,
  production: BarChartModel[],
  plannedTime: DonutChartModel[]
}
