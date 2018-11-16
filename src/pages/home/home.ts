import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EthereumProvider } from '../../providers/ethereum/ethereum';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [EthereumProvider]
})
export class HomePage {

  private txtMnemonic;
  private txtAccount;
  private txtPrivKey;
  private txtPubKey;
  private txtBalance;

  private trnAmount = 0.1;
  private trnAddress: string = '0xB27dC4f2F97B4361939349AE61498f1c389f012F';
  private trnHash: string;

  constructor(
    public navCtrl: NavController,
    private ethereum: EthereumProvider
  ) {
  }

  generateMnemonic () {
    this.txtMnemonic = this.ethereum.generateMnemonic();
    this.getEthInfo();
  }

  async generateAccount () {
    this.ethereum.generateAccount();
    this.getEthInfo();
  }

  generateAccountFromMnemonic () {
    this.ethereum.generateAccountFromMnemonic(this.txtMnemonic);
    this.getEthInfo();
  }

  async sendTransaction() {
    this.trnHash = await this.ethereum.sendTransaction(this.trnAddress, this.trnAmount);
    let b = this.trnHash;
  }

  private async getEthInfo () {
    this.txtPrivKey = this.ethereum.getPrivateKey();
    this.txtAccount = this.ethereum.getAccount();
    this.txtMnemonic = this.ethereum.getMnemonic();
    this.txtBalance = await this.ethereum.getBalance();
  }
  
  ionViewDidEnter(){
    this.getEthInfo ();
  }
}
