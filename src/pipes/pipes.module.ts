import { NgModule } from '@angular/core';
import { NuloPipe } from './nulo/nulo';

@NgModule({
	declarations: [
    NuloPipe
  ],
	imports: [],
	exports: [
    NuloPipe
  ]
})
export class PipesModule {}