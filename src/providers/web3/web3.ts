
import { Injectable } from '@angular/core';

import Web3 from 'web3';
import _ from 'lodash';
import Bip39 from 'bip39';
import HDKey from 'hdkey';
import { AppConfig } from '../../env';

@Injectable()
export class Web3Provider {
  private web3: any;
  private root: HDKey.HDKey;

  constructor(
  ) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(AppConfig.ethereum.provider));
    this.web3.eth.net.getNetworkType(function(err, res){
      console.log("Network Type: "+res);
    });
  }

  public getValue (key: string) {
    return _.get(this.web3, key);
  }

  public generateMnemonic() {
    const mnemonic = Bip39.generateMnemonic();
    return mnemonic;
  }

  public generateAccountFromMnemonic(mnemonic: string) {
    const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer
    this.root = HDKey.fromMasterSeed(seed);
    const masterPrivateKey = this.root.privateKey.toString('hex');
    return masterPrivateKey;
  }

  public generateAccount() {
    const account = this.web3.eth.accounts.create();
    return account;
  }

/*
  async function generateAccount() {
    const mnemonic = await bip39.generateMnemonic();
    await init(mnemonic);
    console.log('init done');
    await testNewAccont('0x8ee5356dbf8263aafdee5d0f905654488ed16f1b'); // test by sending some ether to this address
    console.log({ msg: 'creation successfull' });
    return mnemonic;
  } */
  
}
