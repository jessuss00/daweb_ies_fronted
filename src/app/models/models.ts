export interface Alumno {
  id: number;
  nombre: string;
  apellidos: string;
  ipasen: string;
}

export interface Profesor {
  id: number;
  nombre: string;
  apellidos: string;
  especialidad: string;
}

export interface Asignatura {
  id: number;
  nombre: string;
  horas: number;
  profesor: Profesor;
}

export interface Matricula {
  idMat: number;
  curso: number;
  notaMedia: number;
  alumno: Alumno;
  asignatura: Asignatura;
}
