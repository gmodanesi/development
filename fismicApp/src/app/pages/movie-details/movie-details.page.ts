import { Component, OnInit } from '@angular/core';
import {storage, initializeApp} from 'firebase';
//import { FIREBASE_CONFIG } from '../../firebase.config';
import {MenuItem} from 'primeng/api';
import { NotificationsService } from '../../services/notifications.services';
import { FireBaseNotificationsService } from '../../services/firebase.notification.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private items: MenuItem[];
  constructor(private fbNotificationService: FireBaseNotificationsService,private notifications: NotificationsService ) {

     //initializeApp(FIREBASE_CONFIG);
   }
   scheduled= [];
   public fbNotifications: any;
   private FB_TOPIC = 'homeTopic';
  ngOnInit() {
    this.fbNotificationService.topicSubscription(this.FB_TOPIC);
    this.items = [
      {label:'Categories'},
      {label:'Sports'},
      {label:'Football'},
      {label:'Countries'},
      {label:'Spain'},
      {label:'F.C. Barcelona'},
      {label:'Squad'},
      {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
  ];
  }
  fbUnsubscribe()
  {
      this.fbNotificationService.topicUnsubscription(this.FB_TOPIC);
  }
  scheduleNotification() {
    this.notifications.scheduleNotification();
    
  }
  recurringNotification(){
    this.notifications.recurringNotification();
  }
  repeatingDaily(){
    this.notifications.repeatingDaily();
  }

  async getAll(){
    this.notifications.getAll().then(
      ()=> {
        this.scheduled=this.notifications.getAllLocalNotifications();
      }
    ) ;


    /*.then(
    () => this.notifications.getAllLocalNotifications().subscribe(
      res => {
        this.scheduled = res;
      }
    )
  )*/
  }
  


  /*async takePhoto(){
    try {
    const options: CameraOptions = { quality : 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
    const result = await this.camera.getPicture ( options );
    const image =  `data:image/jpeg;base64.${result}`;
    const pictures = storage().ref('pictures');
    pictures.putString(image , 'data_url');
  }
   catch(e)
   {
     console.error(e);
   }
   }*/

}
