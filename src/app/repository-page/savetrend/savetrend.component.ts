import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/shared/http.service';

@Component({
  selector: 'app-savetrend',
  templateUrl: './savetrend.component.html',
  styleUrls: ['./savetrend.component.css']
})
export class SavetrendComponent implements OnInit {

  trendType:any;
  isUpdate = true;
  isInsert = true;
  minDate: Date;
  maxDate: Date;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 3, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
   }

  ngOnInit(): void {
    
    this.trendType = this.data.type;

    this.http.getTrendDetails(this.trendType).subscribe(((TrendData: any) => {
       if(TrendData.message=='Not Found'){ 
         this.isUpdate = true;
         this.isInsert = false;
       }
       else{
        this.isUpdate = false;
        this.isInsert = true;
       }
    }));
    
  }

}
