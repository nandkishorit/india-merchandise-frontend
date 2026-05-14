import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { SellerLayoutComponent } from '../../layouts/seller-layout/seller-layout.component';
import { EnquiryListComponent } from './enquiry/enquiry-list/enquiry-list.component';
export const SELLER_ROUTES: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard',    component: DashboardComponent},
      { path: 'product-list', component: ProductListComponent },
      { path: 'add-product',  component: AddProductComponent },
      { path: 'edit-product', component: EditProductComponent },
      { path: 'enquiry-list', component: EnquiryListComponent }
    ]
  }
];