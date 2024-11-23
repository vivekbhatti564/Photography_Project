import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ServicesComponent } from './services/services.component';
import { LayoutComponent } from './layout/layout.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ManageCategoryComponent } from './category/manage-category/manage-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { AddPhotoshootComponent } from './photoshoot/add-photoshoot/add-photoshoot.component';
import { ManagePhotoshootComponent } from './photoshoot/manage-photoshoot/manage-photoshoot.component';
import { UpdatePhotoshootComponent } from './photoshoot/update-photoshoot/update-photoshoot.component';
import { AddGalleryComponent } from './gallery/add-gallery/add-gallery.component';
import { ManageGalleryComponent } from './gallery/manage-gallery/manage-gallery.component';
import { UpdateGalleryComponent } from './gallery/update-gallery/update-gallery.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MakeBookingComponent } from './booking/make-booking/make-booking.component';
import { UserBookingHistoryComponent } from './booking/user-booking-history/user-booking-history.component';
import { ManageBookingComponent } from './booking/manage-booking/manage-booking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { ListuserComponent } from './listuser/listuser.component';
import { PhotoshootComponent } from './photoshoot/photoshoot.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/layout/home', pathMatch: 'full'
  },
  {
    path: 'layout', component: LayoutComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'about', component: AboutComponent
      },
      {
        path: 'contact', component: ContactComponent
      },
      {
        path: 'gallery', component: GalleryComponent
      },
      {
        path: 'services', component: ServicesComponent
      },
      {
        path: 'photoshoots/:category', component: PhotoshootComponent
      },
      {
        path: 'add-category', component: AddCategoryComponent
      },
      {
        path: 'manage-category', component: ManageCategoryComponent
      },
      {
        path: 'update-category/:id', component: UpdateCategoryComponent
      },
      {
        path: 'add-photoshoot', component: AddPhotoshootComponent
      },
      {
        path: 'manage-photoshoot', component: ManagePhotoshootComponent
      },
      {
        path: 'update-photoshoot/:id', component: UpdatePhotoshootComponent
      },
      {
        path: 'add-gallery', component: AddGalleryComponent
      },
      {
        path: 'manage-gallery', component: ManageGalleryComponent
      },
      {
        path: 'update-gallery/:id', component: UpdateGalleryComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'make-booking/:category/:photoshoot', component: MakeBookingComponent
      },
      {
        path: 'user-booking-history', component: UserBookingHistoryComponent
      },
      {
        path: 'manage-booking', component: ManageBookingComponent
      },
      {
        path: 'user-profile', component: UserProfileComponent
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'list-customer', component: ListuserComponent
      },
      {
        path: 'manage-contact', component: ManageContactComponent
      }
    ]
  },
  {
    path: '**', component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
