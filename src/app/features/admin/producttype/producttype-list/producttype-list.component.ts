import { Component } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producttype-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './producttype-list.component.html',
  styleUrl: './producttype-list.component.scss'
})
export class ProducttypeListComponent {
    productTypeList: any[]= [];
    constructor(private apiService: ApiService,private router:Router, private route:ActivatedRoute){}

    ngOnInit(): void{
      this.getProductType();
    }
  
    getProductType(){
      this.apiService.getProductType().subscribe((res) => {
        console.log('response---------++', res);
        this.productTypeList = res.data;
      })
    }
  
    createProductType(){
      this.router.navigate(['/admin/add-producttype']);
    }
}
