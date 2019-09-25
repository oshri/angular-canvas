import { NgModule } from '@angular/core';

import { CanvasComponent } from './containers/canvas/canvas.component';

const COMPONENTS = [CanvasComponent];

@NgModule({
  imports: [],
  exports: COMPONENTS,
  declarations: COMPONENTS
})
export class D3CanvasModule {}
