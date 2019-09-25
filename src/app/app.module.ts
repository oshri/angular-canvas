import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { D3CanvasModule } from './d3Canvas';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    D3CanvasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
