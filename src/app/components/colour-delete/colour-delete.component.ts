import { Colour } from 'src/app/models/colour/colour';
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-colour-delete',
  templateUrl: './colour-delete.component.html',
  styleUrls: ['./colour-delete.component.css']
})
export class ColourDeleteComponent implements OnInit {

  colors:Colour[]=[]
  color:Colour;
  

  constructor(private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void { 
      
    this.getColours()          
  
  }


  deleteColor(color:Colour){
    this.colorService.delete(color).subscribe((response) => {
      this.toastrService.success("Renk silindi" , "Başarılı!")
    },(responseError) => {
      console.log(responseError)
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem Başarısız!")
        }
      }
    })
  }
 
  getColours(){
    this.colorService.getColours().subscribe((response)=>{
      this.colors=response.data
    })
  }


}
