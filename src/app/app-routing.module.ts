import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { DemoComponent } from './demo/demo.component';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: DemoComponent },
  { path: 'repository-page',component:RepositoryPageComponent, canActivate: [AuthGuard]},
  {path: 'callback', component: CallbackComponent},
  { path: '**', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
