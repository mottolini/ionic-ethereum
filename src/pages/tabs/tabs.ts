import { Component } from '@angular/core';

import { DebugPage } from '../debug/debug';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DebugPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
