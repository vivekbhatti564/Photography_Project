import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/shared/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: Category;
  percentage = 0;

  form = {
    categoryName: '',
    fileName: '',
  }

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
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
        this.currentFileUpload = new Category(file, this.form.categoryName, true);
        this.categoryService.pushFileToStorage(this.currentFileUpload).subscribe(
          result => {
            console.log(result)
            if (result == 100) {
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
  }

}
