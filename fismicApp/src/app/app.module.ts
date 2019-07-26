import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {  IonicRouteStrategy, IonicModule } from '@ionic/angular';
import {IonicApp} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import {AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireStorageModule } from '@angular/fire/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {FismicTemplateModule} from './ui/template/template.module';

import { FIREBASE_CONFIG } from './firebase.config';
import { CommonModule } from '@angular/common';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider,LoginOpt } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';
import { NotificationsService } from './services/notifications.services';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FireBaseNotificationsService } from './services/firebase.notification.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import {FCM} from '@ionic-native/fcm/ngx';

//import { TemplateComponent } from './ui/template/template.component';
const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true,
  //redirect_uri : 'file:///android_asset/www/index.html'
  redirect_uri: 'http://www.sogei.it'
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
 
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
 
let config = new AuthServiceConfig([
  /*{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Google-OAuth-Client-Id', googleLoginOptions)
  },*/
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider ( '3049181681773579', fbLoginOptions)
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  
  entryComponents: [],
  imports: [BrowserModule,
            CommonModule,
            FismicTemplateModule,
           IonicModule.forRoot(),
           AngularFireModule.initializeApp(FIREBASE_CONFIG),
           AngularFirestoreModule,
           AngularFireDatabaseModule,
           AngularFireStorageModule,
           AppRoutingModule,
           HttpClientModule,
            
  ],
  declarations: [AppComponent],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AuthServiceConfig, useFactory: provideConfig},
    AuthService,
    InAppBrowser,
    LocalNotifications,
    Badge,
    NotificationsService,
    Firebase,
    FCM,
    FireBaseNotificationsService,
    Facebook
  ],
  bootstrap: [AppComponent]
})



export class AppModule {}
