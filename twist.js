import { Twisters } from 'twisters';
import './helper.js';
import a7_0x1fe6c9 from './logger.js';
import a7_0x32ced7 from './core.js';
import { privateKey } from './wallet.js';
import { RPC } from './rpc.js';

class Twist {
  constructor() {
    this.twisters = new Twisters();
  }

  ["log"](_0x37634b = '', _0x15768c = '', _0x293b2f = new a7_0x32ced7(), _0xcb920d) {
    const index = privateKey.indexOf(_0x15768c) + 1; // Indeks akun

    // Log ke console
    a7_0x1fe6c9.info(`Account ${index} - ${_0x37634b}`);

    const _0x5e10eb = _0x293b2f.address ?? '-';
    const _0x41cbaa = _0x293b2f.balance ?? '-';
    const _0x5df154 = _0x293b2f.user ?? {};
    const _0x434626 = _0x5df154.point ?? '-';

    // Membuat tampilan log untuk setiap akun
    const logText = `
[acc][${index}]Address      : ${_0x5e10eb}
[acc][${index}]Balance      : ${_0x41cbaa} ${RPC.SYMBOL}
[acc][${index}]Point        : ${_0x434626}
[acc][${index}]Status       : ${_0x37634b}
[acc][${index}]Waiting      : ${_0xcb920d}
    `;

    // Menyimpan log ke twisters dengan ID unik untuk setiap akun
    // Menggunakan index sebagai ID untuk memastikan pemisahan
    this.twisters.put(`account_${index}`, { 'text': logText });
  }

  ["info"](_0x91c027 = '') {
    this.twisters.put(0x2, {
      'text': `
==============================================
Info : ${_0x91c027}
==============================================
    `});
    return;
  }

  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }

  ["clear"](_0x388cc7) {
    this.twisters.remove(_0x388cc7);
  }
}

export default new Twist();
