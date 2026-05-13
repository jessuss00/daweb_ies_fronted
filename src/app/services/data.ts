import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno, Asignatura, Matricula, Profesor } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.baseUrl}/alumno`);
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.baseUrl}/profesor`);
  }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.baseUrl}/asignatura`);
  }

  getMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.baseUrl}/matricula`);
  }

  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.baseUrl}/alumno/${id}`, alumno);
  }

  updateProfesor(id: number, profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.baseUrl}/profesor/${id}`, profesor);
  }

  updateAsignatura(id: number, asignatura: Asignatura): Observable<Asignatura> {
    return this.http.put<Asignatura>(`${this.baseUrl}/asignatura/${id}`, asignatura);
  }

  updateMatricula(id: number, matricula: Matricula): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.baseUrl}/matricula/${id}`, matricula);
  }
}
