import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'app/security.service';
import { HttpService } from 'app/shared/http.service';
import { data } from 'jquery';
import { delay } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recentHistory:any;

  constructor( private securityService: SecurityService,
  private router: Router, private http: HttpService) { }

  ngOnInit(): void {
  
    
    
  }

  

}
