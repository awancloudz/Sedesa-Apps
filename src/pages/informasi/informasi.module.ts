import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformasiPage,DetailInformasiPage } from './informasi';

@NgModule({
  declarations: [
    InformasiPage,DetailInformasiPage
  ],
  imports: [
    IonicPageModule.forChild(InformasiPage),
  ],
})
export class InformasiPageModule {}
