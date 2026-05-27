import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-services/auth-service';
import { inject } from '@angular/core';

export const canVisitPortfolioGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const supabase = authService.supabase;
  
  const { data: {session} } = await supabase.auth.getSession();
  
  if ( !session ) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
