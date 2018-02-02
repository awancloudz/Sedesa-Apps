import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
//Tambahkan Provider
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
//Tambahkan Variabel Global
import { LoginArray } from '../../pages/login/loginarray';
import { DaftarArray } from '../../pages/login/daftararray';
//Set direktori redirect * Wajib *
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'login.html',
  //Set komponen * Wajib *
  entryComponents:[ HomePage ], 
})
export class LoginPage {
  items:LoginArray[]=[];
  noktp:String;
  password:String;
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public loginservice:LoginserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController,private storage: Storage) {
  }

ionViewDidLoad(){
  this.storage.get('id_user').then((val) => {
    if(val != null){
      this.nav.setRoot(HomePage);
    }
  });
}
//Cek Data Login
ceklogin(){
  //Pemberitahuan
  let gagal = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Login Gagal, cek No.KTP/Password.',
    buttons: ['OK']
  });
  //Loading Data
  let loadingdata=this.loadincontroller.create({
      content:"Proses Login..."
  });
  let info = this.alertCtrl.create({
    title: 'Tidak Terhubung ke server',
    message: 'Silahkan Periksa koneksi internet anda...',
  });
  loadingdata.present();
  //Mengambil value dari input field untuk dimasukkan ke UsulanArray
  this.loginservice.loginuser(new LoginArray(this.noktp,this.password))
  .subscribe(
    (data:LoginArray)=>{
      //Seleksi Data dari server
      for(var key in data)
      {
         if((data[key].noktp != null) && (data[key].password != null)){
            //Redirect menuju ke root HomePage * Wajib *
            this.storage.set('id_user', data[key].id);
            this.storage.set('nama_warga', data[key].nama);
            this.storage.set('no_ktp', data[key].noktp);
            this.storage.set('id_dusun', data[key].id_dusun);
            this.storage.set('id_desa', data[key].id_profiledesa);
            this.nav.setRoot(HomePage);
         }
         else{
           gagal.present();
         }
      }
    },
    function(error){
      //Jika Koneksi Tidak ada
      if(error.status == 0){
        info.present();
      }
      loadingdata.dismiss();
    },
    function(){
    //Sembunyikan Loading
      loadingdata.dismiss();
    }
  );
}
daftar(){
  this.nav.push(DaftarPage);
}
}

@Component({
  templateUrl: 'daftar.html',
})
export class DaftarPage {
  //KTP
  public photos : any;
  public imageURI:any;
  public imageFileName:any;
  //Wajah + KTP
  public photos2 : any;
  public imageURI2:any;
  public imageFileName2:any;

  gbawal:String;
  gbawal2:String;
  items:LoginArray[]=[];
  id:Number;
  name:String;
  username:String;
  password:String;
  level:String;
  status:Number;
  nohp:String;
  email:String;
  id_dusun:Number;
  fotoktp:String;
  fotowajah:String;
  constructor(
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public loginservice:LoginserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController,private storage: Storage,private camera: Camera,private transfer: FileTransfer) {
  }

ngOnInit() {
  this.photos = [];
  this.gbawal = "assets/img/bgfoto.png";
  this.photos.push(this.gbawal);

  this.photos2 = [];
  this.gbawal2 = "assets/img/bgfoto.png";
  this.photos2.push(this.gbawal2);
}

takeKTP() {
  const options : CameraOptions = {
    quality: 25, // picture quality
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.photos.splice(0, 1);
      this.photos.push(this.imageURI);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
      this.presentToast(err);
  });
}

takeWajah(){
  const options : CameraOptions = {
    quality: 25, // picture quality
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  this.camera.getPicture(options).then((imageData2) => {
      this.imageURI2 = imageData2;
      this.photos2.splice(0, 1);
      this.photos2.push(this.imageURI2);
      this.photos2.reverse();
    }, (err) => {
      console.log(err);
      this.presentToast(err);
  });
}

uploadFile() {
  let loader = this.loadincontroller.create({
    content: "Uploading KTP..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();
  
  let options: FileUploadOptions = {
    fileKey: 'file',
    params: {'fotoktp' : this.fotoktp},
    fileName: 'image.jpg',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }
  
  fileTransfer.upload(this.imageURI, 'http://forkomperbekelbali.com/desa/public/api/uploadktp', options)
    .then((data) => {
    this.imageFileName = "image.jpg";
    loader.dismiss();
    this.presentToast("Upload KTP Sukses");
  }, (err) => {
    console.log(err);
    loader.dismiss();
    this.presentToast(err);
  });
}

uploadFile2() {
  let loader = this.loadincontroller.create({
    content: "Uploading Selfie & KTP..."
  });
  loader.present();
  const fileTransfer2: FileTransferObject = this.transfer.create();
  
  let options2: FileUploadOptions = {
    fileKey: 'file2',
    params: {'fotowajah' : this.fotowajah },
    fileName: 'image.jpg',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }
  
  fileTransfer2.upload(this.imageURI2, 'http://forkomperbekelbali.com/desa/public/api/uploadwajah', options2)
    .then((data2) => {
    this.imageFileName2 = "image.jpg";
    loader.dismiss();
    this.presentToast("Upload Selfie & KTP Sukses");
  }, (err) => {
    console.log(err);
    loader.dismiss();
    this.presentToast(err);
  });
}

presentToast(msg) {
  let toast = this._toast.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Tutup');
  });

  toast.present();
}

//Cek Data Pendaftaran
cekdaftar(){
  //Pemberitahuan
  let kosong = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Harap Upload Foto KTP / Selfie terlebih dahulu.',
    buttons: ['OK']
  });
  let sukses = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Pendaftaran Sukses,konfirmasi pendaftaran akan dikirim lewat SMS/Email.',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.nav.setRoot(LoginPage);
        }
      }
    ]
  });
  let gagal = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'No.KTP Belum Terdaftar. Silahkan hubungi Perangkat Desa anda.',
    buttons: ['OK']
  });
  let info = this.alertCtrl.create({
    title: 'Tidak Terhubung ke server',
    message: 'Silahkan Periksa koneksi internet anda...',
  });
  //Loading Data
  let loadingdata=this.loadincontroller.create({
      content:"Proses Verifikasi..."
  });
  loadingdata.present();
  //Mengambil value dari input field untuk dimasukkan ke UsulanArray
  this.loginservice.cekdaftar(new LoginArray(this.username,this.password))
  .subscribe(
    (data:DaftarArray)=>{
      //Seleksi Data dari server
      for(var key in data)
      {
        //Cek KTP
        if(data[key].noktp != null){
          //Cek FOto
          if((this.photos != "assets/img/bgfoto.png") && (this.photos2 != "assets/img/bgfoto.png")){
            //Set
            this.id_dusun = data[key].id_dusun;
            this.name = data[key].nama;
            this.level = "warga";
            this.status = 1;
            this.fotoktp = "ktp_" + this.username + ".jpg";
            this.fotowajah = "wajah_" + this.username + ".jpg";
            
            loadingdata.present();
            this.loginservice.daftaruser(new DaftarArray(this.id,this.name,this.username,this.password,this.level,this.status,this.id_dusun,this.fotoktp,this.fotowajah,this.nohp,this.email))
            .subscribe(
              (data:DaftarArray)=>{
                this.uploadFile();
                this.uploadFile2();
              },
              function(error){
                //Jika Koneksi Tidak ada
                if(error.status == 0){
                  info.present();
                }
                loadingdata.dismiss();
              },
              function(){
                //Jika Sukses
                loadingdata.dismiss();
                sukses.present();
              }
            );

          }
          else{
            kosong.present();
          }
        }
        else{
          gagal.present();
        }
      }
    },
    function(error){
      //Jika Koneksi Tidak ada
      if(error.status == 0){
        info.present();
      }
      loadingdata.dismiss();
    },
    function(){
    //Sembunyikan Loading
      loadingdata.dismiss();
    }
  );
}
login(){
  this.nav.setRoot(LoginPage);
}
}
