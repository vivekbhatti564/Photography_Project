import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/shared/category/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  categories?: Category[]

  constructor(private categoryservice: CategoryService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.spinner.show()
    this.categoryservice.getAll().snapshotChanges().pipe(
      map(changes => {
        return changes.map((c: any) => {
          return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        })
      })
    ).subscribe((resultdata: any) => {
      this.spinner.hide()
      this.categories = resultdata
    })
  }
}
