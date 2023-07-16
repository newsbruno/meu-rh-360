import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  routes = routes;
  expandedChildIndices: { [key: number]: boolean } = {};

  constructor(private router: Router, public locStor: LocalStorageService) {}

  ngOnInit() {}

  toggleChildMenu(index: number) {
    this.expandedChildIndices[index] = !this.expandedChildIndices[index];
  }

  goTo(path: string | undefined, childPath: string | undefined) {
    if (path) {
      this.router.navigate([`/${path}`, { outlets: { dashboard: childPath } }]);
    }
  }
}
