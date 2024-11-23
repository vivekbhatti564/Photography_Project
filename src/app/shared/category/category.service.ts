import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { Category } from 'src/app/models/category/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private path = "/categories"

  categoryRef:AngularFirestoreCollection<Category>

  constructor(private db:AngularFirestore,private storage : AngularFireStorage) { 
    this.categoryRef = db.collection("/categories")
  }

  pushFileToStorage(categories : Category):Observable<number | undefined>{
    const filePath = `${this.path}/`+Math.round(Math.random()*1E9)+`${categories.fileName?.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, categories.fileName);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // console.log("Downloaded URL",downloadURL)
          // console.log("DATA",categories)
          let data: Category = {
            imageUrl: downloadURL,
            categoryName : categories.categoryName,
            status : categories.status,
            // fileName: categories.fileName?.name
          }
          this.saveFileData(data);
        });
      })
    ).subscribe(resultdata => {
      // console.log("Result Data",resultdata)
    });
    return uploadTask.percentageChanges();
  }

  updatepushFileToStorage(id:any,file:any,data:any){
    const filePath = `${this.path}/`+Math.round(Math.random()*1E9)+`${file?.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath,file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // console.log("Downloaded URL",downloadURL)
          let mydata: Category = {
            imageUrl: downloadURL,
            categoryName : data.categoryName,
          }
          this.update(id,mydata);
        });
      })
    ).subscribe(resultdata => {
      // console.log("Result Data",resultdata)
    });
    return uploadTask.percentageChanges();
  }

  private saveFileData(categories: Category): void {
    this.categoryRef.add({ ...categories })
  }

  getAll():AngularFirestoreCollection<Category>{
    return this.categoryRef
  }
  
  getSingle(id:any){
    return this.categoryRef.doc(id).get()
  }

  update(id:any,data:any){
    return this.categoryRef.doc(id).update(data)
  }
}
