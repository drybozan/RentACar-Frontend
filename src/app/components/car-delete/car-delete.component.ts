import { Car } from 'src/app/models/car/car';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand/brand';
import { Colour } from 'src/app/models/colour/colour';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  cars:Car[]=[]
  car:Car;
  

  constructor(private carService:CarService,   
    private toastrService:ToastrService  
    ) { }

  ngOnInit(): void { 
     
    this.getCars2()          
  
  }



  deleteCar(car:Car){
    
      this.carService.delete(car).subscribe((response) => {
        console.log(car)
      this.toastrService.success("Araba silindi" , " Başarılı!")
    },(responseError) => {
      console.log(responseError)
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem Başarısız!")
        }
      }
    })
  }
 
  getCars2(){
    this.carService.getCars2().subscribe((response)=>{
      this.cars=response.data     
     
    })
  }
}
