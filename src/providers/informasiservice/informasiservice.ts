import { Injectable } from '@angular/core';

//Tambahakan aksiusul
import { InformasiArray } from '../../pages/informasi/informasiarray';
import { KomentarArray } from '../../pages/informasi/komentararray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

/*
  Generated class for the InformasiserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class InformasiserviceProvider {
  private items:InformasiArray[]=[];
  //private url:string="http://desa-motivadeadev770011.codeanyapp.com/website-admin-desa/public/api/informasi";
  private url:string="http://desa-motivadeadev770011.codeanyapp.com/website-admin-desa/public/api/informasi";
  constructor(public _http: Http) {
    
  }
  tampilkanuser(iduser){
    return this._http.get(this.url+"/user/"+iduser)
    .map((response:Response)=>response.json());
  }
  tampilkansemua(){
    return this._http.get(this.url)
    .map((response:Response)=>response.json());
  }
  tampilkaninformasi(item)
  {
      return this._http.get(this.url+"/"+item)
      .map((response:Response)=>response.json());
  }
  detailinformasi(item)
  {
      return this._http.get(this.url+"/detail/"+item.id)
      .map((response:Response)=>response.json());
  }
  komentarinformasi(item)
  {
      return this._http.get(this.url+"/komentar/"+item.id)
      .map((response:Response)=>response.json());
  }
  tambahkomentar(item:KomentarArray){
    let body = JSON.stringify(item);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+"/komentar",
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
