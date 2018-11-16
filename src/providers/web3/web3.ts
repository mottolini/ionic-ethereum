
import { Injectable } from '@angular/core';

import Web3 from 'web3';
import _ from 'lodash';
import { AppConfig } from '../../env';

@Injectable()
export class Web3Provider {
  web3: any;

  constructor(
  ) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(AppConfig.ethereum.provider));
  }

  public getValue (key: string) {
    return _.get(this.web3, key);
  }
}
