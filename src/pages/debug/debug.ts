import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EthereumProvider } from '../../providers/ethereum/ethereum';


@IonicPage()
@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html',
  providers: [EthereumProvider]
})
export class DebugPage {
  info:any [] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ethereum: EthereumProvider
  ) {
  }

  ionViewDidEnter(){
    let showValues = [
      'version',
      'currentProvider.host',
      'currentProvider.connected',
      'eth.gasPrice',
      'eth.defaultAccount'
    ];

    this.info.length = 0;
    for (let i=0; i<showValues.length; i++) {
      let value = {
        key: showValues[i],
        value: this.ethereum.getValue(showValues[i])
      };
      this.info.push(value);
    }
  }

}
