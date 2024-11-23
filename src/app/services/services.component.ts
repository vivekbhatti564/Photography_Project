import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category/category.model';
import { CategoryService } from '../shared/category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  categories?: Category[]

  constructor(private categoryservice: CategoryService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show()
    this.categoryservice.getAll().snapshotChanges().pipe(
      map(changes=>{
        return changes.map((c:any)=>{
          return ({id:c.payload.doc.id,...c.payload.doc.data()})
        })
      })
    ).subscribe((resultdata:any)=>{
      this.spinner.hide()
      this.categories = resultdata
    })
  }
}
