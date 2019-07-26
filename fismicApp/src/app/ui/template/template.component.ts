import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';



import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: [],
})
export class TemplateComponent implements OnInit {


    constructor (public navCtrl: NavController, public router: Router)
    {
 

    }
    ngOnInit()
    {
    }

}