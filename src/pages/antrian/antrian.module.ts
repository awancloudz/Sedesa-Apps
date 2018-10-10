import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AntrianPage, AntriancreatePage, AntrianrealtimePage } from './antrian';

@NgModule({
  declarations: [
    AntrianPage, AntriancreatePage, AntrianrealtimePage,
  ],
  imports: [
    IonicPageModule.forChild(AntrianPage),
  ],
})
export class AntrianPageModule {}
