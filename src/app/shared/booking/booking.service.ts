import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Booking } from 'src/app/models/booking/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private dbpath = "/bookings"

  bookingRef: AngularFirestoreCollection<Booking>

  constructor(private db: AngularFirestore) {
    this.bookingRef = this.db.collection(this.dbpath)
  }

  create(booking: Booking) {
    // console.log(booking)
    return this.bookingRef.add({ ...booking })
  }

  getAll(): AngularFirestoreCollection<Booking> {
    return this.bookingRef
  }
  
  getAllByUid(){
    return this.db.collection(this.dbpath,ref=>ref.where("uid","==",localStorage.getItem('uid')))
  }

  getSingle(id: any) {
    // console.log(id)
    return this.bookingRef.doc(id).get()
  }

  update(id: any, data: any) {
    // console.log(data)
    return this.bookingRef.doc(id).update(data)
  }

}
