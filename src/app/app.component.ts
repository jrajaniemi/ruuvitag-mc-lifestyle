import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { decode } from 'punycode';

// https://github.com/Equim-chan/base91

import * as base91 from 'base91';

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
      if (hash.length === 9) {
        console.log('fragment = ' + hash + '; length = ' + hash.length);
        let decoded = base91.decode(hash);
        console.log('91: ' + decoded);
        this.temp = Number(atob(hash).substr(0, 2));
        this.humidity = Number(atob(hash).substr(2, 2));
        this.air_pressure = Number(atob(hash).substr(4));
      }
    });
  }
}
