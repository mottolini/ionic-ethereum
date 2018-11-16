import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [Web3Provider]
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public web3: Web3Provider
  ) {

  }

}
