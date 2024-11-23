import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Gallery } from 'src/app/models/gallery/gallery.model';
import { GalleryService } from 'src/app/shared/gallery/gallery.service';

@Component({
  selector: 'app-manage-gallery',
  templateUrl: './manage-gallery.component.html',
  styleUrls: ['./manage-gallery.component.css']
})
export class ManageGalleryComponent implements OnInit{
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
