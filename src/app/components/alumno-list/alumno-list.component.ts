import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';
import { Alumno } from '../../models/models';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumno-list.component.html'
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[] = [];
  loading = true;
  error: string | null = null;
  
  selectedAlumno: Alumno | null = null;
  isEditing = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAlumnos();
  }

  loadAlumnos(): void {
    this.loading = true;
    this.dataService.getAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data.sort((a, b) => a.id - b.id);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los alumnos. Por favor, verifica que el backend esté funcionando.';
        this.loading = false;
      }
    });
  }

  editAlumno(alumno: Alumno): void {
    this.selectedAlumno = { ...alumno }; // Clone to avoid direct mutation
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedAlumno = null;
  }

  saveEdit(): void {
    if (this.selectedAlumno) {
      this.dataService.updateAlumno(this.selectedAlumno.id, this.selectedAlumno).subscribe({
        next: () => {
          this.loadAlumnos();
          this.cancelEdit();
        },
        error: (err) => {
          alert('Error al actualizar el alumno: ' + err.message);
        }
      });
    }
  }
}
