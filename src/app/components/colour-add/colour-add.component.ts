import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colour-add',
  templateUrl: './colour-add.component.html',
  styleUrls: ['./colour-add.component.css']
})
export class ColourAddComponent implements OnInit {

  colorAddForm : FormGroup
  constructor(private formBuilder:FormBuilder,private colorService:ColorService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }


   createColorAddForm(){
      this.colorAddForm = this.formBuilder.group({
       color_name:["",Validators.required]
      })
      
    }

    add(){
      
      if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      console.log(colorModel)
      this.colorService.add(colorModel).subscribe(response=>{      
      this.toastrService.success("Başarılı",response.message)//backende kısmında yazılan mesajı getirir.
       } ,responseError=>{
        if(responseError.error.Errors.length>0){
          
          for (let i = 0; i < responseError.error.Errors.length; i++) {         
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"İşlem başarısız.")
          }
         
        } 
      })   
      
      }else{
        this.toastrService.error("Formunuz Eksik","Hata")
      }
  
    }

}
