import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalidadeService {
  constructor(private http: HttpClient) {}

  getEstados(): Observable<any> {
    return this.http.get(`${environment.locationUrl}/estados`);
  }

  getCidades(estadoId: number): Observable<any> {
    return this.http.get(
      `${environment.locationUrl}/estados/${estadoId}/municipios`
    );
  }
}
