import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the ConnectivityServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
declare var Connection;

@Injectable()
export class ConnectivityServiceProvider {

  onDevice: boolean;
  
   constructor(public platform: Platform, public network: Network){
     this.onDevice = this.platform.is('cordova');
   }
  
   isOnline(): boolean {
     if(this.onDevice && this.network.type){
       return this.network.type != 'none';
     } else {
       return navigator.onLine;
     }
   }
  
   isOffline(): boolean {
     if(this.onDevice && this.network.type){
       return this.network.type == 'none';
     } else {
       return !navigator.onLine;  
     }
   }
  
   watchOnline(): any {
     return this.network.onConnect();
   }
  
   watchOffline(): any {
     return this.network.onDisconnect();
   }

}
