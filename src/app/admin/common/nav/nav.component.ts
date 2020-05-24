import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Globals } from '../../../app.global'; 
import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	menu: any = []; 
	tokenAdmin:any = JSON.parse(localStorage.getItem('tokenAdmin'));
	accessAll: any = 2;

  	constructor(private globals: Globals, private router: Router) { 
  		  router.events.subscribe( (event) => {

  		  	if (event instanceof NavigationEnd) { 
                if($('html .left-nav').hasClass('open-nav')){
                	$("html .right-container").addClass('open-nav'); 
                }
 
            }
  		  	
				});
				
				if (this.globals.isAdminToken == this.tokenAdmin.provider_id	){
					this.accessAll = 0;
				}
  	} 

  	ngOnInit() {

  		this.menu = [ 
			{
				title: 'Home',
				icon: 'icon-dashboard',
				link: '/admin/dashboard',
				permission: 0,
			},
			{
				title: 'Clients',
				icon: 'icon-users',
				link: '/admin/clients',
				permission: 0,

			}, 
			{
				title: 'Cities',
				icon: 'icon-location',
				link: '/admin/cities',
				permission: 0,

			},
			{
				title: 'Categories',
				icon: 'icon-tools',
				link: '/admin/categories',
				permission: 0,

			},  
			{
				title: 'Products',
				icon: 'icon-upload',
				link: '/admin/products',
				permission: 0,

			},
			
			{
				title: 'Certification',
				icon: 'icon-certificate',
				link: '/admin/certification',
				permission: 0,

			}, 
			// {
			// 	title: 'Reports',
			// 	icon: 'icon-growth',
			// 	link: '/admin/orders'
			// },
			{
				title: 'Settings',
				icon: 'icon-settings',
				link: '/admin/settings',
				permission: this.accessAll,
			},
		]

  }

  	openNav(){
    	$("html .left-nav, html .right-container").addClass('open-nav');
  	}

  	hideNav(){
    	$("html .left-nav, html .right-container").removeClass('open-nav'); 
  	}

}
