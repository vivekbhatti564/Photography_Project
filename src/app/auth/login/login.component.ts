import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserauthService } from 'src/app/shared/userauth/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = {
    email : '',
    password : ''
  }

  constructor(private spinner : NgxSpinnerService,private toastr : ToastrService,private auth : UserauthService){}

  ngOnInit(): void {
    
  }

  submit(){
    this.auth.SignIn(this.form)
  }

  googlesubmit() {
    this.auth.GoogleAuth()
  }
}
