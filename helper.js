import 'fs';
import 'path';
import a5_0x596ac6 from 'bip39';
import 'querystring';
import a5_0x4d854c from './twist.js';
import a5_0x161cd7 from 'moment-timezone';
import { ethers } from 'ethers';

export class Helper {
  static ["delay"] = (_0x256e83, _0xc74757, _0x1d252e, _0x3acc41) => {
    return new Promise(_0x362096 => {
      let _0xa38fd1 = _0x256e83;
      if (_0xc74757 != undefined) {
        a5_0x4d854c.log(_0x1d252e, _0xc74757, _0x3acc41, "Delaying for " + this.msToTime(_0x256e83));
      } else {
        a5_0x4d854c.info("Delaying for " + this.msToTime(_0x256e83));
      }
      const _0x38b4f3 = setInterval(() => {
        _0xa38fd1 -= 0x3e8;
        if (_0xc74757 != undefined) {
          a5_0x4d854c.log(_0x1d252e, _0xc74757, _0x3acc41, "Delaying for " + this.msToTime(_0xa38fd1));
        } else {
          a5_0x4d854c.info("Delaying for " + this.msToTime(_0xa38fd1));
        }
        if (_0xa38fd1 <= 0x0) {
          clearInterval(_0x38b4f3);
          _0x362096();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x38b4f3);
        await a5_0x4d854c.clearInfo();
        if (_0xc74757) {
          a5_0x4d854c.log(_0x1d252e, _0xc74757, _0x3acc41);
        }
        _0x362096();
      }, _0x256e83);
    });
  };

  static ["randomUserAgent"]() {
    const _0x358a09 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x358a09[Math.floor(Math.random() * _0x358a09.length)];
  }

  static ["readTime"](_0xe08411) {
    const _0x3865f3 = a5_0x161cd7.unix(_0xe08411);
    return _0x3865f3.format("YYYY-MM-DD HH:mm:ss");
  }

  static ["getCurrentTimestamp"]() {
    const _0x5916a7 = a5_0x161cd7().tz('Asia/Singapore').unix();
    return _0x5916a7.toString();
  }

  static ["random"](_0xceadcb, _0x1aeaa6) {
    const _0x4fd913 = Math.floor(Math.random() * (_0x1aeaa6 - _0xceadcb + 0x1)) + _0xceadcb;
    return _0x4fd913;
  }

  static ["msToTime"](_0x3e4fd3) {
    const _0x121605 = Math.floor(_0x3e4fd3 / 3600000);
    const _0x35af85 = _0x3e4fd3 % 3600000;
    const _0x19b35a = Math.floor(_0x35af85 / 60000);
    const _0x212ac0 = _0x35af85 % 60000;
    const _0x3b8b59 = Math.round(_0x212ac0 / 0x3e8);
    return _0x121605 + " Hours " + _0x19b35a + " Minutes " + _0x3b8b59 + " Seconds";
  }

  static ['generateRandomString'](_0x34e7ae) {
    let _0x4ace1b = '';
    const _0x3e9ad2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x402d93 = 0x0; _0x402d93 < _0x34e7ae; _0x402d93++) {
      _0x4ace1b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x3e9ad2));
    }
    return _0x4ace1b;
  }

  static ['serializeBigInt'] = _0x5098ce => {
    return JSON.parse(JSON.stringify(_0x5098ce, (_0x5ddb9e, _0x23cbac) => typeof _0x23cbac === "bigint" ? _0x23cbac.toString() : _0x23cbac));
  };

  static ['isMnemonic'](_0x291547) {
    return a5_0x596ac6.validateMnemonic(_0x291547);
  }

  static ["isPrivateKey"](_0x5e5347) {
    return /^[a-fA-F0-9]{64}$/.test(_0x5e5347);
  }

  static ["determineType"](_0x523915) {
    if (this.isMnemonic(_0x523915)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x523915) ? "Private Key" : 'Unknown';
    }
  }

  static ['generateNonce']() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }

  static ["isToday"](_0x2e0410) {
    const _0x1fc225 = new Date(_0x2e0410);
    const _0x20e01f = new Date();
    _0x20e01f.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x333128 = new Date(_0x1fc225);
    _0x333128.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x333128.getTime() === _0x20e01f.getTime());
  }

static ["ASC"]() {
  console.log('\x1b[34m%s\x1b[0m', `
   █████████   █████ ███████████   ██████████   ███████████      ███████    ███████████       █████████    █████████    █████████
  ███░░░░░███ ░░███ ░░███░░░░░███ ░░███░░░░███ ░░███░░░░░███   ███░░░░░███ ░░███░░░░░███     ███░░░░░███  ███░░░░░███  ███░░░░░███
 ░███    ░███  ░███  ░███    ░███  ░███   ░░███ ░███    ░███  ███     ░░███ ░███    ░███    ░███    ░███ ░███    ░░░  ███     ░░░
 ░███████████  ░███  ░██████████   ░███    ░███ ░██████████  ░███      ░███ ░██████████     ░███████████ ░░█████████ ░███         
 ░███░░░░░███  ░███  ░███░░░░░███  ░███    ░███ ░███░░░░░███ ░███      ░███ ░███░░░░░░      ░███░░░░░███  ░░░░░░░░███░███         
 ░███    ░███  ░███  ░███    ░███  ░███    ███  ░███    ░███ ░░███     ███  ░███            ░███    ░███  ███    ░███░░███     ███
 █████   █████ █████ █████   █████ ██████████   █████   █████ ░░░███████░   █████           █████   █████░░█████████  ░░█████████
 ░░░░░   ░░░░░ ░░░░░ ░░░░░   ░░░░░ ░░░░░░░░░░   ░░░░░   ░░░░░    ░░░░░░░    ░░░░░           ░░░░░   ░░░░░  ░░░░░░░░░    ░░░░░░░░░  
==============================================
    BOT              : SIGHTAI
    Telegram Channel : @airdropasc               
    Telegram Group   : @autosultan_group         
==============================================
`);
}

}
