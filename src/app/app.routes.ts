import { Routes } from '@angular/router';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { ProfesorListComponent } from './components/profesor-list/profesor-list.component';
import { AsignaturaListComponent } from './components/asignatura-list/asignatura-list.component';
import { MatriculaListComponent } from './components/matricula-list/matricula-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'profesores', component: ProfesorListComponent },
  { path: 'asignaturas', component: AsignaturaListComponent },
  { path: 'matriculas', component: MatriculaListComponent }
];
