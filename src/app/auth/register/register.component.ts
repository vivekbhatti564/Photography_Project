import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserauthService } from 'src/app/shared/userauth/userauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form = {
    name : '',
    email : '',
    password : '',
    contact : '',
    address : '',
  }

  constructor(private authservice : UserauthService,private spinner : NgxSpinnerService, private toastr : ToastrService){}

  ngOnInit(): void {
    
  }

  submit(){
    this.authservice.SignUp(this.form)
  }
  googlesubmit() {
    this.authservice.GoogleAuth()
  }
}
