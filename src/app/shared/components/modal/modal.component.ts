import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']  // ✅ fixed
})
export class ModalComponent implements OnInit {

  isOpen = false;
  title = '';
  data: any;
  showFooter = true;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    console.log('modal-----')
    this.modalService.modalState$.subscribe((state) => {
      this.isOpen = state.isOpen;
      this.title = state.title;
      this.data = state.data;
    });
  }

  close() {
    this.modalService.close(); 
  }

  confirm() {
    console.log('Confirm clicked');
  }
}