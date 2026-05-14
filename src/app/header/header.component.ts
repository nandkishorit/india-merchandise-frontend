import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from '../popup/popup.component';
import { AuthService } from '../../auth.service';
import { Router,ActivatedRoute,RouterModule} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({ 
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() loginClicked = new EventEmitter<void>();
  showPopup = false;
  private sub!: Subscription;
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private dialog: MatDialog, private authService:AuthService, private router: Router,
              private auth: AuthService,private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.checkAuthStatus();
    // 🔹 Subscribe for real-time updates
    this.sub = this.authService.authStatus$.subscribe(status => {
      console.log('status-----', status);
      this.isLoggedIn = status; 
      this.userRole = this.authService.getRole();
    });
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getRole();
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }
  
  onLogout() {
    this.authService.logout();
  }
}
