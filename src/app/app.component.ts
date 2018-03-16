import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';



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
      this.temp = Number(atob(hash).substr(0, 2));
      this.humidity = Number(atob(hash).substr(2, 2));
      this.air_pressure = Number(atob(hash).substr(4));
    });
  }
}
