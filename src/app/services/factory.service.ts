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
    return this.http.get<any>(`${environment.kyosai_api_url}/api/v1/factory-reports`);
  }
  
}
