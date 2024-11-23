import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Gallery } from 'src/app/models/gallery/gallery.model';
import { CategoryService } from 'src/app/shared/category/category.service';
import { GalleryService } from 'src/app/shared/gallery/gallery.service';
import { PhotoshootService } from 'src/app/shared/photoshoot/photoshoot.service';

@Component({
  selector: 'app-update-gallery',
  templateUrl: './update-gallery.component.html',
  styleUrls: ['./update-gallery.component.css']
})
export class UpdateGalleryComponent implements OnInit {
  @Input() galleries?: Gallery

  selectedFiles?: FileList;
  // currentFileUpload?: Notes;
  percentage = 0;

  currentGallery : Gallery = {
    categoryName:'',
    photoshootName:'',
    imageUrl:'',
    status:true,
  }

  constructor(private categoryservice : CategoryService,private photoshootservice : PhotoshootService, private router : Router,private spinner : NgxSpinnerService,private toastr : ToastrService,private activatedroute : ActivatedRoute, private galleryservice : GalleryService) { }

  ngOnInit(): void {
    this.getallcat()
    this.getallphotoshoot()
    this.singledata()
  }

  categorydata: any
  getallcat() {
    {
      this.spinner.show()
      this.categoryservice.getAll().snapshotChanges().pipe(
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

  async singledata() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000);
    let snapshot = await this.galleryservice.getSingle(this.activatedroute.snapshot.paramMap.get("id")).pipe()
    snapshot.forEach(doc => {
      // console.log("data", doc.data())
      let data = doc.data()
      this.currentGallery.categoryName = data?.categoryName
      this.currentGallery.photoshootName = data?.photoshootName
      this.currentGallery.imageUrl = data?.imageUrl
      this.currentGallery.status = data?.status
    })
    // console.log("snapshot", snapshot.data())
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  submit(){
    // this.spinner.show()
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      
      if (file) {
        
        // console.log("New File Uploading")
        const data = {
          categoryName : this.currentGallery.categoryName,
          photoshootName : this.currentGallery.photoshootName,
        }

        this.galleryservice.updatepushFileToStorage((this.activatedroute.snapshot.paramMap.get("id")),file,data).subscribe(
          result => {
            if(result==100)
            {
              this.spinner.hide()
              this.toastr.success("Record Inserted")
              this.router.navigateByUrl("/layout/manage-gallery")
            }
          },
          error => {
            console.log(error);
            this.spinner.hide()
          }
        );
      }
    }
    else{
      // console.log("Keep previous File Uploading")
      const data = {
        categoryName : this.currentGallery.categoryName,
        photoshootName : this.currentGallery.photoshootName,
      }
  
      this.galleryservice.update((this.activatedroute.snapshot.paramMap.get("id")),data).then(()=>{
        this.spinner.hide()
        this.toastr.success("Record Updated")
        this.router.navigateByUrl("/layout/manage-gallery")
      })
    }
  }
}
