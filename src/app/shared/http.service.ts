import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private URL = '';
  private OrgProfileUrl = '';
  private repoListUrl = '';
  private repoSearchUrl = '';
  private idlePrUrl='';
  private unmergedPrUrl='';
  private criticalIssue = '';
  private AvgTimeP1 = '';
  private AvgTimeP2 = '';
  private defaultBranchUrl = '';
  private getlabelsURL='';
  private getlebelissueURL='';
  private getTrendDetailsURL='';

  constructor(private http: HttpClient) { }

  getData(orgName: any) {
    return this.http.get(environment.baseUrl+'/org/'+orgName);
  }

  public getOrgProfile(authToken: any, orgLogin: any) {
    this.OrgProfileUrl = environment.baseUrl+'/org/' + orgLogin + '/orgProfile';
    return this.http.get(this.OrgProfileUrl, {
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }

  public getRepoList(orgLogin: any) {
    this.repoListUrl = environment.baseUrl+'/org/' + orgLogin + '/repo';
    return this.http.get(this.repoListUrl);
  }

  //create a url to fetch next page data
  public getNextPageRepoList(nextPageHash: any, orgLogin: any) {
    this.repoListUrl = environment.baseUrl+'/org/' + orgLogin + '/repo/more';
    return this.http.get(this.repoListUrl, {
      headers: new HttpHeaders({
        EndCursor: nextPageHash
      }),
    });
  }


  public getRepositoryLisByName(orgLogin: any, repoName: any) {
    this.repoSearchUrl = environment.baseUrl+'/org/'+orgLogin+'/repo/'+repoName;
    return this.http.get(this.repoSearchUrl);
  }
  
  // critical issues
  public getcriticalIssue(authToken: any, orgLogin: any, days: any,repoListObject:any){
    this.criticalIssue = environment.baseUrl+'/org/'+orgLogin+'/repo/issuesWithPriority1/openSinceBefore/'+days ;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken,
      })
    };
    return this.http.post<any>(this.criticalIssue, repoListObject, httpOptions);
  }

  // average resolving time for Priority-1 isuues
  public getAvgTimeP1(authToken: any, orgLogin: any){
    this.AvgTimeP1 = environment.baseUrl+'/org/' + orgLogin + '/averageResolvingTimeOfP1Issues';
    return this.http.get(this.AvgTimeP1, {headers: new HttpHeaders({Authorization: authToken})});
  }

    // average resolving time for Priority-2 isuues
  public getAvgTimeP2(authToken: any, orgLogin: any){
    this.AvgTimeP2 = environment.baseUrl+'/org/' + orgLogin + '/averageResolvingTimeOfP2Issues';
    return this.http.get(this.AvgTimeP2, {headers: new HttpHeaders({Authorization: authToken})});
  }

  public idlePr(orgLogin:any,days:any,jsonArr:any): Observable<any>
  { 
    this.idlePrUrl=environment.baseUrl+'/org/'+orgLogin+'/repo/prLastUpdate/'+days;
    return this.http.post<any>(this.idlePrUrl, jsonArr);
  }

  public unmergedpr(orgLogin:any,days:any,jsonArr:any): Observable<any>
  {    
    this.unmergedPrUrl=environment.baseUrl+'/org/'+orgLogin+'/repo/prUnMerged/'+days;
    return this.http.post<any>(this.unmergedPrUrl, jsonArr);
  }

  public defaultBranch(orgLogin:any, jsonArr:any): Observable<any>{
    this.defaultBranchUrl = environment.baseUrl+'/org/'+orgLogin+'/defaultbranch';
    return this.http.post<any>(this.defaultBranchUrl,jsonArr);
  }

  // getting lables
  public getlablesservice( authToken: any, orgLogin: any,repoListObject:any ){
    debugger
    this.getlabelsURL = environment.baseUrl+'/org/' + orgLogin + '/repo/labels';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken,
      })
    };
    return this.http.post<any>(this.getlabelsURL, repoListObject , httpOptions);
  }
  public getlebelissueservice( authToken: any, orgLogin: any,repoListObject:any, label : any ){
    this.getlebelissueURL = environment.baseUrl+'/org/'+ orgLogin +'/repo/'+ label +'/openIssues';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken,
      })
    };
    return this.http.post<any>(this.getlebelissueURL, repoListObject , httpOptions);
  }

  public getTrendDetails(trendTitle:any){
    this.getTrendDetailsURL = environment.baseUrl+'/trend/details/'+trendTitle;
    return this.http.get(this.getTrendDetailsURL);
  }

  public getRecentHistory(){
    return this.http.get(environment.baseUrl+'/v1/home/recentHistory');
  }

}