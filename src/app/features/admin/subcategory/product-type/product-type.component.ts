import { Component } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-type',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.scss'
})
export class ProductTypeComponent {
    categoryList: any[]= [];
      constructor(private apiService: ApiService,private router:Router, private route:ActivatedRoute){}
    
      ngOnInit(): void{
        this.getCategory();
      }
    
      getCategory(){
        this.apiService.getCategories().subscribe((res) => {
          this.categoryList = res.category;
        })
      }
    
      createCategory(){
        this.router.navigate(['/admin/add-category']);
      }
}
