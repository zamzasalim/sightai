import { Helper } from './helper.js';
import a1_0x5f2f72 from './logger.js';
export class API {
  constructor(_0x6e37b0, _0x8dc0, _0x3224b4, _0x79ce5b) {
    this.url = _0x6e37b0;
    this.host = _0x8dc0;
    this.origin = _0x3224b4;
    this.ua = Helper.randomUserAgent();
    this.something = _0x79ce5b;
  }
  ["generateHeaders"](_0x4b31e8) {
    const _0x1c6181 = {
      'Accept': "text/x-component",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': 'text/x-component',
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Host': this.host,
      'Origin': this.origin,
      'Pragma': "no-cache"
    };
    if (_0x4b31e8) {
      _0x1c6181.Authorization = "Bearer " + _0x4b31e8;
    }
    return _0x1c6181;
  }
  async ["fetch"](_0x25f3e3, _0x3b4daa, _0x18cdcc, _0x34132b = {}, _0x1072f0 = {}) {
    try {
      const _0x268c3e = '' + this.url + _0x25f3e3;
      const _0x5e2f03 = {
        ..._0x1072f0,
        ...this.generateHeaders(_0x18cdcc)
      };
      const _0x2961e6 = {
        'headers': _0x5e2f03,
        'method': _0x3b4daa
      };
      a1_0x5f2f72.info(_0x3b4daa + " : " + _0x268c3e.replace(new RegExp(this.something, 'g'), "?????") + " " + (this.proxy ? this.proxy : ''));
      for (let _0x3f92ab in _0x5e2f03) {
        if (_0x5e2f03[_0x3f92ab].includes(this.something)) {
          _0x5e2f03[_0x3f92ab] = _0x5e2f03[_0x3f92ab].replace(new RegExp(this.something, 'g'), '????');
        }
      }
      a1_0x5f2f72.info("Request Header : " + JSON.stringify(_0x5e2f03));
      if (_0x3b4daa !== "GET") {
        _0x2961e6.body = '' + JSON.stringify(_0x34132b);
        const _0x5a316b = _0x2961e6.body.replace(new RegExp(this.something, 'g'), "?????");
        a1_0x5f2f72.info("Request Body : " + _0x5a316b);
      }
      const _0x283598 = await fetch(_0x268c3e, _0x2961e6);
      if (!this.sessionCookie) {
        this.sessionCookie = _0x283598.headers.getSetCookie()[0x0];
      }
      a1_0x5f2f72.info("Response : " + _0x283598.status + " " + _0x283598.statusText);
      if (_0x283598.ok || _0x283598.status == 0x190 || _0x283598.status == 0x193) {
        const _0x21ba96 = _0x283598.headers.get("content-type");
        let _0x39a86e;
        if (_0x21ba96 && _0x21ba96.includes('application/json')) {
          _0x39a86e = await _0x283598.json();
          _0x39a86e.status = _0x283598.status;
        } else {
          _0x39a86e = {
            'status': _0x283598.status,
            'message': await _0x283598.text()
          };
        }
        if (_0x283598.ok) {
          _0x39a86e.status = 0xc8;
        }
        let _0x5fd2fe = JSON.stringify(_0x39a86e).replace(new RegExp(this.something, 'g'), "?????");
        if (_0x5fd2fe.length > 0xc8) {
          _0x5fd2fe = _0x5fd2fe.substring(0x0, 0xc8) + "...";
        }
        a1_0x5f2f72.info("Response Data : " + _0x5fd2fe);
        return _0x39a86e;
      } else {
        throw new Error(_0x283598.status + " - " + _0x283598.statusText);
      }
    } catch (_0x533cb0) {
      a1_0x5f2f72.error("Error : " + _0x533cb0.message);
      throw _0x533cb0;
    }
  }
}
