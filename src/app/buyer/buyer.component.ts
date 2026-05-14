import { Component, OnInit, OnDestroy,PLATFORM_ID, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, Subscription } from 'rxjs';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { CommonModule,isPlatformBrowser } from '@angular/common';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

declare var bootstrap: any; // bootstrap ko declare karna zaruri hai
interface Product {
  id: number;
  name: string;
  brand?: string;
  description?: string;
  price: number;
  discount?: number;
  rating?: number; // 0-5
  thumbnail: string;
  category?: string;
  stock: number;
  tags?: string[];
}

@Component({
  selector: 'app-buyer-search',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit, OnDestroy {
  // Search + UI controls
  searchControl = new FormControl('');
  sortControl = new FormControl('relevance'); // relevance, price-asc, price-desc, rating
  categoryControl = new FormControl('all');

  // Pagination
  page$ = new BehaviorSubject<number>(1);
  PAGE_SIZE = 9;

  // Local/mock products (replace with API calls)
  private allProducts: Product[] = MOCK_PRODUCTS;

  // Reactive streams
  filteredProducts$: Observable<Product[]> | undefined;
  pagedProducts$: Observable<Product[]> | undefined;
  totalResults$ = new BehaviorSubject<number>(this.allProducts.length);

  private subs: Subscription[] = [];
  selectedProduct: any = null;
  isLoggedIn = false;
  mobileNumber = '';
  message = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // search stream
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value || ''),
      debounceTime(300),
      distinctUntilChanged(),
      map(s => (s || '').trim().toLowerCase())
    );

    const sort$ = this.sortControl.valueChanges.pipe(startWith(this.sortControl.value));
    const category$ = this.categoryControl.valueChanges.pipe(startWith(this.categoryControl.value));

    // Combine filters and sort, apply on allProducts (replace with API switchMap for server search)
    this.filteredProducts$ = combineLatest([search$, sort$, category$]).pipe(
      map(([q, sort, category]) => {
        let list = this.allProducts.slice();

        // Category filter
        if (category && category !== 'all') {
          list = list.filter(p => p.category === category);
        }

        // Search (name, brand, tags, description)
        if (q) {
          list = list.filter(p =>
            `${p.name} ${p.brand || ''} ${p.description || ''} ${p.tags?.join(' ') || ''}`
              .toLowerCase()
              .includes(q)
          );
        }

        // Sorting
        if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
        else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
        else if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        // relevance baseline keeps original order

        // update total
        this.totalResults$.next(list.length);
        // reset page if results shrink
        this.page$.next(1);
        return list;
      })
    );

    // Pagination: combine filteredProducts$ and page$
    this.pagedProducts$ = combineLatest([this.filteredProducts$, this.page$]).pipe(
      map(([list, page]) => {
        const start = (page - 1) * this.PAGE_SIZE;
        return list.slice(start, start + this.PAGE_SIZE);
      })
    );

    // initial kick (ensure searchControl triggers)
    this.searchControl.setValue(this.searchControl.value || '');
  }

  // Pagination helpers
  goToPage(n: number) {
    this.page$.next(n);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

  nextPage(total: number) {
    const maxPage = Math.max(1, Math.ceil(total / this.PAGE_SIZE));
    const curr = this.page$.value;
    if (curr < maxPage) this.page$.next(curr + 1);
  }

  prevPage() {
    const curr = this.page$.value;
    if (curr > 1) this.page$.next(curr - 1);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  // Utility for price display with discount
  displayPrice(p: Product) {
    if (p.discount && p.discount > 0) {
      const discounted = Math.round(p.price * (1 - p.discount / 100));
      return { original: p.price, discounted };
    }
    return { original: p.price, discounted: null };
  }

  // Placeholder: when user clicks product
  openProduct(p: Product) {
    alert(`Open product: ${p.name}`);
  }

  // categories for filter
  get categories(): string[] {
    const cats = Array.from(new Set(this.allProducts.map(p => p.category || 'Uncategorized')));
    return ['all', ...cats];
  }

  openContactSupplier(product: any) {
    this.selectedProduct = product;

    const modalEl = document.getElementById('contactSupplierModal');
    console.log('modal----',modalEl);
    if (modalEl) {
      
      const bsModal = new bootstrap.Modal(modalEl); // ✅
      console.log('bsModel-----', bsModal);
      bsModal.show();
    } else {
      console.log('2');
      console.error('Modal element not found!');
    }
  }
  
  // openContactSupplier(product: any) {
  //   alert(product);
  //   this.selectedProduct = product;
  //   const modal: any = document.getElementById('contactSupplierModal');
  //   console.log('modal......',modal);
  //   const bsModal = new (window as any).bootstrap.Modal(modal);
  //   bsModal.show();
  // }
// openContactSupplier(product: any) {
//   if(isPlatformBrowser(this.platformId)) {
//       const modalEl = document.getElementById('contactSupplierModal');
//       if (modalEl) {
//         const modal = new Modal(modalEl);
//         modal.show();
//       } else {
//         console.error('Modal element not found');
//       }
//     }
//   }

  // openContactSupplier(product: any) {
  // const modalElement: any = document.getElementById('contactSupplierModal'); 
  // if (modalElement) {
  //   const modal = new Modal(modalElement);
  //   modal.show();
  // }
  // this.selectedProduct = product;
  // }

  verifyMobile() {
    if (this.mobileNumber.length === 10) {
      this.isLoggedIn = true; // Mock login success
    } else {
      alert('Enter valid mobile number');
    }
  }
}

/** MOCK DATA - replace with API */
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    brand: 'Aurora',
    description: 'Soft combed cotton, breathable and fade resistant.',
    price: 799,
    discount: 10,
    rating: 4.5,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=T-Shirt',
    category: 'Apparel',
    stock: 25,
    tags: ['clothing', 'tshirt', 'cotton']
  },
  {
    id: 2,
    name: 'Urban Leather Wallet',
    brand: 'Crafthouse',
    description: 'Slim design, genuine leather, multiple card slots.',
    price: 1499,
    discount: 0,
    rating: 4.2,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Wallet',
    category: 'Accessories',
    stock: 10,
    tags: ['wallet', 'leather']
  },
  {
    id: 3,
    name: 'Noise Cancelling Headphones',
    brand: 'SoundMax',
    description: 'Active noise cancellation with 30h battery life.',
    price: 4999,
    discount: 15,
    rating: 4.7,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Headphones',
    category: 'Electronics',
    stock: 5,
    tags: ['audio', 'headphones']
  },
  {
    id: 4,
    name: 'Classic Running Shoes',
    brand: 'Stride',
    description: 'Lightweight running shoes with responsive sole.',
    price: 2999,
    discount: 20,
    rating: 4.3,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Shoes',
    category: 'Footwear',
    stock: 0,
    tags: ['sports', 'shoes']
  },
  {
    id: 5,
    name: 'Smart Fitness Band',
    brand: 'FitEdge',
    description: 'Heart-rate, sleep tracking and step counter.',
    price: 1999,
    discount: 5,
    rating: 4.1,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Fitness+Band',
    category: 'Electronics',
    stock: 40,
    tags: ['fitness', 'wearable']
  },
  {
    id: 6,
    name: 'Designer Sunglasses',
    brand: 'Luma',
    description: 'Polarized lenses with UV protection.',
    price: 2499,
    discount: 0,
    rating: 4.0,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Sunglasses',
    category: 'Accessories',
    stock: 12,
    tags: ['sunglasses']
  },
  {
    id: 7,
    name: 'Ceramic Coffee Mug Set',
    brand: 'BrewWorks',
    description: 'Set of 2, dishwasher safe, modern design.',
    price: 699,
    discount: 0,
    rating: 4.4,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Mug+Set',
    category: 'Home & Living',
    stock: 50,
    tags: ['mug', 'kitchen']
  },
  {
    id: 8,
    name: 'Portable Bluetooth Speaker',
    brand: 'BeatBox',
    description: 'Compact, powerful sound with deep bass.',
    price: 1599,
    discount: 10,
    rating: 4.6,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Speaker',
    category: 'Electronics',
    stock: 8,
    tags: ['audio', 'speaker']
  },
  {
    id: 9,
    name: 'Minimalist Backpack',
    brand: 'Nomad',
    description: 'Water-resistant, laptop compartment, comfortable straps.',
    price: 2199,
    discount: 0,
    rating: 4.2,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Backpack',
    category: 'Bags',
    stock: 18,
    tags: ['bag', 'travel']
  },
  {
    id: 10,
    name: 'Eco-friendly Notebook',
    brand: 'PaperTree',
    description: 'Recycled paper with premium binding.',
    price: 299,
    discount: 0,
    rating: 4.0,
    thumbnail: 'https://via.placeholder.com/480x320.png?text=Notebook',
    category: 'Stationery',
    stock: 100,
    tags: ['paper', 'notebook']
  }
];
