import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libro-list',
  imports: [CommonModule],
  templateUrl: './libro-list.component.html',
  styleUrl: './libro-list.component.css'
})
export class LibroListComponent implements OnInit {
  libros: Libro[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private libroService: LibroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLibros();
  }

  loadLibros(): void {
    this.loading = true;
    this.error = null;
    
    this.libroService.getAllLibros().subscribe({
      next: (libros) => {
        this.libros = libros;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los libros';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onEdit(libro: Libro): void {
    this.router.navigate(['/libro-form', libro.id]);
  }

  onView(libro: Libro): void {
    this.router.navigate(['/libro-detail', libro.id]);
  }

  onDelete(libro: Libro): void {
    if (confirm(`¿Estás seguro de que quieres eliminar "${libro.titulo}"?`)) {
      this.libroService.deleteLibro(libro.id!).subscribe({
        next: () => {
          this.loadLibros(); // Recargar la lista
        },
        error: (error) => {
          this.error = 'Error al eliminar el libro';
          console.error('Error:', error);
        }
      });
    }
  }

  onCreateNew(): void {
    this.router.navigate(['/libro-form']);
  }
}
