
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Colour } from 'src/app/models/colour/colour';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car-service.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  currentCar:Car;
  filterText="";

  p: number = 1;
  count: number = 10;

  colours:Colour[]
  brands:Brand[]
  currentBrandId:number;
  currentColorId:number;


  
  
  constructor(private carService:CarService,
              private activatedRoute:ActivatedRoute,
              private brandService:BrandService,
              private colorService:ColorService,
              private toastrService:ToastrService,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params['brand_id'] && params['color_id']) {
        this.getCarsByBrandsAndColours(params['brand_id'], params['color_id']);
      }
      else if(params["brand_id"]){
      this.getCarsByBrand(params["brand_id"])
      } 
      else if(params["color_id"]){
        this.getCarsByColor(params["color_id"])
      }
      else{
        this.getCars();
        this.getBrands();
        this.getColors();
      }
        
      
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
     // this.toastrService.success("Tüm araçlar listelendi.")
      console.log(this.cars)
      
    });
  }

  getCarsByBrand(brand_id:number){
    this.carService.getCarsByBrand(brand_id).subscribe(response=>{
      this.cars=response.data
      
   })
  }

  getCarsByColor(color_id:number){
    this.carService.getCarsByColor(color_id).subscribe(response=>{
      this.cars=response.data
      
   })
  }

  getCarsByBrandsAndColours(brand_id : number,color_id : number){
    this.carService.getCarsByBrandsAndColours(brand_id,color_id).subscribe(response=>{
      this.cars = response.data;
    });
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data
    })
  }
  getColors(){
    this.colorService.getColours().subscribe((response)=>{
      this.colours=response.data
    })
  }
  setCurrentBrand(brand_id:number){
    return(brand_id===this.currentBrandId?true:false)
  }
  setCurrentColor(color_id:number){
    return(color_id===this.currentColorId?true:false)
  }


  addToCart(car:Car){
    this.toastrService.success("Sepete eklendi", car.car_name);
    this.cartService.addToCart(car);
  }


  

  

}
