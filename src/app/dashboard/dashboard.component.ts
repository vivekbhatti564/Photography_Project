import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../shared/category/category.service';
import { PhotoshootService } from '../shared/photoshoot/photoshoot.service';
import { UserauthService } from '../shared/userauth/userauth.service';
import { BookingService } from '../shared/booking/booking.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  total_services: any = 0
  total_photoshoots: any = 0
  total_customers: any = 0
  total_bookings: any = 0

  constructor(private spinner: NgxSpinnerService, private categoryservice: CategoryService, private photoshootservice: PhotoshootService, private userauth: UserauthService, private bookinservice: BookingService) { }

  ngOnInit(): void {
    this.getallcategory()
    this.getallphotoshoot()
    this.getallbookings()
    this.getallusers()
  }

  async getallcategory() {
    this.spinner.show()
    await this.categoryservice.getAll().snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      // console.log("Data array =>",resultdata)
      this.total_services = resultdata.length
      // console.log(resultdata)
    })
  }

  getallphotoshoot() {
    this.spinner.show()
    this.photoshootservice.getAll().snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      // console.log("Data array =>",resultdata)
      this.total_photoshoots = resultdata.length
    })
  }

  getallbookings() {
    this.spinner.show()
    this.bookinservice.getAll().snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      // console.log("Data array =>",resultdata)
      this.total_bookings = resultdata.length
    })
  }

  getallusers() {
    this.spinner.show()
    this.userauth.getAllUser().snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      // console.log("Data array =>",resultdata)
      this.total_customers = resultdata.length
    })
  }

}