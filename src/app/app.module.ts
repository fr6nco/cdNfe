import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { TopologyComponent } from './topology/topology.component';
import { HttpClientModule } from '@angular/common/http';
import { StateComponent } from './state/state.component';

@NgModule({
  declarations: [
    AppComponent,
    TopologyComponent,
    StateComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
