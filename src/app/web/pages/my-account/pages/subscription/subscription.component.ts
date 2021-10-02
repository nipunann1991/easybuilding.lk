import { Component, OnInit } from '@angular/core';
import { Payhere, AccountCategory,  Customer, CurrencyType, PayhereCheckout, CheckoutParams } from "payhere-js-sdk";
import { MyAccountService } from "../../services/my-account.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  checkoutParams: any
  payhere: any

  constructor(
    private account: MyAccountService
  ) { 
    Payhere.init("1212200",AccountCategory.SANDBOX);
     
  }

  ngOnInit() {
 
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
