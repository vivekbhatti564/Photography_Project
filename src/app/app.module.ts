import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ManageCategoryComponent } from './category/manage-category/manage-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { AddPhotoshootComponent } from './photoshoot/add-photoshoot/add-photoshoot.component';
import { ManagePhotoshootComponent } from './photoshoot/manage-photoshoot/manage-photoshoot.component';
import { UpdatePhotoshootComponent } from './photoshoot/update-photoshoot/update-photoshoot.component';
import { AddGalleryComponent } from './gallery/add-gallery/add-gallery.component';
import { ManageGalleryComponent } from './gallery/manage-gallery/manage-gallery.component';
import { UpdateGalleryComponent } from './gallery/update-gallery/update-gallery.component';
import { MakeBookingComponent } from './booking/make-booking/make-booking.component';
import { UserBookingHistoryComponent } from './booking/user-booking-history/user-booking-history.component';
import { ManageBookingComponent } from './booking/manage-booking/manage-booking.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListuserComponent } from './listuser/listuser.component';
import { PhotoshootComponent } from './photoshoot/photoshoot.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    GalleryComponent,
    ServicesComponent,
    ContactComponent,
    AddCategoryComponent,
    ManageCategoryComponent,
    UpdateCategoryComponent,
    AddPhotoshootComponent,
    ManagePhotoshootComponent,
    UpdatePhotoshootComponent,
    AddGalleryComponent,
    ManageGalleryComponent,
    UpdateGalleryComponent,
    MakeBookingComponent,
    UserBookingHistoryComponent,
    ManageBookingComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    DashboardComponent,
    ErrorComponent,
    ListuserComponent,
    PhotoshootComponent,
    ProfileComponent,
    ManageContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
