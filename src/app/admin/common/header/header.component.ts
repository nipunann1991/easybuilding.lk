import { Component, OnInit } from '@angular/core'; 
import { Globals } from "../../../app.global" ;
import { Router } from '@angular/router';
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
    private globals: Globals,
    private router: Router
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


  signOut(){
    localStorage.clear();
    this.router.navigate(['admin/login']);
  } 

}
