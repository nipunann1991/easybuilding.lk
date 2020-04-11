import { Component, OnInit } from '@angular/core';  
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	editableMode: boolean = false; 

  constructor() { }

  ngOnInit() {


  }

  

  openNav(){
    $("html .left-nav, html .right-container").addClass('open-nav');
  }

  hideNav(){
    $("html .left-nav, html .right-container").removeClass('open-nav'); 
  }

}
