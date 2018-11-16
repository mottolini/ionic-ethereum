
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
    this.accountAddress = 'BC4600F38685C3Ec2d21d1771D262A116873ac05';
    //"0x454dD6c5EF32E81e863D21F4CBA6F00F18fed6Fa"
    this.privateKey = '8e4eb4dc0574dfe1ab5ad3e0fd338d48835f9eca6c332afe023f341027929bef';
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
    const addrNode = this.root.derive("m/44'/60'/0'/0/0"); //line 1

    const pippo = ethLib;
/*const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
const address = ethUtil.toChecksumAddress(addr); */
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
    //let az = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
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
    let c = await this.web3.eth.getGasPrice();
    //let d = await this.web3.eth.getTransactionCount(); 
    let e = await this.web3.eth.net.getId()
    //const transaction = await this.web3.eth.accounts.signTransaction(params, this.privateKey);
    const transaction = await this.web3.eth.sendTransaction(params);
    let b = transaction;
    return transaction.transactionHash;
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
