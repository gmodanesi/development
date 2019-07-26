import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Stitch, RemoteMongoClient, FacebookRedirectCredential , FacebookCredential, RemoteMongoDatabase} from 'mongodb-stitch-browser-sdk';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { InAppBrowser , InAppBrowserObject} from '@ionic-native/in-app-browser/ngx';
import { AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit, OnDestroy {
  public onLoginForm: FormGroup;
  private backButtonSubscription: any;
private completeUrl: string;
private  apb: InAppBrowserObject ;
private user: SocialUser;
private loggedIn: boolean;
private fRes: FacebookLoginResponse;
private permissions=['public_profile','email'];
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private router: Router,
    private iab: InAppBrowser,
    private authService: AuthService,
    private fb: Facebook
    
  ) { 

    this.completeUrl = this.platform.url();
    console.log(this.platform.url());
    console.log(this.router.url);
    console.log(this.platform.platforms.name);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(!isNullOrUndefined(user))
        this.mongoFacebookLogin(user.authToken);
    });

    //this.iab.create('http://localhost:8100/my-files','_blank','location=yes');
    //this.iab.create('http://localhost/my-files','_blank','location=yes');
    //this.logout();
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': ['null', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngAfterViewInit() {
   
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
    if( this.router.url==='/login')
      navigator['app'].exitApp();
    });
  }

  async logout()
  {
    if(!isNullOrUndefined(Stitch.defaultAppClient) && !isNullOrUndefined(Stitch.defaultAppClient.auth))
    { Stitch.defaultAppClient.auth.logout();}
    if(!isNullOrUndefined(this.authService))
    {this.authService.signOut();}
    if(!isNullOrUndefined(this.fb))
      {this.fb.logout();}
  }


  async login()
  {
    if(this.platform.is('desktop'))
    {
    this.authService.signIn (FacebookLoginProvider.PROVIDER_ID);
    } else
    {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => 
    {
      console.log('Logged into Facebook!', res);
      this.fRes = res;
      alert(this.fRes.authResponse.accessToken);
      this.mongoFacebookLogin(this.fRes.authResponse.accessToken);
     }
  
     )
    .catch(e => console.log('Error logging into Facebook', e));
    }
    


    //
    
    /*if (!Stitch.defaultAppClient.auth.isLoggedIn) {
      let credential = new FacebookRedirectCredential ('http://localhost:8100/my-files');
      //let credential = new FacebookRedirectCredential ('/my-files');
      Stitch.defaultAppClient.auth.loginWithRedirect( credential);
   }
   else
   {
     this.router.navigate(['/my-files']);
   }*/
   

  }

  mongoFacebookLogin(token)
  {
    if(isNullOrUndefined(token) /*|| isNullOrUndefined(this.user.authToken)*/)
      return;
    if (!Stitch.defaultAppClient.auth.isLoggedIn ) {
      let credential = new FacebookCredential (token) ;
      //let credential = new FacebookRedirectCredential ('/my-files');
      Stitch.defaultAppClient.auth.loginWithCredential ( credential);
   }
  
     this.router.navigate(['/my-files']);
   
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  iabGest()
  {
    //this.apb= this.iab.create('http://www.sogei.it','_system'/*,'location=yes'*/);
    //this.apb.
    //this.iab.create('http://www.sogei.it','_blank','location=no');
    this.iab.create('http://localhost/my-files','_blank','location=no');
  }

  // // //
  goToRegister() {
    this.logout();
    alert('stoca');
    
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    
    let val = this.onLoginForm.get('email').value;
    //this.iab.create('http://'+val,'_blank','location=yes');
    //window.open('file://C:/logging.log');
    //window.open('file:///D:/test.html','_self');
    window.open(val);
    //this.iab.create('file:///C:/logging.log','_blank');
    //this.navCtrl.navigateRoot('/home-results');
  }

  async goToFacebook() {
    //await this.logout();
    await this.login();

  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
