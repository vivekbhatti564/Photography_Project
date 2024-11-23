import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Booking } from 'src/app/models/booking/booking.model';
import { BookingService } from 'src/app/shared/booking/booking.service';

@Component({
  selector: 'app-user-booking-history',
  templateUrl: './user-booking-history.component.html',
  styleUrls: ['./user-booking-history.component.css']
})
export class UserBookingHistoryComponent implements OnInit {
  bookings?: Booking[]

  constructor(private bookingservice: BookingService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.spinner.show()
    this.bookingservice.getAllByUid().snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      // console.log(resultdata)
      this.bookings = resultdata
    })
  }
  time: any
  date: any
  getdate(datetime: any) {
    // console.log(datetime)
    let date = new Date(datetime);
    this.time = date.toLocaleTimeString();
    this.date = date.toLocaleDateString();
    // console.log('time', this.time, this.date);
    return (this.date + " " + this.time)
  }

  can(data: any) {
    // console.log(data.id)
    const newdata = {
      bookingStatus: 'Cancelled By User'
    }

    this.bookingservice.update(data.id, newdata).then(() => {
      this.spinner.hide()
      this.toastr.error("Cancelled")
    })
  }
}
