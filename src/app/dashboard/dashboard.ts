import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FactoryService } from '../services/factory.service';
import { Observable } from 'rxjs';
import { GuageChart } from '../charts/guage-chart/gauge-chart';
import { GaugeModel } from '../charts/guage-chart/gauge.model';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatButtonModule, GuageChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private factoryService = inject(FactoryService);

  factoryReports$!: Observable<any>


  constructor() {
    effect(() => {
      this.factoryReports$ = this.factoryService.getFatoryReports();
    });
    // this.factoryService.getFatoryReports().subscribe(data => {
    //   console.log(data);
    // });
  }

  // id?: number,
  // title: string,
  // shortTitle: string,
  // value: number,
  // sectors: number[],
  // legend: GaugeLegendModel[],

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

}
