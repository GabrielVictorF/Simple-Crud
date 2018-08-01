//Components
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule} from '@angular/common/http';

//Pages
import { DetalhePage } from '../pages/detalhe/detalhe';
import { AdicionarPage } from '../pages/adicionar/adicionar';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { EditaPage } from '../pages/edita/edita';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ResetSenhaPage } from '../pages/reset-senha/reset-senha';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosPage } from '../pages/usuarios/usuarios';

//Providers
import { ApiProvider } from '../providers/api/api';
import { FunctionsProvider } from '../providers/functions/functions';

//Pipes
import { ProprietarioPipe } from '../pipes/proprietario/proprietario';
import { NuloPipe } from '../pipes/nulo/nulo';
import { DataPipe } from '../pipes/data/data';
import { NivelPipe } from '../pipes/nivel/nivel';

@NgModule({
  declarations: [
    MyApp,
    DetalhePage,
    AdicionarPage,
    HomePage,
    TabsPage,
    LoginPage,
    EditaPage,
    CadastroPage,
    ResetSenhaPage,
    PerfilPage,
    UsuariosPage,
    ProprietarioPipe,
    NuloPipe,
    DataPipe,
    NivelPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetalhePage,
    AdicionarPage,
    HomePage,
    TabsPage,
    LoginPage,
    EditaPage,
    CadastroPage,
    ResetSenhaPage,
    PerfilPage,
    UsuariosPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    FunctionsProvider
  ]
})
export class AppModule {}
