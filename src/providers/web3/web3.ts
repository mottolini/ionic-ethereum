
import { Injectable } from '@angular/core';

import Web3 from 'web3';
import { AppConfig } from '../../env';

/*
  Generated class for the Web3Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Web3Provider {
  web3: any;

  constructor(
  ) {
    console.log('Hello Web3Provider Provider');
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(AppConfig.ethereum.provider));
    }
  }

}
