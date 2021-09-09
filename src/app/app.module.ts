import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JupyterCellComponent } from './jupyter-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    JupyterCellComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
