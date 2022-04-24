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
  authToken: any;
  repoNameList: any;
  item: any;
  opened = true;
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
        name: 'Recent Analysis',
        selected: false
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
        name: 'Pull-Request Analysis',
        selected: false
      },
      {
        name: 'Branch Analysis',
        selected: false
      },
      {
        name: 'Logout',
        selected: false
      }

    ];


  constructor(private http: HttpClient, private securityService: SecurityService,
    private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.userProfile()
  }

  userProfile() {
    this.getUserInfo().subscribe(data => {
      if (data.name.length == 0) {
        this.name = data.login;
      } else {
        this.name = data.name;
      }
      this.avatarUrl = data.avatarUrl;
      this.url = data.url;
      this.userId = data.id;
      localStorage.setItem('id', this.userId);
      
    });
  }

  getUserInfo(): Observable<any> {
    return this.http.get(environment.baseUrl + '/v1/home');
  }

  logout() {
    this.securityService.logout().subscribe(() => {
      this.securityService.removeToken();
      localStorage.removeItem('id');
      localStorage.removeItem('orgLogin');
      localStorage.removeItem('orgName');
      this.router.navigate(['/']);
    });
  }

  onChangeSideNav(value) {
    let sel = value.option.selectionList._value[0];
    if (sel == 'Logout') {
      this.logout()
    }
  }

}
