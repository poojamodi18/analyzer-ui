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
export interface defaultBranch {
  repository: any;
  defaultBranch: any;
  createdAt: any;
  url: any;
}

@Component({
  selector: 'app-branchanalysis',
  templateUrl: './branchanalysis.component.html',
  styleUrls: ['./branchanalysis.component.css']
})
export class BranchanalysisComponent implements OnInit {
  displayedColumns: string[] = ['defaultBranch', 'repository', 'createdAt'];
  dataSource!: MatTableDataSource<defaultBranch>;
  orgLogin: any;
  repoListObject: any;
  isLoading = false;
  defaultBranchList: any;
  selectedRepoList: repoList[] = [];
  fform = new FormGroup({
  });
  @ViewChild('page1') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpService, private util: UtilService, private toastr: ToastrService) { }

  //search filter for idle pr
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
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
  getBranch() {
    this.orgLogin = localStorage.getItem('orgLogin');
    this.isLoading = true;
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { "repoNames": this.selectedRepoList };
    if (this.selectedRepoList.length === 0) {
      this.isLoading = false;
      this.alertbox();
    }
    else {
      this.http.defaultBranch(this.orgLogin, this.repoListObject)
        .subscribe((Data: any) => {
          this.defaultBranchList = Data;
          this.defaultBranchList = _.merge([], this.defaultBranchList.search.nodes);
          this.defaultBranchList = this.defaultBranchList.map((x: any) => {
            return {
              repository: x.name,
              defaultBranch: x.defaultBranchRef.name,
              createdAt: x.createdAt,
              url: x.url,
            }
          });
          this.isLoading=false;
          this.dataSource = new MatTableDataSource<defaultBranch>(this.defaultBranchList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        });
    }
  }

}
