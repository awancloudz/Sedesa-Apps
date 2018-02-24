import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController,Platform,LoadingController,NavParams } from 'ionic-angular';
//Tambahkan Provider
import { InformasiserviceProvider } from '../../providers/informasiservice/informasiservice';
import { InformasiArray } from '../../pages/informasi/informasiarray';
import { KomentarArray } from './komentararray';
/**
 * Generated class for the InformasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informasi',
  templateUrl: 'informasi.html',
})
export class InformasiPage {
  item;
  items:InformasiArray[]=[];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public loadincontroller:LoadingController,
    public informasiservice:InformasiserviceProvider,public alertCtrl: AlertController,params: NavParams) {
      this.item = params.data.item;
  }

  ionViewDidLoad(item) {
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
      this.informasiservice.tampilkaninformasi(this.item).subscribe(
        //Jika data sudah berhasil di load
        (data:InformasiArray[])=>{
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
  }
  detailinformasi(item){
    this.navCtrl.push(DetailInformasiPage, { item: item});
  }
}

@Component({
  selector: 'page-informasi-detail',
  templateUrl: 'detailinformasi.html',
})
export class DetailInformasiPage {
  item;
  items:InformasiArray[]=[];
  constructor(
    public navCtrl: NavController, public navParams: NavParams,public loadincontroller:LoadingController,
    public informasiservice:InformasiserviceProvider,public alertCtrl: AlertController,params: NavParams) {
      this.item = params.data.item;
  }

  ionViewDidLoad(item) {
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
      this.informasiservice.detailinformasi(this.item).subscribe(
        //Jika data sudah berhasil di load
        (data:InformasiArray[])=>{
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
  }

  tombolkomentar(item) {
    this.navCtrl.push (KomentarPage,{item: item})
  }
}

@Component({
  selector: 'komentarPage',
  templateUrl: 'komentar.html',
})
export class KomentarPage {
  item;
  items:KomentarArray[]=[];
  id:Number;
  id_posting:Number;
  tanggal:Date;
  nama:String;
  email:String;
  komentar:String;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,public loadincontroller:LoadingController,
    public informasiservice:InformasiserviceProvider,public alertCtrl: AlertController,params: NavParams) {
      this.item = params.data.item;
      this.id_posting = this.item.id;
  }
  ionViewDidLoad(item) {
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
      this.informasiservice.komentarinformasi(this.item).subscribe(
        //Jika data sudah berhasil di load
        (data:KomentarArray[])=>{
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
  }
  tambahkomentar(){
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Komentar sukses di kirim.',
      buttons: ['OK']
    });
    let info = this.alertCtrl.create({
      title: 'Tidak Terhubung ke server',
      message: 'Silahkan Periksa koneksi internet anda...',
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Mengirim Data..."
    });
    loadingdata.present();
    //Mengambil value dari input field untuk dimasukkan ke UsulanArray
    this.informasiservice.tambahkomentar(new KomentarArray(this.id,this.id_posting,this.tanggal,this.nama,this.email,this.komentar))
    .subscribe(
      (data:KomentarArray[])=>{
        loadingdata.dismiss();
        this.ionViewDidLoad(this.item);
        this.nama = '';
        this.email = '';
        this.komentar = '';
      },
      function(error){
        //Jika Koneksi Tidak ada
        if(error.status == 0){
          info.present();
        }
        loadingdata.dismiss(); 
      },
      function(){
        alert.present();
      }
    );
  }

}