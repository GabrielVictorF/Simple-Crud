import { Component } from '@angular/core';

import { AdicionarPage } from '../adicionar/adicionar';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AdicionarPage;

  constructor() {

  }
}
