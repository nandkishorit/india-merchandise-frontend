import { Component } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.scss'
})
export class SubcategoryListComponent {
    subCategoryList: any[]= [];
    constructor(private apiService: ApiService,private router:Router, private route:ActivatedRoute){}
  
    ngOnInit(): void{
      this.getSubCategory();
    }
  
    getSubCategory(){
      this.apiService.getSubCategories().subscribe((res) => {
        console.log('response---------++', res);
        this.subCategoryList = res.data;
      })
    }
  
    createSubCategory(){
      this.router.navigate(['/admin/add-subcategory']);
    }
}
