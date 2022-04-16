import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SecurityService } from 'app/security.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit {

  name: any;
  authToken: any;
  orgProfileData: any;
  orgLogin: any;
  repoNameList: any;
  item:any;
  filters: string[] = ['Issue Analysis', 'PR Analysis'];

  constructor(private http: HttpClient, private securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo().subscribe(data => this.name = data.name);
    // this.authToken = localStorage.getItem('token');
    // this.orgLogin = localStorage.getItem('orgLogin');
    // this.http
    //   .getOrgProfile(this.authToken, this.orgLogin)
    //   .subscribe((orgProfile: any) => {
    //     this.orgProfileData = orgProfile;
    //   });

  }
  getUserInfo(): Observable<any> {
    return this.http.get(environment.baseUrl + '/v1/home');
  }

  logout()
  {
    this.securityService.logout() .subscribe(() => {
      this.securityService.removeToken();
      this.router.navigate(['/login']);
    });
  }
}
