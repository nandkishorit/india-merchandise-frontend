import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { AlertService } from '../../../../alert.service';

@Component({
  selector: 'app-buyers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyers-list.component.html',
  styleUrl: './buyers-list.component.scss'
})
export class BuyersListComponent {
    buyerLists: any[]=[];
    buyerListsById : any;
    isModalOpen = false;
  
    constructor(private apiService:ApiService, private modalService:ModalService, private alertService: AlertService){}
    ngOnInit(): void{
      this.getAllBuyers();
    }
  
    getAllBuyers(){
      this.apiService.getAllBuyers().subscribe((res)=>{
        console.log('res++++++', res);
        this.buyerLists = res.buyers;
      })
    }
  
    openModal(userId: any) {
      this.isModalOpen=  true;
      this.apiService.getBuyerById(userId).subscribe({
        next: (res: any) => {
          this.buyerListsById = res.data;
          
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
    
      const confirmed = await this.alertService.confirm(`Are you sure to ${status} this seller?`);
      if(!confirmed) return
      this.apiService.updateSellerStatus(id, {
        approvalStatus: status
      }).subscribe({
        next: () => {
          this.getAllBuyers();
          // const seller = this.sellerLists.find(s => s.id === id);
          // if (seller) seller.verification_status = status;
        }
      });
    }
}
