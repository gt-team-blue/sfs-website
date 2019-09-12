import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { UploadStoryComponent } from './upload-story/upload-story.component';
import { AuthGuard } from './auth.guard';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { HttpClientModule } from '@angular/common/http';

const appRoutes:Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: UploadStoryComponent
  },
  {
    path: 'create/:planType',
    canActivate: [AuthGuard],
    component: UploadStoryComponent
  },
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SettingsComponent,
    UploadStoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
