import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DashboardLayoutService {

  public isDesktop = signal<boolean>(false);
  public isAuthModalOpen = signal<boolean>(false);
  public isSidebarOpen = signal<boolean>(false);

  public headerTitle = signal<string>('Dashboard');
  public isProfilePage = signal<boolean>(false);

  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver.observe(['(max-width: 900px)'])
    .pipe( takeUntilDestroyed() )
    .subscribe((resp) => {
      this.isDesktop.set(!resp.matches);
      this.isSidebarOpen.set(false);
    });
  };

  public openSidebar(): void {
    this.isSidebarOpen.set(true);
  };

  public closeSidebar(): void {
    this.isSidebarOpen.set(false);
  };


}
