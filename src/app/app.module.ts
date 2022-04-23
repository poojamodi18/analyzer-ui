import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { MatGridListModule } from '@angular/material/grid-list';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { IssueanalysisComponent } from './repository-page/issueanalysis/issueanalysis.component';
import { PranalysisComponent } from './repository-page/pranalysis/pranalysis.component';
import { ShowRepositoryComponent } from './repository-page/show-repository/show-repository.component';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { AddrepositoryComponent } from './repository-page/addrepository/addrepository.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSortModule} from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { CallbackComponent } from './callback/callback.component';
import { BranchanalysisComponent } from './repository-page/branchanalysis/branchanalysis.component';
import { DashboardComponent } from './repository-page/dashboard/dashboard.component';
import { SavetrendComponent } from './repository-page/savetrend/savetrend.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { OrganizationComponent } from './repository-page/organization/organization.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    RepositoryPageComponent,
    ShowRepositoryComponent,
    AddrepositoryComponent, 
    IssueanalysisComponent,  
    PranalysisComponent, CallbackComponent, BranchanalysisComponent, DashboardComponent, SavetrendComponent, OrganizationComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    AngularMultiSelectModule,
    MatToolbarModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
