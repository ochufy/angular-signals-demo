import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Signals';

  // public count: number = 0;
  public count = signal(0);

  public length = signal(0);
  public breadth = signal(0);
  public area = computed(() => this.length() * this.breadth());

  public effectsLog: string[] = [];
  
  constructor() {
    effect(() => {
      const log = "Effect due to change in Count signal " + this.count();
      console.log(log);
      this.effectsLog.push(log);
      let elem= document.getElementById('data');
      if (elem) {
        elem.scrollTop = elem.scrollHeight;
      }
    })
    effect(() => {
      const log = "Effect due to change in Area signal " + this.area();
      console.log(log);
      this.effectsLog.push(log);
      let elem = document.getElementById('data');
      if (elem) {
        elem.scrollTop = elem.scrollHeight;
      }
    })
  }

  public increase(): void {
    // this.count += 1;
    this.count.update(value => value + 1);
  }

  public reset(): void {
    // this.count = 0;
    this.count.set(0);
  }

  public increaseLength(): void {
    this.length.update(val => val + 10);
  }

  public increaseBreadth(): void {
    this.breadth.update(val => val + 10);
  }

  public resetArea(): void {
    this.length.set(0);
    this.breadth.set(0);
  }
  
  public clearEffectsLog(): void {
    this.effectsLog = [];
  }
}
