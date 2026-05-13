import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';
import { Matricula } from '../../models/models';

@Component({
  selector: 'app-matricula-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matricula-list.component.html'
})
export class MatriculaListComponent implements OnInit {
  matriculas: Matricula[] = [];
  loading = true;
  error: string | null = null;
  
  selectedMatricula: Matricula | null = null;
  isEditing = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadMatriculas();
  }

  loadMatriculas(): void {
    this.loading = true;
    this.dataService.getMatriculas().subscribe({
      next: (data) => {
        this.matriculas = data.sort((a, b) => a.idMat - b.idMat);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error crítico al cargar los datos de matriculación.';
        this.loading = false;
      }
    });
  }

  editMatricula(matricula: Matricula): void {
    this.selectedMatricula = { ...matricula };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedMatricula = null;
  }

  saveEdit(): void {
    if (this.selectedMatricula) {
      this.dataService.updateMatricula(this.selectedMatricula.idMat, this.selectedMatricula).subscribe({
        next: () => {
          this.loadMatriculas();
          this.cancelEdit();
        },
        error: (err) => {
          alert('Error al actualizar la matrícula: ' + err.message);
        }
      });
    }
  }
}
