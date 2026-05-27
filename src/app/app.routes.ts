import { Routes } from '@angular/router';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { LoginPage } from './features/auth/login/pages/login-page/login-page';
import { RegisterPage } from './features/auth/register/pages/register-page/register-page';
import { NotFoundPage } from './features/not-found/pages/not-found-page/not-found-page';
import { profileRedirectGuard } from './features/profile/guards/profile-redirect-guard';
import { WorkInProgress } from './features/work-in-progress/work-in-progress';
import { profileSlugGuard } from './features/profile/guards/profile-slug-guard';
import { notificationsGuard } from './features/user-notifications/guards/notifications-guard';
import { MarketPage } from './features/market/pages/market-page/market-page';
import { canVisitPortfolioGuard } from './features/portfolio/guards/can-visit-portfolio-guard';


export const routes: Routes = [

    { 
        path: '',
        component: DashboardLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPage },
            { 
                path: 'profile', 
                loadComponent: () => 
                import('./features/profile/pages/profile-page/profile-page')
                .then(c => c.ProfilePage),
                canActivate: [profileRedirectGuard] 
            },
            { 
                path: 'profile/:firtname', 
                loadComponent: () => 
                import('./features/profile/pages/profile-page/profile-page')
                .then(c => c.ProfilePage), 
                canActivate: [profileSlugGuard] 
            },
            { 
                path: 'notifications', 
                loadComponent: () => 
                import('./features/user-notifications/pages/notifications-page/notifications-page')
                .then(c => c.NotificationsPage),
                canActivate: [notificationsGuard] 
            },
            { 
                path: 'portfolio', 
                loadComponent: () => 
                import('./features/portfolio/pages/portfolio-page/portfolio-page')
                .then(c => c.PortfolioPage),
                canActivate: [canVisitPortfolioGuard]
            },
            { path: 'markets', component: MarketPage },
            { path: 'settings', component: WorkInProgress },
        ]
    },
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginPage },
            { path: 'register', component: RegisterPage }
        ]
    },

    { path: 'not-found', component: NotFoundPage },
    { path: "**", redirectTo: 'not-found' }

];
