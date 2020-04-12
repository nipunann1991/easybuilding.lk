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


  	constructor(private globals: Globals, private router: Router) { 
  		  router.events.subscribe( (event) => {

  		  	if (event instanceof NavigationEnd) { 
                if($('html .left-nav').hasClass('open-nav')){
                	$("html .right-container").addClass('open-nav'); 
                }
 
            }
  		  	
  		  });
  	} 

  	ngOnInit() {
  		this.menu = [ 
			{
				title: 'Home',
				icon: 'icon-home',
				link: '/admin/dashboard'
			},
			{
				title: 'Products',
				icon: 'icon-box',
				link: '/admin/products'
			},
			{
				title: 'Clients',
				icon: 'icon-group',
				link: '/admin/clients'
			},   
			{
				title: 'Certification',
				icon: 'icon-shopping-cart',
				link: '/admin/certification'
			}, 
			{
				title: 'Reports',
				icon: 'icon-growth',
				link: '/admin/orders'
			},
			{
				title: 'Settings',
				icon: 'icon-settings',
				link: '/admin/settings'
			}
		]

  	}

  	openNav(){
    	$("html .left-nav, html .right-container").addClass('open-nav');
  	}

  	hideNav(){
    	$("html .left-nav, html .right-container").removeClass('open-nav'); 
  	}

}
