import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Plane from '../model/Plane';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {
  
  constructor(private http: HttpClient) { }

  sendPlanes(planes: Plane[]): Observable<any>{
    return this.http.post('/api/place-planes', {planes: planes});
  }
}
