import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'app/security.service';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {

  filterOrganization!: Observable<string[]>;
  organizationsData: any;

  constructor(private http: HttpService, public router: Router,private toastr: ToastrService,private securityService: SecurityService) {}

  ngOnInit() {
    localStorage.removeItem('orgLogin');
    localStorage.removeItem('orgName');
  }

  login(){
    this.securityService.login();
    
  }

}
