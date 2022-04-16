import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface repoList {
  id: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  selectedRepoList: repoList[] = [];
  constructor(private util: HttpClient) { }

  //set data from showrepository
  public setCollectiveRepoData(itemlist:any)
  {
    this.selectedRepoList=itemlist;
  }

  //return selected repo list data to pr or any page
  public getCollectiveRepoData()
  {
    return this.selectedRepoList;
  }
}
