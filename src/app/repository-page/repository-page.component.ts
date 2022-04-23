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
  userId: any;
  orgName: any;
  authToken: any;
  organizationsData: any;
  isdisable: boolean = true;
  orgProfileData: any;
  orgLogin: any;
  repoNameList: any;
  item: any;
  orgLoginPlaceHolder:any;
  orgNamePlaceHolder:any;
  recentHistory:any;
  opened=true;
  // filters: string[] = ['Issue Analysis', 'PR Analysis', 'Branch Analysis'];
  filters: {
    name: string;
    selected: boolean;
}[] = [
    {
        name: 'Dashboard',
        selected: true
    },
    {
      name: 'Organization',
      selected: false
    },
    {
        name: 'Issue Analysis',
        selected: false
    },
    {
        name: 'PR Analysis',
        selected: false
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
    this.userProfile()
    this.loginForm.controls['organizationName'].reset();
    this.orgLoginPlaceHolder = localStorage.getItem('orgName');
    if (!(this.orgLoginPlaceHolder == null)) {
      this.loginForm.patchValue({
        organizationName:this.orgLoginPlaceHolder,
      })
    }

  }

  userProfile(){
    this.getUserInfo().subscribe(data => {
      if(data.name.length == 0){
        this.name = data.login;
      }else{
        this.name = data.name;
      }
      this.avatarUrl = data.avatarUrl;
      this.url = data.url;
      this.userId = data.id;
      localStorage.setItem('id',this.userId);
      this.httpService.getRecentHistory().pipe().subscribe(((Data:any)=>{
        this.recentHistory = _.merge([], Data.data);
        console.log(Data.message);
        console.log(JSON.stringify(Data.data));
      }));
    });
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
    this.orgNamePlaceHolder = this.organizationsData[event].node.name;
    localStorage.setItem('orgLogin', this.orgLogin);
    localStorage.setItem('orgName',this.orgNamePlaceHolder);
  }
}
