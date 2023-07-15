import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-item',
  templateUrl: './rate-item.component.html',
  styleUrls: ['./rate-item.component.css']
})
export class RateItemComponent implements OnInit {

  @Input() title : string | undefined;
  @Input() description : string | undefined;
  @Input() signature : string | undefined;

  constructor() { }

  ngOnInit() {
  }

}
