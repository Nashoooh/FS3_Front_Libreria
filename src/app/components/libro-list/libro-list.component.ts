import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';
import { ModalService } from '../../services/modal.service';

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
    private router: Router,
    private modalService: ModalService
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
    this.modalService.openConfirmModal({
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar el libro "${libro.titulo}"?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger'
    }).then((confirmed: boolean) => {
      if (confirmed) {
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
    });
  }

  onCreateNew(): void {
    this.router.navigate(['/libro-form']);
  }
}
