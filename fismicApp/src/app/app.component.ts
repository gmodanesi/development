import { Component, ElementRef ,AfterViewInit} from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Stitch} from 'mongodb-stitch-browser-sdk';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { FireBaseNotificationsService } from './services/firebase.notification.service';
import {FCM} from '@ionic-native/fcm/ngx';





 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private iab: InAppBrowser,
    private elementRef: ElementRef,
    private fbNotificationService: FireBaseNotificationsService,
    private toastController: ToastController,
    private fcm: FCM
   
  ) {
    this.initializeApp();
 
  }
  ngAfterViewInit(){
    /*this.elementRef.nativeElement.querySelector('document')
    .addEventListener('click', this.onDeviceReady.bind(this));
       document.addEventListener('deviceready', this.onDeviceReady, false);
       document.addEventListener('load', this.onDeviceReady, false);
       document.addEventListener('click', this.onDeviceReady, false);*/
  }
  
  initializeApp() {
    let platforms =this.platform.platforms();
    //alert ('platformame: ' + platforms);
    //console.log(platforms);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    
      this.initPushNotification();
      //this.fbNotificationSetup();
      this.fbNotificationSetupNative();
      
    });
    Stitch. initializeDefaultAppClient('fismicapp-muubv');
    
  }

  fbNotificationSetupNative()
  {
    this.fcm.onNotification().subscribe(data => {
      alert('FCM notification: :' + data);
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private fbNotificationSetup() {
    this.fbNotificationService.getToken();
    this.fbNotificationService.onNotifications().subscribe(
      (msg) => {
        this.presentToast(msg.body);
      });
  }

  onDeviceReady(event){
    
    console.log('stoca');
  }

  initPushNotification() {
}
}
