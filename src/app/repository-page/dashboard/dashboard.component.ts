import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'app/security.service';
import { HttpService } from 'app/shared/http.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recentHistory:any;
  public barChartOptions ={
    scaleShowVerticalLines : false,
    responsive : true
  }

  public barChartLabels = ['2006','2007','2008','2009','2010','2011','2012'];
  public barChartType : ChartType ='bar';
  public barChartLegend = true;
  public barChartData = [
    {data:[65,34,67,89,56,45,37],label:'Series A'},
    {data:[54,44,34,91,25,56,71],label:'Series B'}
  ];

  constructor( private securityService: SecurityService,
  private router: Router, private http: HttpService) { }

  ngOnInit(): void {
  
    this.http.getCommonTrend().subscribe((data:any)=>{
      console.log(JSON.stringify(data));
      
    });
    
  }

  

}
