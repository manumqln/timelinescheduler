import { Routes } from '@angular/router';
    import { ScheduleComponent } from './schedule/schedule.component'; // imports Schedule component

    export const rootRouterConfig: Routes = [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
    	{ path: 'schedule', component: ScheduleComponent } // Schedule sample path
    ];