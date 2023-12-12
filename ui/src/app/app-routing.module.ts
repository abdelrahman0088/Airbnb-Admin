import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PoductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { AddPropComponent } from './pages/add-prop/add-prop.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from 'src/guards/admin.guard';


const routes: Routes = [
  { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [adminGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] },
  { path: 'products', component: PoductsComponent,canActivate: [adminGuard] },
  { path: 'users', component: UsersComponent,canActivate: [adminGuard] },
  { path: 'addprop', component: AddPropComponent,canActivate: [adminGuard] },
  { path: 'addprop/:id', component: AddPropComponent,canActivate: [adminGuard] },
  { path: 'addusers', component: AddUserComponent,canActivate: [adminGuard] },
  { path: 'addusers/:id', component: AddUserComponent,canActivate: [adminGuard] }







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
