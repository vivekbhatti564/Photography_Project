import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserauthService } from 'src/app/shared/userauth/userauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userauth: UserauthService, private router: Router) { }
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.getuserdata()
    // console.log(this.isloggedIn)
  }
  isloggedIn: any = false
  userdata: any
  getuserdata() {
    this.userauth.getUserByUid(localStorage.getItem('uid')).snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.userdata = resultdata[0]
      this.isloggedIn = localStorage.getItem("isauthenticated")
    })
  }

  async logout() {
    await localStorage.clear()
    this.isloggedIn = false
    this.router.navigateByUrl("/layout/login")
  }

}
