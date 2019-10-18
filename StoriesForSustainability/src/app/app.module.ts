import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { StoryService } from './story.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateStoryComponent } from './create-story/create-story.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CookieService } from 'ngx-cookie-service';
import { EditStoryComponent } from './edit-story/edit-story.component';


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
    component: CreateStoryComponent
  },
  {
    path: 'edit/:_id',
    canActivate: [AuthGuard],
    component: EditStoryComponent
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
    NavbarComponent,
    CreateStoryComponent,
    EditStoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    FormsModule,
    NgIdleKeepaliveModule.forRoot(),
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    UserService,
    AuthGuard,
    StoryService,
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
