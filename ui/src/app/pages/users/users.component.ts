import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,
    CommonModule, MatButtonModule,
    MatTooltipModule, MatIconModule,
    MatToolbarModule,
  ],


})

export class UsersComponent implements OnInit,AfterViewInit {
  title = 'Properties';
  readonly APIUrl = "http://localhost:5038/api/airbnb/"
  displayedColumns: string[] = ['name', 'email', 'image','createdAt', 'update', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  constructor(private http: HttpClient, private router: Router,) { }
  dataSource: any = [];
  filteredData: any = [];


  refreshPrs() {

    this.http.get(this.APIUrl + 'GetUsers').subscribe(data => { this.dataSource = data; })
  }
  ngOnInit() {
    this.refreshPrs()
  }


  deleteUsers(id: any) {

    this.http.delete(this.APIUrl + 'DeleteUser?id=' + id).subscribe(data => {
      alert(data)
      this.refreshPrs();

    })


  }
  updateUsers(id: any) {

    this.router.navigate(['/addusers', id])

  }


  onSearch(searchTerm: Event) {
    if (!searchTerm) {
        return;
    }

    const searchText = (searchTerm.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.dataSource.filter((data: any) => {
      const productNameLower = data.name.toLowerCase();
      return productNameLower.includes(searchText);
    });

    this.dataSource = this.filteredData;

}
clearSearch() {
  (<HTMLInputElement>document.getElementById('inp')).value=''
  this.http.get(this.APIUrl + 'GetProps').subscribe(data => { this.dataSource = data; })
}






}
