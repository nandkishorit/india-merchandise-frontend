import { Component, EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories: any[] = [];
  blogs : any[] = [];
  products: any[] = [];
  productName: string ='';
  searchProduct : string='';
  searchCity : string ='';
  location: string ='';
  @Output() searchData: EventEmitter<string> = new EventEmitter<string>();

  constructor(private apiService: ApiService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.apiService.getMessage().subscribe(catData => {
    this.categories = catData.data; 
    });


    this.apiService.getBlogs().subscribe(blogData => {
    this.blogs = blogData.data; 
    });

    this.apiService.getProducts().subscribe(productData =>{
    this.products = productData.data;
    });
  }

  fetchProducts(){
   if(this.searchProduct==''){
      alert('Please enter text to search');
    }else{
   //this.router.navigate(['/product', this.searchProduct]);
   this.router.navigate(['/product'],{ queryParams: { category: this.searchProduct, location:this.location } });
   this.searchData.emit(this.searchProduct);
   console.log('searchProduct.....', this.searchData.emit(this.searchProduct));
  }
  }
}

