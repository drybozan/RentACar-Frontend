import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  brands:Brand[]=[]
  brand:Brand;
  

  constructor(private brandService:BrandService,   
    private toastrService:ToastrService) { }

  ngOnInit(): void { 
      
    this.getBrands()          
  
  }



  deleteBrand(brand:Brand){
    this.brandService.delete(brand).subscribe((response) => {
      this.toastrService.success("Marka silindi" , "İşlem Başarılı!")
    },(responseError) => {
      console.log(responseError)
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem Başarısız!")
        }
      }
    })
  }
 
  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data
    })
  }


}
