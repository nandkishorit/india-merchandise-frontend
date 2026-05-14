import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { AlertService } from '../../../../alert.service';
declare var Razorpay: any;
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
    enquiryListsById: any;
    whatsAppurl: any;
    phone: any;
    contactData: any;
    planExceedMessage: any;
    selectedEnquiryId: any;
    showUpgradeModal = false;
    subscriptionPlan: any[]= [];
    isLoading: boolean = false;
    sellerId: any;
    sellerCurrentPlan: any;

    constructor(private apiService:ApiService, private modalService:ModalService, private alertService: AlertService){}
    ngOnInit(): void{
      this.getAllEnquiry();
      this.currentPlan(this.sellerId=2);
    }
  
    getAllEnquiry(){
      this.apiService.getAllEnquiry().subscribe((res)=>{
        console.log('res++++++', res);
        this.enquiryLists = res.data;
        // this.phone=  res.data.phone;
        // this.whatsAppurl = `https://wa.me/${this.phone}?text=Hi, I saw your inquiry`;
      })
    }
  
    openModal(enquiryId: any) {
      this.isModalOpen=  true;
      this.apiService.getEnquiryById(enquiryId).subscribe({
        next: (res: any) => {
         
          this.enquiryListsById = res.data;
          
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  
    closeModal() {
      this.isModalOpen = false;
      this.showUpgradeModal = false;
    }
  
    async updateStatus(id: number, status: string) {
    
      const confirmed = await this.alertService.confirm(`Are you sure to ${status} this seller?`);
      if(!confirmed) return
      this.apiService.updateSellerStatus(id, {
        approvalStatus: status
      }).subscribe({
        next: () => {
          this.getAllEnquiry();
        }
      });
    }

  async unlockContact(enquiryId: any) {

    const confirmed = await this.alertService.confirm('Are you sure to unlock contact?');
    if (!confirmed) return;
    
    this.apiService.unlockContact(enquiryId).subscribe({

      next: (res: any) => {
        if (res.success) {
          this.contactData = res.contact;
          this.getAllEnquiry();
        }
      },

      error: async (err) => {
        console.log('Error----', err);
        if (err.status === 403 || err.error?.code === 'LIMIT_EXCEEDED') {
          const planUpgraded = await this.alertService.confirm(
            err.error?.message || '🚫 Unlock limit exceeded. Please upgrade your plan.'
          );

          if (planUpgraded) {
            this.openUpgradeModal(enquiryId);
          }

        } else {
          console.error(err);
          alert('Something went wrong');
        }
      }
    });
  }

  getPlans(){
    this.apiService.getAllSubscriptionPlans().subscribe((res) =>{
      console.log('response++++++++++++++', res);
      this.subscriptionPlan = res.data;
    });
  }

  openUpgradeModal(enquiryId: any) {
    this.selectedEnquiryId = enquiryId;
    this.showUpgradeModal = true;
    this.getPlans(); 
  }

  upgradePlan(plan: any) {
    console.log('plan------------', plan);
    alert(plan.id);
    const payload = {
      plan_id: plan.id
    };

    this.apiService
      .getSusbcriptionCreateOrder(payload)
      .subscribe({
         next: (res: any) => {
          console.log(
            'Create Order Response:',
            res
          );

          this.openRazorpay(
            res.data.order,
            plan
          );
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }

  openRazorpay(order: any, plan: any) {
    const options: any = {
      key: 'rzp_test_Smr5OpHSxXfKyx',
      amount: order.amount,
      currency: order.currency,
      name: 'India Merchandise',
      description: 'Subscription Upgrade',
      order_id: order.id,
      handler: (response: any) => {
        console.log(
          'Payment Success:',
          response
        );

        this.verifyPayment(
          response,
          plan
        );
      },
      
      prefill: {
        name: 'Seller Name',
        email: 'seller@gmail.com',
        contact: '9999999999'
      },

      notes: {
        plan_name: plan.name
      },

      theme: {
          color: '#0d6efd'
      }
    };
    
    //const rzp = new Razorpay(options);
    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      console.log(
        'Payment Failed:',
        response
      );
      alert('Payment failed');

    });
    rzp.open();
  }

  verifyPayment(
    response: any,
    plan: any
  ) {

    const payload = {

      razorpay_order_id:
        response.razorpay_order_id,

      razorpay_payment_id:
        response.razorpay_payment_id,

      razorpay_signature:
        response.razorpay_signature,

      plan_id: plan.id
      
    };

    console.log(
      'VERIFY PAYMENT PAYLOAD:',
      payload
    );

    this.apiService
      .verifySubscriptionPayment(payload)
      .subscribe({
        next: (res: any) => {
          console.log(
            'Payment Verified:',
            res
          );

          alert(
            'Plan upgraded successfully'
          );
          
          this.showUpgradeModal = false;
          this.currentPlan(this.sellerId=2);
        },

        error: (err: any) => {
          console.log(
            'Verify Payment Error:',
            err
          );

          alert(
            err?.error?.message ||
            'Payment verification failed'
          );
        }
      });
  }

  currentPlan(sellerId:any){
    this.apiService.getCurrentPlan(sellerId).subscribe((res) =>{
      console.log('current plan response++++++', res);
      this.sellerCurrentPlan = res.data;
    });
          
  }
}


