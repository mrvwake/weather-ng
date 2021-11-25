import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {WeatherService} from "./weather.service";

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];

  constructor(private weatherService : WeatherService) {
    localStorage.setItem(LOCATIONS, JSON.stringify([]));
    let locString = localStorage.getItem(LOCATIONS);
    console.log(this.locations, locString);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions(loc);
  }

  addLocation(zipcode : string): Observable<any>{
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    return this.weatherService.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode : string){
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
