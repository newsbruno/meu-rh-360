import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from 'src/base/header/header.component';
import { SideBarComponent } from 'src/base/side-bar/side-bar.component';
import { RegisterComponent } from 'src/pages/register/register.component';
import { DashboardComponent } from 'src/pages/dashboard/dashboard.component';
import { MyCompanyComponent } from 'src/pages/my-company/my-company.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { JobsComponent } from 'src/pages/jobs/jobs.component';
import { ProfileComponent } from 'src/pages/profile/profile.component';
import { UsersComponent } from 'src/pages/users/users.component';
import { PageNotFoundComponent } from 'src/pages/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RateItemComponent } from 'src/pages/register/rate-item/rate-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCompanyComponent,
    HeaderComponent,
    SideBarComponent,
    RegisterComponent,
    DashboardComponent,
    JobsComponent,
    ProfileComponent,
    UsersComponent,
    PageNotFoundComponent,
    RateItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
