import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libro-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.css'
})
export class LibroFormComponent implements OnInit {
  libro: Libro = {
    titulo: '',
    autor: '',
    anioPublicacion: new Date().getFullYear(),
    genero: ''
  };
  
  isEditMode = false;
  loading = false;
  error: string | null = null;
  currentYear = new Date().getFullYear();
  
  generos = [
    'Ficción',
    'No ficción',
    'Misterio',
    'Romance',
    'Ciencia ficción',
    'Fantasía',
    'Historia',
    'Biografía',
    'Autoayuda',
    'Poesía',
    'Drama',
    'Aventura',
    'Terror',
    'Educativo',
    'Otro'
  ];

  constructor(
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadLibro(+id);
    }
  }

  loadLibro(id: number): void {
    this.loading = true;
    this.libroService.getLibroById(id).subscribe({
      next: (libro) => {
        this.libro = libro;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el libro';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.loading = true;
      this.error = null;

      const operation = this.isEditMode 
        ? this.libroService.updateLibro(this.libro.id!, this.libro)
        : this.libroService.createLibro(this.libro);

      operation.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/libros']);
        },
        error: (error) => {
          this.error = this.isEditMode 
            ? 'Error al actualizar el libro'
            : 'Error al crear el libro';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  isFormValid(): boolean {
    return !!(this.libro.titulo.trim() && 
              this.libro.autor.trim() && 
              this.libro.anioPublicacion && 
              this.libro.genero.trim());
  }

  onCancel(): void {
    this.router.navigate(['/libros']);
  }
}
