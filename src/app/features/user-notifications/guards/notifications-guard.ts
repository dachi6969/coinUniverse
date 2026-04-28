import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-services/auth-service';

export const notificationsGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const supabase = authService.supabase;
  
  const { data: {session} } = await supabase.auth.getSession();

  return session ? true : router.parseUrl('/auth/login')
};
