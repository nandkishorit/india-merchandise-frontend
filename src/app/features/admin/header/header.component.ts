import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isProfileOpen = false;
  private router = inject(ActivatedRoute);
  
  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }
  
  constructor(private authService: AuthService, private route: Router){}
  
  onLogout() {
    console.log('router+++',this.router.url); 
    // const id = this.route.snapshot.paramMap.get('id');
    this.authService.logout();
  }
}
