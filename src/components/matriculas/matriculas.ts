import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatriculaService } from '../../services/matricula-service';
import { Matricula } from '../../model/matricula';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-matriculas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './matriculas.html',
  styleUrl: './matriculas.css'
})
export class Matriculas implements OnInit {
  matriculas: Matricula[] = [];
  loading = true;

  constructor(private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.mostrarTodas();
  }

  mostrarTodas(): void {
    this.loading = true;
    this.matriculaService.getMatriculas().subscribe(data => {
      this.matriculas = data;
      this.loading = false;
    });
  }
  mostrarAprobados(): void {
    this.loading = true;
    this.matriculaService.getMatriculas().subscribe(data => {
      this.matriculas = data.filter(m => m.notaMedia >= 5);
      this.loading = false;
    });
  }
}
