import { AdminGuard } from './guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColourAddComponent } from './components/colour-add/colour-add.component';
import { ColourDeleteComponent } from './components/colour-delete/colour-delete.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brand_id",component:CarComponent},
  {path:"cars/color/:color_id",component:CarComponent},
  {path:"cars/carDetails/:car_id",component:CarDetailComponent},
  {path:"cars/filter/:brand_id/:color_id",component:CarComponent},
  {path:"cars/rentals",component:RentalComponent,canActivate:[LoginGuard,AdminGuard]},
  {path :"cars/details/rent/:rental" , component : PaymentComponent },
  {path:"brands/add",component:BrandAddComponent ,canActivate:[LoginGuard,AdminGuard]},
  {path:"brands/delete",component:BrandDeleteComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"colours/add",component:ColourAddComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"colours/delete",component:ColourDeleteComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"cars/delete",component:CarDeleteComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"cars/update",component:CarUpdateComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"customers",component:CustomerComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:UserProfileComponent,canActivate:[LoginGuard]},
  {path :"payment" , component : PaymentComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
