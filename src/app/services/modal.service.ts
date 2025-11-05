import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalData = new BehaviorSubject<ModalData | null>(null);
  private resolveFunction: ((result: boolean) => void) | null = null;

  modalData$ = this.modalData.asObservable();

  constructor() { }

  openConfirmModal(data: ModalData): Promise<boolean> {
    return new Promise((resolve) => {
      this.resolveFunction = resolve;
      this.modalData.next({
        ...data,
        confirmText: data.confirmText || 'Confirmar',
        cancelText: data.cancelText || 'Cancelar',
        type: data.type || 'danger'
      });
    });
  }

  confirm(): void {
    this.closeModal(true);
  }

  cancel(): void {
    this.closeModal(false);
  }

  private closeModal(result: boolean): void {
    this.modalData.next(null);
    if (this.resolveFunction) {
      this.resolveFunction(result);
      this.resolveFunction = null;
    }
  }
}
