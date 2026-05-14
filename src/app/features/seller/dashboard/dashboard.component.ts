import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  searchText = '';
  filterStatus = '';

  totalProducts = 25;
  activeProducts = 18;
  draftProducts = 5;
  outOfStockProducts = 2;

  totalViews = 1200;
  totalLeads = 85;
  newLeadsCount = 6;

  products = [
    {
      id: 1,
      name: 'Beauty Cream',
      description: 'High quality skin cream for glowing skin',
      price: 299,
      stock: 10,
      status: 'active',
      image: 'https://via.placeholder.com/300x200',
      views: 120,
      leads: 10
    },
    {
      id: 2,
      name: 'Hair Oil',
      description: 'Natural herbal oil for hair growth',
      price: 199,
      stock: 0,
      status: 'draft',
      image: 'https://via.placeholder.com/300x200',
      views: 80,
      leads: 5
    }
  ];

  constructor(private router: Router, private route:ActivatedRoute){

  }

  get filteredProducts() {
    return this.products.filter(p => {
      return (
        (!this.searchText || p.name.toLowerCase().includes(this.searchText.toLowerCase())) &&
        (!this.filterStatus || p.status === this.filterStatus)
      );
    });
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
  addProducts(){
    this.router.navigate(['/seller/add-product']);
  }

}