import { ethers } from 'ethers';
import { API } from './api.js';
import { privateKey } from './wallet.js';
import { Helper } from './helper.js';
import a2_0x568c38 from './logger.js';
import { RPC } from './rpc.js';
import { SIGHTAI } from './sight_ai.js';
import { Config } from './config.js';
export default class Core extends API {
  constructor(_0xd7fdd4) {
    super("https://sightai.io", "sightai.io", "https://sightai.io", '4K0I6S');
    this.acc = _0xd7fdd4;
    this.played = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
    this.stateTree = "%5B%22%22%2C%7B%22children%22%3A%5B%22(platform)%22%2C%7B%22children%22%3A%5B%22dashboard%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22referral-code%5C%22%3A%5C%22" + this.something + "%5C%22%7D%22%2C%7B%7D%2C%22%2Fdashboard%3Freferral-code%3D" + this.something + "%22%2C%22refresh%22%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D";
  }
  async ["connectWallet"]() {
    try {
      const _0x25de1e = this.acc.replace(/^0x/, '');
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (privateKey.indexOf(this.acc) + 0x1), this);
      const _0x4625b3 = Helper.determineType(_0x25de1e);
      a2_0x568c38.info("Account Type : " + _0x4625b3);
      if (_0x4625b3 == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x25de1e, this.provider);
      } else {
        if (_0x4625b3 == "Private Key") {
          this.wallet = new ethers.Wallet(_0x25de1e.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}";
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x27be52) {
      throw _0x27be52;
    }
  }
  async ["getBalance"](_0x5ae3c2 = false) {
    try {
      if (!_0x5ae3c2) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x281ef2 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x281ef2;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x2cab4d) {
      throw _0x2cab4d;
    }
  }
  async ['getUserInfo'](_0x5439b9 = false) {
    try {
      if (_0x5439b9) {
        await Helper.delay(0x1f4, this.acc, "Getting User Information of " + this.wallet.address, this);
      }
      const _0x53a653 = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [this.address], {
        'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': "5dd1862a3d5d9a970c36c027f2d82f7280223906",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x53a653.status == 0xc8) {
        this.user = this.decodeData(_0x53a653.message);
        this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}; " + this.sessionCookie;
        if (_0x5439b9) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got User Data", this);
        }
      }
    } catch (_0x12ae18) {
      throw _0x12ae18;
    }
  }
  async ["checkIn"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Try To Check In...", this);
      const _0x23f364 = await this.fetch('/dashboard?referral-code=' + this.something, 'POST', undefined, [], {
        'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': "e5afaaaeff44c664f214a016c10409c8e930d77a",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x23f364.status == 0xc8) {
        await Helper.delay(0x1f4, this.acc, "Successfully Check In", this);
      } else {
        throw Error("Failed To Check In " + _0x23f364.message);
      }
    } catch (_0x355712) {
      throw _0x355712;
    }
  }
  async ["connectSightAiDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Sight Ai Dapps", this);
    const _0x37cb7a = SIGHTAI.URL + " wants you to sign in with your Ethereum account: " + this.address + "\n\nMake sure that you trust this site and are aware of the security implications of signing this message.\n\nURI: " + SIGHTAI.URL + "\nVersion: " + SIGHTAI.VERSION + "\nChain ID: " + RPC.CHAINID + "\nNonce: " + Helper.generateNonce() + "\nIssued At: " + new Date().toISOString() + "\n";
    a2_0x568c38.info("Message to sign: " + _0x37cb7a);
    const _0x34d06a = await this.wallet.signMessage(_0x37cb7a);
    a2_0x568c38.info("Signed Message: " + _0x34d06a);
    const _0x573014 = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [_0x34d06a, _0x37cb7a, this.something], {
      'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
      'Next-Action': '3b934a35aaaa2acd0f7846cda4c3b1031a840b89',
      'Next-Router-State-Tree': this.stateTree,
      'Cookie': this.cookie
    });
    if (_0x573014.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Connected to Sight AI", this);
      this.sightAiSignature = _0x34d06a;
    } else {
      throw Error("Failed to connect to SIGHT AI");
    }
  }
  async ['getArcadeData'](_0x4da06f = false) {
    try {
      if (_0x4da06f) {
        await Helper.delay(0x1f4, this.acc, "Getting Arcade Game Information...", this);
      }
      const _0x234f83 = await this.fetch("/fomo", "POST", undefined, [0x0, '$undefined', 0x1, 0x6], {
        'Referer': "https://sightai.io/fomo",
        'Next-Action': "5ac42dcc7a005b04d92431cdc4172391e05d2ca3",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x234f83.status == 0xc8) {
        const _0x4cbc39 = this.decodeData(_0x234f83.message);
        this.arcade = [];
        if (_0x4cbc39.pools) {
          this.arcade.push(..._0x4cbc39.pools);
        }
        this.availableArcade = this.arcade.find(_0x20b042 => _0x20b042.state == 0x1 || _0x20b042.state == 0x2 || _0x20b042.winner == "0x0000000000000000000000000000000000000000");
        if (_0x4da06f) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got Arcade Info", this);
        }
      }
    } catch (_0x4a5ed6) {
      throw _0x4a5ed6;
    }
  }
  async ["playArcade"](_0x15d92e) {
    try {
      await Helper.delay(0x3e8, this.acc, "Playing Arcade Game ID " + _0x15d92e.id + '...', this);
      await Helper.delay(0x1f4, this.acc, "Prepare for Tx...", this);
      await Helper.delay(0x1f4, this.acc, "Estimating Gas...", this);
      const _0x2010fc = ethers.parseEther(Config.PLAYAMOUNT.toString());
      const _0x574709 = Config.RAWDATA;
      const _0xefccd0 = await this.provider.getTransactionCount(this.wallet.address, "latest");
      const _0x43bcb3 = await this.provider.getFeeData();
      const _0x1e0ae1 = await this.estimateGasWithRetry(_0x15d92e.address, _0x2010fc, _0x574709, 0x3);
      await Helper.delay(0x1f4, this.acc, "Build Tx Data...", this);
      const _0x1eda52 = {
        'from': this.address,
        'to': _0x15d92e.address,
        'value': _0x2010fc,
        'gasLimit': _0x1e0ae1,
        'gasPrice': _0x43bcb3.gasPrice,
        'nonce': _0xefccd0,
        'data': _0x574709
      };
      a2_0x568c38.info("Preparing to send transaction for Arcade Game ID " + _0x15d92e.id);
      await this.executeTx(_0x1eda52);
      this.played = true;
    } catch (_0x2823c4) {
      await Helper.delay(0xbb8, this.acc, "Error Playing Arcade " + _0x2823c4.message + '...', this);
      this.played = false;
    }
  }
  async ["estimateGasWithRetry"](_0x31911b, _0x3328bb, _0x5b830a, _0x18aa24 = 0x3, _0x4eb6fc = 0xbb8) {
    for (let _0xeb7a84 = 0x0; _0xeb7a84 < _0x18aa24; _0xeb7a84++) {
      try {
        const _0xd474cd = await this.provider.estimateGas({
          'from': this.wallet.address,
          'to': _0x31911b,
          'value': _0x3328bb,
          'data': _0x5b830a
        });
        return _0xd474cd;
      } catch (_0xb46b32) {
        await Helper.delay(_0x4eb6fc, this.acc, _0xb46b32.shortMessage + "... Attempt " + (_0xeb7a84 + 0x1) + " of " + _0x18aa24, this);
        if (_0xeb7a84 === _0x18aa24 - 0x1) {
          throw Error("Failed to estimate gas after " + _0x18aa24 + " attempts.");
        }
      }
    }
  }
  ['decodeData'](_0x1f9c87) {
    const _0xc476b5 = _0x1f9c87.split("\n").filter(Boolean);
    let _0x4445c = null;
    _0xc476b5.forEach(_0x2ad5a3 => {
      if (_0x2ad5a3.startsWith('1:')) {
        const _0x23b567 = _0x2ad5a3.substring(0x2).trim();
        try {
          _0x4445c = JSON.parse(_0x23b567);
        } catch (_0x2d6221) {
          _0x4445c = {};
        }
      }
    });
    let _0x37e771 = JSON.stringify(_0x4445c).replace(new RegExp(this.something, 'g'), "?????");
    if (_0x37e771.length > 0xc8) {
      _0x37e771 = _0x37e771.substring(0x0, 0xc8) + '...';
    }
    a2_0x568c38.info("JSON Data : " + _0x37e771);
    return _0x4445c;
  }
  async ["executeTx"](_0x438ce5) {
    a2_0x568c38.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x438ce5)));
    await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
    const _0x3ba2ca = await this.wallet.sendTransaction(_0x438ce5);
    const _0x1653de = await _0x3ba2ca.wait();
    a2_0x568c38.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x1653de));
    await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + "tx/" + _0x1653de.hash, this);
    await this.getBalance(true);
  }
}
