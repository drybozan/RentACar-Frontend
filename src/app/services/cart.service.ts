import { Injectable } from '@angular/core';
import { Car } from '../models/car/car';
import { CartItem } from '../models/cart/cartItem';
import { CartItems } from '../models/cart/cartItems';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  addToCart(car:Car){
    let item = CartItems.find(c=>c.car.car_id===car.car_id);
    if(item){
      item.quantity+=1;
    }else{
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity =1;
      CartItems.push(cartItem)
    }
  }

  list():CartItem[]{
    return CartItems;
  }

  removeFromCart(car:Car){
    let item:CartItem = CartItems.find(c=>c.car.car_id===car.car_id);
    CartItems.splice(CartItems.indexOf(item),1);
  }
}
