import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recentresult',
  templateUrl: './recentresult.component.html',
  styleUrls: ['./recentresult.component.css']
})
export class RecentresultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    console.log('In dialog'+this.data.query.id);
    
  }

}
