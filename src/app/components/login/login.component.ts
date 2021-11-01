import { UserDetail } from 'src/app/models/user/userDetail';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStrogeService } from 'src/app/services/local-stroge.service';
import { UserService } from 'src/app/services/user.service';
import { OperationClaim } from 'src/app/models/user/operationClaim';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  email:string;
  userDetail:UserDetail

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService
    , private authService:AuthService,private router:Router,
    private localStorageService:LocalStrogeService, private userService:UserService) { }

    
  ngOnInit(): void {
    this.createLoginForm();
  }



  createLoginForm(){
      this.loginForm=this.formBuilder.group({
          email:["",Validators.required],
          password:["",Validators.required]


      })
  }
  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      let loginModel = Object.assign({},this.loginForm.value)
    
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message,"Giriş Başarılı!")
        this.toastrService.info(response.message)
        this.localStorageService.add("token",response.data.token)
        this.localStorageService.add("email",this.loginForm.value.email)
        this.getUserDetails()
        this.router.navigate(["/cars"])
       
        
       
      },responseError=>{
       // console.log(responseError)
       this.toastrService.error(responseError.error);
       
      })
    }
  }

  getUserDetails(){
    this.userService.getUserDetailsByEmail(this.loginForm.value.email).subscribe((response) => { 
      this.userDetail = response.data
      console.log("here",this.userDetail)
     this.getUserClaims()
      this.localStorageService.add("user_details" , JSON.stringify(this.userDetail))     
      setTimeout(function(){
        window.location.reload();
     }, 1000);
     
      
    })
  }
  getUserClaims(){
    this.userService.getClaimsByUserId(this.userDetail.userss_id).subscribe((response)=>{
      let claim:OperationClaim = response.data[0]
      console.log(claim)
      this.localStorageService.add("user_claim",JSON.stringify(claim.claim_name))
      console.log("claimadded")
    })
  }


}
