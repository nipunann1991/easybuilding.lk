(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"4XlA":function(t,e,i){"use strict";i.r(e),i.d(e,"ClientProfilesModule",function(){return p});var n=i("ofXK"),c=i("tyNb"),r=i("njyG"),a=i("XNiG"),o=i("TmPa"),d=i("fXoL"),s=i("bTqV"),l=[{path:"",component:function(){function t(t,e){this.clients=t,this.router=e,this.dtOptions={},this.dtTrigger=new a.a}return t.prototype.ngOnInit=function(){this.dtOptions={pagingType:"full_numbers",pageLength:10,serverSide:!0,processing:!0,autoWidth:!1,ajax:this.clients.getClientProfileDetailsDT(),columns:[{data:"company_id"},{data:"display_name"},{data:"client_id"},{data:"email"},{data:"tel1"},{data:"br_no"},{data:"city"}],columnDefs:[{targets:7,data:function(t){return'<a class="view-client-data" data-id="'+t.client_id+'" data-provider-id="'+t.provider_id+'/about" title="View">View</i></a> '}}],dom:"lfrtip",buttons:[{extend:"copyHtml5",text:'<i class="fa fa-files-o"></i> Copy',titleAttr:"Copy"},{extend:"excelHtml5",text:'<i class="fa fa-file-excel-o"></i> Excel',titleAttr:"Export to Excel"},{extend:"csvHtml5",text:'<i class="fa fa-file-text-o"></i> CSV',titleAttr:"Export to CSV"},{extend:"pdfHtml5",text:'<i class="fa fa-file-pdf-o"></i> PDF',titleAttr:"Export to PDF"}]};var t=this;$("html").on("click","a.view-client-data",function(e){e.preventDefault(),t.viewClent($(this).attr("data-id"),$(this).attr("data-provider-id"))})},t.prototype.viewClent=function(t,e){this.router.navigate(["admin/users/user/"+t+"/"+e])},t.prototype.ngAfterViewInit=function(){this.dtTrigger.next()},t.prototype.ngOnDestroy=function(){this.dtTrigger.unsubscribe()},t.prototype.rerender=function(){var t=this;this.dtElement.dtInstance.then(function(e){e.destroy(),t.dtTrigger.next()})},t.\u0275fac=function(e){return new(e||t)(d.yc(o.a),d.yc(c.c))},t.\u0275cmp=d.sc({type:t,selectors:[["app-client-profiles"]],viewQuery:function(t,e){var i;1&t&&d.Ad(r.a,!0),2&t&&d.ed(i=d.Mc())&&(e.dtElement=i.first)},decls:28,vars:2,consts:[[1,"right-container","animated","fadeIn"],[1,"title"],["mat-button","",1,"transparent-btn","back-btn"],[1,"icon-left-arrow"],[1,"clearfix"],[1,"white-box-panel"],["id","refresh-btn","type","button",1,"btn","waves-effect","waves-light","blue","d-none",3,"click"],["datatable","",1,"row-border","hover",3,"dtOptions","dtTrigger"]],template:function(t,e){1&t&&(d.Ec(0,"div",0),d.Ec(1,"div",1),d.Ec(2,"h2"),d.Ec(3,"button",2),d.zc(4,"i",3),d.Dc(),d.ud(5,"Profiles"),d.Dc(),d.zc(6,"div",4),d.Dc(),d.Ec(7,"div",5),d.Ec(8,"button",6),d.Lc("click",function(){return e.rerender()}),d.ud(9," Rerender "),d.Dc(),d.Ec(10,"table",7),d.Ec(11,"thead"),d.Ec(12,"tr"),d.Ec(13,"th"),d.ud(14,"Company Id"),d.Dc(),d.Ec(15,"th"),d.ud(16,"Display Name"),d.Dc(),d.Ec(17,"th"),d.ud(18,"Client Id"),d.Dc(),d.Ec(19,"th"),d.ud(20,"Email"),d.Dc(),d.Ec(21,"th"),d.ud(22,"Tel"),d.Dc(),d.Ec(23,"th"),d.ud(24,"BR No"),d.Dc(),d.Ec(25,"th"),d.ud(26,"City"),d.Dc(),d.zc(27,"th"),d.Dc(),d.Dc(),d.Dc(),d.Dc(),d.Dc()),2&t&&(d.mc(10),d.Vc("dtOptions",e.dtOptions)("dtTrigger",e.dtTrigger))},directives:[s.b,r.a],styles:[""]}),t}()}],u=function(){function t(){}return t.\u0275mod=d.wc({type:t}),t.\u0275inj=d.vc({factory:function(e){return new(e||t)},imports:[[c.g.forChild(l)],c.g]}),t}(),f=i("Awto"),p=function(){function t(){}return t.\u0275mod=d.wc({type:t}),t.\u0275inj=d.vc({factory:function(e){return new(e||t)},imports:[[n.c,f.a,u]]}),t}()}}]);