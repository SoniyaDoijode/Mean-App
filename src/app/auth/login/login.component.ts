import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false
  authStatusSub: Subscription;
  constructor(public authService : AuthService, public router : Router ) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onLogin(form : NgForm){
    if(form.invalid){
      return
    }
    this.isLoading= true
    this.authService.login(form.value.email, form.value.password)
    console.log('Login successful')
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe()
  }
}
