import { Component, OnInit,OnDestroy, AfterViewInit} from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from '@ionic/angular';


import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { Stitch, RemoteMongoClient, AnonymousCredential, UserPasswordCredential, RemoteMongoDatabase} from 'mongodb-stitch-browser-sdk';
import {BSON, FacebookRedirectCredential } from 'mongodb-stitch-browser-sdk';
import {AwsServiceClient, AwsRequest } from 'mongodb-stitch-browser-services-aws';
import * as CryptoJS from 'crypto-js';


const argsR = {
  //ACL: 'public-read',
  Bucket: 'fismic.sogei',
  //ContentType: 'plain/text',
  //ContentType: 'pdf',
  Key: 'tabella tassi alcolemici ok.pdf'
  //Key: 'AKIAVLD2JEQRQMATDTKR'
  //Key: 'AKIAVLD2JEQRXR7UKH3C,oz08RTw4fVRwOs6mT826z+/wJa/k2N4ry/ou42Ps',
  //Body: 'pippo'
};

const argsW = {
  ACL: 'public-read',
  Bucket: 'fismic.sogei',
  ContentType: 'text/plain',
  //ContentType: 'pdf',
  Key: 'tests/prova.txt',
  //Key: 'AKIAVLD2JEQRQMATDTKR'
  //Key: 'AKIAVLD2JEQRXR7UKH3C,oz08RTw4fVRwOs6mT826z+/wJa/k2N4ry/ou42Ps',
  Body: 'pippo'
};


@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.page.html',
  styleUrls: ['./my-files.page.scss'],
})
export class MyFilesPage implements OnInit {
  client: any;
  credential: UserPasswordCredential;
  db: RemoteMongoDatabase;
  files: Observable<any[]>;
  private testo: string = 'minchia che ridere';


  constructor(  private router: Router, public navCtrl: NavController, private dataService: DataService, 
                public alertCtrl: AlertController, private toastCtrl: ToastController, private iab: InAppBrowser) { 
   this.files = this.dataService.getFiles();

  }

  
 callFunction()
 {
   
   this.client.callFunction('testFunction', ['me sembri']).then(res=>
    {this.testo = res;}
  )
  .catch (
    err => {
      console.log(err);
    
    
    
    })
   ;
 }
 

  addFile(){
    const inputAlert =  this.alertCtrl.create (
      {
        
        header: 'Store new Information',
        inputs: [
          {
            name: 'info',
            placeholder:'vai'
          }
        ],
        buttons: [
          {
             text: 'Cancel',
             role: 'cancel'
          },
          {
            text: 'Store',
            handler: data => {
              this.uploadInformation (data.info);
            }
          }
        ]
      }
    );
    inputAlert.then().then(al => al.present());

  }
   uploadInformation (text)
  {
      
   let  upload = this.dataService.uploadToStorage(text);

   upload.then().then(
    res => {
    console.log('res: ', res);
    this.dataService.storeInfoToDatabase(res.metadata).then(() =>
    {
      let toast=  this.toastCtrl.create({
        message:'Nuovo file aggiunto',
        duration:3000
      
        });
        toast.then().then(t => t.present());
       
    });
  });

  }
   deleteFile (file)
  {
       this.dataService.deleteFile(file).subscribe(() =>
      {
        let toast =  this.toastCtrl.create({
          message: 'File Removed',
          duration:3000
        });
        toast.then().then(t => t.present())
        
      }
      );
  }
  viewFile(url){
    this.router.navigate(['/moviesDetail']);
     //this.iab.create(url);
  }
  ngOnInit() {


    
     this.client = Stitch.defaultAppClient;
     //console.log(this.client.auth.user);
  
     //initializeDefaultAppClient('fismicapp-muubv');
    // console.log(this.client.auth.listUsers());
     //this.client.auth.logout();

     if(this.client.auth.hasRedirectResult())
     {
      this.client.auth.handleRedirectResult().then(
         user => {
           console.log(user);
        }
       )
       .catch (
        err => {
          console.log(err);
          this.router.navigate(['/login']); 
        
        
        })
       ;
     }

     //console.log(this.client.auth.isLoggedIn);
     
 
   
     

     /*this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('FISMIC');
     //this.login();
     let users = this.db.collection('USERS').find({})
     .asArray().then(resp => {
       console.log(resp);
     });
     
     let aws= this.client.getServiceClient (AwsServiceClient.factory, 'upload_2');
     let request= new AwsRequest.Builder()
     .withService('s3')
     .withAction('GetObject')
     .withRegion('eu-central-1')
     .withArgs( argsR) ;
     let request2=
     new AwsRequest.Builder()
     .withService('s3')
     .withAction('PutObject')
     .withRegion('eu-central-1')
     .withArgs( argsW);
     
     aws.execute(request.build()).then(
       result => {
console.log(result);

       }

     ).catch (
       err => {
         console.log(err);
       })
     ;

     aws.execute(request2.build()).then(
      result => {
console.log(result);

      }

    ).catch (
      err => {
        console.log(err);
      })
    ;*/
    

  }

  login() {
    this.credential = new UserPasswordCredential('FISMIC', 'FISMIC');
    this.client.auth.loginWithCredential(/*this.credential*/ new AnonymousCredential())
      .then(authId => {
        console.log(authId);
      });
  }

  onUploadChangeFunct(fileLoadedEvent : any) 
  {

    var f: File = fileLoadedEvent.target.files[0];
    var reader = new FileReader();
    var fileName='';
    var filePreview='';
    reader.readAsDataURL(f);
    reader.onload = () => {
      filePreview= (<string>reader.result).split(',')[1];
      //console.log(filePreview);
   

    this.client.callFunction('MyUploadS3', [filePreview,f.name,f.type]).then(res => alert(res))
    .catch (
      err => {
        alert(err);
      
      
      
      })
     ;
    }
  }

onUploadChange(fileLoadedEvent : any) 
{
  var f: File = fileLoadedEvent.target.files[0];
  var reader = new FileReader();
  var fileName='';
  var filePreview='';
  reader.readAsDataURL(f);
  reader.onload = () => {
     //alert(reader.result.split(',')[1]);
    fileName = f.name + " " + f.type;
    filePreview = 'data:'+f.type+/*+'image/png'+*/ ';base64,' + (<string>reader.result).split(',')[1];
    var myBson=atob((<string>reader.result).split(',')[1]);
    //new BSON.Binary(reader.result.split(',')[1],0);
    var length=myBson.length;
    var ab=new ArrayBuffer(length);
    var ua=new Uint8Array(ab);
    for(var i=0; i< length; i++)
    {
      ua[i]=myBson.charCodeAt(i);
    }
     var binaryFile= new BSON.Binary(ua,0);
    
    var argsW2 = {
      ACL: 'public-read',
      Bucket: 'fismic.sogei',
      ContentType: f.type,
      //ContentType: 'pdf',
      Key: 'tests/'+ f.name,
      //Key: 'AKIAVLD2JEQRQMATDTKR'
      //Key: 'AKIAVLD2JEQRXR7UKH3C,oz08RTw4fVRwOs6mT826z+/wJa/k2N4ry/ou42Ps',
      Body: binaryFile
    };


    let aws2= this.client.getServiceClient (AwsServiceClient.factory, 'upload_2');

    let request4=
       new AwsRequest.Builder()
       .withService('s3')
       .withAction('PutObject')
       .withRegion('eu-central-1')
       .withArgs( argsW2);
       
      
  
       aws2.execute(request4.build()).then(
        result => {
  console.log(result);
  
        }
  
      ).catch (
        err => {
          console.log(err);
        })
      ;

    //var bsonImage =   BSON.Binary(filePreview,0);
    //console.log(bsonImage);
    //Bina
    //.fromBase64(filePreview, 0);
    
  };

  //var binaryImage= BSON.Binary.fromBase64(filePreview,0);
 

  
  //var imgSrcData = CryptoJS. enc.Base64.stringify(f);
}
}

