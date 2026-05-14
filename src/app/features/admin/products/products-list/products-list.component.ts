import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { AlertService } from '../../../../alert.service';


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  productLists : any;
  isLoading : boolean | undefined;
  isModalOpen = false;
  productListsById: any;
  constructor(private router:Router, private route: ActivatedRoute, 
    private apiService: ApiService,private alertService: AlertService){}
      
  ngOnInit(): void{
    this.getProducts();
  }
  
  addProduct(){
    this.router.navigate(['/seller/add-product']);
  }
  
  getProducts(){
    this.apiService.getAllProducts().subscribe({
      next: (res: any) => {
        //this.productLists = res.data;
        this.productLists = res.data.map((p: any) => ({
          ...p,
          selected: false   
        }));
        console.log('productLists-----',this.productLists);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        console.log('API completed');
      }
    });
  }
  
  async deleteProducts(productId: any) {

    const confirmed =await this.alertService.confirm("Are you sure want to delete?");
    if (!confirmed) return;

    this.isLoading = true;
    console.log('productId---------',productId);
    this.apiService.deleteSellerProducts(productId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.alertService.success('Data deleted successfully!');
          setTimeout(() => {
            this.router.navigate(['/seller/product-list']);
          }, 2000); 
        if (res.success) {
          this.productLists = this.productLists.filter(
            (item: any) => item.id !== productId
          );
        } else {
          alert(res.message || 'Delete failed');
        }
      },

      error: (err) => {
        this.isLoading = false;
        console.error('Delete error:', err);
        alert('Something went wrong while deleting');
      },

      complete: () => {
        console.log('Delete API completed');
      }

    });
  }
  
  openModal(productId: any) {
    this.isModalOpen=  true;
    this.apiService.getProductById(productId).subscribe({
      next: (res: any) => {
        this.productListsById = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleAll(event: any) {
    const checked = event.target.checked;
   
    this.productLists.forEach((p: { selected: any; }) => {
      console.log('product----------',p);
      p.selected = checked;
    });
  }
  
  getSelectedIds(): number[] {
    return this.productLists
      .filter((p: { selected: any; }) => p.selected)
      .map((p: { product_id: any; }) => p.product_id);
  } 

  async approveRejectSelected(verificationStatus:any) {
    const confirmed = await this.alertService.confirm(`Are you sure to approve this product?`);
    if(!confirmed) return
    const ids = this.getSelectedIds();
    if (ids.length === 0) {
      alert('Please select at least one product');
      return;
    }
    const payload = {
      ids: ids,
      verificationStatus: verificationStatus
    }
    console.log('payload-------------', payload);
    this.apiService.bulkUpdateProductStatus(payload).subscribe({
      next: () => {
        this.productLists.forEach((p: { id: number; verification_status: string; selected: boolean; }) => {
          if (ids.includes(p.id)) {
            p.verification_status = 'approved';
            p.selected = false; 
          }
          this.getProducts();
        });

      },
      error: (err) => console.error(err)
    });
  }

    rejectSelected() {
      const ids = this.productLists
        .filter((p: { selected: any; }) => p.selected)
        .map((p: { id: any; }) => p.id);

      this.apiService.bulkUpdateProductStatus({
        ids:[ids],
        verificationStatus: 'rejected'
      }).subscribe(() => {

        this.productLists.forEach((p: { selected: any; verification_status: string; }) => {
          if (p.selected) p.verification_status = 'rejected';
        });

      });
    }

    isAllSelected(): boolean {
      return this.productLists.every((p: { selected: any; }) => p.selected);
    }
}
