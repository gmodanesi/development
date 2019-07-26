import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';



import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {


    constructor (public navCtrl: NavController)
    {}
    ngOnInit()
    {

    }

}