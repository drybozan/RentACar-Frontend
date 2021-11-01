import { CustomerDetail } from './../../models/customer/customerDetail';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:CustomerDetail[] = [];

  constructor(private customerService:CustomerService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      console.log(this.customers)
      this.toastrService.success(response.message)

    });
  }

}
