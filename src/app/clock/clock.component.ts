import { Component, OnInit } from '@angular/core';
import { from, interval, timeInterval, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  buttonHidden: boolean = true;
  hourInputHidden: boolean = true;
  minuteInputHidden: boolean = true;
  secondInputHidden: boolean = true;
  interval: any;
  // second: string = '10';
  // minute: string = '4';
  // hour: string = '1';
  ampm: string = 'AM';
  second: any;
  minute: any;
  hour: any;
  secArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  minArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60,
  ];
  hourArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  secObs = from(this.secArray);
  minObs = from(this.minArray);
  hourObs = from(this.hourArray);

  ngOnInit(): void {
    const sectimer = timer(0, 1000);
    const mintimer = timer(0, 60000);
    const hourtimer = timer(0, 3600000);

    const seconds = interval(1000);
    secObs = from(this.secArray);
    this.interval = setInterval(() => {
      this.secObs.subscribe((data) => {
        this.second = data;
        console.log(this.second);
      });
    });
  }

  leftPadZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }

  setAmpm() {
    if (this.ampm === 'AM') {
      this.ampm = 'PM';
    } else {
      this.ampm = 'AM';
    }
  }

  hourClicked(): void {
    clearInterval(this.interval);
    this.hourInputHidden = false;
    this.minuteInputHidden = true;
    this.secondInputHidden = true;
    this.buttonHidden = false;
  }

  minuteClicked(): void {
    clearInterval(this.interval);
    this.minuteInputHidden = false;
    this.hourInputHidden = true;
    this.secondInputHidden = true;
    this.buttonHidden = false;
  }

  secondClicked(): void {
    clearInterval(this.interval);
    this.secondInputHidden = false;
    this.hourInputHidden = true;
    this.minuteInputHidden = true;
    this.buttonHidden = false;
  }

  buttonClicked(): void {
    if (Number(this.second) > 59) {
      this.second = this.leftPadZero(Number(this.second) - 60);
      this.setMinute();
    }
    this.setSecond();
    if (Number(this.minute) > 59) {
      this.minute = this.leftPadZero(Number(this.minute) - 60);
      this.setHour();
    }
    if (Number(this.hour) < 12) {
      this.hour = this.leftPadZero(Number(this.hour));
      this.ampm = 'AM';
    } else if (Number(this.hour) === 12) {
      this.ampm = 'PM';
    } else if (Number(this.hour) > 12 && Number(this.hour) < 24) {
      this.hour = this.leftPadZero(Number(this.hour) - 12);
      this.ampm = 'PM';
    } else {
      this.hour = this.leftPadZero(Number(this.hour) - 24);
      this.ampm = 'AM';
    }
    this.hourInputHidden = true;
    this.minuteInputHidden = true;
    this.secondInputHidden = true;
    this.buttonHidden = true;
  }

  setSecond(): void {
    this.interval = setInterval(() => {
      if (Number(this.second) < 59) {
        this.second = this.leftPadZero(Number(this.second) + 1);
      } else {
        this.second = this.leftPadZero(0);
        this.setMinute();
      }

      this.saveValues();
    }, 1000);
  }

  setMinute(): void {
    if (Number(this.minute) < 59) {
      this.minute = this.leftPadZero(Number(this.minute) + 1);
    } else {
      this.minute = this.leftPadZero(0);
      this.setHour();
    }
  }

  setHour(): void {
    if (Number(this.hour) < 12) {
      this.hour = this.leftPadZero(Number(this.hour) + 1);
    } else {
      this.hour = this.leftPadZero(Number(this.hour) - 11);
      this.setAmpm();
    }
  }

  saveValues() {}
}
