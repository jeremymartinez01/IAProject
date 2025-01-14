import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LightGbmModelService {
  private apiUrl = 'http://localhost:8000/predictlight';  

  constructor(private http: HttpClient) { }

  getlprediction(caracteristicas:any):Observable<any>{
    return this.http.post(this.apiUrl, caracteristicas);
  }

}
