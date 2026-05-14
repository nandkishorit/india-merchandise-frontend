import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AlertService } from '../../../alert.service';
@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.scss'
})
export class SellersComponent {
  sellerLists: any[]=[];
  sellerListsById : any;
  isModalOpen = false;

  constructor(private apiService:ApiService, private modalService:ModalService, private alertService: AlertService){}
  ngOnInit(): void{
    this.getSellers();
  }

  getSellers(){
    this.apiService.getSellers().subscribe((res)=>{
      console.log('res++++++', res);
      this.sellerLists = res.sellers;
    })
  }

  openModal(userId: any) {
   
    this.isModalOpen=  true;
    this.apiService.getSellersById(userId).subscribe({
      next: (res: any) => {
        this.sellerListsById = res.data;
        // this.modalService.open({
        //   title: 'Seller Details11111',
        //   data: res.data
        // });

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async updateStatus(id: number, status: string) {
    //if (confirm(`Are you sure to ${status} this seller?`)) {
    const confirmed = await this.alertService.confirm(`Are you sure to ${status} this seller?`);
    if(!confirmed) return
    this.apiService.updateSellerStatus(id, {
      approvalStatus: status
    }).subscribe({
      next: () => {
        // UI update
        this.getSellers();
        // const seller = this.sellerLists.find(s => s.id === id);
        // if (seller) seller.verification_status = status;
      }
    });
  }
  //}
}
