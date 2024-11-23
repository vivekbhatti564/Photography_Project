import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user.model';
import { GoogleAuthProvider } from 'firebase/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  private dbpath = "/users"

  userRef: AngularFirestoreCollection<User>

  constructor(public afauth: AngularFireAuth, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private db: AngularFirestore) {
    this.userRef = this.db.collection(this.dbpath)
  }

  //register with email/Password
  SignUp(form: any) {
    this.spinner.show()
    return this.afauth.createUserWithEmailAndPassword(form.email, form.password)
      .then((result) => {
        let userdata: User = {
          uid: result.user?.uid,
          email: result.user?.email,
          contact: form.contact,
          address: form.address,
          name: form.name,
          userType: 'Customer',
          status: true
        }
        this.userregister(userdata)
        this.spinner.hide()
        this.toastr.success('You have been successfully registered!')
        this.router.navigateByUrl("/layout/login")
      })
      .catch((error) => {
        this.spinner.hide()
        this.toastr.error(error.message)
      })
  }

  private userregister(user: User) {
    return this.userRef.add({ ...user })
  }

  uid: any
  //Login with Email and PAssword
  SignIn(form: any) {
    return this.afauth.signInWithEmailAndPassword(form.email, form.password)
      .then((result) => {
        this.spinner.hide()

        // console.log(result.user?.uid)
        this.uid = result.user?.uid
        localStorage.setItem('uid', this.uid)
        localStorage.setItem('isauthenticated', 'true')

        this.toastr.success('You have been successfully logged in!')
        // this.getUserByUid(this.uid)
        if(this.uid == "KZsPbiMVEWWoKYXRlePYbIxM8hD3")
          this.router.navigateByUrl("/layout/dashboard")
        else
          this.router.navigateByUrl("/layout/home")
          
        // window.alert('You have been successfully logged in!')
        // console.log(result);
      })
      .catch((error) => {
        this.spinner.hide()
        this.toastr.error(error.message)
        // window.alert(error.message);
      });
  }

  //Google Auth
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider())
  }

  AuthLogin(provider: any) {
    return this.afauth.signInWithPopup(provider)
      .then((result) => {
        // window.alert('You have been successfully logged in!');
        console.log(result);
        let userdata: User = {
          uid: result.user?.uid,
          email: result.user?.email,
          userType: 'Customer',
          status: true
        }
        this.userregister(userdata)

        this.uid = result.user?.uid
        localStorage.setItem('uid', this.uid)
        localStorage.setItem('isauthenticated', 'true')

        this.spinner.hide()
        this.toastr.success('You have been successfully registered!')
        this.router.navigateByUrl("/layout/dashboard")
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }
  getAllUser():AngularFirestoreCollection<User>{
    return this.userRef
  }
  getUserByUid(uid:any){
    return this.db.collection(this.dbpath,ref=>ref.where("uid","==",uid))
  }
}
