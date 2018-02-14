import { Injectable } from '@angular/core';

//Tambahakan aksiusul
import { InformasiArray } from '../../pages/informasi/informasiarray';
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
  private url:string="http://forkomperbekelbali.com/desa/public/api/informasi";
  constructor(public _http: Http) {
    
  }
  tampilkaninformasi()
  {
      return this._http.get(this.url)
      .map((response:Response)=>response.json());
  }
}
