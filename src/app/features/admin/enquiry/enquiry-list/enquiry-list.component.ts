import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { AlertService } from '../../../../alert.service';

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enquiry-list.component.html',
  styleUrl: './enquiry-list.component.scss'
})
export class EnquiryListComponent {
      enquiryLists: any[]=[];
      buyerListsById : any;
      isModalOpen = false;
    
      constructor(private apiService:ApiService, private modalService:ModalService, private alertService: AlertService){}
      ngOnInit(): void{
        this.getAdminAllEnquiry();
      }
    
      getAdminAllEnquiry(){
        this.apiService.getAdminAllEnquiry().subscribe((res)=>{
          console.log('res++++++', res);
          this.enquiryLists = res.data;
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
            this.getAdminAllEnquiry();
           
          }
        });
      }
}
