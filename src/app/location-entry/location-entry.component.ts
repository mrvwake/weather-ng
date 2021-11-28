import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country, LocationService } from "../location.service";

@Component({
  selector: 'app-location-entry',
  templateUrl: './location-entry.component.html',
  styleUrls: ['./location-entry.component.css']
})
export class ZipcodeEntryComponent implements OnInit, OnDestroy {

  countriesOptions: string[] = [];
  countries: Country[] = [];
  countryCode = '';
  zipcode = '';
  error = '';
  btnHandler: Subject<any> = new Subject();
  destroyUntil: Subject<boolean> = new Subject();

  constructor(private service : LocationService) { }

  ngOnInit() {
    this.service.getCountries().pipe(takeUntil(this.destroyUntil)).subscribe((list: Country[]) =>{
      this.countriesOptions = list.map((c) => c.name);
      this.countries = list;
    });
  }

  ngOnDestroy() {
    this.destroyUntil.complete();
  }

  addLocation() {
    this.error = '';
    if(this.zipcode?.length && this.countryCode?.length) {
      this.service.addLocation(this.countryCode, this.zipcode)
      .pipe(takeUntil(this.destroyUntil))
      .subscribe(() => {
        this.btnHandler.next();
      }, (error) => {
        this.error = error;
        this.btnHandler.next();
      });
    } else {
      this.error = 'Please enter correct values';
      this.btnHandler.next();
    }
  }

  onZipChange(event: InputEvent) { 
    if(!event?.target || !event.target['value'] || event.target['value'].length === 0) {
      this.zipcode = '';
    }
    this.zipcode = event.target['value'];
  }

  onCountrySelect(countryName: string) {
    const country = this.countries.filter((item: Country) => item.name === countryName)[0];
    if(country) {
      this.countryCode = country.code;
    } else {
      this.countryCode = '';
    }
  }
}
