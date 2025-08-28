import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: "counter",
    component: CounterComponent,
  },
  {
    path: "**",
    component: HomeComponent,
  }
];
