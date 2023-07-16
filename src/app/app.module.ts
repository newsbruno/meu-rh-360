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
import { DeviceService } from 'src/services/device.service';
import { LocalStorageService } from 'src/services/localStorage.service';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LocalidadeService } from 'src/services/localidade.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

export function playerFactory() {
  return player;
}

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
    RateItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgxMaskModule.forRoot()
  ],
  providers: [DeviceService, LocalStorageService, LocalidadeService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
