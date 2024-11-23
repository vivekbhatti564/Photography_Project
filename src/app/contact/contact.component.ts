import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact/contact.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactService } from '../shared/contact/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: Contact = new Contact()

  form = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService, private contactservice: ContactService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.spinner.show()
    this.contact.name = this.form.name
    this.contact.email = this.form.email
    this.contact.phone = this.form.phone
    this.contact.message = this.form.message
    this.contact.created = Date.now()

    this.contactservice.create(this.contact).then(() => {
      this.spinner.hide()
      this.toastr.success("Record Inserted")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    })
  }


}
