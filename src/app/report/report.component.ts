import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface PdfItem {
  title: string;
  link: string;
}

export interface PdfCategory {
  name: string;
  pdfs: PdfItem[];
}
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})

export class ReportComponent {
  constructor(private http: HttpClient){}
  categories: PdfCategory[] = [
    {
      name: 'Science',
      pdfs: [
        { title: 'Physics Basics', link: 'https://example.com/physics.pdf' },
        { title: 'Chemistry 101', link: 'https://example.com/chemistry.pdf' },
      ]
    },
    {
      name: 'Mathematics',
      pdfs: [
        { title: 'Algebra Fundamentals', link: 'https://example.com/algebra.pdf' },
        { title: 'Calculus Advanced', link: 'https://example.com/calculus.pdf' },
      ]
    }
    // add more categories and PDFs here
  ];

  handleClick(pdf: { title: string; link: string }) {
    const browserInfo = navigator.userAgent;

   
    this.http.get('https://api.ipify.org?format=json').subscribe({
      next: (res: any) => {
        const ip = res.ip;
        
        this.http.post('http://localhost:3005/admin/report/add', {
          title: pdf.title,
          link: pdf.link,
          browser_info: browserInfo,
          ip_address: ip,
          status: 'success'
        }).subscribe({
          next: () => console.log('Logged click for', pdf.title),
          error: err => console.error('Log failed', err)
        });
      },
      error: err => console.error('IP fetch failed', err)
    });
  }
}



