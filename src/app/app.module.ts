import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// import { ProductsStateService } from '@shop/core-data';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {StoreModule} from './store/store.module';
import { InstructionsComponent } from './components/instructions/instructions.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule
  ],
  // providers: [
  //   ProductsStateService,
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
