import { Colour } from './../../models/colour/colour';
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.css']
})
export class ColourComponent implements OnInit {

  colors:Colour[] = [];
  currentColor:Colour;
  filterText="";

  p: number = 1;
  count: number = 5;
  
  constructor(private colorService:ColorService) { }


  ngOnInit(): void {
    this.getColours();
  }

  getColours(){
    this.colorService.getColours().subscribe(response => {
      this.colors = response.data
      
    });
  }

  setCurrentColor(color:Colour){
    this.currentColor=color;
  }

  setAllColor(){
    return this.currentColor={color_id:0, color_name:""};
  }
  
  
   getCurrentColorClass(color:Colour){
    if(color== this.currentColor){
      return "list-group-item active" //tıklandığında renk değişecek
    }else{
      return "list-group-item "
    }
  }
  getAllColorClass(){
    if(!this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item "
    }
 
 }

}
