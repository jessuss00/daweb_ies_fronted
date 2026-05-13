import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';
import { Asignatura } from '../../models/models';

@Component({
  selector: 'app-asignatura-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignatura-list.component.html'
})
export class AsignaturaListComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  loading = true;
  error: string | null = null;
  
  selectedAsignatura: Asignatura | null = null;
  isEditing = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAsignaturas();
  }

  loadAsignaturas(): void {
    this.loading = true;
    this.dataService.getAsignaturas().subscribe({
      next: (data) => {
        this.asignaturas = data.sort((a, b) => a.id - b.id);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se ha podido recuperar la información de las asignaturas.';
        this.loading = false;
      }
    });
  }

  editAsignatura(asignatura: Asignatura): void {
    this.selectedAsignatura = { ...asignatura };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedAsignatura = null;
  }

  saveEdit(): void {
    if (this.selectedAsignatura) {
      this.dataService.updateAsignatura(this.selectedAsignatura.id, this.selectedAsignatura).subscribe({
        next: () => {
          this.loadAsignaturas();
          this.cancelEdit();
        },
        error: (err) => {
          alert('Error al actualizar la asignatura: ' + err.message);
        }
      });
    }
  }
}
