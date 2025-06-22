import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;

  incrementCounter() {
    this.currentCount++;
  }
}
