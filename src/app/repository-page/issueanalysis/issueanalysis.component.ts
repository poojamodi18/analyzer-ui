import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { UtilService } from '../../shared/util.service';
import * as _ from 'lodash';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

export interface IssueData {
  title: any;
  createdAt: any;
  repository: any;
  authorLogin: any;
}

@Component({
  selector: 'app-issueanalysis',
  templateUrl: './issueanalysis.component.html',
  styleUrls: ['./issueanalysis.component.css'],
})
export class IssueanalysisComponent implements OnInit {
  dataSource!: MatTableDataSource<IssueData>;
  displayedColumns: string[] = ['title', 'createdAt', 'repository', 'authorLogin'];
  authToken: any;
  orgName: any;
  days: any;
  priorityOne: any;
  priorityTwo: any;
  show: any;
  selectedRepoList: any;
  repoListObject: any;
  criticalIssueData: any;
  isLoading = false;
  abc: any;

  criticalIssuesForm = new FormGroup({
    criticalIssues: new FormControl(''),
  });

  AvgTimeForm = new FormGroup({
    criticalIssues: new FormControl(''),
  });

  @ViewChild('page1') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public http: HttpService,
    private util: UtilService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.orgName = localStorage.getItem('orgLogin');
   }

  // TAB-1

  // critical issues 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  criticalIssueList() {
    this.isLoading = true;
    this.orgName = localStorage.getItem('orgLogin');
    this.days = this.criticalIssuesForm.value.criticalIssues;
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    if (this.days == '') {
      this.isLoading = false;
      this.toastr.error('Please enter days', 'No days available', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    }
    else {
      if (this.selectedRepoList.length === 0) {
        this.isLoading = false;
        this.toastr.error('Please select repository', 'No Repository', {
          positionClass: 'toast-top-center',
          closeButton: true,
          easeTime: 250,
        });
      } else {
        this.http
          .getcriticalIssue(
            this.authToken,
            this.orgName,
            this.days,
            this.repoListObject
          )
          .subscribe((res) => {
            res = _.merge([], res.edges);
            this.criticalIssueData = res.map((x: any) => {
              return {
                title: x.node.title,
                createdAt: x.node.createdAt,
                repository: x.node.repository.name,
                authorLogin: x.node.author.login,
                authorUrl: x.node.author.url,
              };
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<IssueData>(
              this.criticalIssueData
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      }
    }

  }

  // TAB-2

  // average time for priority-1 issues
  avg1() {
    this.isLoading = true;
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');

    this.http
      .getAvgTimeP1(this.authToken, this.orgName)
      .subscribe((res: any) => {
        this.priorityOne = res.message;
        this.isLoading = false;
      });
  }

  // average time for priority-2 issues
  avg2() {
    this.isLoading = true;
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');

    this.http
      .getAvgTimeP2(this.authToken, this.orgName)
      .subscribe((res: any) => {
        this.priorityTwo = res.message;
        this.isLoading = false;
      });
  }
  // get labels
  getlabels() {
    debugger
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');

    this.http
      .getlablesservice(this.authToken, this.orgName, this.repoListObject)
      .subscribe((res: any) => {
        this.abc = res.Labels;
      });
  }

  getlebelissue(label: any) {
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');

    this.http
      .getlebelissueservice(this.authToken, this.orgName, this.repoListObject, label)
      .subscribe((res: any) => {
        console.log(res.nodes);
      });
  }
}
