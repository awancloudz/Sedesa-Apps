import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
// Mengambil halaman UTAMA yg sudah dibuat
import { HomePage,HomePageKategori } from '../pages/home/home';
import { UsulanPage } from '../pages/usulan/usulan';
import { UsulanDusunPage } from '../pages/usulandusun/usulandusun';
import { BeritaPage } from '../pages/berita/berita';
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage} from '../pages/login/login';
import { ProfildesaPage} from '../pages/profildesa/profildesa';
import { PengaduanPage} from '../pages/pengaduan/pengaduan';
import { AntrianPage} from '../pages/antrian/antrian';
import { LocationSelectPage } from '../pages/location-select/location-select';
import { BelanjaPage } from '../pages/belanja/belanja';
import { InformasiPage } from '../pages/informasi/informasi';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //halaman yang pertama kali dipanggil
  rootPage: any = HomePage;
  level = "umum";
  //Tipe Variable untuk tombol menu
  pages_login: Array<{title: string, icon: string, component: any}>;
  pages_umum: Array<{title: string, icon: string, component: any,item: any}>;
  pages_warga: Array<{title: string, icon: string, component: any,item: any}>;
  pages_dusun: Array<{title: string, icon: string, component: any}>;
  warga: Array<{nama: string}>;
  ids: any;
  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,private oneSignal: OneSignal,private events: Events) {
    //Variabel Awal Kosong
    this.pages_umum = [];
    this.pages_warga = [];
    this.pages_dusun = [];
    this.warga = [];
    
    //Set User Umum
    this.events.publish('user:umum');

    //Deteksi Awal User
    this.initializeApp();
    this.listenToLoginEvents();

    // Value Variable dari tombol menu
    this.pages_login = [
      { title: 'Login/Daftar',  icon: "sign-in", component: LoginPage },
    ];
    this.pages_umum = [
      { title: 'Home', icon: 'sidemenu_icon/home.png',  component: HomePage, item: 'kependudukan' },
      { title: 'Kependudukan', icon: 'sidemenu_icon/kependudukan.png',  component: HomePageKategori, item: 'kependudukan' },
      { title: 'Peran Warga', icon: 'sidemenu_icon/peran_warga.png',  component: HomePageKategori, item: 'peranwarga' },
      { title: 'Informasi', icon: 'sidemenu_icon/informasi.png',  component: HomePageKategori, item: 'informasi' },
      { title: 'Toko Desa', icon: 'sidemenu_icon/toko_desa.png', component: BelanjaPage, item: 'kependudukan' },
      /*{ title: 'Wisata', icon: "tree",  component: InformasiPage, item: 1},
      { title: 'Kuliner', icon: "cutlery",  component: InformasiPage, item: 2},
      { title: 'Event', icon: "calendar",  component: InformasiPage, item: 3},
      { title: 'Berita', icon: "newspaper-o",  component: InformasiPage, item: 4},
      { title: 'Investasi', icon: "line-chart",  component: InformasiPage, item: 5},
      { title: 'Info Harga', icon: "tags",  component: InformasiPage, item: 6},
      { title: 'Usulan', icon: "edit", component: '', item: '' },
      { title: 'Pengaduan', icon: "list-alt", component: '', item: '' },
      { title: 'Layanan', icon: "slideshare", component: '', item: ''},*/
    ];
    this.pages_warga = [
      { title: 'Home', icon: 'sidemenu_icon/home.png',  component: HomePage, item: 'kependudukan' },
      { title: 'Kependudukan', icon: 'sidemenu_icon/kependudukan.png',  component: HomePageKategori, item: 'kependudukan' },
      { title: 'Peran Warga', icon: 'sidemenu_icon/peran_warga.png',  component: HomePageKategori, item: 'peranwarga' },
      { title: 'Informasi', icon: 'sidemenu_icon/informasi.png',  component: HomePageKategori, item: 'informasi' },
      { title: 'Toko Desa', icon: 'sidemenu_icon/toko_desa.png', component: BelanjaPage, item: 'kependudukan' },
      /*{ title: 'Usulan Saya', icon: "edit", component: UsulanPage },
      { title: 'Hasil Musyawarah',  icon: "calendar-check-o", component: BeritaPage },
      { title: 'Pengaduan Saya',  icon: "list-alt", component: PengaduanPage },
      { title: 'Layanan',  icon: "slideshare", component: AntrianPage },*/
      { title: 'Profile', icon: 'sidemenu_icon/profile.png', component: ProfilePage, item: 'kependudukan' },
      { title: 'Logout', icon: 'sidemenu_icon/log_out.png', component: SettingPage, item: 'kependudukan' },
    ];

    this.pages_dusun = [
      { title: 'Home', icon: 'sidemenu_icon/home.png',  component: HomePage },
      { title: 'Usulan Warga', icon: 'sidemenu_icon/home.png', component: UsulanDusunPage },
      { title: 'Hasil Musyawarah', icon: 'sidemenu_icon/home.png', component: BeritaPage },
      { title: 'Logout', icon: 'sidemenu_icon/home.png', component: SettingPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.oneSignal.startInit('0cd199c8-a64b-4b4d-be1f-913897925183', '1038653536158');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        if(this.level == "warga"){
          this.nav.setRoot(UsulanPage);
        }
        else if(this.level == "dusun"){
          this.nav.setRoot(UsulanDusunPage);
        }
        
      });
        
      this.oneSignal.endInit();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,{item: page.item});
  }

  login(){
    this.nav.setRoot(LoginPage);
  }
  //Fungsi Deteksi Level User
  listenToLoginEvents() {
    this.events.subscribe('user:umum', () => {
      this.level = "umum";
    });

    this.events.subscribe('user:warga', (data) => {
      this.level = "warga";
      this.warga = [
        { nama: data },
      ];
    });

    this.events.subscribe('user:dusun', (data) => {
      this.level = "dusun";
      this.warga = [
        { nama: data },
      ];
    });
  }
}
