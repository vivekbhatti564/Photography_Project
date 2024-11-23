import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Gallery } from 'src/app/models/gallery/gallery.model';
import { CategoryService } from 'src/app/shared/category/category.service';
import { GalleryService } from 'src/app/shared/gallery/gallery.service';
import { PhotoshootService } from 'src/app/shared/photoshoot/photoshoot.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.css']
})
export class AddGalleryComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: Gallery;
  percentage = 0;

  form = {
    categoryName: '',
    photoshootName: '',
    fileName: '',
  }

  constructor(private categoryService: CategoryService, private photoshootservice: PhotoshootService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router,private galleryservice : GalleryService) { }

  ngOnInit(): void {
    this.getallcat()
    this.getallphotoshoot()
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
  
  photoshootdata: any
  getallphotoshoot() {
    {
      this.spinner.show()
      this.photoshootservice.getAll().snapshotChanges().pipe(
        map(changes => {
          return changes.map((c: any) => {
            return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          })
        })
      ).subscribe((resultdata: any) => {
        this.spinner.hide()
        this.photoshootdata = resultdata
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
        this.currentFileUpload = new Gallery(file, this.form.categoryName, true, this.form.photoshootName);
        this.galleryservice.pushFileToStorage(this.currentFileUpload).subscribe(
          result => {
            // console.log(result)
            this.spinner.hide()
            if (result == 100) {
              this.toastr.success("Record Inserted")
              this.router.navigateByUrl("/layout/manage-gallery")
            }
          },
          error => {
            // console.log(error);
            this.spinner.hide()
          }
        );
      }
    }
  }

}
