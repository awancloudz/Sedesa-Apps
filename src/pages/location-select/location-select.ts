import { Component,ElementRef, ViewChild, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
/**
 * Generated class for the LocationSelectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google; 
@IonicPage()
@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html',
})
export class LocationSelectPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any; 
  
  constructor(public nav:NavController,public navCtrl: NavController, public zone: NgZone, public maps: GoogleMapsProvider, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
    this.searchDisabled = true;
    //this.saveDisabled = true;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
        this.nav.pop();
        backAction();
      },2)
}

ionViewDidLoad(): void {
    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.searchDisabled = false;
    });

}

selectPlace(place){
    //Kosongkan data
    this.places = [];
    let location = {
        lat: null,
        lng: null,
        name: place.name
    };
    //Set Posisi Map Baru
    this.placesService.getDetails({placeId: place.place_id}, (details) => {
        this.zone.run(() => {
            location.name = details.name;
            location.lat = details.geometry.location.lat();
            location.lng = details.geometry.location.lng();
            this.saveDisabled = false;
            //Posisi Center
            this.maps.map.setCenter({lat: location.lat, lng: location.lng});
            this.location = location;
            this.query = details.name;
            //Marker Baru
            this.maps.clearMarkers();
            let marker = new google.maps.Marker({
                map: this.maps.map,
                animation: google.maps.Animation.DROP,
                position: {lat: location.lat, lng: location.lng}
            });
            this.maps.markers.push(marker);
        });
    });
}

searchPlace(){
    this.saveDisabled = true;
    if(this.query.length > 0 && !this.searchDisabled) {
        let config = {
            types: ['geocode'],
            input: this.query
        }
        this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
            if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
                this.places = [];
                predictions.forEach((prediction) => {
                    this.places.push(prediction);
                });
            }
        });
    } else {
        this.places = [];
    }
}

save(){
    this.viewCtrl.dismiss(this.location);
}
close(){
    this.viewCtrl.dismiss();
}  

}
