import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class XgBoostModelService {
  private apiUrl = 'http://localhost:8000/predictxgb';  

  constructor(private http: HttpClient) { }

  getlprediction(caracteristicas:any):Observable<any>{
    return this.http.post(this.apiUrl, caracteristicas);
  }
}
