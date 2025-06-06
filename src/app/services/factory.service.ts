import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  private http = inject(HttpClient);
  
  getFatoryReports(): Observable<any> {
    const url = `${environment.api_path}${environment.factory_reports}`;
    console.log(url);
    return this.http.get<any>(url);
  }
  
}
