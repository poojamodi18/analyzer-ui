import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'app/security.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.securityService.logout().subscribe(() => {
      this.securityService.removeToken();
      localStorage.removeItem('id');
      localStorage.removeItem('orgLogin');
      this.router.navigate(['/']);
    });
  }

}
