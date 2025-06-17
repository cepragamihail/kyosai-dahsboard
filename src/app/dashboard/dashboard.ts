import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FactoryService } from '../services/factory.service';
import { Observable } from 'rxjs';
import { GaugeChart } from '../charts/guage-chart/gauge-chart';
import { GaugeModel } from '../charts/guage-chart/gauge.model';
import {DonutChart} from '../charts/donut-chart/donut-chart';
import {BarChart} from '../charts/bar-chart/bar-chart';
import {BarChartModel} from '../charts/bar-chart/bar-chart.model';
import {DonutChartModel} from '../charts/donut-chart/donut-chart.model';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatButtonModule, GaugeChart, DonutChart, BarChart, MatToolbarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private factoryService = inject(FactoryService);

  factoryReports$!: Observable<any>


  constructor() {
    effect(() => {
      this.factoryReports$ = this.factoryService.getFactoryReports();
    });
  }


get oee(): GaugeModel {
   return {
    "title": "oee",
    "shortTitle": "oee",
    "value": 80,
    "sectors": [30, 55, 65, 100],
    "legend": [
      {
        "value": 14,
        "sectors": [30, 55, 65, 100],
        "label": "Availability",
        "shortLabel": "A",
        "units": "%"
      },
      {
        "value": 61,
        "sectors": [60, 75, 85, 100],
        "label": "Performance",
        "shortLabel": "P",
        "units": "%"
      },
      {
        "value": 90,
        "sectors": [85, 90, 95, 100],
        "label": "Quality",
        "shortLabel": "Q",
        "units": "%"
      }
    ]
  };
}

get production(): BarChartModel[] {
    return [
      { "name": "14", "value": 2211, "valueAlias": "2.2K", "color": "#296900", "unit": "t" },
      { "name": "11", "value": 83551, "valueAlias": "83.6K", "color": "#296900", "unit": "t" },
      { "name": "10", "value": 134510, "valueAlias": "134.5K", "color": "#296900", "unit": "t" },
      { "name": "09", "value": 92277, "valueAlias": "92.3K", "color": "#296900", "unit": "t" },
      { "name": "08", "value": 51073, "valueAlias": "51.1K", "color": "#296900", "unit": "t" },
      { "name": "07", "value": 11012, "valueAlias": "11.0K", "color": "#296900", "unit": "t" },
      { "name": "04", "value": 13085, "valueAlias": "13.1K", "color": "#296900", "unit": "t" },
      { "name": "03", "value": 49978, "valueAlias": "50.0K", "color": "#296900", "unit": "t" },
      { "name": "02", "value": 204321, "valueAlias": "204.3K", "color": "#296900", "unit": "t" },
      { "name": "01", "value": 66962, "valueAlias": "67.0K", "color": "#296900", "unit": "t" },
      { "name": "17", "value": 196584, "valueAlias": "196.6K", "color": "#296900", "unit": "t" },
      { "name": "16", "value": 54038, "valueAlias": "54.0K", "color": "#296900", "unit": "t" }
    ];

}

get plannedTime(): DonutChartModel[] {
    return [
      {name: 'Production time', value: 45, color: "#006400"},   // green
      {name: 'Stop loss', value: 30, color: "#8b0000"},         // red
      {name: 'Unplanned time', value: 25, color: "#3498DB"}     // blue
    ];
}

}
