import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';



@Component({
  selector: 'app-poducts',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,
    CommonModule, MatButtonModule,
    MatTooltipModule, MatIconModule,
    MatToolbarModule,
  ],


})

export class PoductsComponent implements OnInit {
  title = 'Properties';
  readonly APIUrl = "http://localhost:5038/api/airbnb/"
  displayedColumns: string[] = ['title', 'category', 'country', 'rooms', 'guests', 'price', 'update', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  constructor(private http: HttpClient, private router: Router,) { }
  prs: any = [];
  dataSource: any = [];
  filteredData: any = [];


  refreshPrs() {

    this.http.get(this.APIUrl + 'GetProps').subscribe(data => { this.dataSource = data; })
  }
  ngOnInit() {
    this.refreshPrs()
  }


  // deleteProps(id: any) {

  //   this.http.delete(this.APIUrl + 'DeleteProp?id=' + id).subscribe(data => {
  //     alert(data)
  //     this.refreshPrs();

  //   })


  // }

    
  deleteProps(id: any) {

    
    this.http.delete(this.APIUrl + 'DeleteProp?id=' + id).subscribe(data => {
          alert(data)
          this.refreshPrs();
    
        })

        
    this.router.navigate(['/products/'])

}



  updateProps(id: any) {

    this.router.navigate(['/addprop', id])

  }

  onSearch(searchTerm: Event) {
    if (!searchTerm) {
        return;
    }

    const searchText = (searchTerm.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.dataSource.filter((data: any) => {
      const productNameLower = data.title.toLowerCase();
      return productNameLower.includes(searchText);
    });

    this.dataSource = this.filteredData;

}
clearSearch() {
  (<HTMLInputElement>document.getElementById('inp')).value=''
  this.http.get(this.APIUrl + 'GetProps').subscribe(data => { this.dataSource = data; })
}





}








