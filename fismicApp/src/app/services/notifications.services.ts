import { Platform, AlertController } from '@ionic/angular';
import { Component, Injectable} from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType } from '@ionic-native/local-notifications/ngx';
import {ILocalNotification} from '@ionic-native/local-notifications/ngx';
import {Observable, BehaviorSubject, Subject, of} from 'rxjs';
import { Badge } from '@ionic-native/badge/ngx';
/*@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})*/
@Injectable()
export class NotificationsService {
  //scheduled$ = [];
  private scheduled$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController,
  private badge: Badge) {
     this.badge.set(0);
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
     
    });
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Simons Notification',
      data: { mydata: 'My hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true // Show the notification while app is open
    });

    // Works as well!
    // this.localNotifications.schedule({
    //   id: 1,
    //   title: 'Attention',
    //   text: 'Simons Notification',
    //   data: { mydata: 'My hidden message this is' },
    //   trigger: { at: new Date(new Date().getTime() + 5 * 1000) }
    // });
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recurring',
      text: 'Simons Recurring Notification',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    }) ;
   
this.badge.increase(1);
  }

  repeatingDaily() {
    this.localNotifications.schedule({
      id: 42,
      title: 'Good Morning',
      text: 'Code something epic today!',
      trigger: { every: { hour: 9, minute: 30 } }
    });
  }

  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

   async getAll()  {
    this.localNotifications.getAll().then( (res: ILocalNotification[]) =>  {
      this.scheduled$.next(res);  
    })
    .catch (error =>
      { 
          console.log(error); }
    );
    ///return this.getAllLocalNotifications();
     //return this.scheduled$.getValue();
  }
  getAllLocalNotifications(): any[] {
      return this.scheduled$.getValue();
  }
}