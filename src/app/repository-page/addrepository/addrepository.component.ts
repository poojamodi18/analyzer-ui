import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'angular2-multiselect-dropdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addrepository',
  templateUrl: './addrepository.component.html',
  styleUrls: ['./addrepository.component.scss'],
})
export class AddrepositoryComponent implements OnInit {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  tokenValue: any;
  products: any;
  repoNameList: any;
  orgLogin: any;
  authToken: any;
  selectedI: any = [];
  TemprepoNameList: any;
  //loading = false;
  isNextPage: boolean = false;
  nextPageHash!: string;
  loading: boolean = false;
  dialogRef: any;
  test: any;
  jsonArr: any = [];
  repoListObject: any;
  repoName: any;
  repositoryListByName: any;
  isdisable: boolean = true;
  searchForm = new FormGroup({
    repositoryName: new FormControl(''),
  });
  constructor(private http: HttpService, public matDialog: MatDialogRef<AddrepositoryComponent>) { }

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token');
    this.orgLogin = localStorage.getItem('orgLogin');
    this.dropdownSettings = {
      singleSelection: false,
      primaryKey: 'id',
      labelKey: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: false,
      lazyLoading: true,
      badgeShowLimit: 0,
      showCheckbox: true,
      classes: "myclass custom-class"
    };
    this.getRecords();
    this.test = setInterval(() => {
      if (this.isNextPage && this.nextPageHash) {
        this.callApi();
      }
    }, 5000);
  }


  // get first 100 repos
  getRecords() {
    this.http
      .getRepoList(this.authToken, this.orgLogin)
      .subscribe((RepoList: any) => {
        if (RepoList.edges.length >= 100) {
          this.isNextPage = RepoList.pageInfo.hasNextPage;
          this.nextPageHash = RepoList.pageInfo.endCursor;
        }
        this.repoNameList = RepoList.edges.map((x: any) => {
          return {
            id: x.repository.name,
            name: x.repository.name,
          };
        });
      });
  }

  // get rest of repos
  callApi() {
    this.loading = true;
    this.http
      .getNextPageRepoList(this.authToken, this.nextPageHash, this.orgLogin)
      .subscribe((RepoList: any) => {
        this.isNextPage = RepoList.pageInfo.hasNextPage;
        if (!this.isNextPage) {
          clearInterval(this.test);
        }
        this.nextPageHash = RepoList.pageInfo.endCursor;
        this.TemprepoNameList = RepoList.edges.map((x: any) => {
          return {
            id: x.repository.name,
            name: x.repository.name,
          };
        });
        this.repoNameList = this.repoNameList.concat(this.TemprepoNameList);
        this.loading = false;
      });
  }

  // selected values
  onItemSelect(item: any) {
    // this.selectedI += JSON.parse(item);

    if (!this.contains(this.jsonArr, "name", item.name)) {
      this.jsonArr.push(item);
    }
    this.repoListObject = { "repoNames": this.jsonArr };
    if(this.jsonArr.length>0){
      this.isdisable = false;
    }
  }
  //custom method used inside select all --for json array value check
  contains(arr: any, key: any, val: any) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return true;
    }
    return false;
  }

  //select all fun
  onSelectAll(items: any) {
    if (this.jsonArr.length == 0) {
      this.jsonArr = this.jsonArr.concat(items);
    }
    else {
      for (let i = 0; i < items.length; i++) {
        if (!this.contains(this.jsonArr, "name", items[i].name)) {
          this.jsonArr.push(items[i]);
        }
      }
    }

    this.repoListObject = { "repoNames": this.jsonArr };
    if(this.jsonArr.length>0){
      this.isdisable = false;
    }
  }

  //single deselect function
  onItemDeselect(item: any) {
    this.jsonArr.forEach((key: any, value: any) => {
      if (key.id === item.id) this.jsonArr.splice(value, 1);
    });
    this.repoListObject = { "repoNames": this.jsonArr };
  }

  //deselect all function
  onDeSelectAll(items: any) {
    this.jsonArr.splice(0, this.jsonArr.length);
  }

  //add button click inside dialog
  addRepo() {
    clearInterval(this.test);
    this.matDialog.close({ data: this.jsonArr });
  }
  
  close(){
    clearInterval(this.test);
  }

  //repository list from api by name
  getRepositoryByName() {
    this.repoName = this.searchForm.value.repositoryName;
    this.http
      .getRepositoryLisByName(this.authToken, this.orgLogin, this.repoName)
      .subscribe((repoSerachNameList: any) => {
        this.repositoryListByName = _.merge([], repoSerachNameList.edges);
      });
      
  }

  //selected repository from auto-complete
  setRepoToSelected(repoindex: any){
    let temprepo = this.repositoryListByName[repoindex].node;
    if (!this.contains(this.jsonArr, "name", this.repositoryListByName[repoindex].node.name)) {
      this.jsonArr.push(this.repositoryListByName[repoindex].node);
    }
    if(this.jsonArr.length>0){
      this.isdisable = false;
    }
  }
  remove(index : any){
    this.jsonArr.splice(index, 1);
    if(this.jsonArr.length==0){
      this.isdisable = true;
    }
  }
}
