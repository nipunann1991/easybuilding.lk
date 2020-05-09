import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit {

  constructor() { 
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('admin-layout');
    console.log('ds')
  }

  ngOnInit(): void {  
  }

}
