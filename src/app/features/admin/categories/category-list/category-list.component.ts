import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
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
