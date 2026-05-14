import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import {Router,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm !: FormGroup;

  constructor(private fb:FormBuilder,private router:Router, 
    private route:ActivatedRoute, private apiService: ApiService){}

    ngOnInit(): void{
      this.initForm();
    }
    
    initForm(){
      this.categoryForm = this.fb.group({
          name: ['', Validators.required],
          parent_id: [''],
          level: [''],
          slug:[''],
          is_leaf:[],
          status:['']
        });
      }
    goBack(){
      this.router.navigate(['/admin/category-list']);
    }

    onSubmit(){
      if(this.categoryForm.valid){
        const formValue = this.categoryForm.value;
        const payload = {
            name: formValue.name,
            parent_id: null,
            level: 1,
            slug: formValue.name,
            is_leaf:1
        }
        this.apiService.createCategory(payload).subscribe({
          next: (res) => {
              this.router.navigate(['/admin/category-list']);
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
}
