import { Routes } from '@angular/router';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';

export const routes: Routes = [{
    path: '',
    title: 'Item Selector Demo',
    component: MainScreenComponent,
}, {
    path: '**',
    redirectTo: ''
}];
