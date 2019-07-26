import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import {  map, finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage) { 

  }

  getFiles()
  {
       let ref = this.db.list('files');
       return ref.snapshotChanges()
        .pipe(map(changes => {
        return changes.map (c => ({key: c.payload.key, ...c.payload.val()}))


       }));
  }

  uploadToStorage (information): AngularFireUploadTask {
    let newName =`${new Date().getTime()}.txt`;
    let refFile=this.afStorage.ref(`files/${newName}`);
    
    let task=this.afStorage.ref(`files/${newName}`).putString(information);
    task.then(
      (snapshot) => {
        console.log(snapshot);
      }

    );
    refFile.getDownloadURL().subscribe(dUrl =>
      { console.log(dUrl);}
    );
    
    
   
   
    return task;
  }

  storeInfoToDatabase (metainfo)
  {
   let toSave =
   {
    created: metainfo.timeCreated,
    //url: metainfo.downloadURLs[0],
    fullPath: metainfo.fullPath,
    contentType: metainfo.contentType
   };
   return this.db.list('files').push(toSave);
  }
  deleteFile(file)
  {
    let key=file.key;
    let storagePath= file.fullPath;
    this.db.list('files').remove(key);
    return this.afStorage.ref(storagePath).delete();

  }
}
