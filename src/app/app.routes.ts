import { Routes } from '@angular/router';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { LoginPage } from './features/auth/login/pages/login-page/login-page';
import { RegisterPage } from './features/auth/register/pages/register-page/register-page';
import { NotFoundPage } from './features/not-found/pages/not-found-page/not-found-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import { profileRedirectGuard } from './features/profile/guards/profile-redirect-guard';
import { WorkInProgress } from './features/work-in-progress/work-in-progress';
import { profileSlugGuard } from './features/profile/guards/profile-slug-guard';


export const routes: Routes = [

    { 
        path: '',
        component: DashboardLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPage },
            { path: 'profile', component: ProfilePage, canActivate: [profileRedirectGuard] },
            { path: 'profile/:firtname', component: ProfilePage, canActivate: [profileSlugGuard] },
            { path: 'settings', component: WorkInProgress },
            { path: 'portfolio', component: WorkInProgress },
            { path: 'markets', component: WorkInProgress },
            { path: 'notifications', component: WorkInProgress },
            { path: 'charts', component: WorkInProgress },
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
