import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

function base91_decode(s: string): string {
  let dec_table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$',
    '%', '&', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=',
    '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', '"'
  ];
  let debug = 1;
  let l = s.length;
  let v = -1;
  let b;
  let n;
  let o = '';
  for (let i=0; i < l; ++i) {
                                                if (debug) console.log(i + '. merkki ' + s.charAt(i));
    let c = s.charCodeAt(i);                    if (debug) console.log('1: '+c);

    if (!c) continue;
    if (v < 0) {
      v = c;                                    if (debug) console.log('2: '+v);
    } else {
      v += c * 91;                              if (debug) console.log('2: '+v);
      b |=  (v << n);                           if (debug) console.log('3: '+b);
      n += (v & 8191) > 88 ? 13 : 14;           if (debug) console.log('4: '+n);
      do {
        o += String.fromCharCode(b & 255);      if (debug) console.log('5: '+o);
        b = b >> 8;                             if (debug) console.log('6: '+b);
        n -= 8;                                 if (debug) console.log('7: '+n);
      } while (n > 7);
      v = -1;                                   if (debug) console.log('8: '+c);
    }
  }
  if (v + 1)
    o += String.fromCharCode((b | v << n) & 255); if (debug) console.log('1: '+o);
  return ""+o;
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
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.fragment.subscribe((hash: string) => {
      console.log('Hash: '+hash+' Hash Length: '+hash.length);
      if (hash.length === 8) {
        console.log('fragment = ' + hash + '; length = ' + hash.length);
        let decoded = base91_decode(hash);
        console.log('91: ' + decoded);
        this.temp = Number(atob(hash).substr(0, 2));
        this.humidity = Number(atob(hash).substr(2, 2));
        this.air_pressure = Number(atob(hash).substr(4));
      }
    });
  }
}
