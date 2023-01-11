import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  declarations: [AppComponent, ClockComponent],
  imports: [BrowserModule, MatButtonModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
