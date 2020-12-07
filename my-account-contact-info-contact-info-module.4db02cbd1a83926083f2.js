(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"/881":function(t,e,o){"use strict";o.r(e);var n=o("ofXK"),i=o("tyNb"),r=o("3Pt+"),s=o("wA0R"),a=o("fXoL"),l=o("qT8p"),c=o("CYa2"),u=o("bTqV");function p(t,e){1&t&&(a.Ec(0,"p"),a.ud(1,"How can clients contact you via Easybuilding platform."),a.Dc())}function d(t,e){1&t&&(a.Ec(0,"p"),a.ud(1,"Add your contact details (This will be not shared with any users)."),a.Dc())}function f(t,e){1&t&&(a.Cc(0),a.Ec(1,"button",22),a.ud(2,"Save"),a.Dc(),a.Ec(3,"button",23),a.ud(4,"Close"),a.Dc(),a.Bc())}function h(t,e){if(1&t){var o=a.Fc();a.Cc(0),a.Ec(1,"button",24),a.Lc("click",(function(){return a.id(o),a.Pc().previousLink()})),a.ud(2,"Previous"),a.Dc(),a.Ec(3,"button",25),a.ud(4,"Next"),a.Dc(),a.Bc()}}var m=function(t){return{"title-only":t}},g=[{path:"",component:function(){function t(t,e,o,n){this.myaccount=t,this.toastr=e,this.router=o,this.route=n,this.profile={},this.isStepsForm=!1,this.profileType=""}return t.prototype.ngOnInit=function(){this.getAccountDetails(),this.formGroup=new r.h({address_line1:new r.f("",[r.s.required,r.s.minLength(2),r.s.maxLength(100)]),address_line2:new r.f(""),city:new r.f("",[r.s.required,r.s.minLength(2),r.s.maxLength(100)]),tel1:new r.f("",[r.s.required,r.s.minLength(10),r.s.maxLength(100)]),tel2:new r.f("",[r.s.minLength(10),r.s.maxLength(100)]),email:new r.f({value:"",disabled:!1},[r.s.required])}),this.router.url.includes("steps")&&(this.isStepsForm=!0)},t.prototype.getAccountDetails=function(){var t=this;this.myaccount.getContactDetails().subscribe((function(e){if(200==e.status){var o="";t.profile=e.data[0],1==t.profile.company_profile?(t.profileType="Company",o=t.profile.email):(t.profileType="",t.formGroup.get("email").disable(),o=t.profile.signup_email),t.formGroup.setValue({address_line1:t.profile.address_line1,address_line2:t.profile.address_line2,city:t.profile.city,tel1:t.profile.tel1,tel2:t.profile.tel2,email:o}),t.clientId=t.profile.client_id,t.companyId=t.profile.company_id}}))},t.prototype.onSave=function(){var t=this;if(!this.formGroup.invalid){var e=this.formGroup.getRawValue();e.client_id=this.clientId,e.company_id=this.companyId,0==this.profile.company_profile&&(e.steps=2),this.myaccount.updateProfileDetails(e).subscribe((function(e){200==e.status?t.isStepsForm&&0!=t.profile.company_profile?t.router.navigate(["../service-areas"],{relativeTo:t.route.parent}):(t.toastr.success("Information saved successfully","Success !"),t.router.navigate(["/my-account/user/me/about"])):t.toastr.error(401==e.status?"Invalid user token or session has been expired. Please re-loging and try again.":"Information saving failed. Please try again","Error !")}))}},t.prototype.previousLink=function(){this.router.navigate(["../account-info"],{relativeTo:this.route.parent})},t.\u0275fac=function(e){return new(e||t)(a.yc(s.a),a.yc(l.b),a.yc(i.c),a.yc(i.a))},t.\u0275cmp=a.sc({type:t,selectors:[["app-contact-info"]],decls:50,vars:10,consts:[["id","myform","novalidate","novalidate",1,"wrapped-block","animated","fadeIn",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-md-12","block-title",3,"ngClass"],[4,"ngIf"],[1,"col-md-6"],[1,"form-group"],["for","address_line1"],[1,"required-star"],["id","address_line1","name","address_line1","formControlName","address_line1","type","text",1,"form-control"],["for","address_line2"],["id","address_line2","name","address_line2","formControlName","address_line2","type","text",1,"form-control"],["for","city"],["id","city","name","city","formControlName","city","type","text",1,"form-control"],[1,"contact_no","col-md-12"],["for","tel1"],["id","tel1","name","tel1","formControlName","tel1","type","text",1,"form-control"],["for","tel2"],["id","tel2","name","tel2","formControlName","tel2","type","text",1,"form-control"],[1,"col-md-12"],["for","email"],["id","email","name","email","formControlName","email","type","text",1,"form-control"],[1,"col-md-12","btn-wrapper"],["mat-button","","name","submit","type","submit",1,"btn","btn-primary"],["mat-button","","type","button",1,"btn","btn-default","close-btn"],["mat-button","","type","button",1,"btn","btn-prev",3,"click"],["mat-button","","name","submit","type","submit",1,"btn","btn-next"]],template:function(t,e){1&t&&(a.Ec(0,"form",0),a.Lc("ngSubmit",(function(){return e.onSave()})),a.Ec(1,"div",1),a.Ec(2,"div",2),a.Ec(3,"h2"),a.ud(4),a.Dc(),a.sd(5,p,2,0,"p",3),a.sd(6,d,2,0,"p",3),a.Dc(),a.Ec(7,"div",4),a.Ec(8,"div",5),a.Ec(9,"label",6),a.ud(10,"Address Line 1 "),a.Ec(11,"span",7),a.ud(12,"*"),a.Dc(),a.Dc(),a.zc(13,"input",8),a.Dc(),a.Dc(),a.Ec(14,"div",4),a.Ec(15,"div",5),a.Ec(16,"label",9),a.ud(17,"Address Line 2"),a.Dc(),a.zc(18,"input",10),a.Dc(),a.Dc(),a.Ec(19,"div",4),a.Ec(20,"div",5),a.Ec(21,"label",11),a.ud(22,"City "),a.Ec(23,"span",7),a.ud(24,"*"),a.Dc(),a.Dc(),a.zc(25,"input",12),a.Dc(),a.Dc(),a.Ec(26,"div",13),a.Ec(27,"div",1),a.Ec(28,"div",4),a.Ec(29,"div",5),a.Ec(30,"label",14),a.ud(31,"Phone Number "),a.Ec(32,"span",7),a.ud(33,"*"),a.Dc(),a.Dc(),a.zc(34,"input",15),a.Dc(),a.Dc(),a.Ec(35,"div",4),a.Ec(36,"div",5),a.Ec(37,"label",16),a.ud(38,"Other Contact Number"),a.Dc(),a.zc(39,"input",17),a.Dc(),a.Dc(),a.Dc(),a.Dc(),a.Ec(40,"div",18),a.Ec(41,"div",5),a.Ec(42,"label",19),a.ud(43),a.Ec(44,"span",7),a.ud(45,"*"),a.Dc(),a.Dc(),a.zc(46,"input",20),a.Dc(),a.Dc(),a.Ec(47,"div",21),a.sd(48,f,5,0,"ng-container",3),a.sd(49,h,5,0,"ng-container",3),a.Dc(),a.Dc(),a.Dc()),2&t&&(a.Vc("formGroup",e.formGroup),a.mc(2),a.Vc("ngClass",a.ad(8,m,!e.isStepsForm)),a.mc(2),a.wd("",e.profileType," Contact Details"),a.mc(1),a.Vc("ngIf",""!=e.profileType),a.mc(1),a.Vc("ngIf",""==e.profileType),a.mc(37),a.wd("",e.profileType," Email Address "),a.mc(5),a.Vc("ngIf",!e.isStepsForm),a.mc(1),a.Vc("ngIf",e.isStepsForm))},directives:[r.t,r.o,r.i,c.b,n.i,n.k,c.a,r.c,c.d,r.n,r.g,u.b],styles:[""]}),t}()}],_=function(){function t(){}return t.\u0275mod=a.wc({type:t}),t.\u0275inj=a.vc({factory:function(e){return new(e||t)},imports:[[i.g.forChild(g)],i.g]}),t}(),k=o("Awto");o.d(e,"ContactInfoModule",(function(){return y}));var y=function(){function t(){}return t.\u0275mod=a.wc({type:t}),t.\u0275inj=a.vc({factory:function(e){return new(e||t)},imports:[[n.c,_,k.a]]}),t}()},wA0R:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));var n=o("AytR"),i=o("tk/3"),r=o("fXoL"),s=function(){function t(t){this.http=t,this.token=JSON.parse(localStorage.getItem("token"))}return t.prototype.getProfileDetails=function(){return this.http.get(n.a.baseUrl+"ProfileController/getProfileDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getCustomProfileDetails=function(t){return null==this.token&&(this.token=JSON.parse(localStorage.getItem("tokenAdmin"))),this.http.get(n.a.baseUrl+"ProfileController/getCustomProfileDetails?client_id="+t.client_id+"&provider_id="+t.provider_id)},t.prototype.getAccountDetails=function(){return this.http.get(n.a.baseUrl+"ProfileController/getAccountDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getServiceDetails=function(){return this.http.get(n.a.baseUrl+"ProfileController/getServiceDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getCities=function(){return this.http.get(n.a.baseUrl+"ProfileController/getCities?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getDistricts=function(){return this.http.get(n.a.baseUrl+"ProfileController/getDistricts?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getAllCategoriesData=function(){return this.http.get(n.a.baseUrl+"ProfileController/getAllCategoriesData?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getServiceCategories=function(){return this.http.get(n.a.baseUrl+"ProfileController/getServiceCategories?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getProductCategories=function(){return this.http.get(n.a.baseUrl+"ProfileController/getProductCategories?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.getServiceCitiesByCompany=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getServiceCitiesByCompany",e)},t.prototype.getServiceDistrictsByCompany=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getServiceDistrictsByCompany",e)},t.prototype.getServics=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getServics",e)},t.prototype.getServicsWithID=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getServicsWithID",e)},t.prototype.getProductsWithID=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getProductsWithID",e)},t.prototype.getProjectDetails=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getProjectDetails",e)},t.prototype.getMinimalProjectDetails=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getMinimalProjectDetails",e)},t.prototype.getMinimalProductDetails=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getMinimalProductDetails",e)},t.prototype.getContactDetails=function(){return this.http.get(n.a.baseUrl+"ProfileController/getContactDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id)},t.prototype.updateProfileDetails=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/updateProfileDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.updateProfileWithServiceArea=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/updateProfileWithServiceArea?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.uploadCoverImage=function(t){var e=new i.f;return e.append("Content-Type","undefined"),this.http.post(n.a.baseUrl+"ProfileController/fileUpload?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,t,{headers:e})},t.prototype.uploadProjectImages=function(t){var e=new i.f;return e.append("Content-Type","undefined"),this.http.post(n.a.baseUrl+"ProfileController/uploadProjectImages?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,t,{headers:e})},t.prototype.uploadProjectImagesOnEdit=function(t){var e=new i.f;return e.append("Content-Type","undefined"),this.http.post(n.a.baseUrl+"ProfileController/uploadProjectImagesOnEdit?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,t,{headers:e})},t.prototype.addNewProjectDetails=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/addNewProjectDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.addNewProductDetails=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/addNewProductDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.editProjectDetails=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/editProjectDetails?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.deleteProject=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/deleteProject?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.deleteProduct=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/deleteProductDB?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.uploadProfileImage=function(t){var e=new i.f;return e.append("Content-Type","undefined"),this.http.post(n.a.baseUrl+"ProfileController/fileUpload?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,t,{headers:e})},t.prototype.removeCoverImage=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/removeCoverImage?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.removeProjectImages=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/removeProjectImages?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.addNewReview=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/addNewReview?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,e)},t.prototype.getReviews=function(t){var e=new i.g({fromObject:t});return this.http.post(n.a.baseUrl+"ProfileController/getReviews",e)},t.prototype.uploadProductImages=function(t){var e=new i.f;return e.append("Content-Type","undefined"),this.http.post(n.a.baseUrl+"ProfileController/uploadProductImages?auth_token="+this.token.auth_token+"&session_id="+this.token.session_id,t,{headers:e})},t.\u0275fac=function(e){return new(e||t)(r.Ic(i.c))},t.\u0275prov=r.uc({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);