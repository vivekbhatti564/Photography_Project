import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact/contact.model';
import { ContactService } from '../shared/contact/contact.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {
  contacts?: Contact[]

  constructor(private contactservice : ContactService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.spinner.show()
    this.contactservice.getAll().snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      this.contacts = resultdata
    })
  }
}
