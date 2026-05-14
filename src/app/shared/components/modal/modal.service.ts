import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {

  private modalState = new BehaviorSubject<any>({
    isOpen: false,
    title: '',
    data: null
  });

  modalState$ = this.modalState.asObservable();

  open(data: any) {
    console.log('data-----------1', data);
    this.modalState.next({
      isOpen: true,
      ...data
    });
  }

  close() {
    this.modalState.next({
      isOpen: false
    });
  }
}