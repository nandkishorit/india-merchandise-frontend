import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import {Router,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.scss'
})
export class AddSubcategoryComponent {
   categoryForm !: FormGroup;
   categoryLists: any;

   constructor(private fb:FormBuilder,private router:Router, 
    private route:ActivatedRoute, private apiService: ApiService){}
  
      ngOnInit(): void{
        this.initForm();
        this.getCategory();
      }
      
      initForm(){
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            parent_id: [''],
           
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
              name: formValue.name,
              parent_id: formValue.parent_id,
              // level: 1,
              slug: formValue.name,
              // is_leaf:1
          }
          this.apiService.createCategory(payload).subscribe({
            next: (res) => {
                this.router.navigate(['/admin/subcategory-list']);
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
}
