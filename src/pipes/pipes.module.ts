import { NgModule } from '@angular/core';
import { ProprietarioPipe } from './proprietario/proprietario';
import { NuloPipe } from './nulo/nulo';

@NgModule({
	declarations: [
    ProprietarioPipe,
    NuloPipe
  ],
	imports: [],
	exports: [
    ProprietarioPipe,
    NuloPipe
  ]
})
export class PipesModule {}