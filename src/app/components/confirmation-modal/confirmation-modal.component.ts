import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService, ModalData } from '../../services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  modalData: ModalData | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.subscription = this.modalService.modalData$.subscribe(
      data => this.modalData = data
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onConfirm(): void {
    this.modalService.confirm();
  }

  onCancel(): void {
    this.modalService.cancel();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
