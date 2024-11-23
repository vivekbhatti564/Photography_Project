import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Photoshoot } from 'src/app/models/photoshoot/photoshoot.model';
import { CategoryService } from 'src/app/shared/category/category.service';
import { PhotoshootService } from 'src/app/shared/photoshoot/photoshoot.service';

@Component({
  selector: 'app-add-photoshoot',
  templateUrl: './add-photoshoot.component.html',
  styleUrls: ['./add-photoshoot.component.css']
})
export class AddPhotoshootComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: Photoshoot;
  percentage = 0;

  form = {
    categoryName: '',
    title: '',
    fileName: '',
  }

  constructor(private categoryService: CategoryService, private photoshootservice: PhotoshootService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.getallcat()
  }

  categorydata: any
  getallcat() {
    {
      this.spinner.show()
      this.categoryService.getAll().snapshotChanges().pipe(
        map(changes => {
          return changes.map((c: any) => {
            return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          })
        })
      ).subscribe((resultdata: any) => {
        this.spinner.hide()
        this.categorydata = resultdata
      })
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  submit() {
    this.spinner.show()
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new Photoshoot(file, this.form.categoryName, true, this.form.title);
        this.photoshootservice.pushFileToStorage(this.currentFileUpload).subscribe(
          result => {
            console.log(result)
            this.spinner.hide()
            if (result == 100) {
              this.toastr.success("Record Inserted")
              this.router.navigateByUrl("/layout/manage-photoshoot")
            }
          },
          error => {
            console.log(error);
            this.spinner.hide()
          }
        );
      }
    }
  }

}
