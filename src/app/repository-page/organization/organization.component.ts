import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/http.service';
import { UtilService } from 'app/shared/util.service';
import { data } from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizationsData: any;
  isdisable: boolean = true;
  orgProfileData: any;
  orgLogin: any;
  orgName: any;
  orgLoginPlaceHolder:any;
  orgNamePlaceHolder:any;
  isPresent = false;
  isRepoDiv = true;
  loginForm = new FormGroup({
    organizationName: new FormControl({ value: ' ' }),
  });

  constructor(private http:HttpService, private util: UtilService) { }

  ngOnInit(): void {
    this.loginForm.controls['organizationName'].reset();
    this.orgLoginPlaceHolder = localStorage.getItem('orgName');
    if (!(this.orgLoginPlaceHolder == null)) {
      let log = localStorage.getItem('orgLogin');
      this.http.getOrgProfile(log).subscribe((profileData:any)=>{
        this.orgProfileData = profileData;
        this.isPresent=true;
      });
      this.loginForm.patchValue({
        organizationName:this.orgLoginPlaceHolder,
      })
    }
   
  }
  public getOrganization() {
    this.orgName = this.loginForm.value.organizationName;
    if (this.orgName != '') {
      this.http.getData(this.orgName)
        .subscribe((orgNameData: any) => {
          this.organizationsData = _.merge([], orgNameData.edges);
        });
    }
  }
  getOrgProfile(){
    this.isRepoDiv = false;
    let login = localStorage.getItem('orgLogin');
    this.http.getOrgProfile(login).subscribe((profileData:any)=>{
      this.orgProfileData = profileData;
      this.isPresent=true;
      this.util.setCollectiveRepoData([]);
      this.isRepoDiv = true;
    });

  }
  changeName(event: any) {

    this.orgLogin = this.organizationsData[event].node.login;
    this.orgNamePlaceHolder = this.organizationsData[event].node.name;
    localStorage.setItem('orgLogin', this.orgLogin);
    localStorage.setItem('orgName',this.orgNamePlaceHolder);
  }

}
