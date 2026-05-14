
import { Component } from '@angular/core';     
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ModalComponent } from './shared/components/modal/modal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,CommonModule,RouterOutlet,ModalComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'india-marchandise-frontend';
  messages: any[] = [];
  showPopup = false;
  showHeaderFooter = true;
  showLayout = true;
  openPopup() {
    this.showPopup = true;
  }
  constructor(private router: Router,public authService: AuthService) {
    //console.log('authService+++', authService);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
       
        this.showHeaderFooter  = !(event.url.startsWith('/login') || (event.url.startsWith('/seller')) || (event.url.startsWith('/admin')));
    });
  }
}
