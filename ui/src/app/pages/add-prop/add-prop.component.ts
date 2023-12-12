import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Iprops } from 'src/Models/iprops';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-add-prop',
  templateUrl: './add-prop.component.html',
  styleUrls: ['./add-prop.component.css'],
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
  ],
})
export class AddPropComponent {
  prop:Iprops = {} as Iprops 
  id:string= ''
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  constructor(private http:HttpClient, private router: Router,
    private activeRoute: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.activeRoute.paramMap.subscribe((par) => {

      this.id = par.get('id') ?? ""

      if(this.id) {
        this.http.get<Iprops>(this.APIUrl+'GetProps?id='+this.id).subscribe(data=>{ console.log(data); this.prop=data;})
      }

  

    }


    )
  }


  readonly APIUrl="http://localhost:5038/api/airbnb/"


  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';}

  AddProps(){
    var title =(<HTMLInputElement>document.getElementById('title')).value;
    var description =(<HTMLInputElement>document.getElementById('description')).value;
    var imageSrc =(<HTMLInputElement>document.getElementById('imageSrc')).value;
    var category =(<HTMLInputElement>document.getElementById('category')).value;
    var roomCount =(<HTMLInputElement>document.getElementById('roomCount')).value;
    var bathroomCount =(<HTMLInputElement>document.getElementById('bathroomCount')).value;
    var locationValue =(<HTMLInputElement>document.getElementById('locationValue')).value;
    var guestCount =(<HTMLInputElement>document.getElementById('guestCount')).value;
    var price =(<HTMLInputElement>document.getElementById('price')).value;
    
    
    var formData = new FormData();
    formData.append('id', this.id)
    formData.append('title',title)
    formData.append('description',description)
    formData.append('imageSrc',imageSrc)
    formData.append('category',category)
    formData.append('roomCount',roomCount)
    formData.append('bathroomCount',bathroomCount)
    formData.append('locationValue',locationValue)
    formData.append('guestCount',guestCount)
    formData.append('price',price)
    formData.append('userId','655cd09d3d3ddea6e95d0e63')
    
    console.log(formData)
    if(this.id) {

      this.http.patch(this.APIUrl+'UpdateProps',formData).subscribe(data=>{
        alert(data)
        
        })
    } else {
      
      this.http.post(this.APIUrl+'AddProps',formData).subscribe(data=>{
      alert(data)
      
      })
    }
    

    this.router.navigate(['/products'])

    }

}
