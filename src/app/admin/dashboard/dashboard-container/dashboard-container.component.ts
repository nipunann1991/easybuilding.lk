import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  constructor() { 
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('admin-layout');

  }

  ngOnInit(): void {

    
  }

}
