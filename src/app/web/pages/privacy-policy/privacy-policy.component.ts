import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  privacyPolicyContent: any;

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0); 
    this.privacyPolicy();
  }


  privacyPolicy(){
    
    this.privacyPolicyContent = [
      {
        id: 1,
        title: "About this Terms and Conditions of Use",
        description: "This Terms and Conditions document is an “electronic record” as per the definition of the Electronic Transactions Act, No. 19 of 2006. As described above, this document is published to detail the Terms and Conditions to which any user of EasyBuilding.lk, the online portal of EasyBuilding (Pvt) Ltd., and Kiosks, Showrooms and other physical facilities that bear the brand name EasyBuilding.lk should agree to be subjected to and thus would be subjected to"
      },
      {
        id: 2,
        title: "About EasyBuilding.lk",
        description: "EasyBuilding.lk is a brand name owned by EasyBuilding (Pvt) Ltd. The web address of the online portal of the said company bears the same lettering and is an online supermarket selling Building construction services, Building construction materials, interior furnishing, outdoor furnishing and energy products for all living, work and leisure space like home, apartment, office, storage warehouse, industrial work area, restaurant, shopping malls, retail showrooms, hotels, resorts, vacation homes, and other similar. EasyBuilding.lk also offers Service Providers like Architects, Civil Engineers, Carpenters, all type of consultancy services, Electricians, plumbers, Masons, advertisement space to promote their services within its online portal EasyBuilding (Pvt) Ltd will also have Kiosks, Showrooms and other physical facilities that bear the brand name EasyBuilding.lk."
      },
      {
        id: 3,
        title: "What constitutes EasyBuilding.lk",
        description: `
            3.1. EasyBuilding.lk is a website registered under the Company name EasyBuilding (Pvt) Ltd and its registered office at 70, Diyawanna Gardens, Palawatta, Battaramulla, Sri Lanka.
            <br/><br/>
            3.2. EasyBuilding.lk online portal is a website (URL: www.EasyBuilding.lk) that is fully owned by EasyBuilding (Pvt) Ltd. This portal is easily accessible via any computer system or other similar system that is connected to the Internet. The portal provides a platform for the following:
            <br/><br/>
            3.2.1. Manufacturers, Authorized Distributors, Wholesalers, Retailers ("Vendors") and other similar, to recommend, promote, advertise, display, demonstrate, and sell products
            <br/><br/>
            3.2.2. Service Providers ("SPs") and other similar, to recommend, promote, advertise, display, demonstrate, and sell services
            <br/><br/>
            3.2.3. Customers ("Customers") and other similar, to search for products, register for a new EasyBuilding.lk registered account, access and manage existing EasyBuilding.lk registered account, buy products, and pay for products
            <br/><br/>
            3.3. EasyBuilding.lk Kiosks are physical spaces that are fully owned/rented by EasyBuilding (Pvt) Ltd. These physical spaces have computer systems and other similar systems that are connected to the Internet. Kiosks are provided for, and placed by EasyBuilding.lk at vantage physical locations. The computer systems within the Kiosks are available for Customers to search for products, register for a new EasyBuilding.lk registered account, access and manage existing EasyBuilding.lk registered account, buy products, and pay for products. These computer systems are available for EasyBuilding.lk Vendors and SPs to recommend, promote, advertise, display, demonstrate, and sell products
            <br/><br/>
            3.4. EasyBuilding.lk Showrooms and Physical Facilities are physical spaces that are fully owned/rented by EasyBuilding (Pvt) Ltd. These physical spaces are used by EasyBuilding.lk Vendors and SPs, specifically to recommend, promote, advertise, display, demonstrate, and sell products. EasyBuilding.lk Customers may visit these facilities to search for products, interact with EasyBuilding.lk, Vendors and SPs
            <br/><br/>
            3.5. EasyBuilding.lk would hereinafter refer to all EasyBuilding (Pvt) Ltd.’s assets as described above in 3.1 to 3.4.
            <br/><br/>
            3.6. All visitors, clients and customers of EasyBuilding.lk would be subject to the terms and conditions as contained in this Terms and Conditions document, when using any of the business applications that are available on EasyBuilding.lk, either provided directly by EasyBuilding.lk or those provided by third party providers including, but not limited to, software applications, payment gateway related services and other similar applications, specifically put in place by EasyBuilding.lk to help you in the process of recommending, promoting, advertising, displaying, demonstrating, selling, searching for, buying, paying for, products, on EasyBuilding.lk. These policies shall be deemed to be implicitly incorporated into this Privacy Policy and considered as part and parcel of this Privacy Policy without any restrictions whatsoever.
        `
      },
      {
        id: 4,
        title: "Identifications",
        description: `In this Terms and Conditions document, in the context of an individual or an organizational entity or where the context so requires, the term "You/you," "Your/your" shall mean the following:
        <br/><br/>
        4.1. Any natural, legal, living adult individual who is at least 18 years of age (as on date), and competent enough to enter into a legally binding contract with EasyBuilding.lk under the provisions of the Sale of Goods Act 1979, and all other applicable and relevant laws in place at any point in time in the country.
        <br/><br/>
        4.2. If you are a minor (as at date) and wish to recommend, promote, advertise, display, demonstrate, sell, search for, buy, pay for products through EasyBuilding.lk, you may do so only through your legal guardian or parent(s) (who is a natural, legal, living adult individual, and at least 18 years of age (as at date)), through their respective EasyBuilding.lk registered account
        <br/><br/>
        4.3. Any legally registered and duly incorporated organizational entity, which is involved in legally acceptable activities in accordance with all relevant laws, at all times and that is in compliance with all applicable local laws
        <br/><br/>
        4.4. Any natural, legal, living adult individual who is at least 18 years of age (as on date), competent enough to enter into a legally binding contract with EasyBuilding.lk under the provisions of the Sale of Goods Act 1979, and all other applicable and relevant laws in place at any point in time in the country and representing an organizational entity. Such an individual may interact with EasyBuilding.lk only if the individual has a current and valid and legal power of attorney from the organizational entity authorizing the individual to represent the organizational entity, without any conditions whatsoever. This current and valid legal power of attorney document (paper/electronic) should be available for EasyBuilding.lk upon request to validate and verify at all times`
      },      
      {
        id: 5,
        title: "Service of Notice",
        description: `You agree that communication from EasyBuilding.lk through any one of the following medium, constitutes proper service of notice:
        <br/><br/>
        5.1. Non-electronic medium such as (but not limited to) courier, postal mail, paper mail, hand delivered mail and other similar
        <br/><br/>
        5.2. Electronic medium such as (but not limited to) telephone/mobile short message service, electronic mail, email, Internet, website communications, online chat, audio mail, audio chat, and video mail, video chat and other similar`
      },
      {
        id: 6,
        title: "EasyBuilding.lk Privacy Policy Overview",
        description: `6.1. This Terms and Conditions document applies to all those who interact with EasyBuilding.lk. By interacting with EasyBuilding.lk, you are implicitly agreeing and accepting to be bound by this Privacy Policy. If you do not agree to this Privacy Policy, please do not interact with EasyBuilding.lk in anyway
        <br/><br/>
        6.2. This Privacy Policy shall be effective and binding upon your implicit and/or explicit acceptance of this Privacy Policy. If you do not agree and accept this Privacy Policy, you will be deemed to have been denied the right to interact with EasyBuilding.lk at all times
        <br/><br/>
        6.3. By accepting the Privacy Policy and the User Agreement during new account registration, you expressly consent to EasyBuilding.lk use and disclosure of your account information in accordance with this Privacy Policy
        <br/><br/>
        6.4. This Privacy Policy is incorporated into and subject to the EasyBuilding.lk Terms of Use Agreement
        <br/><br/>
        6.5. A copy of this Privacy Policy will be made available at EasyBuilding.lk facilities including EasyBuilding.lk online portal accessible through the URL: www. EasyBuilding.lk
        <br/><br/>
        6.6. This Privacy Policy is subject to change at any time without notice and hence you are requested to make themselves aware of any changes, by reviewing this policy as updated on the EasyBuilding.lk website periodically prior to any act that would have financial implications to either You or EasyBuilding.lk`
      },
      {
        id: 7,
        title: "Your privacy",
        description: `7.1. Your privacy is very important to EasyBuilding.lk. The terms and conditions in this document, more specifically Section 6 above, which relates to data privacy elaborates on the information gathering and dissemination practices of EasyBuilding.lk’s
        <br/><br/>
        7.2. Those terms and conditions describe the manner in which your information is collected and used by EasyBuilding.lk
        <br/><br/>
        7.3. EasyBuilding.lk does not intend to publish, sell, or lease out any of your information to any other entity for any purpose whatsoever without your explicit consent`
      },
      {
        id: 8,
        title: "What information is collected by EasyBuilding.lk?",
        description: `EasyBuilding.lk does use your account information to
        <br/><br/>
        8.1. EasyBuilding.lk collects account holder account information (email address, name, phone number, etc.) from you when you set up an account with EasyBuilding.lk
        <br/><br/>
        8.2. While you can interact with EasyBuilding.lk without being a registered EasyBuilding.lk account holder, certain activities (such as placing an order as a Customer, Posting an advertisement as a SP, selling products as a Vendor) do require registration
        <br/><br/>
        8.3. EasyBuilding.lk will occasionally ask you to complete optional online surveys. These surveys may ask you for your contact information and demographic information (like city, Pincode, age, or income level`
      },
      {
        id: 9,
        title: "How does EasyBuilding.lk use account information collected from account holders? ",
        description: `EasyBuilding.lk may use your account information to:
        <br/><br/>
        9.1. Provide you with content that will interest you and that suits your preferences
        <br/><br/>
        9.2. Measure your interest in EasyBuilding.lk products and/or services
        <br/><br/>
        9.3. Customize your experience - IP address of (your) computer system, that is used by you to access EasyBuilding.lk, is used by EasyBuilding.lk to help identify you and to gather broad demographic information. As part of efforts to continually improve EasyBuilding.lk product and service offerings, EasyBuilding.lk collects and analyzes demographic and profile data about your activity on EasyBuilding.lk facilities
        <br/><br/>
        9.4. Send promotions - Periodically send special promotion and discount offers on various EasyBuilding.lk product and services, based on your order and product and services search history
        <br/><br/>
        9.5. Inform you about offers, products, services, and updates
        <br/><br/>
        9.6. Troubleshoot problems - EasyBuilding.lk identifies and uses your system's (the system that you are using to access EasyBuilding.lk) IP address to help diagnose problems with EasyBuilding.lk facilities, and to manage EasyBuilding.lk 's facilities
        <br/><br/>
        9.7. Help promote a safe service
        <br/><br/>
        9.8. Collect dues owed by you to EasyBuilding.lk
        <br/><br/>
        9.9. Detect and protect against error, fraud and other criminal activity
        <br/><br/>
        9.10. Do as otherwise specifically described to you at the time of information collection
        `
      },
      {
        id: 10,
        title: "What, how and why information is shared by EasyBuilding.lk",
        description: `10.1. Help detect and prevent identity theft, fraud and other potentially illegal acts
        <br/><br/>
        10.2. Correlate related or multiple accounts to prevent abuse of EasyBuilding.lk services
        <br/><br/>
        10.3. Facilitate joint or co-branded services that you request, where such services are provided by more than one corporate entity and hence the need to share your account information
        <br/><br/>
        10.4. EasyBuilding.lk may share your account information if required to do so by law or in the good faith and belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process
        <br/><br/>
        10.5. EasyBuilding.lk may share your account information to law enforcement authorities, third party rights owners, or others in the good faith and belief that such disclosure is reasonably necessary to:
        <br/><br/>
        10.6. Enforce EasyBuilding.lk Terms of Use and/or Privacy Policy and/or other such similar
        <br/><br/>
        10.7. Respond to claims that any advertisement, posting or other content on EasyBuilding.lk or otherwise anywhere, violates the rights of a third party
        <br/><br/>
        10.8. Protect the rights, property or personal safety of the general public
        <br/><br/>
        10.9. EasyBuilding.lk, EasyBuilding.lk affiliates, and other such entities will share some or all of your account information with any other entity, should EasyBuilding.lk merge with, and/or plans to merge with, or be acquired by any other entity. Should such a transaction occur than the other entity (or the new combined entity) will be required to follow this Privacy Policy with respect to your account information`
      },
      {
        id: 11,
        title: "Use of ‘Cookies’",
        description: `11.1. A ‘cookie’ is a small piece of information stored by a web server on a web browser so it can be later read back from that browser
        <br/><br/>
        11.2. Cookies are useful for enabling the browser to remember information specific to any entity who is accessing EasyBuilding.lk through a system and/or a computer
        <br/><br/>
        11.3. EasyBuilding.lk places both permanent and temporary cookies in the accessing entity's system/computer hard drive
        <br/><br/>
        11.4. EasyBuilding.lk cookies do not contain any account information of any entity`
      },
      {
        id: 12,
        title: "Links to third party facilities",
        description: `12.1. EasyBuilding.lk 's website and/or facilities may connect to other third party websites and/or facilities at any and all times
        <br/><br/>
        12.2. EasyBuilding.lk shall not responsible and liable whatsoever for the privacy practices or the content of such third party websites and/or facilities which may collect your account information when you access such third parties via links or other means provided by EasyBuilding.lk.`
      },
      {
        id: 13,
        title: "Security precautions",
        description: `13.1. EasyBuilding.lk has stringent security measures in place to prevent the loss, misuse, and alteration of all of your account information under EasyBuilding.lk control
        <br/><br/>
        13.2. Whenever you change or access your account information, EasyBuilding.lk offers the use of a secure server
        <br/><br/>
        13.3. Once your information is in EasyBuilding.lk possession, EasyBuilding.lk adheres to strict security guidelines, protecting it against unauthorized access
        <br/><br/>
        13.4. To protect against the loss, misuse, and alteration of the information under EasyBuilding.lk control, EasyBuilding.lk has in place appropriate physical, electronic, and managerial procedures. For example, EasyBuilding.lk facilities are accessible only to authorized personnel and that your information is shared with respective personnel on need to know basis, to complete necessary transactions and to provide the services requested by you
        <br/><br/>
        13.5. Although EasyBuilding.lk will endeavor to safeguard the confidentiality of your account information, transmissions made by means of the Internet cannot be made absolutely secure. EasyBuilding.lk will not take responsibility for any loss of any entity's account information, including yours, despite EasyBuilding.lk 's best efforts to prevent loss of account information from EasyBuilding.lk facilities at any and all times
        <br/><br/>
        13.6. By using EasyBuilding.lk, you agree that EasyBuilding.lk will have no liability for disclosure of your information due to errors in transmission or unauthorized acts of third parties`
      },
      {
        id: 14,
        title: "Choice/opt-out",
        description: `14.1. EasyBuilding.lk provides you and all account holders with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from EasyBuilding.lk, while setting up an account
        <br/><br/>
        14.2. If you want to remove your contact information from all EasyBuilding.lk lists and newsletters, you could do so by contacting EasyBuilding.lk at support@easybuilding.lk
        `
      },
      {
        id: 15,
        title: "Advertisements on EasyBuilding.lk",
        description: `15.1. Third party entities place advertisements on the EasyBuilding.lk website. These entities may use information (not including your name, address, email address, or telephone number) about your visits to EasyBuilding.lk facilities and other websites in order to provide information about products and/or services of interest to you
        <br/><br/>
        15.2. EasyBuilding.lk does not sell or rent your account information to third parties for any purpose without your explicit consent`
      },
      {
        id: 16,
        title: "How can you correct inaccuracies in the information?",
        description: `To correct or update any information that you have provided, you can reach EasyBuilding.lk on e-mail at support@easybuilding.lk`
      },
      {
        id: 17,
        title: "Terms and Conditions document updates",
        description: `EasyBuilding.lk reserve the right to change and/or update this Terms and Conditions document at any time. Such changes shall be effective immediately upon posting on this (EasyBuilding.lk portal's Terms and Conditions) webpage.`
    },
    ]

  }


}
