import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage,HomePageKategori } from './home';

@NgModule({
  declarations: [
    HomePage,HomePageKategori
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
