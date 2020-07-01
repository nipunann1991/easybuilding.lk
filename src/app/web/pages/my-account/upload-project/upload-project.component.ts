import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0); 
    
  }

}
