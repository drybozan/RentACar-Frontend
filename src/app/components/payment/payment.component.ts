import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CreditCard } from 'src/app/models/creditCards/creditCard';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { UserDetail } from 'src/app/models/user/userDetail';
import { CarService } from 'src/app/services/car-service.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStrogeService } from 'src/app/services/local-stroge.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  customerId: number

  carRent:Car
  carForRent: Car[]=[]

  rental: Rental
  rentDayCount: number

  routeLink = ""

  amountOfRent:number

  creditCardAddForm:FormGroup
  saveCreditCard:boolean = false
  creditCards:CreditCard[] = []
  currentCardId:number

  constructor(private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private carService: CarService,
    private customerService:CustomerService,
    private localService:LocalStrogeService,
    private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["rental"]) {
        this.setCustomerId()
        this.rental = JSON.parse(params["rental"])
        let carId = this.rental.car_id
        this.rental.car_id = parseInt(carId.toString())
        let diffrenceInTime = new Date(this.rental.return_date).getTime() - new Date(this.rental.rent_date).getTime()
        this.rentDayCount = diffrenceInTime / (1000 * 3600 * 24)
        this.getCarByCarId(this.rental.car_id)
        this.createCreditCardAddForm()

      }
    })
  }

  selectSavedCreditCard(creditCard:CreditCard){
    this.creditCardAddForm.setValue({
      fullname:creditCard.fullname,
      card_number:creditCard.card_number,
      card_exp_month:creditCard.card_exp_month,
      card_exp_year:creditCard.card_exp_year,
      cvv:creditCard.cvv,
      card_type:creditCard.card_type
    })
    this.setCurrentCardId(creditCard.card_id)
  }

  setCustomerId(){
    let user:UserDetail = JSON.parse(this.localService.getItem("user_details") || '')
    console.log(user)
    this.customerService.getCustomerDetailsByUserId(user.userss_id).subscribe((response) => {
      this.customerId = response.data.customer_id
      this.getCreditCardsByCustomerId(this.customerId)
      console.log(this.customerId)
    })
  }



  changeCurrentCardClass(cardId:number){
    if (this.currentCardId == cardId) {
      return "list-group-item list-group-item-action active"
    }else{
      return "list-group-item list-group-item-action"
    }
  }

  setCurrentCardId(cardId:number){
    this.currentCardId = cardId
  }

  pay() {
    if (this.saveCreditCard) {
      if (this.creditCardAddForm.valid) {
        this.addCreditCard()
        this.addPayment()
        this.addRental(this.rental)
      }else{
        this.toastrService.error("Form bilgileri eksik!" , "İşlem başarısız!")
      }
    }else{
      this.addPayment()
      this.addRental(this.rental)
    }
  }

  getCarByCarId(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carForRent= response.data;
      console.log(this.carForRent)

    })
  }


  getCreditCardsByCustomerId(customerId:number){
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe((response) => {
      this.creditCards = response.data
      console.log(this.creditCards)
    })
  }

  addRental(rental:Rental){
    this.rentalService.add(rental).subscribe((response) => {
      this.toastrService.success(response.message)
      this.router.navigate(["/cars"])
    },(errorResponse)=>{
      if (errorResponse.error.Errors.length > 0) {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i], "İşlem başarısız!")
        }
      }
    })
  }

  addPayment(){
    let payment:Payment = {payment_id : 0 ,customer_id : this.customerId , amount : this.amountOfRent}
    this.paymentService.addPayments(payment).subscribe((response) => {
      this.toastrService.success("Ödeme yapıldı." , "İşlem başarılı!")
    },(errorResponse)=>{
      if (errorResponse.error.Errors.length > 0) {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i], "İşlem başarısız!")
        }
      }
    })
  }

  addCreditCard(){
    let creditCard:CreditCard = Object.assign({} , this.creditCardAddForm.value)
    creditCard.customer_id = this.customerId
    creditCard.card_limit = 5000
    console.log(creditCard)
    this.creditCardService.addCreditCard(creditCard).subscribe((response) => {
      console.log(response)
      this.toastrService.info("Kredi kartı kaydedildi" , "Bilgilendirme!")
    },(errorResponse)=>{
      console.log(errorResponse)
      if (errorResponse.error.Errors.length > 0) {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i], "İşlem başarısız!")
        }
      }
    })
  }

  createCreditCardAddForm(){
    this.creditCardAddForm = this.formBuilder.group({
      fullname:["",Validators.required],
      card_number:["",Validators.required],
      card_exp_month:["",Validators.required],
      card_exp_year:["",Validators.required],
      cvv:["",Validators.required],
      card_type:["",Validators.required]
    })
  }

}
