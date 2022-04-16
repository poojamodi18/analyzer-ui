import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../security.service";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  isLoading = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams.subscribe(p => {
      this.securityService.fetchToken(p.code, p.state).subscribe(data => {
        this.securityService.updateToken(data.accessToken);
        this.isLoading = false;
        this.router.navigate(['/repository-page']);
      })
    })
  }

}
