import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../features/admin/sidebar/sidebar.component';
import { HeaderComponent } from '../../features/admin/header/header.component';
import { FooterComponent } from '../../features/admin/footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, CommonModule,RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  
}
