import { CustomerService } from './../../services/customer.service';
import { LocalStrogeService } from './../../services/local-stroge.service';
import { CustomerDetail } from './../../models/customer/customerDetail';
import { RentalService } from './../../services/rental.service';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { Rental } from 'src/app/models/rental/rental';
import { UserDetail } from 'src/app/models/user/userDetail';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  apiURL = "https://localhost:44307"
  imageURL = "https://localhost:44307"

  car : Car
  carDetails : Car[] = []
  carImage : CarImage
  carImages : CarImage[] = []
  customerId:number

  lastRentals:Rental[]
  car_id: number
  lastRental:Rental= {rental_id: 0, car_id: 0, customer_id: 0, rent_date: new Date(2021, 12, 12), return_date: new Date(2021, 12, 12)}
  newRental:Rental={rental_id: 0, car_id: 0, customer_id: 0, rent_date: new Date(2021, 12, 12), return_date: new Date(2021, 12, 12)}

  rentDate: string
  returnDate: string
  lastRentalReturnDate: string
  isDatesValid = false




  constructor(private carDetailService : CarDetailService,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private activatedRoute : ActivatedRoute,
    private cartService:CartService,
    private localService:LocalStrogeService,
    private customerService:CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{

      if (params["car_id"]) {
      this.car_id = params["car_id"]
      this.getCarDetailsByCarId(params["car_id"])
      this.getCarImagesByCarId(params["car_id"])
      this.getRentalsByCarId(params["car_id"])
      this.getCustomerDetail()
    }

    })
  }

  getCarDetailsByCarId(car_id : number){
    this.carDetailService.getCarDetailsByCarId(car_id).subscribe(response=>{
      this.carDetails=response.data
      console.log(this.carDetails)

    })}

  getCarImagesByCarId(car_id : number){
    this.carDetailService.getCarImagesByCarId(car_id).subscribe(response=>{
      this.carImages = response.data;


    })

  }

  getCustomerDetail(){
    let userDetail:UserDetail = JSON.parse(this.localService.getItem("user_details") || "")
    this.customerService.getCustomerDetailsByUserId(userDetail.userss_id).subscribe((response)=>{
      this.customerId = response.data.customer_id
    })
  }

  addToCart(car: Car) {
    if (car.model_year < 2000) {
      this.toastrService.error(
        'Bu araç kiralanamaz',
        car.brand_name + ' ' + car.car_name
      );
    } else {
      this.toastrService.success(
        'Kiralama Sepetine Eklendi',
        car.brand_name + ' ' + car.car_name
      );
      this.cartService.addToCart(car);
    }
  }

  getRentalsByCarId(car_id: number) {
    this.rentalService.getRentalsByCarId(car_id).subscribe((response) => {
      this.lastRentals = response.data
      if (response.data) {
        this.lastRentalReturnDate = this.returnDateFormat()
      }else{
        this.lastRentalReturnDate = new Date().toString()
      }
    })
  }

  returnDateFormat() {
    this.lastRentalReturnDate = new Date(this.lastRental.return_date.toString()).getFullYear().toString() + "-"
    if (new Date(this.lastRental.return_date.toString()).getMonth() < 10) {
      this.lastRentalReturnDate += "0" + (new Date(this.lastRental.return_date.toString()).getMonth()+1).toString() + "-"
    } else {
      this.lastRentalReturnDate += (new Date(this.lastRental.return_date.toString()).getMonth()+1).toString() + "-"
    }
    if (new Date(this.lastRental.return_date.toString()).getDate() < 10) {
      this.lastRentalReturnDate += "0" + (new Date(this.lastRental.return_date.toString()).getDate()+1).toString()
    } else {
      this.lastRentalReturnDate += (new Date(this.lastRental.return_date.toString()).getDate()+1).toString()
    }
    return this.lastRentalReturnDate.toString()
  }

  controlDates() {
    if (Date.parse(this.rentDate) > Date.parse(this.returnDate) ||
      Date.parse(this.rentDate) < Date.now() - 86400000 ||
      !this.rentDate || !this.returnDate
    ) {
      this.isDatesValid = false
    } else {
      this.isDatesValid = true
    }

  }

  rentCar(rental: Rental) {
    this.controlDates()
    rental.car_id = this.car_id
    console.log(rental.car_id)
    rental.customer_id = this.customerId
    console.log(rental.customer_id)

    rental.rent_date = new Date(this.rentDate)
    rental.return_date = new Date(this.returnDate)
    if (this.isDatesValid === true) {
      this.toastrService.success("İşlem başarılı! Ödeme sayfasına yönlendiriliyorsunuz.")
      this.router.navigate(['/cars/details/rent/', JSON.stringify(rental)]);
    } else {
      this.toastrService.error("Tarih bilgileri geçersiz.")
      this.router.navigate(["/"])
    }
  }

}
