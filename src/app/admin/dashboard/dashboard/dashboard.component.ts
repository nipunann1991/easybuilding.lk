import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts'
import { DashboardService } from "../../api/dashboard.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 

  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true; 
  public barChartData: ChartDataSets[];
  public barChartColors: Color[];
  public barChartOptions: ChartOptions;

   // Pie
  public pieChartOptions: ChartOptions;
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array <any>;
  
  summeryData:any
  dashboardData:any

  constructor(
    private dashboard: DashboardService,
    private router: Router
  ) {  
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getSummery(); 
    
    this.newProfilesBarChart()
    this.profileDataPieChart();
  }
 
  
  newProfilesBarChart(){
 
    this.barChartColors = [
      { backgroundColor: 'rgba(60, 142, 249, 0.8)' },
      { backgroundColor: 'rgba(255, 193, 7, 0.8)' },
    ]; 

    this.barChartOptions = {
      responsive: true,
      legend: { position: 'bottom' }, 
    };
  
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartData = [
      { data: [], label: 'A' },
      { data: [], label: 'B' }
    ]; 


    this.dashboard.getTotalSignUps()
      .subscribe((response: any) => {

        if (response.status == 200) {  
          
          this.barChartLabels = response.data.months;

          this.barChartData = [
            { data: response.data.company_profiles , label: 'Company' },
            { data: response.data.personal_profiles, label: 'User' }
          ]; 
          
          
        }else{
            
        }
          
      });
    

  }

  profileDataPieChart(){

    this.pieChartLabels = [['Company'], ['User']]; 
    this.pieChartData = [0,0]; 

    this.pieChartOptions = {
      responsive: true,
      legend: { position: 'bottom' }
    };  
    
    this.pieChartColors  = [
      { backgroundColor: ['rgba(88, 66, 178, 1)', 'rgba(46, 179, 87, 1)'] }
    ];  

    this.dashboard.getCompanyVsProfile()
      .subscribe((response: any) => {

        if (response.status == 200) {  
          this.pieChartData = response.data;
          console.log( response.data )
          
        }else{
            
        }
          
      });  
  }

  getSummery(){

    this.dashboard.getSummery()
      .subscribe((response: any) => {

        if (response.status == 200) { 
          this.summeryData = response.data; 

          this.setDashboardData();
          
        }else{
            
        }
          
      }); 
  }

  setDashboardData(){
    
    this.dashboardData = [
      { icon: "icon-users", title: "Total Profiles", total: this.summeryData.total_profiles },
      { icon: "icon-tools", title: "Total Categories", total: this.summeryData.total_categories },
      { icon: "icon-photo", title: "New Images", total: this.summeryData.total_project_images },
      { icon: "icon-users", title: "New Profiles", total: this.summeryData.total_profiles },
    ]
     
  }

  
  
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

 

}
