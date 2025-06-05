import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FactoryService } from '../services/factory.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatButtonModule],
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

}
