import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { UtilService } from '../../shared/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';


interface repoList {
  id: string;
  name: string;
}
export interface pullRequestData {
  authorLogin: any;
  repository: any;
  title: any;
  updatedAt: any;
}

export interface unmergedPRData {
  authorLogin: any;
  repository: any;
  title: any;
  createdAt: any;
}
@Component({
  selector: 'app-pranalysis',
  templateUrl: './pranalysis.component.html',
  styleUrls: ['./pranalysis.component.css']
})
export class PranalysisComponent implements OnInit {
  displayedColumns: string[] = ['title', 'updatedAt', 'repository', 'authorLogin'];
  displayedColumns2: string[] = ['title', 'createdAt', 'repository', 'authorLogin'];
  dataSource!: MatTableDataSource<pullRequestData>;
  unmergeddataSource!: MatTableDataSource<unmergedPRData>;
  authToken: any;
  orgLogin: any;
  repoListObject: any;
  activityPRDays: any;
  unmergedPRDays: any;
  prLastActivity: any;
  unmergedPRActivity: any;
  isLoading = false;
  selectedRepoList: repoList[] = [];
  fform = new FormGroup({
    ActivityPrDay: new FormControl('',),
  });
  fform2 = new FormGroup({
    MergePrDay: new FormControl('',),
  });
  @ViewChild('page1') paginator: MatPaginator;
  @ViewChild('page2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sort2') sort2: MatSort;
  constructor(private http: HttpService, private util: UtilService, private toastr: ToastrService) { }

  //search filter for idle pr
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  //search filter for unmerged pr
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.unmergeddataSource.filter = filterValue.trim().toLowerCase();

    if (this.unmergeddataSource.paginator) {
      this.unmergeddataSource.paginator = this.paginator2;
    }
  }

  ngOnInit(): void {

    this.authToken = localStorage.getItem('token');
    this.orgLogin = localStorage.getItem('orgLogin');

  }
  //toast alert
  alertbox() {
    this.toastr.error('Please select repository', 'No Repository', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
  //idle pr 
  noActivityPR() {
    this.isLoading = true;
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { "repoNames": this.selectedRepoList };
    this.activityPRDays = this.fform.value.ActivityPrDay;
    if (this.selectedRepoList.length === 0) {
      this.alertbox();
    }
    else {
      this.http.idlePr(this.authToken, this.orgLogin, this.activityPRDays, this.repoListObject)
        .subscribe((PRData: any) => {
          this.prLastActivity = PRData;
          this.prLastActivity = _.merge([], this.prLastActivity.search.nodes);
          this.prLastActivity = this.prLastActivity.map((x: any) => {
            return {
              title: x.title,
              updatedAt: x.updatedAt,
              repository: x.repository.name,
              authorLogin: x.author.login,
              authorUrl: x.author.url,
            }
          });
          this.isLoading=false;
          this.dataSource = new MatTableDataSource<pullRequestData>(this.prLastActivity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        });
    }
  }
  //for merged pr
  unmergedPr() {
    this.isLoading = true;
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { "repoNames": this.selectedRepoList };
    this.unmergedPRDays = this.fform2.value.MergePrDay;
    if (this.selectedRepoList.length === 0) {
      this.alertbox();
    }
    else {
      this.http.unmergedpr(this.authToken, this.orgLogin, this.unmergedPRDays, this.repoListObject)
        .subscribe((UnMergedData: any) => {

          this.unmergedPRActivity = UnMergedData;
          this.unmergedPRActivity = _.merge([], this.unmergedPRActivity.search.nodes);
          this.unmergedPRActivity = this.unmergedPRActivity.map((x: any) => {
            return {
              title: x.title,
              createdAt: x.createdAt,
              repository: x.repository.name,
              authorLogin: x.author.login,
              authorUrl: x.author.url,
            }
          });
          this.isLoading = false;
          this.unmergeddataSource = new MatTableDataSource<unmergedPRData>(this.unmergedPRActivity);
          this.unmergeddataSource.paginator = this.paginator2;
          this.unmergeddataSource.sort = this.sort2;
        });
    }
  }
}
