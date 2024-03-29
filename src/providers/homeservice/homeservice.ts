import { Injectable } from '@angular/core';

//Tambahakan aksiusul
import { HomeArray } from '../../pages/home/homearray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import { UsulanArray } from '../../pages/usulan/usulanarray';
/*
  Generated class for the HomeserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HomeserviceProvider {
  //Deklarasi variabel
  private items:HomeArray[]=[];
  private items2:UsulanArray[]=[];
  //Memanggil URL Api
  private url:string="http://sedesa.id/api/perangkat";
  private url2:string="http://sedesa.id/api/usulanbaru";
  //private awal:string="http://sedesa.id/api/halamanawal";
  private awal:string="http://sedesa.id/api/halamanawal";
  constructor(public _http: Http) {
  }
    //Tampilkan home
  tampilkanhome()
    {
      return this._http.get(this.awal)
      .map((response:Response)=>response.json());
  }
    //Tampilkan usulan
  tampilkanusulanbaru(iddesa)
  {
    return this._http.get(this.url2+"/"+iddesa)
    .map((response:Response)=>response.json());
  }
  //Cek + Tambah perangkat
  tambahperangkat(item:HomeArray){
    let body = JSON.stringify(item);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
