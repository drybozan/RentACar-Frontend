import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { User } from 'src/app/models/user/User';
import { UserDetail } from 'src/app/models/user/userDetail';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStrogeService } from 'src/app/services/local-stroge.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User
  customer: Customer
  userDetail: UserDetail
  userUpdateForm: FormGroup
  userUpdateModel: User

  constructor(private userService: UserService,
    private customerService: CustomerService,
    private localStrogeService: LocalStrogeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserByUserId()
    this.createUserUpdateForm()
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstname: [this.userDetail.firstname],
      lastname: [this.userDetail.lastname],
      email: [this.userDetail.email],
      company_name: [this.customer.company_name]
    })
  }
  updateUser() {
    let userDetail = JSON.parse(this.localStrogeService.getItem("user_details") || '')
    let userUpdateModel: UserDetail = { 
      userss_id: userDetail.userss_id, 
      firstname: this.userUpdateForm.value.firstname, 
      lastname: this.userUpdateForm.value.lastname, 
      email: this.userUpdateForm.value.email,
       
    }

    this.userService.update(userUpdateModel).subscribe((response) => {
      this.toastrService.success("Kullanıcı güncellendi" , "İşlem başarılı!")
      this.localStrogeService.update("user_details" , JSON.stringify(userUpdateModel))
    },(responseError) => {
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem başarısız")
        }
      }
    })
  // this.updateCustomer()
  }

  // updateCustomer(){
  //   let compony_name = this.userUpdateForm.value.company_name
  //   let customerUpdateModel : Customer = { 
  //     customer_id : this.customer.customer_id  ,
  //     company_name : this.customer.company_name
  //   }
  //   this.customerService.update(customerUpdateModel).subscribe((response) => {
  //     console.log(response)
  //     window.location.reload()
  //   },(responseError) => {
  //     if (responseError.error.Errors.length>0) {
  //       for (let i = 0; i < responseError.error.Errors.length; i++) {
  //         this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem başarısız")
  //       }
  //     }
  //   })
  // }

  

  getUserByUserId() {
    this.userDetail = JSON.parse(localStorage.getItem("user_details") || '');
    this.userService.getUserById(this.userDetail.userss_id).subscribe((response) => {
      console.log(response)
      this.user = response.data
      this.getCustomerDetailsByUserId()
    })
  }

  getCustomerDetailsByUserId() {
    this.customerService.getCustomerDetailsByUserId(this.userDetail.userss_id).subscribe((response) => {
      this.customer = response.data
      this.createUserUpdateForm()
    })
  }


}
