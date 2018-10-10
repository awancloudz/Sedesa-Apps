import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformasiPage,InformasiAllPage,InformasiUserPage,DetailInformasiPage,KomentarPage, InformasiCreatePage } from './informasi';

@NgModule({
  declarations: [
    InformasiPage,
    InformasiAllPage,
    InformasiUserPage,
    DetailInformasiPage,
    KomentarPage,
    InformasiCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(InformasiPage),
  ],
})
export class InformasiPageModule {}
