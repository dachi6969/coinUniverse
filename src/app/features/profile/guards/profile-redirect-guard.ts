import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-services/auth-service';

export const profileRedirectGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const supabase = authService.supabase;
  
  const { data: {session} } = await supabase.auth.getSession();
  const { data } = await supabase.auth.getUser();
  
  if ( !session ) {
    return router.createUrlTree(['/auth/login']);
  }

  const user = data.user?.user_metadata['firstname'];
  
  if ( session && user ) {
    return router.parseUrl(`/profile/${user}`);
  }
  
  return false;

};
