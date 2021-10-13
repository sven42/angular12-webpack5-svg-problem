import { Component } from '@angular/core';

declare const VERSION: string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // angularVersion = VERSION.full;
  title = 'Version: ' + VERSION;
}
