import { Component, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';
import { UserauthService } from '../shared/userauth/userauth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users?: User[]
  user  : any
  constructor(private userauthservice: UserauthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.spinner.show()
    this.userauthservice.getUserByUid(localStorage.getItem('uid')).snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      this.users = resultdata
      this.user = resultdata[0]
      // console.log(this.user)
    })
  }

}
