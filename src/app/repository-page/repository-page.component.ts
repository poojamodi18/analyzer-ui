import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SecurityService } from 'app/security.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/http.service';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit {

  name: any;
  avatarUrl: any;
  url: any;
  orgName: any;
  authToken: any;
  organizationsData: any;
  isdisable: boolean = true;
  orgProfileData: any;
  orgLogin: any;
  repoNameList: any;
  item: any;
  // filters: string[] = ['Issue Analysis', 'PR Analysis', 'Branch Analysis'];
  filters: {
    name: string;
    selected: boolean;
}[] = [
    {
        name: 'Issue Analysis',
        selected: false
    },
    {
        name: 'PR Analysis',
        selected: true
    },
    {
        name: 'Branch Analysis',
        selected: false
    },
];
  loginForm = new FormGroup({
    organizationName: new FormControl({ value: ' ' }),
  });

  constructor(private http: HttpClient, private securityService: SecurityService,
    private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.getUserInfo().subscribe(data => {
      if(data.name.length == 0){
        this.name = data.login;
      }else{
        this.name = data.name;
      }
      this.avatarUrl = data.avatarUrl;
      this.url = data.url;
    });
    this.loginForm.controls['organizationName'].reset();
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

  logout() {
    this.securityService.logout().subscribe(() => {
      this.securityService.removeToken();
      this.router.navigate(['/login']);
    });
  }

  OrgSearch() {

  }

  searchvisibility() {
    if (this.orgName == '') {
      this.isdisable = true;
    }
    else {
      this.isdisable = false;
    }
  }

  public getOrganization() {
    this.orgName = this.loginForm.value.organizationName;
    if (this.orgName != '') {
      this.httpService.getData(this.orgName)
        .subscribe((orgNameData: any) => {
          this.organizationsData = _.merge([], orgNameData.edges);
        });
    }
  }
  changeName(event: any) {

    this.orgLogin = this.organizationsData[event].node.login;
    localStorage.setItem('orgLogin', this.orgLogin);
  }
}
