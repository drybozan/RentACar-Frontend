import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel/registerModel';
import { UserDetail } from 'src/app/models/user/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStrogeService } from 'src/app/services/local-stroge.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup
  userDetail:UserDetail

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private userService:UserService,
    private localStrogeService:LocalStrogeService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstname:["",Validators.required],
      lastname:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      passwordRepeat:["",Validators.required],   
    })
  }

  register(){
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.passwordRepeat) {
        let registerModel:RegisterModel = Object.assign({} , this.registerForm.value)

      this.authService.register(registerModel).subscribe((response) => {
        console.log(response)
        this.router.navigate(["/"])
        this.toastrService.success("Hesap oluşturuldu" , "İşlem başarılı!")
        this.toastrService.info("Giriş yapıldı." , "Bilgilendirme!")
        this.localStrogeService.add("token" , response.data.token)
        this.userService.getUserDetailsByEmail(this.registerForm.value.email).subscribe((response) => { 
          this.userDetail = response.data
          this.localStrogeService.add("user_details" , JSON.stringify(this.userDetail))
          this.router.navigate(["/cars"]) 
        })
      },(responseError) => {
        this.toastrService.error(responseError.error , "İşlem başarısız!");
        
      })
      }else{
        this.toastrService.error("Şifre ve şifre tekrarı eşleşmiyor. Lütfen tekrar deneyiniz." , "İşlem başarısız!")
      }
      
    }else{
      this.toastrService.error("Form bilgileri eksik." , "İşlem başarısız!")
    }
  }

}
