import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Photoshoot } from 'src/app/models/photoshoot/photoshoot.model';
import { CategoryService } from 'src/app/shared/category/category.service';
import { PhotoshootService } from 'src/app/shared/photoshoot/photoshoot.service';

@Component({
  selector: 'app-update-photoshoot',
  templateUrl: './update-photoshoot.component.html',
  styleUrls: ['./update-photoshoot.component.css']
})
export class UpdatePhotoshootComponent implements OnInit {
  @Input() photoshoots?: Photoshoot

  selectedFiles?: FileList;
  // currentFileUpload?: Notes;
  percentage = 0;

  currentPhotoshoot : Photoshoot = {
    categoryName:'',
    title:'',
    imageUrl:'',
    status:true,
  }

  constructor(private categoryservice : CategoryService,private photoshootservice : PhotoshootService, private router : Router,private spinner : NgxSpinnerService,private toastr : ToastrService,private activatedroute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getallcat()
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


  async singledata() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000);
    let snapshot = await this.photoshootservice.getSingle(this.activatedroute.snapshot.paramMap.get("id")).pipe()
    snapshot.forEach(doc => {
      // console.log("data", doc.data())
      let data = doc.data()
      this.currentPhotoshoot.categoryName = data?.categoryName
      this.currentPhotoshoot.title = data?.title
      this.currentPhotoshoot.imageUrl = data?.imageUrl
      this.currentPhotoshoot.status = data?.status
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
          categoryName : this.currentPhotoshoot.categoryName,
          title : this.currentPhotoshoot.title,
        }

        this.photoshootservice.updatepushFileToStorage((this.activatedroute.snapshot.paramMap.get("id")),file,data).subscribe(
          result => {
            if(result==100)
            {
              this.spinner.hide()
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
    else{
      // console.log("Keep previous File Uploading")
      const data = {
        categoryName : this.currentPhotoshoot.categoryName,
        title : this.currentPhotoshoot.title,
      }
  
      this.photoshootservice.update((this.activatedroute.snapshot.paramMap.get("id")),data).then(()=>{
        this.spinner.hide()
        this.toastr.success("Record Updated")
        this.router.navigateByUrl("/layout/manage-photoshoot")
      })
    }
  }
}
