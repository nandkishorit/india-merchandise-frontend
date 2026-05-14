import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(message: string = 'Saved Successfully!') {
    Swal.fire({
      toast: true,
      icon: 'success',
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
    });
  }

  error(message: string = 'Something went wrong!') {
    Swal.fire({
      toast: true,
      icon: 'error',
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
  }

  info(message: string) {
    Swal.fire({
      toast: true,
      icon: 'info',
      title: message,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
  }

  

  confirm(message: string = "Are you sure to update?"): Promise<boolean> {
  return Swal.fire({
    title: message,
    icon: 'warning',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    width: '400px', // smaller width
    position: 'top-end',
    toast: true,
    customClass: {
      title: 'swal-title-small',
      popup: 'swal-popup-small',
      confirmButton: 'swal-btn-confirm',
      cancelButton: 'swal-btn-cancel'
    }
  }).then(result => result.isConfirmed);
}

}
