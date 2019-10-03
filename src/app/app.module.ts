import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { D3CanvasModule } from './d3Canvas';
import { KonvaCanvasModule } from './konvaCanvas';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    D3CanvasModule,
    KonvaCanvasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
