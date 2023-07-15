import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {

  label: string | undefined;
  routerSubscription : Subscription = new Subscription();

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.getCurrentRoute(this.router.routerState.snapshot.root);
      this.label = currentRoute.data['label'];
    });
   }


  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  private getCurrentRoute(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (snapshot.firstChild) {
      return this.getCurrentRoute(snapshot.firstChild);
    } else {
      return snapshot;
    }
  }

}
