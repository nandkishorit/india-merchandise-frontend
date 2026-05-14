import { Routes } from '@angular/router';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellersComponent } from './sellers/sellers.component';
import { SubcategoryListComponent } from './subcategory/subcategory-list/subcategory-list.component';
import { ProductTypeComponent } from './subcategory/product-type/product-type.component';
import { AddSubcategoryComponent } from './subcategory/add-subcategory/add-subcategory.component';
import { ProducttypeListComponent } from './producttype/producttype-list/producttype-list.component';
import { AddProducttypeComponent } from './producttype/add-producttype/add-producttype.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { BuyersListComponent } from './buyers/buyers-list/buyers-list.component';
import { EnquiryListComponent } from './enquiry/enquiry-list/enquiry-list.component';
import { PlanListComponent } from './plan/plan-list/plan-list.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
       { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
       { path: 'dashboard',    component: DashboardComponent},
       { path: 'category-list', component: CategoryListComponent },
       { path: 'add-category',  component: AddCategoryComponent },
       { path: 'seller-list',  component: SellersComponent },
       { path: 'subcategory-list', component: SubcategoryListComponent },
       { path: 'add-subcategory', component: AddSubcategoryComponent },
       { path: 'product-type', component: ProductTypeComponent },
       { path: 'producttype-list', component: ProducttypeListComponent },
       { path: 'add-producttype', component: AddProducttypeComponent },
       { path: 'products', component: ProductsListComponent },
       { path: 'buyers-list', component: BuyersListComponent },
       { path: 'enquiry-list', component: EnquiryListComponent },
       { path: 'subscription-plan', component: PlanListComponent },
    ]
  }
];