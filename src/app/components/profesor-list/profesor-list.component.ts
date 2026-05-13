import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';
import { Profesor } from '../../models/models';

@Component({
  selector: 'app-profesor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesor-list.component.html'
})
export class ProfesorListComponent implements OnInit {
  profesores: Profesor[] = [];
  loading = true;
  error: string | null = null;
  
  selectedProfesor: Profesor | null = null;
  isEditing = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadProfesores();
  }

  loadProfesores(): void {
    this.loading = true;
    this.dataService.getProfesores().subscribe({
      next: (data) => {
        this.profesores = data.sort((a, b) => a.id - b.id);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al conectar con la base de datos de profesores.';
        this.loading = false;
      }
    });
  }

  editProfesor(profesor: Profesor): void {
    this.selectedProfesor = { ...profesor };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedProfesor = null;
  }

  saveEdit(): void {
    if (this.selectedProfesor) {
      this.dataService.updateProfesor(this.selectedProfesor.id, this.selectedProfesor).subscribe({
        next: () => {
          this.loadProfesores();
          this.cancelEdit();
        },
        error: (err) => {
          alert('Error al actualizar el profesor: ' + err.message);
        }
      });
    }
  }
}
