import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';


@IonicPage()
@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html',
  providers: [Web3Provider]
})
export class DebugPage {
  info: [] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public web3: Web3Provider
  ) {
  }

  ionViewDidLoad() {
    let showValues = [
      'version',
      'currentProvider.host',
      'currentProvider.connected',
      'eth.gasPrice'
    ];

    for (let i=0; i<showValues.length; i++) {
      let value = {
        key: showValues[i],
        value: this.web3.getValue(showValues[i])
      };
      this.info.push(value);
    }
  }

}
