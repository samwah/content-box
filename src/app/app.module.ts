import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import 'hammerjs';
import { PhysicsBoxComponent } from './components/physics-box/physics-box.component';
import { PhysicsBox2Component } from './components/physics-box2/physics-box2.component';
@NgModule({
  declarations: [
    AppComponent,
    PhysicsBoxComponent,
    PhysicsBox2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot() //for root??
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
