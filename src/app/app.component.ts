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
import * as base64a from 'base64-arraybuffer';

function base64ToUint8Array(base64) {
  const hash = atob(base64);
  const len = hash.length;
  let arr = new Uint8Array( len );
  for (let i = 0; i < len; i++)        {
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
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.fragment.subscribe((hash: string) => {
      if (hash) {
        // console.log('Hash: ' + hash + ' Hash Length: ' + hash.length);
        if (hash.length === 8) {
          // console.log('fragment = ' + hash + '; length = ' + hash.length);
          var decoded91 = base91.decode(hash);
          var decoded64 = base64ToUint8Array(hash);
          // console.log('91: ' + decoded91);
          // console.log('64: ' + decoded64);
          let format = decoded64[0];

          if (format !== 2 && format !== 4) {
            this.humidity = Math.round(decoded91[1] * 0.5);
            const uTemp = (((decoded91[3] & 127) << 8) | decoded91[2]);
            const tempSign = (decoded91[3] >> 7) & 1;
            this.temp = tempSign === 0 ? Math.round(uTemp / 256.0) : Math.round(-1 * uTemp / 256.0);
            this.air_pressure = Math.round((((decoded91[5] << 8) + decoded91[4]) + 50000)/100);
          } else {
            this.humidity = Math.round(decoded64[1] * 0.5);
            const uTemp = (((decoded64[2] & 127) << 8) | decoded64[3]);
            const tempSign = (decoded64[2] >> 7) & 1;
            this.temp = tempSign === 0 ? Math.round(uTemp / 256.0) : Math.round(-1 * uTemp / 256.0);
            this.air_pressure = Math.round((((decoded64[5] << 8) + decoded64[4]) + 50000)/100);
            if (hash[0] == 'B') {
              this.BID = hash.charCodeAt(8);
            }
          }
        }
      }
    });
  }
}
