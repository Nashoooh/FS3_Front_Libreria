import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libro-detail',
  imports: [CommonModule],
  templateUrl: './libro-detail.component.html',
  styleUrl: './libro-detail.component.css'
})
export class LibroDetailComponent implements OnInit {
  libro: Libro | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadLibro(+id);
    } else {
      this.error = 'ID de libro no válido';
    }
  }

  loadLibro(id: number): void {
    this.loading = true;
    this.error = null;
    
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

  onEdit(): void {
    if (this.libro?.id) {
      this.router.navigate(['/libro-form', this.libro.id]);
    }
  }

  onDelete(): void {
    if (this.libro && confirm(`¿Estás seguro de que quieres eliminar "${this.libro.titulo}"?`)) {
      this.libroService.deleteLibro(this.libro.id!).subscribe({
        next: () => {
          this.router.navigate(['/libros']);
        },
        error: (error) => {
          this.error = 'Error al eliminar el libro';
          console.error('Error:', error);
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/libros']);
  }
}
