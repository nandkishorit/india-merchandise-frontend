import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-freelisting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './freelisting.component.html',
  styleUrl: './freelisting.component.scss'
})
export class FreelistingComponent {
  subcategory: any[] = [];
  category_name: any[] = [];
  parent_category_id: any;
  isEditing: boolean = false;
  isGSTEditing: boolean = false;
  isFirmEditing:boolean = false;
  isBusinessEditing: boolean = false;
  isEmployeeEditing: boolean = false;
  message: string = '';
  location: any;
  company: any;
  comp: any;
  companyId: any;
  gst: any;
  firmStatus: any;
  businessNature: any;
  totalEmployee: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getSubcategory().subscribe(subCatData => {
      this.subcategory = subCatData.data;
    });

    this.apiService.getCompany().subscribe(companyData => {
      this.company = companyData.data[0];
      this.location = this.company.location; 
      this.gst = this.company.gst;
      this.firmStatus = this.company.firm_status;
      this.businessNature = this.company.business_nature;
      this.totalEmployee = this.company.total_employee
    });
  }
  
  editLocation() {
    this.isEditing = true;
  }
  editGst(){
    this.isGSTEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }
  cancelGSTEdit() {
    this.isGSTEditing = false;
  }
  cancelFirmEdit(){
    this.isFirmEditing = false;
  }
  editFirmStatus(){
    this.isFirmEditing = true;
  }
  editBusinessNature(){
    this.isBusinessEditing = true;
  }
  editTotalEmployee(){
    this.isEmployeeEditing = true;
  }
  cancelBusinessEdit(){
    this.isBusinessEditing = false;
  }
  cancelEmployeeEdit(){
    this.isEmployeeEditing = false;
  }

  saveLocation() {
    this.apiService.updateCompanyData( 1, { location: this.location }).subscribe({
      next: (response) => {
        this.location = response.location;
        window.location.reload();
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Error saving location',err);
      }
    });
  }
  saveGst(){
    console.log('Location entered:', this.gst);
    this.apiService.updateCompanyData(1,{ gst: this.gst }).subscribe({
        
        next:(response) =>{
          this.gst =  response.gst;
          console.log('GST....', this.gst);
          window.location.reload();
          this.isGSTEditing = false;
        },
        error:(err) =>{
          console.log('Error Saving Location', err);
        }
    })
  }
  saveFirmStatus(){
    this.apiService.updateCompanyData(1,{ firm_status: this.firmStatus }).subscribe({
      next:(response) =>{
        this.firmStatus = response.firmStatus;
        window.location.reload();
        this.isFirmEditing = false;
      },
      error:(err) => {
        console.log('Error Saving Location', err);
      }
    })
  }
  saveBusinessNature(){
    this.apiService.updateCompanyData( 1, { business_nature: this.businessNature }).subscribe({
      next: (response) => {
        this.businessNature = response.businessNature;
        window.location.reload();
        this.isBusinessEditing = false;
      },
      error: (err) => {
        console.error('Error saving location',err);
      }
    });
  }
  saveTotalEmployee(){
    
    console.log('employtee..', this.totalEmployee);
    this.apiService.updateCompanyData( 1, { total_employee: this.totalEmployee }).subscribe({
      next: (response) => {
        this.totalEmployee = response.totalEmployee;
        window.location.reload();
        this.isEmployeeEditing = false;
      },
      error: (err) => {
        console.error('Error saving location',err);
      }
    });
  }
}


