import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from "./weather.service";
import { HttpClient } from "@angular/common/http";

export const LOCATIONS : string = "locations";

export interface Country {
  name: string;
  code: string;
}

export interface Location {
  zipCode : string,
  countryCode : string;
}
@Injectable()
export class LocationService {

  locations : Location[] = [];

  constructor(private httpClient: HttpClient, 
    private weatherService : WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    
    for (let loc of this.locations) {
      this.weatherService.addCurrentConditions(loc.countryCode, loc.zipCode).subscribe();
    }
  }

  addLocation(countryCode: string, zipCode : string): Observable<any>{
    let location = {
      countryCode,
      zipCode
    }
    this.locations.push(location);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    return this.weatherService.addCurrentConditions(countryCode, zipCode);
  }

  removeLocation(zipcode : string){
    let index = this.locations.findIndex((item) => item.zipCode === zipcode)
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>("assets/data/countries.json");
  }
}
