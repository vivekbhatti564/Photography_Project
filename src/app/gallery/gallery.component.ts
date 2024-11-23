import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery/gallery.model';
import { GalleryService } from '../shared/gallery/gallery.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit{
  galleries?: Gallery[]

  constructor(private galleryservice: GalleryService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show()
    this.galleryservice.getAll().snapshotChanges().pipe(
      map(changes=>{
        return changes.map((c:any)=>{
          return ({id:c.payload.doc.id,...c.payload.doc.data()})
        })
      })
    ).subscribe((resultdata:any)=>{
      this.spinner.hide()
      this.galleries = resultdata
    })
  }
}
