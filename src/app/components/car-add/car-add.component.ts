import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Colour } from 'src/app/models/colour/colour';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car-service.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup
  brands:Brand[] = []
  colors:Colour[] = []

  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getBrands()
    this.getColors()
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brand_id:["",Validators.required],
      color_id:["",Validators.required],
      car_name:["",Validators.required],
      model_year:["",Validators.required],
      daily_price:["",Validators.required],
      
    })
  }

  add(){
    if (this.carAddForm.valid) {
      let brandId = parseInt(this.carAddForm.value.brand_id)
      let colorId = parseInt(this.carAddForm.value.color_id)
      let carModel:Car = Object.assign({},this.carAddForm.value)
      carModel.brand_id = brandId
      carModel.color_id = colorId
      this.carService.add(carModel).subscribe((response) => {
        this.toastrService.success("Araba eklendi.","İşlem başarılı!")
      },(errorResponse) => {
        console.log(errorResponse)
        if (errorResponse.error.Errors.length>0) {
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
           this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage , "İşlem başarısız!")
          }
        }
      })
    }else{
      this.toastrService.error("Form bilgileri eksik","İşlem başarısız!")
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

}
