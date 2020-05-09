import { Component, OnInit } from '@angular/core'; 
import { Globals } from "../../../app.global" 
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	editableMode: boolean = false; 
  user: any = {
    first_name: '',
    profie_image: ''
  }
  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {
    this.user = this.globals.userAdmin;
  }

  

  openNav(){
    $("html .left-nav, html .right-container").addClass('open-nav');
  }

  hideNav(){
    $("html .left-nav, html .right-container").removeClass('open-nav'); 
  }

}
