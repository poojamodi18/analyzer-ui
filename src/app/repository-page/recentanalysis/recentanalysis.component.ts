import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'app/shared/http.service';
import { UtilService } from 'app/shared/util.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { RecentresultComponent } from '../recentresult/recentresult.component';

export interface recent {
  id: any;
  title: any;
  query: any;
  date: any;
}
@Component({
  selector: 'app-recentanalysis',
  templateUrl: './recentanalysis.component.html',
  styleUrls: ['./recentanalysis.component.css']
})
export class RecentanalysisComponent implements OnInit {
  displayedColumns: string[] = ['title', 'date', 'Result','Save'];
  dataSource!: MatTableDataSource<recent>;
  orgLogin: any;
  repoListObject: any;
  isLoading = false;
  defaultBranchList: any;
  recentHistory: any;
  fform = new FormGroup({
  });
  @ViewChild('page1') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpService, private util: UtilService, private toastr: ToastrService, public matDialog: MatDialog) { }

  //search filter for idle pr
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.getHisotry();
  }

  getHisotry() {
    this.http.getRecentHistory().subscribe(((Data: any) => {
      this.recentHistory = _.merge([], Data);
      this.recentHistory = this.recentHistory.map((x: any) => {
        return {
          id: x.id,
          title: x.title,
          query: x.graphqlQuery,
          date: x.date,
        }
      });
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<recent>(this.recentHistory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }));

  }

  getResult(querydata: any) {

    console.log(querydata);
    const openDialog = this.matDialog.open(RecentresultComponent, { disableClose: false, hasBackdrop: true, data: { query: querydata } });
  }

  saveToDashBoard(querydata:any){

  }

}
