import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { AlertService } from '../../../../alert.service';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.scss'
})
export class PlanListComponent {
    subscriptionLists: any[]=[];
    buyerListsById : any;
    isModalOpen = false;
    enquiryListsById: any;
    whatsAppurl: any;
    phone: any;
    contactData: any;
    planExceedMessage: any;
  
    constructor(private apiService:ApiService, private modalService:ModalService, private alertService: AlertService){}
    ngOnInit(): void{
      this.getAllSubscriptionPlans();
    }
  
    getAllSubscriptionPlans(){
      this.apiService.getAllSubscriptionPlans().subscribe((res)=>{
        console.log('res++++++', res);
        this.subscriptionLists = res.data;
      })
    }
  
  //   openModal(enquiryId: any) {
  //     this.isModalOpen=  true;
  //     this.apiService.getEnquiryById(enquiryId).subscribe({
  //       next: (res: any) => {
  //         this.enquiryListsById = res.data;
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });
  //   }
  
  //   closeModal() {
  //     this.isModalOpen = false;
  //   }
  
  //   async updateStatus(id: number, status: string) {
    
  //     const confirmed = await this.alertService.confirm(`Are you sure to ${status} this seller?`);
  //     if(!confirmed) return
  //     this.apiService.updateSellerStatus(id, {
  //       approvalStatus: status
  //     }).subscribe({
  //       next: () => {
  //         this.getAllEnquiry();
  //       }
  //     });
  //   }

  //   async unlockContact(enquiryId: any) {

  //   const confirmed = await this.alertService.confirm('Are you sure to unlock contact?');
  //   if (!confirmed) return;

  //   this.apiService.unlockContact(enquiryId).subscribe({

  //     next: (res: any) => {
  //       if (res.success) {
  //         this.contactData = res.contact;
  //         this.getAllEnquiry();
  //       }
  //     },

  //     error: async (err) => {
  //       console.log('Error----', err);
  //       if (err.status === 403 || err.error?.code === 'LIMIT_EXCEEDED') {
  //         await this.alertService.confirm(
  //           err.error?.message || '🚫 Unlock limit exceeded. Please upgrade your plan.'
  //         );

  //       } else {
  //         console.error(err);
  //         alert('Something went wrong');
  //       }
  //     }
  //   });
  // }
}
