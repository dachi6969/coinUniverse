import { Routes } from '@angular/router';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { LoginPage } from './features/auth/login/pages/login-page/login-page';
import { RegisterPage } from './features/auth/register/pages/register-page/register-page';
import { NotFoundPage } from './features/not-found/pages/not-found-page/not-found-page';

export const routes: Routes = [

    { 
        path: '',
        component: DashboardLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPage }
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
    { path: "**", redirectTo: 'dashboard' }

];
