import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/booking/booking.model';
import { BookingService } from 'src/app/shared/booking/booking.service';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css']
})
export class MakeBookingComponent implements OnInit {
  booking: Booking = new Booking()

  form = {
    categoryName: '',
    photoshootName: '',
    customerName: '',
    bookingDate: '',
    bookingStatus: '',
  }

  constructor(private activatedroute: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService, private bookingservice: BookingService, private router: Router) { }

  cname: any
  psname: any

  ngOnInit(): void {
    this.cname = this.activatedroute.snapshot.paramMap.get("category")
    this.psname = this.activatedroute.snapshot.paramMap.get("photoshoot")
    this.form.categoryName = this.cname
    this.form.photoshootName = this.psname
  }

  submit() {
    this.spinner.show()
    this.booking.uid = localStorage.getItem("uid")
    this.booking.categoryName = this.form.categoryName
    this.booking.photoshoot = this.form.photoshootName
    this.booking.customerName = this.form.customerName
    this.booking.bookingDate = this.form.bookingDate
    this.booking.bookingStatus = 'Pending'
    this.booking.created = Date.now()

    // console.log(this.booking)
    // return 
    this.bookingservice.create(this.booking).then(() => {
      this.spinner.hide()
      this.toastr.success("Record Inserted")
      this.router.navigateByUrl("/layout/user-booking-history")
    })
  }


}
