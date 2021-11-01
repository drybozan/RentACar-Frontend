import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalStrogeService } from '../services/local-stroge.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  userClaim : string

  constructor(private localService:LocalStrogeService,
    private router:Router,
    private toastrService:ToastrService) {
     this.userClaim = JSON.parse(this.localService.getItem("user_claim") || "")
     console.log(this.userClaim)
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (this.userClaim == "admin") {
       
        return true
       }else{
         this.router.navigate([""])
         this.toastrService.error("Bu sayfaya erişim yetkiniz yok!" , "İşlem başarısız!")
         return false
       }
    }
}
  

