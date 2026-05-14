import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { AlertService } from '../../../../alert.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
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
    this.apiService.getSellerProducts().subscribe({
      next: (res: any) => {
        this.productLists = res.data;
       
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

}
