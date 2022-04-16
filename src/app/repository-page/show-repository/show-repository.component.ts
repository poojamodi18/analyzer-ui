import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { AddrepositoryComponent } from '../addrepository/addrepository.component';
import{UtilService} from '../../shared/util.service';

interface repoList {
  id: string;
  name: string;
}

@Component({
  selector: 'app-show-repository',
  templateUrl: './show-repository.component.html',
  styleUrls: ['./show-repository.component.css'],
})
export class ShowRepositoryComponent implements OnInit {

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  tokenValue: any;
  products: any;
  repoNameList: any;
  orgLogin: any;
  authToken: any;
  selectedI: any = [];
  jsonArr: any = [];
  repoListObject: any;
  repoName!:string ;
  nameOfItem: repoList[] = [];

  constructor(private http: HttpService, public matDialog: MatDialog,private util: UtilService) { }

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token');
    this.orgLogin = localStorage.getItem('orgLogin');
  }

  openDialog() {
    const openDialog = this.matDialog.open(AddrepositoryComponent,{disableClose:true,hasBackdrop: false});
    openDialog.afterClosed().subscribe((result)=>{
      this.nameOfItem= _.uniqBy([...this.nameOfItem, ...result.data], JSON.stringify);
      this.util.setCollectiveRepoData(this.nameOfItem);
    })
  }
  remove(index : any){
    this.nameOfItem.splice(index, 1);
  }

}
