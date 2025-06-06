import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import {FactoryReportModel} from './factory-report.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  private http = inject(HttpClient);

  getFactoryReports(): Observable<FactoryReportModel> {
    const url = `${environment.api_path}${environment.factory_reports}`;
    console.log(url);
    return this.http.get<FactoryReportModel>(url);
  }

}
