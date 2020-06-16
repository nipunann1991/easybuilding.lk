import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  encapsulation: ViewEncapsulation.None
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
