import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Iusers } from 'src/Models/iusers';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-prop',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    CommonModule
  ],

})
export class AddUserComponent {
  users: Iusers = {} as Iusers
  id: string = ''
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  constructor(private http: HttpClient, private router: Router,
    private activeRoute: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.activeRoute.paramMap.subscribe((par) => {

      this.id = par.get('id') ?? ""

      if (this.id) {
        this.http.get<Iusers>(this.APIUrl + 'GetUsers?id=' + this.id).subscribe(data => { this.users = data; })
      }


    }


    )
  }


  readonly APIUrl = "http://localhost:5038/api/airbnb/"


  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  AddUser() {
    var name = (<HTMLInputElement>document.getElementById('name')).value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;
    var hashedpassword = (<HTMLInputElement>document.getElementById('hashedpassword')).value;



    var formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('hashedpassword', hashedpassword)
    formData.append('id', this.id)



    if (this.id) {
      this.http.patch(this.APIUrl + 'UpdateUsers', formData).subscribe(data => {
        alert(data)
  
      })
   
    } else {
      this.http.post(this.APIUrl + 'AddUsers', formData).subscribe(data => {
        alert(data)
  
      })
  
    }
    this.router.navigate(['/users'])
  }

}
