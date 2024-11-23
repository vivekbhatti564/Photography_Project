import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Contact } from 'src/app/models/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private dbpath = "/contacts"

  contactRef: AngularFirestoreCollection<Contact>

  constructor(private db: AngularFirestore) {
    this.contactRef = this.db.collection(this.dbpath)
  }

  create(contact: Contact) {
    return this.contactRef.add({ ...contact })
  }

  getAll(): AngularFirestoreCollection<Contact> {
    return this.contactRef
  }
  
}
