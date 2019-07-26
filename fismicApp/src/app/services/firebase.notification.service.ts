import { Injectable } from '@angular/core';


import {Firebase} from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';

@Injectable()
export class FireBaseNotificationsService {

  constructor(private firebase: Firebase,
              private angularFirestore: AngularFirestore,
              private platform: Platform) {}

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;
    const devicesDatabaseReference = this.angularFirestore.collection('device-tokens');
    const data = {
      token,
      userId: 'user-'+new Date().toISOString(),
    };
    return devicesDatabaseReference.doc(token).set(data);
  }

  topicSubscription(topic) {
    this.firebase.subscribe(topic).then((res:any) => {
      console.log('Subscribed to topic: ' + topic, res);
    });
  }

  topicUnsubscription(topic) {
    this.firebase.unsubscribe(topic).then((res:any) => {
      console.log('Unsubscribed from topic: ' + topic, res)
    });
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}