import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import {Router,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-add-producttype',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './add-producttype.component.html',
  styleUrl: './add-producttype.component.scss'
})
export class AddProducttypeComponent {
  categoryForm !: FormGroup;
  categoryLists: any;
  subCatList: any;
  constructor(private fb:FormBuilder,private router:Router, 
  private route:ActivatedRoute, private apiService: ApiService){}

    ngOnInit(): void{
      this.initForm();
      this.getCategory();
    }
    
    initForm(){
      this.categoryForm = this.fb.group({
          categoryId: ['',Validators.required],
          subCategoryId:['',Validators.required],
          productType: ['', Validators.required]
        });
    }
    goBack(){
      this.router.navigate(['/admin/category-list']);
    }
    
    onSubmit(){
      if(this.categoryForm.valid){
        const formValue = this.categoryForm.value;
        console.log('frmValue-----', formValue);
        const payload = {
            name: formValue.productType,
            parent_id: formValue.subCategoryId,
            // level: 1,
            // slug: formValue.name,
            // is_leaf:1
        }
        this.apiService.createProductType(payload).subscribe({
          next: (res) => {
              this.router.navigate(['/admin/producttype-list']);
              this.categoryForm.reset();
            },
            error: (err) => {
              console.error('Error creating category:', err);
            }
        })
      }else{
        this.categoryForm.markAllAsTouched();
      }
    }
    getCategory(){
      this.apiService.getCategories().subscribe((res)=>{
        console.log('response----------', res);
        this.categoryLists = res.category;
      })
    }

    getSubCategory(catId:any){
      alert(catId);
      this.apiService.getSubCatOnSelectedCategory(catId).subscribe((res) =>{
        console.log('subcat----', res.subCategory);
        this.subCatList = res.subCategory;
      });
    }
}
