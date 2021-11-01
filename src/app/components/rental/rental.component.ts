import { RentalDto } from './../../models/rental/rentalDto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:RentalDto[] = [];


  constructor(private rentalService:RentalService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.toastrService.success(response.message);

    });
  }


}
