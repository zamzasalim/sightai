import { privateKey } from './wallet.js';
import './config.js';
import a0_0x34b7b7 from './core.js';
import { Helper } from './helper.js';
import a0_0x290648 from './logger.js';
import a0_0x123d64 from './twist.js';

async function operation(_0x2b6c37, index) {
  try {
    const _0x5b35c8 = new a0_0x34b7b7(_0x2b6c37);
    await _0x5b35c8.connectWallet();
    await _0x5b35c8.getBalance();
    await _0x5b35c8.connectSightAiDapps();
    await _0x5b35c8.getUserInfo(true);

    if (!Helper.isToday(_0x5b35c8.user.checkInStatus.lastCheckInDate)) {
      await _0x5b35c8.checkIn();
    }
    await _0x5b35c8.getArcadeData(true);
    if (_0x5b35c8.balance > 0.1) {
      if (!_0x5b35c8.availableArcade) {
        await Helper.delay(1000, _0x2b6c37, "Starting Recurring Arcade ", _0x5b35c8);
        while (_0x5b35c8.played !== true) {
          await Helper.delay(1000, _0x2b6c37, "Trying to get available Arcade Game", _0x5b35c8);
          await _0x5b35c8.getArcadeData(true);
          if (_0x5b35c8.availableArcade) {
            await _0x5b35c8.playArcade(_0x5b35c8.availableArcade);
          }
          await _0x5b35c8.getUserInfo();
          await Helper.delay(20000, _0x2b6c37, "Delaying for 20 Seconds until next try", _0x5b35c8);
        }
      } else {
        await _0x5b35c8.playArcade(_0x5b35c8.availableArcade);
      }
    } else {
      throw new Error("Minimum Balance To Use This Bot Is 1 ETH");
    }
    await Helper.delay(60000, _0x2b6c37, "Account " + (index + 1) + " Processing Done, Delaying for 1 Minutes", _0x5b35c8);
    await operation(_0x2b6c37, index); // Rekursi
  } catch (_0x1b2278) {
    if (_0x1b2278.message) {
      await Helper.delay(10000, _0x2b6c37, "Error : " + _0x1b2278.message + ", Retry again after 10 Second");
    } else {
      await Helper.delay(10000, _0x2b6c37, "Error :" + JSON.stringify(_0x1b2278) + ", Retry again after 10 Second");
    }
    await operation(_0x2b6c37, index); // Ulangi operasi jika terjadi error
  }
}

async function startBot() {
  return new Promise(async (_0x58c7b2, _0x461255) => {
    try {
      a0_0x290648.info("BOT STARTED");
      const _0x36d7f4 = [];
      for (let index = 0; index < privateKey.length; index++) {
        _0x36d7f4.push(operation(privateKey[index], index)); // Kirim private key dan index
      }
      await Promise.all(_0x36d7f4); // Tunggu semua operasi selesai
      _0x58c7b2();
    } catch (_0x211920) {
      a0_0x290648.info("BOT STOPPED");
      a0_0x290648.error(JSON.stringify(_0x211920));
      _0x461255(_0x211920);
    }
  });
}

(async () => {
  try {
    a0_0x290648.clear();
    a0_0x290648.info('');
    console.log();
    Helper.ASC();
    await startBot();
  } catch (_0x17f7db) {
    a0_0x123d64.clear();
    a0_0x123d64.clearInfo();
    console.log("Error During executing bot", _0x17f7db);
    await startBot();
  }
})();
