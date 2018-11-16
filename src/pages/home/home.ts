import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Web3Provider]
})
export class HomePage {

  private txtMnemonic;
  private txtAccount;
  private txtPrivKey;
  private txtPubKey;
  private web3: Web3Provider;

  constructor(
    public navCtrl: NavController,
    private Web3: Web3Provider
  ) {
    this.web3 = Web3;
  }

  generateMnemonic () {
    this.txtMnemonic = this.web3.generateMnemonic();
  }

  async generateAccount () {
    const account = this.web3.generateAccount();
    this.txtAccount = account.address;
    this.txtPrivKey = account.privateKey;
  }

  generateAccountFromMnemonic () {
    this.txtPrivKey = '0x' + this.web3.generateAccountFromMnemonic(this.txtMnemonic);
  }
}
