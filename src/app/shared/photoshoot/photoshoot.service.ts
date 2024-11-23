import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { Photoshoot } from 'src/app/models/photoshoot/photoshoot.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoshootService {
  private path = "/photoshoots"

  photoshootRef:AngularFirestoreCollection<Photoshoot>

  constructor(private db:AngularFirestore,private storage : AngularFireStorage) { 
    this.photoshootRef = db.collection("/photoshoots")
  }

  pushFileToStorage(photoshoots : Photoshoot):Observable<number | undefined>{
    const filePath = `${this.path}/`+Math.round(Math.random()*1E9)+`${photoshoots.fileName?.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, photoshoots.fileName);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // console.log("Downloaded URL",downloadURL)
          // console.log("DATA",photoshoots)
          let data: Photoshoot = {
            imageUrl: downloadURL,
            title : photoshoots.title,
            categoryName : photoshoots.categoryName,
            status : photoshoots.status,
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
          let mydata: Photoshoot = {
            imageUrl: downloadURL,
            categoryName : data.categoryName,
            title : data.title
          }
          this.update(id,mydata);
        });
      })
    ).subscribe(resultdata => {
      // console.log("Result Data",resultdata)
    });
    return uploadTask.percentageChanges();
  }

  private saveFileData(photoshoots: Photoshoot): void {
    this.photoshootRef.add({ ...photoshoots })
  }

  getAll():AngularFirestoreCollection<Photoshoot>{
    return this.photoshootRef
  }
  
  getSingle(id:any){
    return this.photoshootRef.doc(id).get()
  }

  update(id:any,data:any){
    return this.photoshootRef.doc(id).update(data)
  }
  getPhotoshootByCategory(categoryName:any){
    return this.db.collection(this.path,ref=>ref.where("categoryName","==",categoryName))
  }
}
