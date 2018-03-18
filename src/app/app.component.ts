import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

import * as base91 from 'node-base91';
import * as b64 from '../assets/base64';

function base64ToUint8Array(base64) {
  const hash = atob(base64);
  const len = hash.length;
  let arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = hash.charCodeAt(i);
  }
  return arr;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Scrambler Weather Station';
  temp = 0.0;
  humidity = 0;
  air_pressure = 0;
  BID = 0;
  debug=0;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    /**
     *  Testiaineisto
     *  http://localhost:4200#AjAYAMLs 24 °C, 24 %, 999 hPa
     *  http://localhost:4200#BCgYAMQYl 24 °C, 20 %, 1002 hPa
     *  http://localhost:4200/#Ajw-AM0U 62 °C, 30 %, 1025 hPa
     *
     */
    this.route.fragment.subscribe((hash: string) => {
      if (hash) {
        console.log('Hash: ' + hash + ' Hash Length: ' + hash.length);
        if (hash.length === 9) {
          hash += 'AAA'
        }
        console.log('fragment = ' + hash + '; length = ' + hash.length);
        var decoded91 = base91.decode(hash);
        // var decoded64 = base64ToUint8Array(hash);
        var decoded64 = b64.base64_decode(hash);
        console.log('91: ' + decoded91);
        console.log('64: ' + decoded64);
        let format = decoded64[0];

        if (format !== 2 && format !== 4) {
          this.humidity = Math.round(decoded91[1] * 0.5);
          const uTemp = (((decoded91[3] & 127) << 8) | decoded91[2]);
          const tempSign = (decoded91[3] >> 7) & 1;
          this.temp = tempSign === 0 ? Math.round(uTemp / 256.0) : Math.round(-1 * uTemp / 256.0);
          this.air_pressure = Math.round((((decoded91[5] << 8) + decoded91[4]) + 50000) / 100);
        } else {
          this.humidity = Math.round(decoded64[1] * 0.5);
          const uTemp = (((decoded64[2] & 127) << 8) | decoded64[3]);
          const tempSign = (decoded64[2] >> 7) & 1;
          this.temp = tempSign === 0 ? Math.round(uTemp / 256.0) : Math.round(-1 * uTemp / 256.0);
          this.air_pressure = Math.round((((decoded64[4] << 8) + decoded64[5]) + 50000) / 100);
          if (hash[0] == 'B') {
            this.BID = hash.charCodeAt(8);
            if(this.debug) { console.log('Beacon ID' + this.BID ); }
          }
        }

      }
    });
  }
}
