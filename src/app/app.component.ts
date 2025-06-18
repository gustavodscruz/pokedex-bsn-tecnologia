import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { starOutline, starSharp, star, home } from 'ionicons/icons';
import { TabsComponent } from "./components/tabs/tabs.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, TabsComponent, HeaderComponent],
})
export class AppComponent {
  constructor() {
    addIcons({ starOutline, starSharp, star, home });
  }
}
