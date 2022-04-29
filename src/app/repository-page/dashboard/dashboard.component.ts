import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'app/security.service';
import { HttpService } from 'app/shared/http.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as _ from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recentHistory: any;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    showToolTips: true
  };
  isLoading = false;
  isShow = false;
  public label = [];
  public dataSource: any;
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Today'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData : ChartDataSets[] = [];

  constructor(private securityService: SecurityService,
    private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.reload();

  }

  reload(){
    this.isLoading = true;
    this.isShow = false;
    this.http.getCommonTrend().subscribe((data: any) => {

      console.log(data.org_Today.userCount);
      this.barChartData = [
        { data: [data.org_Jan.userCount, data.org_Feb.userCount, data.org_Mar.userCount, data.org_Apr.userCount, data.org_Today.userCount], label: 'Organization' },
        { data: [data.user_Jan.userCount, data.user_Feb.userCount, data.user_Mar.userCount, data.user_Apr.userCount, data.user_Today.userCount], label: 'User' },
        { data: [data.repo_Jan.repositoryCount, data.repo_Feb.repositoryCount, data.repo_Mar.repositoryCount, data.repo_Apr.repositoryCount, data.repo_Today.repositoryCount], label: 'Repository' },
        { data: [data.issue_Jan.issueCount, data.issue_Feb.issueCount, data.issue_Mar.issueCount, data.issue_Apr.issueCount, data.issue_Today.issueCount], label: 'Issue' },
        { data: [data.dis_Jan.discussionCount, data.dis_Feb.discussionCount, data.dis_Mar.discussionCount, data.dis_Apr.discussionCount, data.dis_Today.discussionCount], label: 'Discussion' }
      ];
      this.isLoading = false;
      this.isShow = true;

    });

  }

  public openPDF(): void {
    let DATA: any = document.getElementById('chartData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

}
