import { Injectable, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        takeUntil(this._destroyed)
      )
      .subscribe(() => {
        this.isMobile = this.checkIfMobile();
      });
  }

  public isMobile: boolean = this.checkIfMobile();

  public checkIfMobile(): boolean {
    const isMobileScreenSize = window.innerWidth < 800;
    return isMobileScreenSize;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
