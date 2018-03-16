import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Scrambler Weather Station';

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.title = this.route.snapshot.queryParams[""];
  }
}
