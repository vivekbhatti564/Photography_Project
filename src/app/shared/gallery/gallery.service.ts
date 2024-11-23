import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { Gallery } from 'src/app/models/gallery/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private path = "/galleries"

  galleryRef:AngularFirestoreCollection<Gallery>

  constructor(private db:AngularFirestore,private storage : AngularFireStorage) { 
    this.galleryRef = db.collection("/galleries")
  }

  pushFileToStorage(galleries : Gallery):Observable<number | undefined>{
    const filePath = `${this.path}/`+Math.round(Math.random()*1E9)+`${galleries.fileName?.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, galleries.fileName);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // console.log("Downloaded URL",downloadURL)
          // console.log("DATA",galleries)
          let data: Gallery = {
            imageUrl: downloadURL,
            photoshootName : galleries.photoshootName,
            categoryName : galleries.categoryName,
            status : galleries.status,
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
          let mydata: Gallery = {
            imageUrl: downloadURL,
            categoryName : data.categoryName,
            photoshootName : data.photoshootName
          }
          this.update(id,mydata);
        });
      })
    ).subscribe(resultdata => {
      // console.log("Result Data",resultdata)
    });
    return uploadTask.percentageChanges();
  }

  private saveFileData(galleries: Gallery): void {
    this.galleryRef.add({ ...galleries })
  }

  getAll():AngularFirestoreCollection<Gallery>{
    return this.galleryRef
  }
  
  getSingle(id:any){
    return this.galleryRef.doc(id).get()
  }

  update(id:any,data:any){
    return this.galleryRef.doc(id).update(data)
  }
}
