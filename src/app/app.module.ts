import { BrowserModule } from '@angular/platform-browser'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { Globals } from './app.global';
import { AppSEO } from './app.seo'; 
 
import { AppSharedModule } from './app.shared.module';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { ToastrModule } from 'ngx-toastr';  
import { BrowserJsonLdModule } from 'ngx-seo';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";

 
//const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google_provider)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fb_provider)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent, 
  ],

  imports: [
    BrowserJsonLdModule,
    BrowserModule, 
    BrowserAnimationsModule, 
    AppRoutingModule,  
    SocialLoginModule,
    AppSharedModule, 
    ToastrModule.forRoot()
  ],
  exports: [
    
  ],
  entryComponents:[ 
     
  ],
  providers: [
    Globals, 
    AppSEO, 
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],  
})
export class AppModule { }
