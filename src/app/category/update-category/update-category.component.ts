import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/shared/category/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  @Input() categories?: Category

  selectedFiles?: FileList;
  // currentFileUpload?: Notes;
  percentage = 0;

  currentCategory : Category = {
    categoryName:'',
    imageUrl:'',
    status:true,
  }

  constructor(private categoryservice : CategoryService,private router : Router,private spinner : NgxSpinnerService,private toastr : ToastrService,private activatedroute : ActivatedRoute) { }

  ngOnInit(): void {
    this.singledata()
  }

  async singledata() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000);
    let snapshot = await this.categoryservice.getSingle(this.activatedroute.snapshot.paramMap.get("id")).pipe()
    snapshot.forEach(doc => {
      // console.log("data", doc.data())
      let data = doc.data()
      this.currentCategory.categoryName = data?.categoryName
      this.currentCategory.imageUrl = data?.imageUrl
      this.currentCategory.status = data?.status
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
          categoryName : this.currentCategory.categoryName,
        }

        this.categoryservice.updatepushFileToStorage((this.activatedroute.snapshot.paramMap.get("id")),file,data).subscribe(
          result => {
            if(result==100)
            {
              this.spinner.hide()
              this.toastr.success("Record Inserted")
              this.router.navigateByUrl("/layout/manage-category")
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
        categoryName : this.currentCategory.categoryName,
      }
  
      this.categoryservice.update((this.activatedroute.snapshot.paramMap.get("id")),data).then(()=>{
        this.spinner.hide()
        this.toastr.success("Record Updated")
        this.router.navigateByUrl("/layout/manage-category")
      })
    }
  }
}
