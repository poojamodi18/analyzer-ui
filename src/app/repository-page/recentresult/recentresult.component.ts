import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/shared/http.service';
import * as _ from 'lodash';

export interface defaultBranch {
  repository: any;
  defaultBranch: any;
  createdAt: any;
  url: any;
}
export interface issueData {
  title: any;
  createdAt: any;
  repository: any;
  authorLogin: any;
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
  selector: 'app-recentresult',
  templateUrl: './recentresult.component.html',
  styleUrls: ['./recentresult.component.css']
})
export class RecentresultComponent implements OnInit {

  isCriticalIssue = false;
  isP1Average = false;
  isP2Average = false;
  isBranch = false;
  isUnmergedPR = false;
  isIdlePR = false;
  recentData: any;
  typeMessage: any;
  isLoading = false;

  //branch
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService) { }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.isLoading = true;

    if (this.data.query.title.includes('Average')) {
      this.typeMessage = 'average';
    } else {
      this.typeMessage = 'data';
    }

    this.http.getRecentResult(this.typeMessage, this.data.query.query).subscribe((resultData: any) => {

      this.recentData = resultData;

      if (this.data.query.title.includes('No Activity')) {
        this.displayedColumns = ['title', 'updatedAt', 'repository', 'authorLogin'];
        this.recentData = _.merge([], this.recentData.search.nodes);
        this.recentData = this.recentData.map((x: any) => {
          return {
            title: x.title,
            updatedAt: x.updatedAt,
            repository: x.repository.name,
            authorLogin: x.author.login,
            authorUrl: x.author.url,
          }
        });
        this.isLoading=false;
        this.dataSource = new MatTableDataSource<pullRequestData>(this.recentData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        this.isIdlePR = true;

      } else if (this.data.query.title.includes('Unmerged')) {
        this.displayedColumns = ['title', 'createdAt', 'repository', 'authorLogin'];
        this.recentData = _.merge([], this.recentData.search.nodes);
        this.recentData = this.recentData.map((x: any) => {
          return {
            title: x.title,
            createdAt: x.createdAt,
            repository: x.repository.name,
            authorLogin: x.author.login,
            authorUrl: x.author.url,
          }
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<unmergedPRData>(this.recentData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        this.isCriticalIssue = true;

      } else if (this.data.query.title.includes('Priority Issue Open')) {
        this.displayedColumns = ['title', 'createdAt', 'repository', 'authorLogin'];
        this.recentData = _.merge([], this.recentData.search.edges);
        this.recentData = this.recentData.map((x: any) => {
          return {
            title: x.node.title,
            createdAt: x.node.createdAt,
            repository: x.node.repository.name,
            authorLogin: x.node.author.login,
            authorUrl: x.node.author.url,
          };
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<issueData>(this.recentData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        this.isCriticalIssue = true;

      } else if (this.data.query.title.includes('Priority-1')) {
        this.isLoading = false;
        this.isP1Average = true;

      } else if (this.data.query.title.includes('Priority-2')) {
        this.isLoading = false;
        this.isP2Average = true;

      } else if (this.data.query.title.includes('Default Branch')) {
        this.displayedColumns = ['defaultBranch', 'repository', 'createdAt'];
        this.recentData = _.merge([], this.recentData.search.nodes);
        this.recentData = this.recentData.map((x: any) => {
          return {
            repository: x.name,
            defaultBranch: x.defaultBranchRef.name,
            createdAt: x.createdAt,
            url: x.url,
          }
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<defaultBranch>(this.recentData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        this.isBranch = true;
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

}
