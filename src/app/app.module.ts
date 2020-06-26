import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialog, MatDialogModule} from '@angular/material'
import { MatExpansionModule } from '@angular/material/expansion'
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {  HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    SignupComponent,
    LoginComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule, 
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true
  },
{
  provide: HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true
}],
  bootstrap: [AppComponent],
  entryComponents : [ErrorComponent]
})
export class AppModule { }
