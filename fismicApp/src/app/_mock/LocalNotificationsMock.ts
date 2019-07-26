
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import {Observable} from 'rxjs';

export class LocalNotificationsMock extends LocalNotifications {
    getAll(): Promise<ILocalNotification[]>
    {
         return super.getAll();
    }

    schedule(options?: ILocalNotification | ILocalNotification[]): void
    {
         super.schedule(options);
    }
    on(eventName: string): Observable<any> {
        return super.on(eventName);
    }
}