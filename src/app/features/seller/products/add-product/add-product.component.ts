import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../auth.service';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;

  categories: any[] = [];
  subCategories: any[] = [];
  productType: any[]= [];
  childCategories: any[] = [];

  attributes: any[] = [];
  selectedAttributes: any = {};
  
  previewImages: string[] = [];
  sizes: any[]=[];
  colors: any[]=[];
  mainCategory: any[]=[];
  productTypes: any[]= [];
  user: any;
  roles: any;
  userId: any;
  uId: any;
  constructor(private fb: FormBuilder, private apiService:ApiService,
    private router:Router, private route: ActivatedRoute,private authService:AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.roles = this.authService.getRole();
    this.uId    = this.authService.getUserId(); 
    console.log('uId----', this.uId);
    this.initForm();
    this.loadSizeColors();
    this.getCategories();
  }

  
  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['',Validators.required],
      description: ['',Validators.required],
      category_id: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      productType: ['', Validators.required],
      variants: this.fb.array([])
    });

    this.addVariant(); 
  }

  
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  
  addVariant() {
    this.variants.push(
      this.fb.group({
        sku: [''],
        size: [''],
        color: [''],
        price: ['', Validators.required],
        stock: ['', Validators.required]
      })
    );
  }

  removeVariant(index: number) {
    this.variants.removeAt(index);
  }

  loadSizeColors() {
   
    this.sizes = [
      { id: 1, value: 'S' },
      { id: 2, value: 'M' }
    ],

    this.colors = [
      { id: 4, value: 'Red' },
      { id: 5, value: 'Blue' }
    ]
    
    const formValue = this.productForm.value;
  }

  onParentChange(parentId: any) {
    parentId = +parentId;
    this.subCategories = this.categories.filter(c => c.parent_id === parentId);
    this.childCategories = [];
    this.productForm.patchValue({ category_id: '' });
  }

  onSubChange(subId: any) {
    subId = +subId;
    this.childCategories = this.categories.filter(c => c.parent_id === subId);
    this.productForm.patchValue({ category_id: '' });
  }

  onCategorySelect(categoryId: any) {
    categoryId = +categoryId;
    this.productForm.patchValue({ category_id: categoryId });
    
    this.loadAttributes(categoryId);
  }

  loadAttributes(categoryId: number) {
    if (categoryId === 7 || categoryId === 8) {
      this.attributes = [
        { id: 1, name: 'Fabric' },
        { id: 2, name: 'Sleeve' }
      ];
    } else {
      this.attributes = [
        { id: 3, name: 'Size' },
        { id: 4, name: 'Color' }
      ];
    }
  }

  
  onFileSelect(event: any) {
    const files = event.target.files;

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const payload = {
        product: {
          name: formValue.name,
          brand: formValue.brand,
          description: formValue.description,
          seller_id: this.uId,
          status: "active"
        },

        categories: [
          {
            category_id: formValue.category_id
          }
        ],

        product_images: (this.previewImages || []).map((img: any, index: number) => {
    
          let fileName = '';
          if (typeof img === 'string' && img.includes('/')) {
            fileName = img.split('/').pop()?.split('?')[0] || '';
          }

          else if (img instanceof File) {
            fileName = img.name;
          }

          else {
            fileName = img;
          }

          return {
            image_url: fileName,       
            is_primary: index === 0,
            sort_order: index + 1
          };

        }),

        variants: formValue.variants.map((v: any) => ({

          sku: v.sku,
          price: v.price,
          stock: v.stock,
          attributes: {
            size: v.size || null,
            color: v.color || null
          },

        variant_images: (this.previewImages || []).map((img: any, index: number) => {
    
          let fileName = '';
          if (typeof img === 'string' && img.includes('/')) {
            fileName = img.split('/').pop()?.split('?')[0] || '';
          }

          else if (img instanceof File) {
            fileName = img.name;
          }

          else {
            fileName = img;
          }

          return {
            image_url: fileName,       
            is_primary: index === 0,
          };

        }),
        }))
      };
      console.log('FINAL PAYLOAD', payload);
        this.apiService.saveSellerProducts(payload).subscribe({
          next: (res) => {
            this.router.navigate(['/seller/product-list']);
            this.productForm.reset();
          },
          error: (err) => {
            console.error('Error creating work order:', err);
          }
        });
    }
    else{
      this.productForm.markAllAsTouched();
    }
  }

  getCategories(){
    this.apiService.getCategories().subscribe(res=>{
      console.log('response++++',res);
      this.mainCategory= res.category;
    })
  }

  onMainChange(mainId: number) {
    
    this.apiService.getSubCatOnSelectedCategory(mainId).subscribe(res => {
      console.log('subcate+++++-----',res.subCategory);
      this.subCategories = res.subCategory;
      this.productTypes = []; // reset
    });
  }

  onSubcategoryChange(subId: number) {
    this.apiService.getProductTypes(subId).subscribe(res => {
      console.log('productType++++++', res.productType);
      this.productTypes = res.productType;
    });
  }
  goBack(){
    this.router.navigate(['/seller/product-list']);
  }
  
}