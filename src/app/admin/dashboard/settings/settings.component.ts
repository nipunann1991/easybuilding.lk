import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  links: any = [
    { id: 0, title: "General Infomation", url: "/admin/settings/general" },
    { id: 1, title: "Admin Users", url: "/admin/settings/users" },
    { id: 2, title: "Page Settings", url: "/admin/settings/page-settings" },
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute, 
  ) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         if(event.url === '/admin/settings'){ 
		      this.router.navigate(['admin/settings/general']); 
          
         }
      }
    });

  }

  ngOnInit(): void {
   
  }

}
