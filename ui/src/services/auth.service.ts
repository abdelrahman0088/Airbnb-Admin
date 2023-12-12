import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }


  login (email:string, password:string){

    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{

        localStorage.setItem('token','true')
        this.router.navigate(['/home']) 

    },err => {alert(err.message);
    this.router.navigate(['/login']) })
  }

//   resgister(email:string, password:string){

//     this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{

// alert('Regestration Successfull')
//         this.router.navigate(['/login']) 

//     },err => {alert(err.message);
//     this.router.navigate(['/register']) })
//   }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login']) 

    },err => {alert(err.message)})
  }
  
  get isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

}

