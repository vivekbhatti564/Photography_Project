import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Photoshoot } from 'src/app/models/photoshoot/photoshoot.model';
import { PhotoshootService } from 'src/app/shared/photoshoot/photoshoot.service';

@Component({
  selector: 'app-manage-photoshoot',
  templateUrl: './manage-photoshoot.component.html',
  styleUrls: ['./manage-photoshoot.component.css']
})
export class ManagePhotoshootComponent implements OnInit{
  photoshoots?: Photoshoot[]

  constructor(private photoshootservice: PhotoshootService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show()
    this.photoshootservice.getAll().snapshotChanges().pipe(
      map(changes=>{
        return changes.map((c:any)=>{
          return ({id:c.payload.doc.id,...c.payload.doc.data()})
        })
      })
    ).subscribe((resultdata:any)=>{
      this.spinner.hide()
      this.photoshoots = resultdata
    })
  }
}
