import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  message: string = 'Vous etes deconneté. (pikachu/pikachu)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(private authSevice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth = this.authSevice;
  }

  setMessage(){
    if(this.auth.isLoggedIn){
      this.message = 'vous etes connecté';
    } else {
      this.message = 'Identifiant ou mot de passe incorrect'
    }
  }

  login(){
    this.message = 'Tentative de connection';
    this.auth.login(this.name, this.password).subscribe((isLoggedIn: boolean)=>{
      this.setMessage();
      if(isLoggedIn) {
        this.router.navigate(['/pokemons']);
      } else {
        this.password = '';
        this.router.navigate(['/login']);
      }
    });
  }

  logout(){
    this.auth.logout;
    this.message = 'vous etes deconnecter.';
  }
}
