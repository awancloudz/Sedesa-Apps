import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformasiPage,InformasiAllPage,DetailInformasiPage,KomentarPage } from './informasi';

@NgModule({
  declarations: [
    InformasiPage,InformasiAllPage,DetailInformasiPage,KomentarPage
  ],
  imports: [
    IonicPageModule.forChild(InformasiPage),
  ],
})
export class InformasiPageModule {}
