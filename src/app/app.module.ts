import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColourComponent } from './components/colour/colour.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarPipePipe } from './pipes/car-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColourAddComponent } from './components/colour-add/colour-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { ColourDeleteComponent } from './components/colour-delete/colour-delete.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColourComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    CarPipePipe,
    ColorPipePipe,
    BrandPipePipe,
    CartSummaryComponent,
    PaymentComponent,
    CarAddComponent,
    BrandAddComponent,
    ColourAddComponent,
    BrandDeleteComponent,
    ColourDeleteComponent,
    CarDeleteComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
