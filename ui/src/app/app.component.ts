import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Airbnb Admin Dashboard';

  sideBarOpen = true; 
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  get isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
