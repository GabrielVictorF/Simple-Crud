//Components
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { Camera } from '@ionic-native/camera';

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
import { MessagePage } from '../pages/message/message';
import { EmpresasPage } from '../pages/empresas/empresas';

//Providers
import { ApiProvider } from '../providers/api/api';
import { FunctionsProvider } from '../providers/functions/functions';

//Pipes
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
    MessagePage,
    EmpresasPage,
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
    UsuariosPage,
    MessagePage,
    EmpresasPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    FunctionsProvider,
    Camera
  ]
})
export class AppModule {}
