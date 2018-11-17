
import { Injectable } from '@angular/core';

import Web3 from 'web3';
import _ from 'lodash';
import Bip39 from 'bip39';
import HDKey from 'hdkey';
import ethLib from 'eth-lib';
import { AppConfig } from '../../env';

@Injectable()
export class EthereumProvider {
  private web3: any;
  private root: HDKey.HDKey;
  private accountAddress: string;
  private privateKey: string;
  private publicKey: string;
  private mnemonic: string;

  constructor(
  ) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(AppConfig.ethereum.provider));
    this.web3.eth.net.getNetworkType(function(err, res){
      console.log("Network Type: "+res);
    });
    this.accountAddress = AppConfig.ethereum.account;
    this.privateKey = AppConfig.ethereum.privateKey;
  }

  public getValue (key: string) {
    return _.get(this.web3, key);
  }

  public generateMnemonic() {
    this.mnemonic = Bip39.generateMnemonic();
  }

  public generateAccountFromMnemonic(mnemonic: string) {
    if (!mnemonic) mnemonic = this.mnemonic;
    const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer
    this.root = HDKey.fromMasterSeed(seed);
    this.privateKey = this.root.privateKey.toString('hex');
    const account = this.web3.eth.accounts.privateKeyToAccount('0x' + this.privateKey);
    this.accountAddress = account.address;
  }

  public generateAccount() {
    const account = this.web3.eth.accounts.create();
    this.accountAddress = account.address.substr(2);
    this.privateKey = account.privateKey.substr(2);
  }

  public async getBalance() {
    let balance = 0;
    if (this.accountAddress) {
      balance = await this.web3.eth.getBalance(this.accountAddress);
      balance = (balance !== 0) ? this.web3.utils.fromWei(balance, 'ether') : 0;
    }
    return balance;
  }

  public async sendTransaction(address: string, amount: number) {
    const account = this.web3.eth.accounts.privateKeyToAccount('0x' + this.privateKey);
    this.web3.eth.accounts.wallet.add(account);
    this.web3.eth.defaultAccount = account.address;

    const params = {
      //nonce: 0,
      to: address,
      //from: this.accountAddress,
      value: this.web3.utils.toWei(amount.toString(), 'ether'),
      gasPrice: 5000000000,
      gasLimit: 21000,
      //chainId: 3
    };

    const transaction = await this.web3.eth.sendTransaction(params);
    return transaction.transactionHash;
  }

  public async signTransaction(address: string, amount: number) {
    const params = {
      to: address,
      value: this.web3.utils.toWei(amount.toString(), 'ether'),
      gasPrice: 5000000000,
      gasLimit: 21000,
    };
    const transaction = await this.web3.eth.accounts.signTransaction(params, '0x' + this.privateKey);
    return transaction;
  }

  public getPrivateKey() {
    return this.privateKey;
  }

  public getAccount () {
    return this.accountAddress;
  }
  public getMnemonic () {
    return this.mnemonic;
  }

  public async getGasPrice() {
    return await this.web3.eth.getGasPrice();
  }
  
  public async getChainId() {
    return await this.web3.eth.net.getId()
  }  
}
