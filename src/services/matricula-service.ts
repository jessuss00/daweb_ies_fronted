import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Matricula } from '../model/matricula';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private baseUrl = environment.apiUrl + '/matricula';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getMatriculas(): Observable<Matricula[]> {
    return this._httpClient.get<Matricula[]>(this.baseUrl);
  }


}