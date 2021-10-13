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
      email: "nipunann0710@gmail.com",
      address: "No. 50, Highlevel Road",
      city: "Maharagama",
      country: "Sri Lanka",
    })

    this.checkoutParams = {
      returnUrl: 'https://localhost:4200/my-account/user/me/edit/subscription',
      cancelUrl: 'http://localhost:4200/cancel',
      notifyUrl: 'https://easybuilding.biz/easybuilding-api/index.php/ProfileController/payHerePayment',
      order_id: '877',
      itemTitle: 'Subscription Package 3 Months',
      currency: CurrencyType.LKR, 
      amount: 1500,
      custom_1: "251"
    }
  
    const checkoutData = new CheckoutParams(this.checkoutParams);
  
    const checkout = new PayhereCheckout(customer,checkoutData, this.onPayhereCheckoutError)
    checkout.start()
 
  }

 

  onPayhereCheckoutError(errorMsg) {
    alert(errorMsg)
  }

  

}
