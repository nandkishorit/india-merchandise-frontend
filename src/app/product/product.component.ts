import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product: string = '';
  @Input() searchProduct: string = '';
  searchQuery: string = '';
  productDatas: any;
  searchCity: string = '';
  productCategory: string = '';
  location: string = '';

  constructor(private apiService: ApiService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const category = params.get('category');
      const location = params.get('location');
      //this.product = params.get('searchProduct') || '';  
      //this.apiService.getFilterProducts(this.product).subscribe(productData =>{
      this.apiService.getFilterProducts(category, location).subscribe(productData => {
        this.productDatas = productData.data;
      });
      
    });
  }

}
