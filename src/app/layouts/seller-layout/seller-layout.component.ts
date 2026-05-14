import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../features/seller/sidebar/sidebar.component';
import { HeaderComponent } from '../../features/seller/header/header.component';
import { FooterComponent } from '../../features/seller/footer/footer.component';

@Component({
  selector: 'app-seller-layout',
  standalone: true,
  imports: [CommonModule,SidebarComponent,RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.scss'
})
export class SellerLayoutComponent {
  
}
