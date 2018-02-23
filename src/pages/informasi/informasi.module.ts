import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformasiPage,DetailInformasiPage,KomentarPage } from './informasi';

@NgModule({
  declarations: [
    InformasiPage,DetailInformasiPage,KomentarPage
  ],
  imports: [
    IonicPageModule.forChild(InformasiPage),
  ],
})
export class InformasiPageModule {}
