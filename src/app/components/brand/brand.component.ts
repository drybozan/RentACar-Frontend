
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand:Brand;
  filterText="";

  p: number = 1;
  count: number = 5;

  
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    });
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }
 
  setAllBrand(){
   return this.currentBrand={brand_id:0, brand_name:""};
 }
 
 
  getCurrentBrandClass(brand:Brand){
   if(brand== this.currentBrand){
     return "list-group-item active" //tıklandığında renk değişecek
   }else{
     return "list-group-item "
   }
 }
 getAllBrandClass(){
   if(!this.currentBrand){
     return "list-group-item active"
   }else{
     return "list-group-item "
   }

}
}
