import { Component, Input, Output, EventEmitter } from '@angular/core';
import{ FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-popup',
  
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  loginForm: FormGroup;
  @Input() mobileNumber: string = '';
  @Output() close = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupComponent>
  ) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {
      const mobileNumber = this.loginForm.value.mobile;
      console.log('Login with mobile:', mobileNumber);
      this.dialogRef.close(); // Close the dialog
    }
  }
  closePopup() {
   this.dialogRef.close();
  }
}
