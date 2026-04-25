import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/services/dashboard-layout-service';

export const profileSlugGuard: CanActivateFn = async (route, state) => {
  
  const authService = inject(AuthService);
  const supabase = authService.supabase;
  const dashboardLayoutService = inject(DashboardLayoutService);
  const router = inject(Router);

  const { data: {session} } = await supabase.auth.getSession();
  const { data } = await supabase.auth.getUser();

  if ( !session ) {
    return router.parseUrl('/auth/login');
  }

  const urlName = state.url.slice(9,state.url.length).toLocaleLowerCase();
  const user = data.user?.user_metadata['firstname'].toLocaleLowerCase();


  if ( urlName === user ) {
    dashboardLayoutService.isProfilePage.set(true);
    return true
  }

  return router.parseUrl('not-found');
  

};
