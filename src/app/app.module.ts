import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NewSubjectComponent } from './components/new-subject/new-subject.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultComponent } from './components/result/result.component';
import { SubjectComponent } from './components/subject/subject.component';
import { TestComponent } from './components/test/test.component';
import { UserDevComponent } from './components/user-dev/user-dev.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginGuard } from './components/login/login-guard';
import { NewQuestionComponent } from './components/new-question/new-question.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

const appRoutes: Routes = [
  { path: '', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'subject', component: SubjectComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  { path: 'test', component: TestComponent, canActivate: [LoginGuard] },
  { path: 'user-dev', component: UserDevComponent, canActivate: [LoginGuard] },
  { path: 'result', component: ResultComponent },
  {
    path: 'new-subject',
    component: NewSubjectComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'new-question',
    component: NewQuestionComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutUsComponent,
    NewSubjectComponent,
    ProfileComponent,
    RegisterComponent,
    ResultComponent,
    SubjectComponent,
    TestComponent,
    UserDevComponent,
    NewQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
      maxPercent: 100,
      unitsColor: '#FFF',
      unitsFontSize: '100',
      unitsFontWeight: '100',
      titleColor: '#FFF',
      titleFontSize: '100',
      titleFontWeight: '100',
      showSubtitle: false,
    }),
  ],
  providers: [LoginService, CookieService, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
