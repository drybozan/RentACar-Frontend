import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Colour } from 'src/app/models/colour/colour';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car-service.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car;
  cars:Car[]
  carUpdateForm : FormGroup;

  colors:Colour[]
  brands:Brand[]
  

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService,
     private carService:CarService, private brandService:BrandService,
     private colorService:ColorService) { }

     ngOnInit(): void {       
         
          this.getCars ()      
          this.getBrands()
          this.getColors()
          this.createCarUpdateForm()
        }
    

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({ 
      car_id:["",Validators.required],    
      brand_id:["", Validators.required],
      color_id:["", Validators.required],
      car_name:["", Validators.required],
      model_year:["", Validators.required],
      daily_price:["", Validators.required]    
    })
  }

  setCarUpdateFormValues(){
    this.carUpdateForm.setValue({
      car_id:[this.car.brand_id],
      brand_id:[this.car.brand_id],
      color_id:[this.car.color_id],
      car_name:[this.car.car_name],
      model_year:[this.car.model_year],
      daily_price:[this.car.daily_price],
      
    })
  }

 


  updateCar(){
    if (this.carUpdateForm.valid) {
      let brandId = parseInt(this.carUpdateForm.value.brand_id)
      let colorId = parseInt(this.carUpdateForm.value.color_id)
      let carModel:Car = Object.assign({} , this.carUpdateForm.value)     
      carModel.brand_id = brandId
      carModel.color_id = colorId
      console.log(carModel)
      this.carService.update(carModel).subscribe((response) => {
        this.toastrService.success("Araba güncellendi" , "Başarılı !")
      },(responseError) => {
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem Başarısız!")
          }
        }
      })
    }else{
      this.toastrService.error("Form bilgileri eksik" , "İşlem başarısız!")
    }
    
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColours().subscribe((response) => {
      this.colors = response.data
    })
  }

  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.cars=response.data     
     
    })
  }

}
