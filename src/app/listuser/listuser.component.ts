import { Component, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';
import { UserauthService } from '../shared/userauth/userauth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit{

  users?: User[]

  constructor(private userauthservice : UserauthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show()
    this.userauthservice.getAllUser().snapshotChanges().pipe(
      map(changes=>{
        return changes.map((c:any)=>{
          return ({id:c.payload.doc.id,...c.payload.doc.data()})
        })
      })
    ).subscribe((resultdata:any)=>{
      this.spinner.hide()
      this.users = resultdata
    })
  }
}
