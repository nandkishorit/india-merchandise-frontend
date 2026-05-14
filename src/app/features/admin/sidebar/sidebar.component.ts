import { Component } from '@angular/core';
import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  openMenu: string | null = null;

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }
  constructor(private router:Router, private route: ActivatedRoute){
   
  }
  
  
}
