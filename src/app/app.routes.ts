
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FreelistingComponent } from './freelisting/freelisting.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent} from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { ReportComponent } from  './report/report.component';
import { LoginComponent } from './login/login.component';
import { BuyerComponent } from './buyer/buyer.component'; 
import { RoleGuard } from '../role.guard';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
    { path: '',component: HomeComponent},
    { path: 'free-listing', component: FreelistingComponent },
    { path: 'buyer', component:BuyerComponent,canActivate:[AuthGuard, RoleGuard]},
    { path:'category',component: CategoryComponent},
    { path:'contact',component: ContactComponent},
    { path: 'product', component: ProductComponent },  
    { path:'report', component:ReportComponent},
    { path:'login', component:LoginComponent},
    
    /********************Seller Dashboard*************************************/
    {
        path: 'seller',
        loadChildren: () =>
            import('./features/seller/seller.routes').then(m => m.SELLER_ROUTES)
    },

    /**********************Admin Dashboard*************************************/
    {
        path: 'admin',
        loadChildren: () =>
            import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    { path:'**', redirectTo: ''},
];
