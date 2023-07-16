import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  label: string | undefined;
  pageIndicatorLabel: string | undefined;

  routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoutes = this.getCurrentRoute(
          this.router.routerState.snapshot.root
        );
        const labels = currentRoutes
          .map((route) => route.data['label'])
          .filter((label) => label !== undefined);

        this.label = labels.shift();
        this.pageIndicatorLabel = labels.slice(-2).join(' / ');
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit() {}

  private getCurrentRoute(
    routeSnapshot: ActivatedRouteSnapshot
  ): ActivatedRouteSnapshot[] {
    let routes = [routeSnapshot];

    if (routeSnapshot.firstChild) {
      routes = routes.concat(this.getCurrentRoute(routeSnapshot.firstChild));
    }

    return routes;
  }
}
