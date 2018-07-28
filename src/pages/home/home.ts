import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController,Platform,LoadingController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { Slides } from 'ionic-angular';
//Tambahkan Provider
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
//Tambahkan Variabel Global
import { HomeArray } from '../../pages/home/homearray';
import { UsulanArray } from '../../pages/usulan/usulanarray';
import { InformasiPage,InformasiAllPage,DetailInformasiPage } from '../informasi/informasi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents:[ InformasiPage,DetailInformasiPage ],
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  item;
  items:HomeArray[]=[];
  items2:UsulanArray[]=[];
  id:Number;
  id_warga: Number;
  app_id: String;
  home_menu:string
  
  constructor(public platform: Platform, public navCtrl: NavController,public storage: Storage,
    public homeservice:HomeserviceProvider,public alertCtrl: AlertController,public oneSignal: OneSignal,
    public loadincontroller:LoadingController,params: NavParams) {
    this.item = params.data.item;
    //TOMBOL EXIT
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
          let confirm = this.alertCtrl.create({
            title: 'Konfirmasi',
            message: 'Anda Ingin Keluar dari Aplikasi',
            buttons: [
              {
                text: 'Tidak',
                role: 'cancel',
                handler: () => {
                
                }
              },
              {
                text: 'Ya',
                handler: () => {
                  navigator['app'].exitApp();
                }
              }
            ]
          });
          confirm.present();                
      });
    });
  }
  ionViewDidLoad(){
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    let info = this.alertCtrl.create({
      title: 'Tidak Terhubung ke server',
      message: 'Silahkan Periksa koneksi internet anda...',
    });
    loadingdata.present();
          //Tampilkan data dari server
      this.homeservice.tampilkanhome().subscribe(
        //Jika data sudah berhasil di load
        (data:HomeArray[])=>{
          this.items=data;
        },
        //Jika Error
        function (error){  
          //Jika Koneksi Tidak ada
          if(error.status == 0){
            info.present();
          }
          loadingdata.dismiss(); 
        },
        //Tutup Loading
        function(){
          loadingdata.dismiss();
        }
      );
    //Ambil data ID dari storage
    /*this.storage.get('id_desa').then((iddesa) => {
      //Tampilkan data dari server
      this.homeservice.tampilkanusulanbaru(iddesa).subscribe(
        //Jika data sudah berhasil di load
        (data2:UsulanArray[])=>{
          this.items2=data2;
        },
        //Jika Error
        function (error){  
          //Jika Koneksi Tidak ada
          if(error.status == 0){
            info.present();
          }
          loadingdata.dismiss(); 
        },
        //Tutup Loading
        function(){
          loadingdata.dismiss();
        }
      );
    });*/
  }
ngAfterViewInit(){
  //Setting Slides
  setTimeout(()=>{
    //if(this.items && this.items.length > 0){
        this.slides.freeMode = true;
        this.slides.pager = true;
        this.slides.autoplay = 2500;
        this.slides.speed = 1000;
        this.slides.loop = true;
        this.slides.initialSlide = 5;
        this.slides.startAutoplay()
     //}
  },1000)
}
ionViewWillEnter(item){
  if(this.item != undefined){
    this.home_menu = this.item;
  }
  else{
    this.home_menu = "peranwarga";
  }
}

tb_wisata(){
  this.navCtrl.push(InformasiPage, { item: 1 });
}
tb_kuliner(){
  this.navCtrl.push(InformasiPage, { item: 2 });
}
tb_event(){
  this.navCtrl.push(InformasiPage, { item: 3});
}
tb_berita(){
  this.navCtrl.push(InformasiPage, { item: 4});
}
tb_investasi(){
  this.navCtrl.push(InformasiPage, { item: 5});
}
tb_harga(){
  this.navCtrl.push(InformasiPage, { item: 6});
}
detailinformasi(item2){
  this.navCtrl.push(DetailInformasiPage, { item: item2});
}
}


@Component({
  selector: 'page-home',
  templateUrl: 'home-kategori.html',
  entryComponents:[ InformasiPage,InformasiAllPage ],
})

export class HomePageKategori {
  @ViewChild(Slides) slides: Slides;
  item;
  
  constructor(public platform: Platform, public navCtrl: NavController,public storage: Storage,
    public homeservice:HomeserviceProvider,public alertCtrl: AlertController,public oneSignal: OneSignal,
    public loadincontroller:LoadingController,public nav: NavController,params: NavParams) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }
  tb_wisata(){
    this.navCtrl.push(InformasiPage, { item: 1 });
  }
  tb_kuliner(){
    this.navCtrl.push(InformasiPage, { item: 2 });
  }
  tb_event(){
    this.navCtrl.push(InformasiPage, { item: 3});
  }
  tb_berita(){
    this.navCtrl.push(InformasiPage, { item: 4});
  }
  tb_investasi(){
    this.navCtrl.push(InformasiPage, { item: 5});
  }
  tb_harga(){
    this.navCtrl.push(InformasiPage, { item: 6});
  }
  semuaposting(){
    this.navCtrl.push(InformasiAllPage);
  }
}