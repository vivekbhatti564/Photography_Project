import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photoshoot } from '../models/photoshoot/photoshoot.model';
import { PhotoshootService } from '../shared/photoshoot/photoshoot.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { UserauthService } from '../shared/userauth/userauth.service';

@Component({
  selector: 'app-photoshoot',
  templateUrl: './photoshoot.component.html',
  styleUrls: ['./photoshoot.component.css']
})
export class PhotoshootComponent implements OnInit {

  serviceName: any
  constructor(private activatedroute: ActivatedRoute, private photoshootservice: PhotoshootService, private spinner: NgxSpinnerService, private userauth: UserauthService, private router: Router) { }

  ngOnInit(): void {
    this.serviceName = this.activatedroute.snapshot.paramMap.get("category")
    this.getData()
    this.getuserdata()
  }

  photoshoots?: Photoshoot[]
  getData() {
    this.spinner.show()
    this.photoshootservice.getPhotoshootByCategory(this.serviceName).snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      this.photoshoots = resultdata
    })
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

}
