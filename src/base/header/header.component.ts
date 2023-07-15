import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faArrowDown = faArrowAltCircleDown;

  constructor() { }

  ngOnInit() {
  }

}
