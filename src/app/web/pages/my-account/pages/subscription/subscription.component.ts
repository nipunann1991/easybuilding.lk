import { Component, OnInit } from '@angular/core';
import { Payhere, AccountCategory,  Customer, CurrencyType, PayhereCheckout, CheckoutParams } from "payhere-js-sdk";
 

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  checkoutParams: any
  payhere: any

  constructor() { 
    Payhere.init("1212200",AccountCategory.SANDBOX);
     
  }

  ngOnInit(): void {
 
  }

  checkout() {
    const customer = new Customer({
      first_name: "Nipuna",
      last_name: "Nanayakkara",
      phone: "+94771234567",
      email: "plumberhl@gmail.com",
      address: "No. 50, Highlevel Road",
      city: "Panadura",
      country: "Sri Lanka",
    })

    this.checkoutParams = {
      returnUrl: 'https://localhost:4200/my-account/user/me/edit/subscription',
      cancelUrl: 'http://localhost:3000/cancel',
      notifyUrl: 'https://easybuilding.biz/easybuilding-api/index.php/ProfileController/payHerePayment',
      order_id: '124890',
      itemTitle: 'Demo Item 1001',
      currency: CurrencyType.LKR,
      amount: 50
    }
  
    const checkoutData = new CheckoutParams(this.checkoutParams);
  
    const checkout = new PayhereCheckout(customer,checkoutData, this.onPayhereCheckoutError)
    checkout.start()
 
  }

 

  onPayhereCheckoutError(errorMsg) {
    alert(errorMsg)
  }

}



//   // Called when user completed the payment. It can be a successful payment or failure
//   payhere.onCompleted = function onCompleted(orderId) {
//     console.log("Payment completed. OrderID:" + orderId);
//     //Note: validate the payment and show success or failure page to the customer
// };

// // Called when user closes the payment without completing
// payhere.onDismissed = function onDismissed() {
//     //Note: Prompt user to pay again or show an error page
//     console.log("Payment dismissed");
// };

// // Called when error happens when initializing payment such as invalid parameters
// payhere.onError = function onError(error) {
//     // Note: show an error page
//     console.log("Error:"  + error);
// };

// // Put the payment variables here
// var payment = {
//     "sandbox": true,
//     "merchant_id": "121XXXX",    // Replace your Merchant ID
//     "return_url": undefined,     // Important
//     "cancel_url": undefined,     // Important
//     "notify_url": "http://sample.com/notify",
//     "order_id": "ItemNo12345",
//     "items": "Door bell wireles",
//     "amount": "1000.00",
//     "currency": "LKR",
//     "first_name": "Saman",
//     "last_name": "Perera",
//     "email": "samanp@gmail.com",
//     "phone": "0771234567",
//     "address": "No.1, Galle Road",
//     "city": "Colombo",
//     "country": "Sri Lanka",
//     "delivery_address": "No. 46, Galle road, Kalutara South",
//     "delivery_city": "Kalutara",
//     "delivery_country": "Sri Lanka",
//     "custom_1": "",
//     "custom_2": ""
// };

// // Show the payhere.js popup, when "PayHere Pay" is clicked
// document.getElementById('payhere-payment').onclick = function (e) {
//     payhere.startPayment(payment);
// };