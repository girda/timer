import {Component, OnDestroy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Observable, interval, Subscription, fromEvent} from 'rxjs';
import {debounceTime, buffer, map, filter} from 'rxjs/operators'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnDestroy, AfterViewInit {

  @ViewChild('wait', { read: ElementRef })  btnWaitRef: ElementRef
  
  click$: Observable<number>;
  btnWait$;

  hours: number = 0; 
  minutes: number = 0; 
  seconds: number = 0;

  timer$: Observable<number> = interval(1000);

  subscription: Subscription;
  
  constructor() { }

  ngAfterViewInit() {

    this.click$ = fromEvent(this.btnWaitRef.nativeElement, 'click')
    this.btnWait$ = this.click$.pipe(
      buffer(
        this.click$.pipe(debounceTime(300))
      ),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2)
    )
    .subscribe(() => {
      if (this.subscription) {
        this.subscription.unsubscribe()
      }
    }) 

  }

  start() {
    if (this.subscription && !this.subscription.closed) {
      return;
    }
    this.subscription = this.timer$.subscribe(() => {
      console.log('sasas');
      
      this.seconds++
      if (this.seconds === 60) {
        this.minutes++
        this.seconds = 0
        if (this.minutes === 60) {
          this.hours++
        }
      }
    })
  }

  stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.reset();
    }
  }

  reset() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
