import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TimerComponent} from './timer/timer.component'

const routes: Routes = [
    {
      path: '',
      children: [
        {path: '', redirectTo: '/timer', pathMatch: 'full'},
        {path: 'timer', component: TimerComponent},
      ]
    }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }