import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
        pathMatch: 'full'
    }
];
